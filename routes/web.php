<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\PropertyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['web', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');})->name('dashboard');

    Route::resource('/clients', ClientController::class);
    Route::get('/clients/{client}/properties', [ClientController::class, 'properties'])->name('clients.properties');
    Route::get('/clients/{client}/{property}/property', [ClientController::class, 'property'])->name('clients.property');

    Route::resource('/properties', PropertyController::class);

    Route::get('match', function () {
        return Inertia::render('match');})->name('match');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
