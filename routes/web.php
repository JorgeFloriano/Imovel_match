<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ClientPropertyController;
use App\Http\Controllers\NotifyController;
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

    Route::get('notify', [NotifyController::class, 'index'])->name('notify');

    Route::post('/notify/{client}/generate-marketing-text', [NotifyController::class, 'generateMarketingText'])
        ->name('notify.generate-marketing-text')
        ->middleware('can:show,client');

    Route::post('/notify/{client}/{property}/generate-property-marketing-text', [NotifyController::class, 'generatePropertyMarketingText'])
        ->name('notify.generate-property-marketing-text')
        ->middleware('can:show,client')
        ->middleware('can:show,property');

    Route::get('notify/{property}/property', [NotifyController::class, 'property'])
        ->name('notify.property')
        ->middleware('can:show,property');

    Route::post('/clients/{client}/generate-update-link', [ClientController::class, 'generateTemporaryLink']);
});


Route::get('/clients/{encryptedId}/self-edit', [ClientController::class, 'selfEdit'])
    ->name('clients.clients-self-edit')
    ->middleware('signed'); // This validates the signature and expiration automatically
Route::post('/clients/{encryptedId}/self-update', [ClientController::class, 'selfUpdate'])
    ->name('clients.clients-self-update');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
