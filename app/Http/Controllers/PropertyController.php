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
    public $property;
    public function __construct()
    {
        $this->property = new Property();
    }
    public function index()
    {
        $properties = Property::with(['user', 'district.region'])->orderBy('description')->get();

        foreach ($properties as $property) {
            $property->typ = $property->typ();
        }

        return Inertia::render('properties/properties-index', [
            'properties' => $properties,
        ]);
    }

    public function create()
    {
        return Inertia::render('properties/properties-create', [
            'typeOptions' => $this->property->typeOpt(),
            'airConditioningOptions' => $this->property->airConOpt(),
            'booleanOptions' => $this->property->boolOpt(),
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
            'typeOptions' => $this->property->typeOpt(),
            'airConditioningOptions' => $this->property->airConOpt(),
            'booleanOptions' => $this->property->boolOpt(),
        ]);
    }

    public function edit(Property $property)
    {
        return Inertia::render('properties/properties-edit', [
            'property' => $property,
            'typeOptions' => $this->property->typeOpt(),
            'airConditioningOptions' => $this->property->airConOpt(),
            'booleanOptions' => $this->property->boolOpt(),
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
