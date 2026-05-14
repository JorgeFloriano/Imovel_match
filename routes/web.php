<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ClientPropertyController;
use App\Http\Controllers\NotifyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (\Illuminate\Http\Request $request) {
    $query = \App\Models\Property::withoutGlobalScope('user')
        ->with(['district', 'region']);

    if ($request->filled('region') && $request->region !== 'all') {
        $query->where('region_id', $request->region);
    }

    if ($request->filled('type') && $request->type !== 'all') {
        $type = $request->type;
        if ($type === '1') {
            $query->whereIn(\Illuminate\Support\Facades\DB::raw('LOWER(type)'), ['apartamento', 'apart. c/ elevad.']);
        } elseif ($type === '2') {
            $query->whereIn(\Illuminate\Support\Facades\DB::raw('LOWER(type)'), ['casa', 'casa (condom.)', 'sobrado']);
        } elseif ($type === '3') {
            $query->whereNotIn(\Illuminate\Support\Facades\DB::raw('LOWER(type)'), ['apartamento', 'apart. c/ elevad.', 'casa', 'casa (condom.)', 'sobrado']);
        }
    }

    return Inertia::render('welcome', [
        'properties' => $query->latest()->paginate(8)->withQueryString(),
        'regions' => \App\Models\Region::all(),
        'filters' => $request->only(['region', 'type'])
    ]);
})->name('home');

Route::middleware(['auth', 'web', 'verified'])->group(function () {
    Route::get('dashboard', [ClientPropertyController::class, 'index'])->name('dashboard');
    Route::post('dashboard', [ClientPropertyController::class, 'filter'])->name('dashboard.filter');
    Route::get('dashboard/{client}/{property}/details', [ClientPropertyController::class, 'details'])
        ->name('dashboard.details')
        ->middleware('can:show,client')
        ->middleware('can:show,property');

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
        ->name('notify.property')
        ->middleware('can:show,property');

    Route::post('/clients/{client}/generate-update-link', [ClientController::class, 'generateTemporaryLink']);
    Route::post('/notify/batch-contacted', [NotifyController::class, 'batchContacted'])->name('notify.batch-contacted');
});


Route::get('/clients/{encryptedId}/self-edit', [ClientController::class, 'selfEdit'])
    ->name('clients.clients-self-edit')
    ->middleware('signed'); // This validates the signature and expiration automatically
Route::post('/clients/{encryptedId}/self-update', [ClientController::class, 'selfUpdate'])
    ->name('clients.clients-self-update');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
