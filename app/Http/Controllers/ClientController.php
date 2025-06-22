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
        $clients = Client::with('wishe.regions')->where('user_id', Auth::user()->id)->get();

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
        $client->load('wishe.regions');
        $client->wishe->regions_descr = $client->wishe->regionsDescr();

        return Inertia::render('clients/clients-show', [
            'client' => $client,
            'maritalStatusOptions' => $this->client->maritalStatOpt(),
            'booleanOptions' => $this->client->boolOpt(),
        ]);
    }

    public function edit(Client $client)
    {
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
        $client = Client::find($client_id)->load('wishe.regions');
        $client->wishe->typ = $client->wishe->typ();

        $client->wishe->regions_msg = $client->wishe->regionsMsg();

        $client->wishe->regions_descr = $client->wishe->regionsDescr();

        $properties = Property::with(['user', 'region'])->where('user_id', Auth::user()->id)->get();

        $c = new Compatible(); // calss to compare client and property
        $cli_reg_ids = $client->wishe->regions()->get()->pluck('id')->toArray();
        foreach ($properties as $property) {
            $property->typ = $property->typ();
            $property->typ_c = $c->string($client->wishe->type ?? '', $property->type ?? '')['class'];
            $property->ok_count += $c->string($client->wishe->type ?? '', $property->type ?? '')['count'];

            $property->range_c = $c->number($property->range(), $client->range())['class2'];
            $property->ok_count = $property->ok_count + ($c->number($property->range(), $client->range())['count'] * 3);

            $property->delivery_key_c = $c->date($client->wishe->delivery_key, $property->delivery_key)['class'];
            $property->ok_count += $c->date($client->wishe->delivery_key, $property->delivery_key)['count'];

            $property->building_area_c = $c->number($client->wishe->building_area, $property->building_area)['class'];
            $property->ok_count += $c->number($client->wishe->building_area, $property->building_area)['count'];

            $property->rooms_c = $c->number($client->wishe->rooms, $property->rooms)['class'];
            $property->ok_count += $c->number($client->wishe->rooms, $property->rooms)['count'];

            $property->suites_c = $c->number($client->wishe->suites, $property->suites)['class'];
            $property->ok_count += $c->number($client->wishe->suites, $property->suites)['count'];

            $property->garages_c = $c->number($client->wishe->garages, $property->garages)['class'];
            $property->ok_count += $c->number($client->wishe->garages, $property->garages)['count'];

            $property->balcony_c = $c->bool($client->wishe->balcony, $property->balcony)['class'];
            $property->ok_count += $c->bool($client->wishe->balcony, $property->balcony)['count'];

            $property->region_c = $c->inArray($property->region->id ?? '', $cli_reg_ids ?? '')['class'];
            $property->ok_count += $c->inArray($property->region->id ?? '', $cli_reg_ids ?? '')['count'];
        }

        // Convert to array after sorting
        $sortedProperties = $properties->sortByDesc('ok_count')->values()->all();

        return Inertia::render('clients/client-properties', [
            'properties' => $sortedProperties,
            'client' => $client
        ]);
    }

    public function property($client_id, $property_id)
    {
        $c = new Compatible(); // calss to compare client and property

        $client = Client::find($client_id)->load('wishe.regions');

        $client->wishe->regions_msg = $client->wishe->regionsMsg();

        $client->wishe->regions_descr = $client->wishe->regionsDescr();

        $property = Property::with(['user', 'region'])->find($property_id);

        $property->range = $c->number($property->range(), $client->range())['result'];

        $property->region_bool = $c->inArray($property->region->id ?? '', $client->wishe->regions()->get()->pluck('id')->toArray())['result'];
        $property->region_bool_c = $c->inArray($property->region->id ?? '', $client->wishe->regions()->get()->pluck('id')->toArray())['class'];

        return Inertia::render('clients/client-property', [
            'client' => $client,
            'property' => $property,
        ]);
    }
    public function dashboard()
    {
        // Get clients with their wishes and wish regions
        $clients = Client::where('user_id', Auth::id())
            ->with(['wishe' => function ($query) {
                $query->select('id', 'client_id', 'type', 'delivery_key', 'building_area', 'rooms', 'suites', 'garages', 'balcony')
                    ->with(['regions' => function ($q) {
                        $q->select('regions.id', 'regions.name');
                    }]);
            }])
            ->select('id', 'name', 'revenue')
            ->get();

        // Get properties with regions
        $properties = Property::where('user_id', Auth::id())
            ->with(['region'])
            ->select('id', 'description', 'price', 'type', 'delivery_key', 'building_area', 'rooms', 'suites', 'garages', 'balcony', 'region_id')
            ->get();

        // Create and sort compatible objects
        $compatibleObjects = collect($clients->flatMap(function ($client) use ($properties) {
            return $properties->map(function ($property) use ($client) {
                $compatible = new Compatible($client, $property);

                // Calculate compatibility points if not done in constructor
                if (!isset($compatible->pts)) {
                    $compatible->pts = $compatible->calculateCompatibility($client, $property);
                }

                return $compatible;
            });
        }))
            ->sortByDesc('pts') // Sort by pts descending
            ->where('pts', '>', 14) // Filter out objects with pts less than 15
            ->values();         // Reset array keys

        return Inertia::render('dashboard', [
            'matches' => $compatibleObjects->map(function ($compatible, $key) {
                return [
                    'pts' => $compatible->pts,
                    'id' => $key,
                    'client' => $compatible->client,
                    'property' => $compatible->property,
                    'type' => $compatible->string(
                        $compatible->client->wishe->type ?? '',
                        $compatible->property->type ?? ''
                    )['result'],

                    'range' => $compatible->number(
                        $compatible->property->range(),
                        $compatible->client->range()
                    )['result'],

                    'delivery_key' => $compatible->date(
                        $compatible->client->wishe->delivery_key,
                        $compatible->property->delivery_key
                    )['result'],

                    'building_area' => $compatible->number(
                        $compatible->client->wishe->building_area,
                        $compatible->property->building_area
                    )['result'],

                    'rooms' => $compatible->number(
                        $compatible->client->wishe->rooms,
                        $compatible->property->rooms
                    )['result'],

                    'suites' => $compatible->number(
                        $compatible->client->wishe->suites,
                        $compatible->property->suites
                    )['result'],

                    'garages' => $compatible->number(
                        $compatible->client->wishe->garages,
                        $compatible->property->garages
                    )['result'],

                    'balcony' => $compatible->bool(
                        $compatible->client->wishe->balcony,
                        $compatible->property->balcony
                    )['result'],

                    'region' => $compatible->inArray(
                        $compatible->property->region->id ?? '',
                        $compatible->client->wishe->regions()
                            ->get()->pluck('id')->toArray()
                    )['result'],
                ];
            })->toArray(),
        ]);
    }
}
