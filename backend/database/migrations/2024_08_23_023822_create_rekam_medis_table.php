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
        Schema::create('rekam_medis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::create('rekam_gejalas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('rekamMedis_id');
            $table->unsignedBigInteger('gejala_id');
            $table->timestamps();

            $table->foreign('rekamMedis_id')->references('id')->on('rekam_medis');
            $table->foreign('gejala_id')->references('id')->on('gejalas');

        });
        
        Schema::create('rekam_penyakits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('rekamMedis_id');
            $table->unsignedBigInteger('penyakit_id');
            $table->float('nilai');
            $table->timestamps();

            $table->foreign('rekamMedis_id')->references('id')->on('rekam_medis');
            $table->foreign('penyakit_id')->references('id')->on('penyakits');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekam_medis');
        Schema::dropIfExists('rekam_gejala');
        Schema::dropIfExists('rekam_penyakit');
    }
};
