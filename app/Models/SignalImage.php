<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SignalImage extends Model
{
    /** @use HasFactory<\Database\Factories\SignalImageFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'signal_id',
        'path',
        'size',
        'deleted_at',
    ];

    protected $casts = [
        'size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the signal that owns the image.
     */
    public function signal(): BelongsTo
    {
        return $this->belongsTo(Signal::class);
    }
}
