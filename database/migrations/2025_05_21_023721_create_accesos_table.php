<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccesosTable extends Migration
{
    public function up(): void
    {
        Schema::create('accesos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->enum('tipo', ['acceso', 'subacceso'])->default('acceso');
            $table->unsignedBigInteger('padre_id')->default(0);
            $table->string('permiso')->nullable();
            $table->timestamps();

            $table->foreign('padre_id')->references('id')->on('accesos')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accesos');
    }
}
