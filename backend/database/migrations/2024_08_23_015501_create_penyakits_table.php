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
        Schema::create('penyakits', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->string('name');
            $table->text('deskripsi');
            $table->text('solusi');
            $table->timestamps();
        });

        // Schema::create('solusis', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedBigInteger('penyakit_id');
        //     $table->string('name');
        //     $table->timestamps();

        //     $table->foreign('penyakit_id')->references('id')->on('penyakits');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penyakits');
        // Schema::dropIfExists('solusi');
    }
};
