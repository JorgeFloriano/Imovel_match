<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\Region;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('clients/clients-index', [
            'clients' => Client::with(['wishe.region'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('clients/clients-create', [
            'maritalStatusOptions' => [
                'solteiro' => 'Solteiro(a)',
                'casado' => 'Casado(a)',
                'divorciado' => 'Divorciado(a)',
                'viúvo' => 'Viúvo(a)',
            ],
            'booleanOptions' => [
                'true' => 'Sim',
                'false' => 'Não',
            ],
            'regionOptions' => Region::orderBy('name')->get()->pluck('name', 'id'),
        ]);
    }

    public function store(ClientRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Create the client
        $client = Client::create([
            'user_id' => Auth::user()->id,
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'address' => $validated['address'],
            'marital_status' => $validated['marital_status'],
            'need_financing' => $validated['need_financing'],
            'dependents' => $validated['dependents'],
            'profession' => $validated['profession'],
            'revenue' => $validated['revenue'],
            'capital' => $validated['capital'],
            'fgts' => $validated['fgts'],
            'has_property' => $validated['has_property'],
            'compromised_income' => $validated['compromised_income'],
        ]);

        // Create the wish if client was created successfully
        if ($client) {
            $wishData = [
                'region_id' => $validated['region_id'] ?? null,
                'district_id' => $validated['district_id'] ?? null,
                'type' => $validated['type'] ?? null,
                'rooms' => $validated['rooms'] ?? null,
                'bathrooms' => $validated['bathrooms'] ?? null,
                'suites' => $validated['suites'] ?? null,
                'garages' => $validated['garages'] ?? null,
                'delivery_key' => $validated['delivery_key'] ?? null,
                'min_act' => $validated['min_act'] ?? null,
                'installment_payment' => $validated['installment_payment'] ?? false,
                'air_conditioning' => $validated['air_conditioning'] ?? 'não incluso',
                'garden' => $validated['garden'] ?? null,
                'pool' => $validated['pool'] ?? null,
                'balcony' => $validated['balcony'] ?? null,
                'acept_pets' => $validated['acept_pets'] ?? null,
                'acessibility' => $validated['acessibility'] ?? null,
                'obs' => $validated['obs'] ?? null,
            ];

            // Create the wish associated with the client
            $client->wishe()->create($wishData);

            return to_route('clients.create')->with('success', 'Client created successfully');
        }

        return back()->with('error', 'Failed to create client');
    }

    public function show(Client $client)
    {
        return Inertia::render('clients/clients-show', [
            'client' => $client->load('wishe.region'),
            'maritalStatusOptions' => [
                'solteiro' => 'Solteiro(a)',
                'casado' => 'Casado(a)',
                'divorciado' => 'Divorciado(a)',
                'viúvo' => 'Viúvo(a)',
            ],
            'booleanOptions' => [
                'true' => 'Sim',
                'false' => 'Não',
            ],
        ]);
    }

    public function edit(Client $client)
    {
        return Inertia::render('clients/clients-edit', [
            'client' => $client->load('wishe'),
            'maritalStatusOptions' => [
                'solteiro' => 'Solteiro(a)',
                'casado' => 'Casado(a)',
                'divorciado' => 'Divorciado(a)',
                'viúvo' => 'Viúvo(a)',
            ],
            'booleanOptions' => [
                'true' => 'Sim',
                'false' => 'Não',
            ],
            'regionOptions' => Region::orderBy('name')->get()->pluck('name', 'id'),
        ]);
    }

    public function update(ClientRequest $request, Client $client): RedirectResponse
    {
        $validated = $request->validated();

        // Update the client
        $client->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'address' => $validated['address'],
            'marital_status' => $validated['marital_status'],
            'need_financing' => $validated['need_financing'],
            'dependents' => $validated['dependents'],
            'profession' => $validated['profession'],
            'revenue' => $validated['revenue'],
            'capital' => $validated['capital'],
            'fgts' => $validated['fgts'],
            'has_property' => $validated['has_property'],
            'compromised_income' => $validated['compromised_income'],
        ]);

        // Update or create the wish
        $wishData = [
            'region_id' => $validated['region_id'] ?? null,
            'district_id' => $validated['district_id'] ?? null,
            'type' => $validated['type'] ?? null,
            'rooms' => $validated['rooms'] ?? null,
            'bathrooms' => $validated['bathrooms'] ?? null,
            'suites' => $validated['suites'] ?? null,
            'garages' => $validated['garages'] ?? null,
            'delivery_key' => $validated['delivery_key'] ?? null,
            'min_act' => $validated['min_act'] ?? null,
            'installment_payment' => $validated['installment_payment'] ?? false,
            'air_conditioning' => $validated['air_conditioning'] ?? 'não incluso',
            'garden' => $validated['garden'] ?? null,
            'pool' => $validated['pool'] ?? null,
            'balcony' => $validated['balcony'] ?? null,
            'acept_pets' => $validated['acept_pets'] ?? null,
            'acessibility' => $validated['acessibility'] ?? null,
            'obs' => $validated['obs'] ?? null,
        ];

        if ($client->wishe) {
            $client->wishe()->update($wishData);
        } else {
            $client->wishe()->create($wishData);
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
}