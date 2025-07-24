<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // check if the table is empty
        if (Role::count() > 0) {
            return;
        }

        $roles = [
            ['name' => 'admin'],
            ['name' => 'user'],
        ];

        Role::factory()->createMany($roles);
    }
}
