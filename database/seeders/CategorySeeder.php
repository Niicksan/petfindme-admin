<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // check if the table is empty
        if (Category::count() > 0) {   
            return;
        }
        
        $categories = [
            ['name' => 'Изгубен'],
            ['name' => 'Намерен'],
            ['name' => 'Подарявам'],
            ['name' => 'За осиновяване'],
        ];

        // create the fixed categories
        Category::factory()->createMany($categories);
    }
}
