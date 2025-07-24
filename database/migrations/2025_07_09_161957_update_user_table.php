<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // 1. Create new columns
            $table->bigInteger('role_id')->nullable()->unsigned()->default(2)->after('id');
            $table->boolean('is_active')->default(0)->after('role_id');

            // 2. Create foreign key constraints
            $table->foreign('role_id')
                ->references('id')
                ->on('roles')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // 1. Drop foreign key constraints
            $table->dropForeign(['role_id']);

            // 2. Drop the columns
            $table->dropColumn('role_id');
            $table->dropColumn('is_active');
        });
    }
};
