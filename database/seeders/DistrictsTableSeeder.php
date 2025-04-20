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
            [
                [1, 4, 'Além Ponte', NULL, NULL],
                [2, 4, 'Alto da Boa Vista', NULL, NULL],
                [3, 4, 'Aparecidinha', NULL, NULL],
                [4, 3, 'Barcelona', NULL, NULL],
                [5, 4, 'Brig. Tobias', NULL, NULL],
                [6, 3, 'Campolim', NULL, NULL],
                [7, 4, 'Cajuru', NULL, NULL],
                [8, 1, 'Centro', NULL, NULL],
                [9, 5, 'Cerrado', NULL, NULL],
                [10, 5, 'Chác. Reunidas S. Jorge', NULL, NULL],
                [11, 4, 'Éden', NULL, NULL],
                [12, 3, 'Escola', NULL, NULL],
                [13, 2, 'Habiteto', NULL, NULL],
                [14, 2, 'Horto Florestal', NULL, NULL],
                [15, 5, 'Jd. Aeroporto', NULL, NULL],
                [16, 5, 'Jd. Costa Dias', NULL, NULL],
                [17, 4, 'Jd. Gonçalves', NULL, NULL],
                [18, 4, 'Jd. Gutierres', NULL, NULL],
                [19, 4, 'Jd. Ibiti', NULL, NULL],
                [20, 3, 'Jd. Europa', NULL, NULL],
                [21, 3, 'Jd. Pagliato', NULL, NULL],
                [22, 3, 'Jd. São Carlos', NULL, NULL],
                [23, 5, 'Jd. Simus', NULL, NULL],
                [24, 1, 'Jd. Paulistano', NULL, NULL],
                [25, 5, 'Júlio de Mesquita', NULL, NULL],
                [26, 2, 'Laranjeiras', NULL, NULL],
                [27, 2, 'Lopes de Oliveira', NULL, NULL],
                [28, 2, 'Maria Eugênia', NULL, NULL],
                [29, 1, 'Maria do Carmo', NULL, NULL],
                [30, 5, 'Márcia Mendes', NULL, NULL],
                [31, 1, 'Mineirão', NULL, NULL],
                [32, 1, 'Nova Sorocaba', NULL, NULL],
                [33, 5, 'Nova Esperança', NULL, NULL],
                [34, 2, 'Paineiras', NULL, NULL],
                [35, 5, 'Piazza di Roma', NULL, NULL],
                [36, 6, 'Rio Acima', NULL, NULL],
                [37, 4, 'Sabiá', NULL, NULL],
                [38, 2, 'São Bento', NULL, NULL],
                [39, 2, 'São Guilherme', NULL, NULL],
                [40, 5, 'Sorocaba 01', NULL, NULL],
                [41, 2, 'Ulisses Guimarães', NULL, NULL],
                [42, 5, 'Unidos São Jorge', NULL, NULL],
                [43, 4, 'Vila Assis', NULL, NULL],
                [44, 5, 'Vila Barão', NULL, NULL],
                [45, 1, 'Vila Carvalho', NULL, NULL],
                [46, 5, 'Vila Dominguinho', NULL, NULL],
                [47, 1, 'Vila Fiore', NULL, NULL],
                [48, 5, 'Vila Esp. Santo', NULL, NULL],
                [49, 5, 'Vila Godoy', NULL, NULL],
                [50, 3, 'Vila Haro', NULL, NULL],
                [51, 2, 'Vila Helena', NULL, NULL],
                [52, 1, 'Vila Leão', NULL, NULL],
                [53, 5, 'Vila Lucy', NULL, NULL],
                [54, 3, 'Vila Hortência', NULL, NULL],
                [55, 1, 'Vila Angélica', NULL, NULL],
                [56, 3, 'Vila Santana', NULL, NULL],
                [57, 5, 'Vila Rica', NULL, NULL],
                [58, 2, 'Vila Bom Jesus', NULL, NULL],
                [59, 5, 'Vivendas do Lago', NULL, NULL],
                [60, 5, 'Wanel Ville', NULL, NULL],
                [61, 2, 'Vitória Régia', NULL, NULL]
            ]
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
