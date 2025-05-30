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
        Schema::create('citas', function (Blueprint $table) {
            $table->id();

            // Relaciones
            $table->foreignId('cliente_id')->constrained('users');
            $table->foreignId('responsable_id')->constrained('users');
            $table->foreignId('tratamiento_id')->constrained('tratamientos');

            // Datos clave
            $table->dateTime('fecha_inicio');
            $table->decimal('costo_sesion_especial', 10, 2); // por sesión
            $table->integer('sesiones');
            $table->integer('frecuencia_dias');

            // Estado y control
            $table->string('estado')->default('programada'); // "programada", "finalizada", "cancelada", etc.
            $table->text('observaciones')->nullable();

            // Cálculo importante para reportes
            $table->decimal('costo_total_especial', 10, 2);

            $table->timestamps();

            // Índices recomendados para rendimiento en filtros
            $table->index('tratamiento_id');
            $table->index('cliente_id');
            $table->index('created_at'); // Para filtros por fecha de agendamiento
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};
