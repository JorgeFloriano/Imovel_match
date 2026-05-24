<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ClientPropertyController;
use App\Http\Controllers\NotifyController;
use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [SiteController::class, 'welcome'])->name('home');
Route::get('/sobre-nos', [SiteController::class, 'about'])->name('public.about');
Route::get('/imoveis', [SiteController::class, 'properties'])->name('public.properties');
Route::get('/imovel/{property}', [SiteController::class, 'showProperty'])->name('public.property.show');

Route::middleware(['auth', 'web', 'verified'])->group(function () {
    Route::get('dashboard', [ClientPropertyController::class, 'index'])->name('dashboard');
    Route::post('dashboard', [ClientPropertyController::class, 'filter'])->name('dashboard.filter');
    Route::get('dashboard/{client}/{property}/details', [ClientPropertyController::class, 'details'])
        ->name('dashboard.details')
        ->middleware('can:show,client');

    Route::resource('/clients', ClientController::class);
    Route::patch('/clients/{client}/temperature', [ClientController::class, 'updateTemperature'])
        ->name('clients.temperature')
        ->middleware('can:edit,client');
    Route::patch('/clients/{client}/contacted', [ClientController::class, 'updateLastContact'])
        ->name('clients.contacted')
        ->middleware('can:edit,client');
    Route::get('/clients/{client}/properties', [ClientController::class, 'properties'])
        ->name('clients.properties')
        ->middleware('can:show,client');

    Route::resource('/properties', PropertyController::class);

    Route::get('notify', [NotifyController::class, 'index'])->name('notify');

    Route::get('notify/{property}/property', [NotifyController::class, 'property'])
        ->name('notify.property');

    Route::post('/clients/{client}/generate-update-link', [ClientController::class, 'generateTemporaryLink']);
    Route::post('/notify/batch-contacted', [NotifyController::class, 'batchContacted'])->name('notify.batch-contacted');
    Route::post('/notify/batch-destroy', [NotifyController::class, 'batchDestroy'])->name('notify.batch-destroy');
});


Route::get('/clients/{encryptedId}/self-edit', [ClientController::class, 'selfEdit'])
    ->name('clients.clients-self-edit')
    ->middleware('signed'); // This validates the signature and expiration automatically
Route::post('/clients/{encryptedId}/self-update', [ClientController::class, 'selfUpdate'])
    ->name('clients.clients-self-update');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
