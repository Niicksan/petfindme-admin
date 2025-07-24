<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Signal;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserLikedSignal>
 */
class UserLikedSignalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'signal_id' => Signal::factory(),
        ];
    }
}
