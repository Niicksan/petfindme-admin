<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserLikedSignal extends Model
{
    /** @use HasFactory<\Database\Factories\UserLikedSignalFactory> */
    use HasFactory;
    public $incrementing = false;
    protected $primaryKey = ['user_id', 'signal_id'];

    protected $fillable = [
        'user_id',
        'signal_id',
    ];
}
