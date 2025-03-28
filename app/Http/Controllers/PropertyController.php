<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\District;

class PropertyController extends Controller
{
    
    public function index()
    {
        $district = District::first();

        return Inertia::render('properties/properties-index' , [
            'district' => $district ? [
                'name' => $district->name,
                'region' => $district->region->name
            ] : null,
        ]);
    }

    
    public function create()
    {
        return Inertia::render('properties/properties-create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
