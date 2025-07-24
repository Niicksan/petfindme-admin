<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    protected $fillable = [
        'email',
        'token',
        'type',
        'is_valid',
        'expires_at',
    ];
}
