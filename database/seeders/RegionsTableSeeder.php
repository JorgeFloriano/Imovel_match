<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegionsTableSeeder extends Seeder
{
    public function run(): void
    {
        // Dados das regiões de Sorocaba
        $regions = [
            ['name' => 'Região Central'],
            ['name' => 'Zona Norte'],
            ['name' => 'Zona Sul'],
            ['name' => 'Zona Leste'],
            ['name' => 'Zona Oeste'],
        ];

        // Inserir os dados na tabela `regions`
        DB::table('regions')->insert($regions);
    }
}