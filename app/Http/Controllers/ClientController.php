<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\District;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        $district = District::first();

        return Inertia::render('clients/clients-index' , [
            'district' => $district ? [
                'name' => $district->name,
                'region' => $district->region->name
            ] : null,
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

        dd($request->all());
        try {
            $client = Client::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'marital_status' => $request->marital_status,
                'need_financing' => $request->boolean('need_financing'),
                'dependents' => $request->dependents,
                'profession' => $request->profession,
                'revenue' => $request->revenue,
                'capital' => $request->capital,
                'fgts' => $request->fgts,
                'has_property' => $request->boolean('has_property'),
                'compromised_income' => $request->compromised_income,
            ]);

            return redirect()->route('clients.index')
                ->with('success', 'Cliente cadastrado com sucesso!');

        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->with('error', 'Erro ao cadastrar cliente: ' . $e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     */
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
