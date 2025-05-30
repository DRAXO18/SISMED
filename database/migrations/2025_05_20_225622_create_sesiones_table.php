<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sesiones', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cita_id')->constrained('citas')->onDelete('cascade');

            $table->unsignedInteger('numero_sesion');

            $table->dateTime('fecha_programada');
            $table->dateTime('fecha_real')->nullable();

            $table->foreignId('estado_pago_id')->constrained('estado_pago_sesion');
            $table->foreignId('estado_presencia_id')->constrained('estado_presencia_sesion');

            $table->text('observaciones')->nullable();

            $table->timestamps();

            $table->index('cita_id');
            $table->index('estado_pago_id');
            $table->index('estado_presencia_id');
            $table->index('fecha_programada');

            // Unicidad: no puede haber dos sesiones con el mismo número para una misma cita
            $table->unique(['cita_id', 'numero_sesion']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sesiones');
    }
};

