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
        Schema::create('tratamientos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre', 255)->index();
            $table->text('descripcion')->nullable();
            $table->integer('sesiones_base');
            $table->decimal('costo_sesion_base', 10, 2);
            $table->decimal('costo_total_base', 10, 2);
            $table->boolean('activo')->default(true);
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tratamientos');
    }
};
