<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SignalImage;

class SignalImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // check if the table is empty
        if (SignalImage::count() > 0) {
            return;
        }

        // Create signal images based on the SQL dump data
        SignalImage::factory()->create([
            'signal_id' => 1,
            'path' => 'static/images/signals/2024/08/31/17251141284795.jpeg',
            'size' => 62384,
            'deleted_at' => null,
            'created_at' => '2024-08-31 14:22:08',
            'updated_at' => '2024-08-31 14:22:08',
        ]);

        SignalImage::factory()->create([
            'signal_id' => 1,
            'path' => 'static/images/signals/2024/08/31/172511412848424.jpeg',
            'size' => 30282,
            'deleted_at' => null,
            'created_at' => '2024-08-31 14:22:08',
            'updated_at' => '2024-08-31 14:22:08',
        ]);

        SignalImage::factory()->create([
            'signal_id' => 2,
            'path' => 'static/images/signals/2024/08/31/172511426647890.jpeg',
            'size' => 115532,
            'deleted_at' => null,
            'created_at' => '2024-08-31 14:24:26',
            'updated_at' => '2024-08-31 14:24:26',
        ]);

        SignalImage::factory()->create([
            'signal_id' => 2,
            'path' => 'static/images/signals/2024/08/31/172511426648157.jpeg',
            'size' => 70236,
            'deleted_at' => null,
            'created_at' => '2024-08-31 14:24:26',
            'updated_at' => '2024-08-31 14:24:26',
        ]);

        SignalImage::factory()->create([
            'signal_id' => 3,
            'path' => 'static/images/signals/2024/08/31/172511475366921.jpeg',
            'size' => 146161,
            'deleted_at' => null,
            'created_at' => '2024-08-31 14:32:33',
            'updated_at' => '2024-08-31 14:32:33',
        ]);

        SignalImage::factory()->create([
            'signal_id' => 3,
            'path' => 'static/images/signals/2024/08/31/172511475367315.png',
            'size' => 131105,
            'deleted_at' => null,
            'created_at' => '2024-08-31 14:32:33',
            'updated_at' => '2024-08-31 14:32:33',
        ]);

        SignalImage::factory()->create([
            'signal_id' => 4,
            'path' => 'static/images/signals/2024/08/31/172510884255798.jpeg',
            'size' => 197932,
            'deleted_at' => null,
            'created_at' => '2024-08-31 12:54:02',
            'updated_at' => '2024-08-31 12:54:02',
        ]);

        SignalImage::factory()->create([
            'signal_id' => 4,
            'path' => 'static/images/signals/2024/08/31/172510884256282.jpeg',
            'size' => 109054,
            'deleted_at' => null,
            'created_at' => '2024-08-31 12:54:02',
            'updated_at' => '2024-08-31 12:54:02',
        ]);
    }
}
