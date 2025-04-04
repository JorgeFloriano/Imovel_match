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
            $table->string('name')->default('Sem nome');
            $table->string('phone')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('address')->nullable();
            $table->enum('marital_status', ['solteiro', 'casado', 'viúvo', 'divorciado'])->nullable();
            $table->boolean('need_financing')->default(true);
            $table->integer('dependents')->default(0);
            $table->string('profession')->default('autônomo');
            $table->integer('revenue')->default(0);
            $table->integer('capital')->default(0);
            $table->integer('fgts')->nullable()->default(0);
            $table->boolean('has_property')->default(false);
            $table->integer('compromised_income')->nullable()->default(0);
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
