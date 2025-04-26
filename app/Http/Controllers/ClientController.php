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
        // $cl = Client::find(9); // client with id = 9 has a property wishe that has 2 rooms
        // $p = Property::find(1); // property with id = 1 has 2 rooms
        // $c = new Compatible(); // calss to compare client and property
        // dd($c->number($cl->wishe->rooms, $p->rooms)['color']['bg']); // compare numbers of rooms

        return Inertia::render('clients/clients-index', [
            'clients' => Client::with(['wishe.region'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('clients/clients-create', [
            'maritalStatusOptions' => $this->client->maritalStatOpt(),
            'booleanOptions' => $this->client->boolOpt(),
            'regionOptions' => Region::orderBy('name')->get()->pluck('name', 'id'),
        ]);
    }

    public function store(ClientRequest $request): RedirectResponse
{
    $validated = $request->validated();
    $validated['user_id'] = Auth::user()->id;
    
    // Create client with user_id and all validated client data
    $client = Client::create($validated);

    // Extract wish data from validated input (excluding client-specific fields)
    $wishFields = [
        'region_id', 'district_id', 'type', 'rooms', 'bathrooms', 'suites', 
        'garages', 'delivery_key', 'min_act', 'installment_payment',
        'air_conditioning', 'garden', 'pool', 'balcony', 'acept_pets',
        'acessibility', 'obs', 'air_conditioning',
    ];
    
    $wishData = array_merge(
        array_intersect_key($validated, array_flip($wishFields)),
    );

    // Create associated wish
    $client->wishe()->create($wishData);

    return to_route('clients.create')->with('success', 'Client created successfully');
}

    public function show(Client $client)
    {
        return Inertia::render('clients/clients-show', [
            'client' => $client->load('wishe.region'),
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
            'regionOptions' => Region::orderBy('name')->get()->pluck('name', 'id'),
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
        'region_id', 'district_id', 'type', 'rooms', 'bathrooms', 'suites',
        'garages', 'delivery_key', 'min_act', 'installment_payment',
        'air_conditioning', 'garden', 'pool', 'balcony', 'acept_pets',
        'acessibility', 'obs', 'air_conditioning',
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
        $properties = Property::with(['user', 'district.region'])->get();

        $c = new Compatible(); // calss to compare client and property
        foreach ($properties as $property) {
            $property->rooms_c = $c->number($client->wishe->rooms ?? 0, $property->rooms ?? 0)['class'];
            $property->ok_count = $c->number($client->wishe->rooms ?? 0, $property->rooms ?? 0)['count'];
            $property->bathrooms_c = $c->number($client->wishe->bathrooms ?? 0, $property->bathrooms ?? 0)['class'];
            $property->ok_count += $c->number($client->wishe->bathrooms ?? 0, $property->bathrooms ?? 0)['count'];
            $property->suites_c = $c->number($client->wishe->suites ?? 0, $property->suites ?? 0)['class'];
            $property->ok_count += $c->number($client->wishe->suites ?? 0, $property->suites ?? 0)['count'];
            $property->garages_c = $c->number($client->wishe->garages ?? 0, $property->garages ?? 0)['class'];
            $property->ok_count += $c->number($client->wishe->garages ?? 0, $property->garages ?? 0)['count'];
        }

        // Convert to array after sorting
        $sortedProperties = $properties->sortByDesc('ok_count')->values()->all();

        return Inertia::render('clients/client-properties', [
            'properties' => $sortedProperties,
            'client' => $client
        ]);
    }
}