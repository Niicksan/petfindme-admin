<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Signal extends Model
{
    /** @use HasFactory<\Database\Factories\SignalFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'category_id',
        'city_id',
        'geolocation',
        'contact_name',
        'phone',
        'description',
        'status_id',
        'archived_at',
        'deleted_at'
    ];

    protected $casts = [
        'geolocation' => 'json',
        'archived_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the images for this signal.
     */
    public function images(): HasMany
    {
        return $this->hasMany(SignalImage::class);
    }

    /**
     * Get the users that liked this signal.
     */
    public function likedSignals(): BelongsToMany
    {
        return $this->belongsToMany(UserLikedSignal::class, 'user_liked_signals', );
    }

    /**
     * Get the user that owns the signal.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category for this signal.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the city for this signal.
     */
    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    /**
     * Get the status for this signal.
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }
}
