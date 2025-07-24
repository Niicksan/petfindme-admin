<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\City;
use App\Models\Status;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Signal>
 */
class SignalFactory extends Factory
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
            'title' => fake()->sentence(3),
            'category_id' => Category::factory(),
            'city_id' => City::factory(),
            'geolocation' => [
                'latitude' => fake()->latitude(42.0, 44.0),
                'longitude' => fake()->longitude(23.0, 28.0),
            ],
            'contact_name' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'description' => fake()->paragraph(),
            'status_id' => Status::factory(),
            'archived_at' => fake()->optional()->dateTime(),
        ];
    }
}
