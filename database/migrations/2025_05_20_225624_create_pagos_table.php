<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cliente_id')->nullable()->constrained('users')->nullOnDelete();

            $table->decimal('monto_total', 10, 2);

            // $table->foreignId('metodo_pago_id')->constrained('metodo_pago');

            $table->dateTime('fecha_pago');

            $table->text('observaciones')->nullable();

            $table->timestamps();

            $table->index('cliente_id');
            // $table->index('metodo_pago_id');
            $table->index('fecha_pago');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};

