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
		if (! Schema::hasColumn('contacts', 'opened_at')) {
			Schema::table('contacts', function (Blueprint $table) {
				$table->timestamp('opened_at')->nullable()->after('updated_at');
			});
		}
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		if (Schema::hasColumn('contacts', 'opened_at')) {
			Schema::table('contacts', function (Blueprint $table) {
				$table->dropColumn('opened_at');
			});
		}
	}
};

