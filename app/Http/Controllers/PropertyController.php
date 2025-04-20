<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyRequest;
use App\Models\Property;
use App\Models\District;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index()
    {
        return Inertia::render('properties/properties-index', [
            'properties' => Property::with(['user', 'district.region'])->orderBy('description')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('properties/properties-create', [
            'typeOptions' => [
                'casa' => 'Casa',
                'casa (condom.)' => 'Casa (Condom.)',
                'sobrado' => 'Sobrado',
                'apartamento' => 'Apartamento',
                'apart. c/ elevad.' => 'Apart. c/ Elevad.',
                'terreno' => 'Terreno',
                'loja' => 'Loja',
                'garagem' => 'Garagem',
                'sala' => 'Sala',
                'outros' => 'Outros',
            ],
            'airConditioningOptions' => [
                'incluso' => 'Incluso',
                'somente infra' => 'Somente Infraestrutura',
                'não incluso' => 'Não Incluso',
            ],
            'booleanOptions' => [
                'true' => 'Sim',
                'false' => 'Não',
            ],
            'districtOptions' => District::orderBy('name')->get()->map(fn($district) => [
                'value' => $district->id,
                'label' => $district->name,
            ])->all(),
        ]);
    }

    public function store(PropertyRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        $property = Property::create($validated);

        if ($property) {
            return to_route('properties.index')->with('success', 'Property created successfully');
        }

        return back()->with('error', 'Failed to create property');
    }

    public function show(Property $property)
    {
        return Inertia::render('properties/properties-show', [
            'property' => $property->load(['user', 'district']),
            'typeOptions' => [
                'casa' => 'Casa',
                'casa (condom.)' => 'Casa (Condom.)',
                'sobrado' => 'Sobrado',
                'apartamento' => 'Apartamento',
                'apart. c/ elevad.' => 'Apart. c/ Elevad.',
                'terreno' => 'Terreno',
                'loja' => 'Loja',
                'garagem' => 'Garagem',
                'sala' => 'Sala',
                'outros' => 'Outros',
            ],
            'airConditioningOptions' => [
                'incluso' => 'Incluso',
                'somente infra' => 'Somente Infraestrutura',
                'não incluso' => 'Não Incluso',
            ],
            'booleanOptions' => [
                'true' => 'Sim',
                'false' => 'Não',
            ],
        ]);
    }

    public function edit(Property $property)
    {
        return Inertia::render('properties/properties-edit', [
            'property' => $property,
            'typeOptions' => [
                'casa' => 'Casa',
                'casa (condom.)' => 'Casa (Condom.)',
                'sobrado' => 'Sobrado',
                'apartamento' => 'Apartamento',
                'apart. c/ elevad.' => 'Apart. c/ Elevad.',
                'terreno' => 'Terreno',
                'loja' => 'Loja',
                'garagem' => 'Garagem',
                'sala' => 'Sala',
                'outros' => 'Outros',
            ],
            'airConditioningOptions' => [
                'incluso' => 'Incluso',
                'somente infra' => 'Somente Infraestrutura',
                'não incluso' => 'Não Incluso',
            ],
            'booleanOptions' => [
                'true' => 'Sim',
                'false' => 'Não',
            ],
            'districtOptions' => District::orderBy('name')->get()->map(fn($district) => [
                'value' => $district->id,
                'label' => $district->name,
            ])->all(),
        ]);
    }

    public function update(PropertyRequest $request, Property $property): RedirectResponse
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        $property->update($validated);

        return back()->with('success', 'Property updated successfully');
    }

    public function destroy(Property $property): RedirectResponse
    {
        $property->delete();
        return to_route('properties.index')->with('success', 'Property deleted successfully');
    }
}
