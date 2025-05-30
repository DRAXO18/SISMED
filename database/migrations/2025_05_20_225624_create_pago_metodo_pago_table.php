<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pago_metodo_pago', function (Blueprint $table) {
            $table->id();

            $table->foreignId('pago_id')->constrained('pagos')->onDelete('cascade');

            $table->foreignId('metodo_pago_id')->constrained('metodo_pago');

            $table->decimal('monto', 10, 2);

            $table->timestamps();

            $table->index('pago_id');
            $table->index('metodo_pago_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pago_metodo_pago');
    }
};
