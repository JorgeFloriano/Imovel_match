<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ClientPropertyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'web', 'verified'])->group(function () {
    Route::get('dashboard', [ClientPropertyController::class, 'index'])->name('dashboard');
    Route::post('dashboard', [ClientPropertyController::class, 'filter'])->name('dashboard.filter');
    Route::get('dashboard/{client}/{property}/details', [ClientPropertyController::class, 'details'])
    ->name('dashboard.details')
    ->middleware('can:show,client')
    ->middleware('can:show,property');

    Route::resource('/clients', ClientController::class);
    Route::get('/clients/{client}/properties', [ClientController::class, 'properties'])
    ->name('clients.properties')
    ->middleware('can:show,client');
    
    Route::resource('/properties', PropertyController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
