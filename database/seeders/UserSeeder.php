<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // check if the table is empty
        if (User::count() > 0) {
            return;
        }

        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@petfindme.com',
            'role_id' => 1,
            'is_active' => 1,
            'password' => bcrypt('passwd'),
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@petfindme.com',
            'role_id' => 2,
            'is_active' => 1,
            'password' => bcrypt('passwd'),
        ]);
    }
}
