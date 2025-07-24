<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserLikedSignal;

class UserLikedSignalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // check if the table is empty
        if (UserLikedSignal::count() > 0) {
            return;
        }

        $likedSignals = [
            ['user_id' => 2, 'signal_id' => 1],
            ['user_id' => 2, 'signal_id' => 3],
        ];

        // add the liked signals
        UserLikedSignal::factory()->createMany($likedSignals);
    }
}
