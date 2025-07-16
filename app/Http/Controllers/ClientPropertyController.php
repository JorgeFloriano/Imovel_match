<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Class\Compatible;
use App\Http\Requests\FilterRequest;
use App\Models\Property;
use Illuminate\Support\Facades\Gate;

class ClientPropertyController extends Controller
{
    public function index()
    {
        if (session('compatibleObjects')) {
            redirect()->route('dashboard.filter');
        }

        // Get clients with their wishes and wish regions
        $clients = Client::where('user_id', Auth::id())
            ->with(['wishe' => function ($query) {
                $query->select('id', 'client_id', 'type', 'delivery_key', 'building_area', 'rooms', 'suites', 'garages', 'balcony', 'bathrooms', 'air_conditioning', 'garden', 'pool', 'acept_pets', 'acessibility', 'installment_payment', 'min_act')
                    ->with(['regions' => function ($q) {
                        $q->select('regions.id', 'regions.name');
                    }]);
            }])
            ->select('id', 'name', 'revenue')
            ->get();

        // Get properties with regions
        $properties = Property::where('user_id', Auth::id())
            ->with(['region'])
            ->select('id', 'description', 'price', 'type', 'delivery_key', 'building_area', 'rooms', 'suites', 'garages', 'balcony', 'region_id', 'bathrooms', 'air_conditioning', 'garden', 'pool', 'acept_pets', 'acessibility', 'installment_payment', 'min_act')
            ->get();

        // Create and sort compatible objects
        $allCompatibleObjects = collect($clients->flatMap(function ($client) use ($properties) {
            return $properties->map(function ($property) use ($client) {
                $compatible = new Compatible($client, $property);

                // Calculate compatibility points if not done in constructor
                if (!isset($compatible->pts)) {
                    $compatible->pts = $compatible->calculateCompatibility($client, $property);
                }

                return $compatible;
            });
        }))
            ->sortBy([ // Multi-level sorting
                ['pts', 'desc'], // Primary sort by pts descending
                ['client.name', 'asc'] // Secondary sort by client name ascending
            ]);

        // Store the FULL sorted collection in the session
        session()->put('compatibleObjects', $allCompatibleObjects);

        // 2. Take only the first 30 results for further use
        $compatibleObjects = $allCompatibleObjects
            ->take(30) // Take only the first 30 results
            ->values(); // Reset array keys

        $comp = new Compatible();
        return Inertia::render('dashboard', $comp->dashboardData($compatibleObjects));
    }

    public function filter(FilterRequest $request)
    {
        $request->validated();
        //if client_id or property_id is 0/empty/null desconsider $request->show and , show 200 results
        $n_displayed = (($request->client_id ?? '0') != '0' || ($request->property_id ?? '0') != '0')
            ? 200
            : $request->show;

        $compatibleObjects = session('compatibleObjects')
            ->sortBy([ // Multi-level sorting
                ['pts', 'desc'], // Primary sort by pts descending
                ['client.name', 'asc'] // Secondary sort by client name ascending
            ])
            // Optional search by client name (commented out)
            //->when($request->search, function ($collection) use ($request) {
            //    return $collection->where('client.name', 'like', '%' . $request->search . '%');
            //})
            ->when($request->client_id, function ($collection) use ($request) {
                return $collection->where('client.id', $request->client_id);
            })
            ->when($request->property_id, function ($collection) use ($request) {
                return $collection->where('property.id', $request->property_id);
            })
            ->take($n_displayed) // Take predetermined results
            ->values(); // Reset array keys

        $comp = new Compatible();
        return Inertia::render('dashboard', $comp->dashboardData($compatibleObjects));
    }

    public function details(Client $client, Property $property)
    {
        Gate::authorize('show', $client);
        Gate::authorize('show', $property);
    
        $comp = new Compatible();
        return Inertia::render('clients/client-property', $comp->detailsData($client, $property));
    }
}
