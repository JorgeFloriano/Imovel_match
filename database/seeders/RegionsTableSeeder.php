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
            ['name' => 'Região do Éden'],
            ['name' => 'Região do Wanel Ville'],
            ['name' => 'Região do Parque Campolim'],
            ['name' => 'Região do Itavuvu'],
            ['name' => 'Região do Cajuru'],
        ];

        // Inserir os dados na tabela `regions`
        DB::table('regions')->insert($regions);
    }
}