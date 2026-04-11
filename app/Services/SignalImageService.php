<?php

namespace App\Services;

use App\Models\Signal;
use App\Models\SignalImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SignalImageService
{
    private const MAX_WIDTH = 1920;

    private const JPEG_QUALITY = 85;

    /**
     * Sync images from the edit form: order updates, soft-deletes removed rows, stores new uploads.
     *
     * @param  array<int, array{id: mixed, order?: int}>  $manifest  Ordered list of kept images (DB id or new-* client id).
     * @param  array<int, UploadedFile>  $newFiles  New files in the same order as new-* entries in the manifest.
     */
    public function syncFromManifest(Signal $signal, array $manifest, array $newFiles): void
    {
        DB::transaction(function () use ($signal, $manifest, $newFiles) {
            $existing = SignalImage::withTrashed()
                ->where('signal_id', $signal->id)
                ->orderBy('order')
                ->get()
                ->keyBy('id');
            $keptIds = [];
            $newFileIndex = 0;

            foreach ($manifest as $index => $item) {
                $id = $item['id'] ?? null;
                $order = (int) ($item['order'] ?? $index);

                if ($this->isPersistedImageId($id) && $existing->has((int) $id)) {
                    $image = $existing->get((int) $id);
                    $keptIds[] = (int) $id;

                    if ($image->trashed()) {
                        $image->restore();
                    }
                    if ((int) $image->order !== $order) {
                        $image->order = $order;
                        $image->save();
                    }

                    continue;
                }

                $file = $newFiles[$newFileIndex] ?? null;
                $newFileIndex++;

                if (! $file instanceof UploadedFile || ! $file->isValid()) {
                    continue;
                }

                $stored = $this->compressAndStore($file);

                SignalImage::create([
                    'signal_id' => $signal->id,
                    'path' => $stored['path'],
                    'size' => $stored['size'],
                    'order' => $order,
                ]);
            }

            foreach ($existing as $dbId => $image) {
                if (! \in_array((int) $dbId, $keptIds, true) && ! $image->trashed()) {
                    $image->delete();
                }
            }
        });
    }

    private function isPersistedImageId(mixed $id): bool
    {
        if (\is_int($id)) {
            return $id > 0;
        }

        if (\is_string($id) && \ctype_digit($id)) {
            return true;
        }

        return false;
    }

    /**
     * @return array{path: string, size: int}
     */
    private function compressAndStore(UploadedFile $file): array
    {
        $path = $file->getRealPath();
        if ($path === false) {
            throw new \RuntimeException('Invalid upload path.');
        }

        $info = @getimagesize($path);
        if ($info === false) {
            throw new \RuntimeException('Unsupported or corrupted image.');
        }

        $type = $info[2] ?? 0;
        $src = $this->createImageResourceFromType($path, $type);

        if ($src === false) {
            throw new \RuntimeException('Unsupported or corrupted image.');
        }

        if (\in_array($type, [IMAGETYPE_PNG, IMAGETYPE_WEBP, IMAGETYPE_GIF], true)) {
            $src = $this->flattenAlphaToWhite($src);
            if ($src === false) {
                throw new \RuntimeException('Could not process image.');
            }
        }

        $w = imagesx($src);
        $h = imagesy($src);
        if ($w > self::MAX_WIDTH) {
            $nh = (int) round($h * (self::MAX_WIDTH / $w));
            $scaled = imagescale($src, self::MAX_WIDTH, $nh, IMG_BILINEAR_FIXED);
            if ($scaled !== false) {
                imagedestroy($src);
                $src = $scaled;
            }
        }

        ob_start();
        imagejpeg($src, null, self::JPEG_QUALITY);
        $jpegData = ob_get_clean();
        imagedestroy($src);

        $year = now()->format('Y');
        $month = now()->format('m');
        $day = now()->format('d');
        $filename = now()->timestamp.Str::random(10).'.jpg';
        $relativePath = "static/images/signals/{$year}/{$month}/{$day}/{$filename}";

        Storage::disk('public')->put($relativePath, $jpegData);

        return [
            'path' => $relativePath,
            'size' => \strlen($jpegData),
        ];
    }

    /**
     * @return \GdImage|resource|false
     */
    private function createImageResourceFromType(string $path, int $type)
    {
        return match ($type) {
            IMAGETYPE_JPEG => @imagecreatefromjpeg($path),
            IMAGETYPE_PNG => @imagecreatefrompng($path),
            IMAGETYPE_GIF => @imagecreatefromgif($path),
            IMAGETYPE_WEBP => function_exists('imagecreatefromwebp') ? @imagecreatefromwebp($path) : false,
            default => false,
        };
    }

    /**
     * @return \GdImage|false
     */
    private function flattenAlphaToWhite(\GdImage $src): \GdImage|false
    {
        $width = imagesx($src);
        $height = imagesy($src);
        $dst = imagecreatetruecolor($width, $height);
        if ($dst === false) {
            imagedestroy($src);

            return false;
        }
        $white = imagecolorallocate($dst, 255, 255, 255);
        imagefill($dst, 0, 0, $white);
        imagecopy($dst, $src, 0, 0, 0, 0, $width, $height);
        imagedestroy($src);

        return $dst;
    }
}
