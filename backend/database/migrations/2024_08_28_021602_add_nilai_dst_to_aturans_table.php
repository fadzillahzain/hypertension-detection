<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('aturans', function (Blueprint $table) {
            $table->string('nilai_dst')->default("[]");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('aturans', function (Blueprint $table) {
            $table->dropColumn('nilai_dst');
        });
    }
};
