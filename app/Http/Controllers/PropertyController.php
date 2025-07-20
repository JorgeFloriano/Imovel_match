<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyRequest;
use App\Models\Property;
use App\Models\Region;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class PropertyController extends Controller
{
    public $property;
    public function __construct()
    {
        $this->property = new Property();
    }
    public function index()
    {
        $properties = Property::with(['user', 'region'])->where('user_id', Auth::user()->id)->orderBy('description')->get();

        foreach ($properties as $property) {
            $property->typ = $property->typ();
        }

        return Inertia::render('properties/properties-index', [
            'properties' => $properties,
        ]);
    }

    public function create()
    {
        Gate::authorize('canStore', Property::class);
        return Inertia::render('properties/properties-create', [
            'typeOptions' => $this->property->typeOpt(),
            'airConditioningOptions' => $this->property->airConOpt(),
            'booleanOptions' => $this->property->boolOpt(),
            'regionOptions' => Region::orderBy('name')->get()->map(fn($region) => [
                'value' => $region->id,
                'label' => $region->name,
            ])->all(),
        ]);
    }

    public function store(PropertyRequest $request): RedirectResponse
    {
        Gate::authorize('canStore', Property::class);
        session()->forget('compatibleObjects');
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
        Gate::authorize('show', $property);
        return Inertia::render('properties/properties-show', [
            'property' => $property->load(['user', 'region']),
            'typeOptions' => $this->property->typeOpt(),
            'airConditioningOptions' => $this->property->airConOpt(),
            'booleanOptions' => $this->property->boolOpt(),
        ]);
    }

    public function edit(Property $property)
    {
        Gate::authorize('edit', $property);
        return Inertia::render('properties/properties-edit', [
            'property' => $property,
            'typeOptions' => $this->property->typeOpt(),
            'airConditioningOptions' => $this->property->airConOpt(),
            'booleanOptions' => $this->property->boolOpt(),
            'regionOptions' => Region::orderBy('name')->get()->map(fn($region) => [
                'value' => $region->id,
                'label' => $region->name,
            ])->all(),
        ]);
    }

    public function update(PropertyRequest $request, Property $property): RedirectResponse
    {
        Gate::authorize('update', $property);
        session()->forget('compatibleObjects');
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        $property->update($validated);

        return back()->with('success', 'Property updated successfully');
    }

    public function destroy(Property $property): RedirectResponse
    {
        Gate::authorize('delete', $property);
        session()->forget('compatibleObjects');
        $property->delete();
        return to_route('properties.index')->with('success', 'Property deleted successfully');
    }
}
