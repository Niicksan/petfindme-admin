<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // check if the table is empty
        if (Status::count() > 0) {
            return;
        }

        $statuses = [
            ['name' => 'Изчакващ'],
            ['name' => 'Активен'],
            ['name' => 'Архивиран'],
            ['name' => 'Изтрит'],
        ];

        // create the fixed statuses
        Status::factory()->createMany($statuses);
    }
}
