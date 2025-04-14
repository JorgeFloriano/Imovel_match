<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class DistrictsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $districts = [
            [1, 1, 'Vila Leão', NULL, NULL],
            [2, 1, 'Vila Angélica', NULL, NULL],
            [3, 1, 'Vila Fiore', NULL, NULL],
            [4, 1, 'Maria do Carmo', NULL, NULL],
            [5, 1, 'Mineirão', NULL, NULL],
            [6, 1, 'Nova Sorocaba', NULL, NULL],
            [7, 1, 'Centro', NULL, NULL],
            [8, 2, 'Vila Helena', NULL, NULL],
            [9, 2, 'São Bento', NULL, NULL],
            [10, 2, 'São Guilherme', NULL, NULL],
            [11, 2, 'Maria Eugênia', NULL, NULL],
            [12, 2, 'Lopes de Oliveira', NULL, NULL],
            [13, 2, 'Vitória Régia', NULL, NULL],
            [14, 2, 'Ulisses Guimarães', NULL, NULL],
            [15, 2, 'Paineiras', NULL, NULL],
            [16, 2, 'Laranjeiras', NULL, NULL],
            [17, 2, 'Habiteto', NULL, NULL],
            [18, 3, 'Barcelona', NULL, NULL],
            [19, 3, 'Escola', NULL, NULL],
            [20, 3, 'Vila Haro', NULL, NULL],
            [21, 3, 'Vila Santana', NULL, NULL],
            [22, 3, 'Vila Hortência', NULL, NULL],
            [23, 4, 'Aparecidinha', NULL, NULL],
            [24, 4, 'Sabiá', NULL, NULL],
            [25, 4, 'Éden', NULL, NULL],
            [26, 4, 'Cajuru', NULL, NULL],
            [27, 4, 'Brig. Tobias', NULL, NULL],
            [28, 5, 'Márcia Mendes', NULL, NULL],
            [29, 5, 'Jd. Simus', NULL, NULL],
            [30, 5, 'Sorocaba 01', NULL, NULL],
            [31, 5, 'Wanel Ville', NULL, NULL],
            [32, 5, 'Cerrado', NULL, NULL],
            [33, 5, 'Nova Esperança', NULL, NULL],
            [34, 5, 'Vila Barão', NULL, NULL],
        ];

        foreach ($districts as $district) {
            DB::table('districts')->insert([
                'id' => $district[0],
                'region_id' => $district[1],
                'name' => $district[2],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}