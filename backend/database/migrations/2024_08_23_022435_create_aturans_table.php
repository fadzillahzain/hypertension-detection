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
        Schema::create('aturans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('penyakit_id');
            $table->unsignedBigInteger('gejala_id');
            $table->float('nilai');   
            $table->timestamps();

            // $table->foreign('penyakit_id')->references('id')->on('penyakits');
            // $table->foreign('gejala_id')->references('id')->on('gejalas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aturans');
    }
};
