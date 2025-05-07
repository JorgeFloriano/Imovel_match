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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('contact_name')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('contact_link')->nullable();
            $table->foreignId('district_id')->nullable()->constrained();
            $table->foreignId('region_id')->nullable()->constrained();
            $table->enum('type', [
                'casa',
                'casa (condom.)',
                'sobrado',
                'apartamento',
                'apart. c/ elevad.',
                'terreno',
                'loja',
                'garagem',
                'sala',
                'outros'
            ])->nullable();
            $table->integer('iptu')->nullable();
            $table->string('description')->nullable();
            $table->integer('price')->nullable();
            $table->float('land_area')->nullable();
            $table->float('building_area')->nullable();
            $table->string('image')->nullable();
            $table->string('address')->nullable();
            $table->tinyInteger('rooms')->nullable();
            $table->tinyInteger('bathrooms')->nullable();
            $table->tinyInteger('suites')->nullable();
            $table->tinyInteger('garages')->nullable();
            $table->tinyInteger('floor')->nullable();
            $table->tinyInteger('building_floors')->nullable();
            $table->tinyInteger('property_floors')->nullable();
            $table->date('delivery_key')->nullable();
            $table->integer('min_act')->nullable();
            // entrada parcelada
            $table->boolean('installment_payment')->nullable();
            $table->boolean('incc_financing')->nullable();
            $table->boolean('documents')->nullable();
            $table->string('finsh_type')->nullable();
            $table->enum('air_conditioning', [
                'incluso',
                'somente infra',
                'não incluso',
            ])->nullable();
            $table->boolean('garden')->nullable();
            $table->boolean('pool')->nullable();
            $table->boolean('balcony')->nullable(); // varanda
            $table->boolean('acept_pets')->nullable();
            $table->boolean('acessibility')->nullable();
            $table->string('obs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
