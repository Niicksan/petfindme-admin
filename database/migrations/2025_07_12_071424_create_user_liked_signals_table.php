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
        Schema::create('user_liked_signals', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('signal_id');
            $table->timestamps();

            $table->primary(['user_id', 'signal_id']);
            $table->unique(['user_id', 'signal_id']);
            $table->index(['user_id', 'signal_id']);

            // Foreign key constraints
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('signal_id')
                ->references('id')->on('signals')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_liked_signals', function (Blueprint $table) {
            // Drop foreign key constraints
            $table->dropForeign(['user_id']);
            $table->dropForeign(['signal_id']);
        });

        Schema::dropIfExists('user_liked_signals');
    }
};
