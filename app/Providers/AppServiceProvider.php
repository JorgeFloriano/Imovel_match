<?php

namespace App\Providers;

use App\Models\Client;
use App\Models\Property;
use App\Policies\ClientPolicy;
use App\Policies\PropertyPolicy;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */

    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Client::class, ClientPolicy::class);
        Gate::policy(Property::class, PropertyPolicy::class);

        Route::bind('client', function ($value) {
            return Client::where('id', $value)
                ->where('user_id', Auth::id())
                ->firstOrFail();
        });

        Route::bind('property', function ($value) {
            return Property::where('id', $value)
                ->where('user_id', Auth::id())
                ->firstOrFail();
        });
    }
}
