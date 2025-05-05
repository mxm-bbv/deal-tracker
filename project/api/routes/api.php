<?php

use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\DealController;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

Route::middleware('accept.json')
    ->prefix('v1')
    ->name('api.')
    ->group(function () {
        Route::get('/', [ApiController::class, 'status'])->name('status');

        Route::prefix('deals')
            ->name('deals.')
            ->group(function () {
                Route::get('', [DealController::class, 'index'])->name('index');
                Route::post('', [DealController::class, 'store'])->name('store');
            });
        Route::prefix('cities')
            ->name('cities.')
            ->group(function () {
                Route::get('', [CityController::class, 'index'])->name('index');
            });
    });
