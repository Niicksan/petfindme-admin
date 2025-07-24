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
        Schema::create('signal_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('signal_id')->nullable();
            $table->string('path')->unique()->nullable();
            $table->integer('size')->nullable();
            $table->softDeletes();
            $table->timestamps();

            // Foreign key constraints
            $table->index('path');
            $table->index('signal_id');
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
        Schema::table('signal_images', function (Blueprint $table) {
            // Drop foreign key constraints
            $table->dropForeign(['signal_id']);
        });

        Schema::dropIfExists('signal_images');
    }
};
