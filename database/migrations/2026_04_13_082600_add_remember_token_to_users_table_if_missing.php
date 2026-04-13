<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * Legacy databases may lack remember_token even though Laravel's default
     * users migration includes it; password reset updates this column.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'remember_token')) {
            Schema::table('users', function (Blueprint $table) {
                $table->rememberToken()->after('password');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * Drops the column only when present. If your database already had
     * remember_token from 0001_01_01_000000_create_users_table and this
     * migration’s up() was a no-op, rolling back still removes the column;
     * run php artisan migrate again to match the base schema.
     */
    public function down(): void
    {
        if (Schema::hasColumn('users', 'remember_token')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('remember_token');
            });
        }
    }
};
