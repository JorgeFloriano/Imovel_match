<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('clients', function () {
        return Inertia::render('clients');
    })->name('clients');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('properties', function () {
        return Inertia::render('properties');
    })->name('properties');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
