<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Region;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'regionOptions' => Region::all()->pluck('name', 'id'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            // Client validation rules
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255|unique:clients,email',
            'address' => 'nullable|string',
            'marital_status' => 'required|string',
            'need_financing' => 'required|boolean',
            'dependents' => 'required|integer|min:0',
            'profession' => 'required|string',
            'revenue' => 'required|numeric|min:0',
            'capital' => 'required|numeric|min:0',
            'fgts' => 'nullable|numeric|min:0',
            'has_property' => 'required|boolean',
            'compromised_income' => 'required|numeric|min:0|max:100',

            // Wishes validation rules
            'region_id' => 'nullable|integer|exists:regions,id',
            'rooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'suites' => 'nullable|integer|min:0',
            'garages' => 'nullable|integer|min:0',
            'delivery_key' => 'nullable|date',
            'min_act' => 'nullable|integer|min:0',
            'installment_payment' => 'nullable|boolean',
            'air_conditioning' => 'nullable|in:incluso,somente infra,não incluso',
            'garden' => 'nullable|boolean',
            'pool' => 'nullable|boolean',
            'balcony' => 'nullable|boolean',
            'acept_pets' => 'nullable|boolean',
            'acessibility' => 'nullable|boolean',
            'obs' => 'nullable|string',
        ]);

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
                'region_id' => $validated['region_id'] ?? null,
            ];

            // Create the wish associated with the client
            $client->wishe()->create($wishData);

            return to_route('clients.create')->with('success', 'Client created successfully');
        }

        return back()->with('error', 'Failed to create client');
    }



    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
