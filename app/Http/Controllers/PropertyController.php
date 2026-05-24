<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyRequest;
use App\Models\Property;
use App\Models\Region;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class PropertyController extends Controller
{
    public $property;
    public function __construct()
    {
        $this->property = new Property();
    }
    public function index(\Illuminate\Http\Request $request)
    {
        $query = Property::withoutGlobalScope('user')->with(['user', 'region']);

        if ($request->filled('keyword')) {
            $query->where('description', 'like', '%' . $request->keyword . '%');
        }

        $properties = $query->orderBy('description')
            ->paginate(50)
            ->withQueryString();

        $properties->through(function ($property) {
            $property->typ = $property->typ();
            return $property;
        });      
        
        return Inertia::render('admin/properties/properties-index', [
            'properties' => $properties,
            'filters' => $request->only('keyword')
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/properties/properties-create', [
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
        session()->forget('compatibleObjects');
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('properties', 'public');
            $validated['image'] = $path;
        }

        if ($request->hasFile('book')) {
            $path = $request->file('book')->store('properties/books', 'public');
            $validated['book'] = $path;
        }

        $property = Property::create($validated);

        if ($property && $request->hasFile('property_images')) {
            foreach ($request->file('property_images') as $imageFile) {
                $imgPath = $imageFile->store('properties/images', 'public');
                $property->images()->create(['path' => $imgPath]);
            }
        }

        if ($property) {
            return to_route('properties.index')->with('success', 'Property created successfully');
        }

        return back()->with('error', 'Failed to create property');
    }

    public function show(Property $property)
    {
        //Gate::authorize('show', $property);
        return Inertia::render('admin/properties/properties-show', [
            'property' => $property->load(['user', 'region', 'images']),
            'typeOptions' => $this->property->typeOpt(),
            'airConditioningOptions' => $this->property->airConOpt(),
            'booleanOptions' => $this->property->boolOpt(),
        ]);
    }

    public function edit(Property $property)
    {
        //Gate::authorize('edit', $property);
        return Inertia::render('admin/properties/properties-edit', [
            'property' => $property->load('images'),
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
        //Gate::authorize('update', $property);
        session()->forget('compatibleObjects');
        $validated = $request->validated();
        $validated['user_id'] = Auth::user()->id;

        if ($request->hasFile('image')) {
            if ($property->image && Storage::disk('public')->exists($property->image)) {
                Storage::disk('public')->delete($property->image);
            }
            $path = $request->file('image')->store('properties', 'public');
            $validated['image'] = $path;
        } else {
            unset($validated['image']);
        }
        
        if ($request->hasFile('book')) {
            if ($property->book && Storage::disk('public')->exists($property->book)) {
                Storage::disk('public')->delete($property->book);
            }
            $path = $request->file('book')->store('properties/books', 'public');
            $validated['book'] = $path;
        } else {
            unset($validated['book']);
        }
        
        unset($validated['property_images']);
        unset($validated['images_to_delete']);

        if ($request->has('images_to_delete')) {
            $imagesToDelete = $property->images()->whereIn('id', $request->images_to_delete)->get();
            foreach ($imagesToDelete as $img) {
                if (Storage::disk('public')->exists($img->path)) {
                    Storage::disk('public')->delete($img->path);
                }
                $img->delete();
            }
        }

        if ($request->hasFile('property_images')) {
            foreach ($request->file('property_images') as $imageFile) {
                $imgPath = $imageFile->store('properties/images', 'public');
                $property->images()->create(['path' => $imgPath]);
            }
        }

        $property->update($validated);

        return back()->with('success', 'Property updated successfully');
    }

    public function destroy(Property $property): RedirectResponse
    {
        Gate::authorize('delete', $property);
        session()->forget('compatibleObjects');
        
        if ($property->image && Storage::disk('public')->exists($property->image)) {
            Storage::disk('public')->delete($property->image);
        }

        if ($property->book && Storage::disk('public')->exists($property->book)) {
            Storage::disk('public')->delete($property->book);
        }

        $property->delete();
        return to_route('properties.index')->with('success', 'Property deleted successfully');
    }
}
