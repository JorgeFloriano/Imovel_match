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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('wishe_id')->constrained()->nullable();
            $table->string('name')->default('Sem nome');
            $table->string('phone')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('address')->nullable();
            $table->enum('marital_status', ['solteiro', 'casado', 'viúvo', 'divorciado'])->nullable();
            $table->boolean('need_financing');
            $table->integer('dependents');
            $table->string('profession');
            $table->integer('revenue');
            $table->integer('capital');
            $table->integer('fgts')->nullable();
            $table->boolean('has_property');
            $table->integer('compromised_income')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
