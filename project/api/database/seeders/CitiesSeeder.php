<?php

namespace Database\Seeders;

use App\Models\Cities;
use Illuminate\Database\Seeder;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            'Актау', 'Актобе', 'Алмата', 'Астана', 'Атырау', 'Жанаозен',
            'Жезказган', 'Кульсары', 'Кызылорда', 'Оскемен', 'Семей',
            'Талдыкорган', 'Тараз', 'Туркестан', 'Уральск', 'Шу', 'Шымкент',
        ];

        array_map(fn($city) => Cities::create(['name' => $city]), $cities);
    }
}
