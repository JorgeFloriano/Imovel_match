<?php

namespace App\Http\Controllers;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('clients/clients-index', [
            'clients' => Client::all(),
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
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
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

        if ($client) {
            return to_route('clients.create');
        }

        return to_route('clients.create');
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
