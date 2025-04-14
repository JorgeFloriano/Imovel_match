<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\District;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            'districtOptions' => District::orderBy('name')->get()->pluck('name', 'id'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'contact_name' => 'nullable|string',
            'contact_phone' => 'nullable|string',
            'contact_link' => 'nullable|string',
            'district_id' => 'required|integer|exists:districts,id',
            'type' => 'nullable|in:casa,casa (condom.),sobrado,apartamento,apart. c/ elevad.,terreno,loja,garagem,sala,outros',
            'iptu' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'land_area' => 'nullable|numeric|min:0',
            'building_area' => 'nullable|numeric|min:0',
            'image' => 'nullable|string',
            'address' => 'nullable|string|max:100',
            'rooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'suites' => 'nullable|integer|min:0',
            'garages' => 'nullable|integer|min:0',
            'floor' => 'nullable|integer|min:0',
            'building_floors' => 'nullable|integer|min:0',
            'property_floors' => 'nullable|integer|min:0',
            'delivery_key' => 'nullable|date',
            'min_act' => 'nullable|integer|min:0',
            'installment_payment' => 'nullable|boolean',
            'incc_financing' => 'nullable|boolean',
            'documents' => 'nullable|boolean',
            'finsh_type' => 'nullable|string',
            'air_conditioning' => 'nullable|in:incluso,somente infra,não incluso',
            'garden' => 'nullable|boolean',
            'pool' => 'nullable|boolean',
            'balcony' => 'nullable|boolean',
            'acept_pets' => 'nullable|boolean',
            'acessibility' => 'nullable|boolean',
            'obs' => 'nullable|string',
        ]);

        $validated['user_id'] =  Auth::user()->id;

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
                'casa (condom.)' => 'Casa (Cond.)',
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
            'districtOptions' => District::orderBy('name')->get()->pluck('name', 'id'),
            'userOptions' => User::orderBy('name')->get()->pluck('name', 'id'),
        ]);
    }

    public function update(Request $request, Property $property): RedirectResponse
    {
        $validated = $request->validate([
            'contact_name' => 'nullable|string',
            'contact_phone' => 'nullable|string',
            'contact_link' => 'nullable|string',
            'district_id' => 'required|integer|exists:districts,id',
            'type' => 'nullable|in:casa,casa (condom.),sobrado,apartamento,apart. c/ elevad.,terreno,loja,garagem,sala,outros',
            'iptu' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'land_area' => 'nullable|numeric|min:0',
            'building_area' => 'nullable|numeric|min:0',
            'image' => 'nullable|string',
            'address' => 'nullable|string|max:100',
            'rooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|integer|min:0',
            'suites' => 'nullable|integer|min:0',
            'garages' => 'nullable|integer|min:0',
            'floor' => 'nullable|integer|min:0',
            'building_floors' => 'nullable|integer|min:0',
            'property_floors' => 'nullable|integer|min:0',
            'delivery_key' => 'nullable|date',
            'min_act' => 'nullable|integer|min:0',
            'installment_payment' => 'nullable|boolean',
            'incc_financing' => 'nullable|boolean',
            'documents' => 'nullable|boolean',
            'finsh_type' => 'nullable|string',
            'air_conditioning' => 'nullable|in:incluso,somente infra,não incluso',
            'garden' => 'nullable|boolean',
            'pool' => 'nullable|boolean',
            'balcony' => 'nullable|boolean',
            'acept_pets' => 'nullable|boolean',
            'acessibility' => 'nullable|boolean',
            'obs' => 'nullable|string',
        ]);

        $validated['user_id'] =  Auth::user()->id;

        $property->update($validated);

        return back()->with('success', 'Property updated successfully');
    }

    public function destroy(Property $property): RedirectResponse
    {
        $property->delete();
        return to_route('properties.index')->with('success', 'Property deleted successfully');
    }
}
