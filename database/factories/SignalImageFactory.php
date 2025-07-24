<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Signal;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SignalImage>
 */
class SignalImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'signal_id' => Signal::factory(),
            'path' => fake()->unique()->filePath(),
            'size' => fake()->numberBetween(20000, 200000),
            'deleted_at' => fake()->optional()->dateTime(),
        ];
    }
}
