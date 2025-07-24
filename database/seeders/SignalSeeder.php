<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Signal;

class SignalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // check if the table is empty
        if (Signal::count() > 0) {
            return;
        }

        // Create signals
        Signal::factory()->create([
            'user_id' => 2,
            'title' => 'Изгубено коте',
            'category_id' => 1,
            'city_id' => 30,
            'geolocation' => [
                'latitude' => 42.943606489472366,
                'longitude' => 25.290527343750004
            ],
            'contact_name' => 'ник',
            'phone' => '0897887654',
            'description' => 'изгубено е коте в района на гарат',
            'status_id' => 2,
            'archived_at' => null,
            'created_at' => '2024-05-15 06:04:28',
            'updated_at' => '2024-08-31 14:24:35',
        ]);

        Signal::factory()->create([
            'user_id' => 2,
            'title' => 'Изгубено куче',
            'category_id' => 1,
            'city_id' => 41,
            'geolocation' => [
                'latitude' => 43.12028198556927,
                'longitude' => 27.905273437500004
            ],
            'contact_name' => 'ник',
            'phone' => '0897654321',
            'description' => 'Изгубено е млако куче на крайбрежната.',
            'status_id' => 2,
            'archived_at' => null,
            'created_at' => '2024-05-15 06:06:11',
            'updated_at' => '2024-08-31 14:24:26',
        ]);

        Signal::factory()->create([
            'user_id' => 2,
            'title' => 'Нмаерен е лабрадор',
            'category_id' => 2,
            'city_id' => 1,
            'geolocation' => [
                'latitude' => 43.0721482001326,
                'longitude' => 24.532470703125004
            ],
            'contact_name' => 'ник',
            'phone' => '0899876543',
            'description' => 'Нмаерен е лабрадор на около годинка.',
            'status_id' => 2,
            'archived_at' => null,
            'created_at' => '2024-05-15 06:07:36',
            'updated_at' => '2024-08-31 14:32:33',
        ]);

        Signal::factory()->create([
            'user_id' => 2,
            'title' => 'Изгубен самоет',
            'category_id' => 1,
            'city_id' => 3,
            'geolocation' => [
                'latitude' => 42.876467293660184,
                'longitude' => 25.24658203125
            ],
            'contact_name' => 'Ива',
            'phone' => '0898989898',
            'description' => 'Изгубен е самоет на центъра на главната.',
            'status_id' => 2,
            'archived_at' => null,
            'created_at' => '2024-08-31 12:54:02',
            'updated_at' => '2024-08-31 12:54:02',
        ]);
    }
}
