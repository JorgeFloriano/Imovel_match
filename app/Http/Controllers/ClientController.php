<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\Region;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Class\Compatible;
use App\Models\Property;

class ClientController extends Controller
{
    public $client;
    public function __construct()
    {
        $this->client = new Client();
    }
    public function index()
    {
        return Inertia::render('clients/clients-index', [
            'clients' => Client::with(['wishe.regions'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('clients/clients-create', [
            'maritalStatusOptions' => $this->client->maritalStatOpt(),
            'booleanOptions' => $this->client->boolOpt(),
            'regionOptions' => Region::orderBy('name')->get()->map(fn($region) => [
                'value' => $region->id,
                'label' => $region->name,
            ])->all(),
        ]);
    }

    public function store(ClientRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        // Create client with user_id and all validated client data
        $client = Client::create($validated);

        // Extract wish data from validated input
        $wishFields = [
            'region_id',
            'type',
            'rooms',
            'bathrooms',
            'suites',
            'garages',
            'delivery_key',
            'building_area',
            'installment_payment',
            'air_conditioning',
            'garden',
            'pool',
            'balcony',
            'acept_pets',
            'acessibility',
            'obs',
        ];

        $wishData = array_merge(
            array_intersect_key($validated, array_flip($wishFields)),
        );

        // Create associated wish
        $wish = $client->wishe()->create($wishData);

        // Attach selected regions if they exist
        if ($request->has('selected_regions')) {
            $wish->regions()->attach($request->input('selected_regions'));
        }

        return to_route('clients.index')->with('success', 'Client created successfully');
    }

    public function show(Client $client)
    {
        // foreach ($client->wishe->regions()->get() as $key => $region) {
        //     echo $region->name . '<br>';   
        // }
        
        //dd($client->wishe->regions()->get()[1]->id);
        //dd($client->wishe->regions()->get());

        return Inertia::render('clients/clients-show', [
            'client' => $client->load('wishe.regions'),
            'maritalStatusOptions' => $this->client->maritalStatOpt(),
            'booleanOptions' => $this->client->boolOpt(),
        ]);
    }

    public function edit(Client $client)
    {
        return Inertia::render('clients/clients-edit', [
            'client' => $client->load('wishe'),
            'maritalStatusOptions' => $this->client->maritalStatOpt(),
            'booleanOptions' => $this->client->boolOpt(),
            'regionOptions' => Region::orderBy('name')->get()->map(fn($region) => [
                'value' => $region->id,
                'label' => $region->name,
            ])->all(),
        ]);
    }

    public function update(ClientRequest $request, Client $client): RedirectResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        // Update client with validated data
        $client->update($validated);

        // Define wish fields and update/create
        $wishFields = [
            'region_id',
            'type',
            'rooms',
            'bathrooms',
            'suites',
            'garages',
            'delivery_key',
            'building_area',
            'installment_payment',
            'air_conditioning',
            'garden',
            'pool',
            'balcony',
            'acept_pets',
            'acessibility',
            'obs',
            'air_conditioning',
        ];

        $wishData = array_merge(
            array_intersect_key($validated, array_flip($wishFields)),
        );

        $client->wishe()->updateOrCreate([], $wishData);

        return back()->with('success', 'Client updated successfully');
    }
    public function destroy(Client $client): RedirectResponse
    {
        // Delete the associated wish first
        if ($client->wishe) {
            $client->wishe()->delete();
        }

        // Then delete the client
        $client->delete();

        return to_route('clients.index')->with('success', 'Client deleted successfully');
    }

    public function properties($client_id)
    {
        $client = Client::find($client_id)->load('wishe.region');
        $client->wishe->typ = $client->wishe->typ();
        $properties = Property::with(['user', 'region'])->get();

        $c = new Compatible(); // calss to compare client and property
        foreach ($properties as $property) {
            $property->rooms_c = $c->number($client->wishe->rooms, $property->rooms)['class'];
            $property->ok_count = $c->number($client->wishe->rooms, $property->rooms)['count'];

            $property->suites_c = $c->number($client->wishe->suites, $property->suites)['class'];
            $property->ok_count += $c->number($client->wishe->suites, $property->suites)['count'];

            $property->garages_c = $c->number($client->wishe->garages, $property->garages)['class'];
            $property->ok_count += $c->number($client->wishe->garages, $property->garages)['count'];

            $property->delivery_key_c = $c->date($client->wishe->delivery_key, $property->delivery_key)['class'];
            $property->ok_count += $c->date($client->wishe->delivery_key, $property->delivery_key)['count'];

            $property->typ = $property->typ();
            $property->typ_c = $c->string($client->wishe->type ?? '', $property->type ?? '')['class'];
            $property->ok_count += $c->string($client->wishe->type ?? '', $property->type ?? '')['count'];

            $property->region_c = $c->string($client->wishe->region->id ?? '', $property->region->id ?? '')['class'];
            $property->ok_count += $c->string($client->wishe->region->id ?? '', $property->region->id ?? '')['count'];

            $property->balcony_c = $c->bool($client->wishe->balcony, $property->balcony)['class'];
            $property->ok_count += $c->bool($client->wishe->balcony ?? '', $property->balcony ?? '')['count'];

            $property->range_c = $c->number($property->range(), $client->range())['class2'];
            $property->ok_count += ($c->number($property->range(), $client->range())['count'] * 3);

            $property->building_area_c = $c->number($client->wishe->building_area, $property->building_area)['class'];
            $property->ok_count += $c->number($client->wishe->building_area, $property->building_area)['count'];
        }

        // Convert to array after sorting
        $sortedProperties = $properties->sortByDesc('ok_count')->values()->all();

        //dd($sortedProperties);

        return Inertia::render('clients/client-properties', [
            'properties' => $sortedProperties,
            'client' => $client
        ]);
    }

    public function property($client_id, $property_id)
    {
        return Inertia::render('clients/client-property', [
            'client' => Client::find($client_id)->load('wishe.region'),
            'property' => Property::find($property_id)->load('user', 'region'),
        ]);
    }
}
