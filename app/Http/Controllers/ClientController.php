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
use Illuminate\Support\Facades\Gate;

class ClientController extends Controller
{
    public $client;
    public function __construct()
    {
        $this->client = new Client();
    }
    public function index()
    {
        $clients = Client::with('wishe.regions')->where('user_id', Auth::user()->id)->orderBy('name')->get();

        foreach ($clients as $client) {
            $client->wishe->regions_descr = $client->wishe->regionsDescr();
        }

        return Inertia::render('clients/clients-index', [
            'clients' => $clients
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
        session()->forget('compatibleObjects');
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
        Gate::authorize('show', $client);
        $client->load('wishe.regions');
        $client->wishe->regions_descr = $client->wishe->regionsDescr();

        return Inertia::render('clients/clients-show', [
            'client' => $client,
            'maritalStatusOptions' => $this->client->maritalStatOpt(),
            'booleanOptions' => $this->client->boolOpt(),
        ], compact('client'));
    }

    public function edit(Client $client)
    {
        Gate::authorize('edit', $client);
        return Inertia::render('clients/clients-edit', [
            'client' => $client->load('wishe.regions'),
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
        Gate::authorize('update', $client);
        session()->forget('compatibleObjects');
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

        // Initialize all wish fields with null first
        $wishData = array_fill_keys($wishFields, null);

        // Then merge with the validated data (this will overwrite the null values with actual values when present)
        $wishData = array_merge(
            $wishData,
            array_intersect_key($validated, array_flip($wishFields))
        );

        // Update or create the associated wish
        $wish = $client->wishe()->updateOrCreate([], $wishData);

        // Sync selected regions if they exist
        if ($request->has('selected_regions')) {
            $selectedRegions = $request->input('selected_regions', []);
            $wish->regions()->sync($selectedRegions);
        } else {
            $wish->regions()->detach();
        }

        return back()->with('success', 'Client updated successfully');
    }
    public function destroy(Client $client): RedirectResponse
    {
        Gate::authorize('delete', $client);
        session()->forget('compatibleObjects');
        // Delete the associated wish first
        if ($client->wishe) {
            $client->wishe()->delete();
        }

        // Then delete the client
        $client->delete();

        return to_route('clients.index')->with('success', 'Client deleted successfully');
    }

    public function properties(Client $client)
    {
        Gate::authorize('show', $client);
        $client = Client::find($client->id)->load('wishe.regions');
        $client->wishe->typ = $client->wishe->typ();

        $client->wishe->regions_msg = $client->wishe->regionsMsg();

        $client->wishe->regions_descr = $client->wishe->regionsDescr();

        $properties = Property::with(['user', 'region'])->where('user_id', Auth::user()->id)->get();

        // Array of client region options ids
        $cli_reg_ids = $client->wishe->regions()->get()->pluck('id')->toArray();
        foreach ($properties as $property) {

            $compatible = new Compatible($client, $property); // calss to compare client and property

            $property->typ = $property->typ();

            $property->typ_c = $compatible->string($client->wishe->type, $property->type)['class'];

            $property->range_c = $compatible->number($property->range(), $client->range())['class2'];

            $property->delivery_key_c = $compatible->date($client->wishe->delivery_key, $property->delivery_key)['class'];

            $property->building_area_c = $compatible->number($client->wishe->building_area, $property->building_area)['class'];

            $property->rooms_c = $compatible->number($client->wishe->rooms, $property->rooms)['class'];

            $property->suites_c = $compatible->number($client->wishe->suites, $property->suites)['class'];

            $property->garages_c = $compatible->number($client->wishe->garages, $property->garages)['class'];

            $property->balcony_c = $compatible->bool($client->wishe->balcony, $property->balcony)['class'];

            $property->region_c = $compatible->inArray($property->region->id ?? '', $cli_reg_ids ?? '')['class'];

            $property->pts = $compatible->pts;
        }

        // Convert to array after sorting
        $sortedProperties = $properties->sortBy([ // Multi-level sorting
            ['pts', 'desc'], // Primary sort by pts descending
            ['description', 'asc'] // Secondary sort by client name ascending
        ])->values()->all();

        return Inertia::render('clients/client-properties', [
            'properties' => $sortedProperties,
            'client' => $client
        ]);
    }
}
