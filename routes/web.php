<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ClientPropertyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['web', 'verified'])->group(function () {
    Route::get('dashboard', [ClientPropertyController::class, 'index'])->name('dashboard');
    Route::post('dashboard', [ClientPropertyController::class, 'filter'])->name('dashboard.filter');
    Route::get('dashboard/{client}/{property}/details', [ClientPropertyController::class, 'details'])->name('dashboard.details');

    
    Route::resource('/clients', ClientController::class);
    
    Route::resource('/properties', PropertyController::class);
    Route::get('/clients/{client}/properties', [ClientController::class, 'properties'])->name('clients.properties');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
