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
        Schema::create('wishes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained();
            $table->foreignId('region_id')->constrained()->nullable();
            $table->enum('type', ['casa', 'casa (condom.)', 'sobrado', 'apartamento', 'apart. c/ elevad.', 'terreno', 'loja', 'garagem', 'sala', 'outros'])->nullable();
            $table->tinyInteger('rooms')->nullable();
            $table->tinyInteger('bathrooms')->nullable();
            $table->tinyInteger('suites')->nullable();
            $table->tinyInteger('garages')->nullable();
            $table->date('delivery_key')->nullable();
            $table->integer('min_act')->nullable();
            $table->integer('building_area')->nullable();
            $table->boolean('installment_payment')->nullable(); // entrada parcelada
            $table->enum('air_conditioning', [
                'incluso',
                'somente infra',
                'não incluso'
            ])->nullable();
            $table->boolean('garden')->nullable();
            $table->boolean('pool')->nullable();
            $table->boolean('balcony')->nullable(); // varanda
            $table->boolean('acept_pets')->nullable();
            $table->boolean('acessibility')->nullable();
            $table->text('obs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishes');
    }
};
