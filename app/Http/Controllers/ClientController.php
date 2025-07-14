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
use Illuminate\Http\Request;

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
        session()->forget('compatibleObjects');
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

        //dd($sortedProperties);

        return Inertia::render('clients/client-properties', [
            'properties' => $sortedProperties,
            'client' => $client
        ]);
    }

    public function property($client_id, $property_id)
    {
        $client = Client::find($client_id)->load('wishe.regions');

        $client->wishe->regions_msg = $client->wishe->regionsMsg();

        $client->wishe->regions_descr = $client->wishe->regionsDescr();

        $property = Property::with(['user', 'region'])->find($property_id);

        $compatible = new Compatible($client, $property); // calss to compare client and property

        $property->region_bool_c = $compatible->inArray($property->region->id ?? '', $client->wishe->regions()->get()->pluck('id')->toArray())['class'];

        return Inertia::render('clients/client-property', [
            'client' => $client,
            'property' => $property,
            'match' => [
                'type' => $compatible->string(
                    $client->wishe->type,
                    $property->type
                )['result'],

                'range' => $compatible->number(
                    $compatible->property->range(),
                    $compatible->client->range()
                )['result'],

                'delivery_key' => $compatible->date(
                    $client->wishe->delivery_key,
                    $property->delivery_key
                )['result'],

                'building_area' => $compatible->number(
                    $client->wishe->building_area,
                    $property->building_area
                )['result'],

                'rooms' => $compatible->number(
                    $client->wishe->rooms,
                    $property->rooms
                )['result'],

                'suites' => $compatible->number(
                    $compatible->client->wishe->suites,
                    $compatible->property->suites
                )['result'],

                'garages' => $compatible->number(
                    $client->wishe->garages,
                    $property->garages
                )['result'],

                'balcony' => $compatible->bool(
                    $client->wishe->balcony,
                    $property->balcony
                )['result'],

                'region' => $compatible->inArray(
                    $property->region->id ?? '',
                    $client->wishe->regions()
                        ->get()->pluck('id')->toArray()
                )['result'],

                'bathrooms' => $compatible->number(
                    $client->wishe->bathrooms,
                    $property->bathrooms
                )['result'],

                'air_conditioning' => $compatible->string(
                    $client->wishe->air_conditioning,
                    $property->air_conditioning
                )['result'],

                'garden' => $compatible->bool(
                    $client->wishe->garden,
                    $property->garden
                )['result'],

                'pool' => $compatible->bool(
                    $client->wishe->pool,
                    $property->pool
                )['result'],

                'acept_pets' => $compatible->bool(
                    $client->wishe->acept_pets,
                    $property->acept_pets
                )['result'],

                'acessibility' => $compatible->bool(
                    $client->wishe->acessibility,
                    $property->acessibility
                )['result'],

                'installment_payment' => $compatible->bool(
                    $client->wishe->installment_payment,
                    $property->installment_payment
                )['result'],

                'min_act' => $compatible->number(
                    $property->min_act,
                    $client->wishe->min_act
                )['result']
            ]
        ]);
    }
    public function dashboard()
    {
        if (session('compatibleObjects')) {
            redirect()->route('filter');
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

        // 2. Take only the first 120 results for further use
        $compatibleObjects = $allCompatibleObjects
            ->take(30) // Take only the first 120 results
            ->values(); // Reset array keys

        return Inertia::render('dashboard', [
            'matches' => $compatibleObjects->map(function ($compatible, $key) {
                return [
                    'pts' => $compatible->pts,
                    'id' => $key,
                    'client_id' => $compatible->client->id,
                    'client_name' => $compatible->client->name,
                    'property_id' => $compatible->property->id,
                    'property_description' => $compatible->property->description,
                    'type' => $compatible->string(
                        $compatible->client->wishe->type,
                        $compatible->property->type
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
            'clientOptions' => Client::orderBy('name')->get()->map(fn($client) => [
                'value' => strval($client->id), // Convert to string
                'label' => $client->name,
            ])->prepend([
                'value' => '0',
                'label' => 'Selecionar todos',
            ])->all(),
            'propertyOptions' => Property::orderBy('description')->get()->map(fn($property) => [
                'value' => strval($property->id), // Convert to string
                'label' => $property->description,
            ])->prepend([
                'value' => '0',
                'label' => 'Selecionat todos',
            ])->all(),
        ]);
    }

    public function filter(Request $request)
    {
        $n_displayed = $request->show;
        if (isset($request->client_id) || (isset($request->property_id))) {
            $n_displayed = 200;
        }

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

        return Inertia::render('dashboard', [
            'matches' => $compatibleObjects->map(function ($compatible, $key) {
                return [
                    'pts' => $compatible->pts,
                    'id' => $key,
                    'client_id' => $compatible->client->id,
                    'client_name' => $compatible->client->name,
                    'property_id' => $compatible->property->id,
                    'property_description' => $compatible->property->description,
                    'type' => $compatible->string(
                        $compatible->client->wishe->type,
                        $compatible->property->type
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
            'clientOptions' => Client::orderBy('name')->get()->map(fn($client) => [
                'value' => strval($client->id), // Cast to string
                'label' => $client->name,
            ])->prepend([
                'value' => '0',
                'label' => 'Selecionar todos',
            ])
                ->all(),
            'propertyOptions' => Property::orderBy('description')->get()->map(fn($property) => [
                'value' => strval($property->id), // Cast to string
                'label' => $property->description,
            ])->prepend([
                'value' => '0',
                'label' => 'Todos os imóveis',
            ])->all(),
        ]);
    }
}
