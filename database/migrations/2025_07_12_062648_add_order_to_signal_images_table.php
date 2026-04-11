<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /** Laravel default name for index(['signal_id', 'order']) (hasIndex column-array match is unreliable on MySQL). */
    private const SIGNAL_ID_ORDER_INDEX = 'signal_images_signal_id_order_index';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('signal_images', 'order')) {
            Schema::table('signal_images', function (Blueprint $table) {
                $table->integer('order')->default(0)->after('size');
            });
        }

        if (! Schema::hasIndex('signal_images', self::SIGNAL_ID_ORDER_INDEX)) {
            Schema::table('signal_images', function (Blueprint $table) {
                $table->index(['signal_id', 'order']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasIndex('signal_images', self::SIGNAL_ID_ORDER_INDEX)) {
            Schema::table('signal_images', function (Blueprint $table) {
                $table->dropIndex(self::SIGNAL_ID_ORDER_INDEX);
            });
        }

        if (Schema::hasColumn('signal_images', 'order')) {
            Schema::table('signal_images', function (Blueprint $table) {
                $table->dropColumn('order');
            });
        }
    }
};
