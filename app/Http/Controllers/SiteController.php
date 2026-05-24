<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\Region;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SiteController extends Controller
{
    public function welcome()
    {
        return Inertia::render('site/welcome');
    }

    public function about()
    {
        return Inertia::render('site/about');
    }

    public function properties(Request $request)
    {
        $query = Property::withoutGlobalScope('user')->with(['district', 'region']);

        if ($request->filled('region') && $request->region !== 'all') {
            $query->where('region_id', $request->region);
        }

        if ($request->filled('type') && $request->type !== 'all') {
            $type = $request->type;
            if ($type === '1') {
                $query->whereIn(DB::raw('LOWER(type)'), ['apartamento', 'apart. c/ elevad.']);
            } elseif ($type === '2') {
                $query->whereIn(DB::raw('LOWER(type)'), ['casa', 'casa (condom.)', 'sobrado']);
            } elseif ($type === '3') {
                $query->whereNotIn(DB::raw('LOWER(type)'), ['apartamento', 'apart. c/ elevad.', 'casa', 'casa (condom.)', 'sobrado']);
            }
        }

        if ($request->filled('rooms') && $request->rooms !== 'all') {
            if (str_ends_with($request->rooms, '+')) {
                $query->where('rooms', '>=', rtrim($request->rooms, '+'));
            } else {
                $query->where('rooms', $request->rooms);
            }
        }

        if ($request->filled('building_area') && $request->building_area !== 'all') {
            $query->where('building_area', '>=', $request->building_area);
        }

        if ($request->filled('bathrooms') && $request->bathrooms !== 'all') {
            if (str_ends_with($request->bathrooms, '+')) {
                $query->where('bathrooms', '>=', rtrim($request->bathrooms, '+'));
            } else {
                $query->where('bathrooms', $request->bathrooms);
            }
        }

        if ($request->filled('garages') && $request->garages !== 'all') {
            if (str_ends_with($request->garages, '+')) {
                $query->where('garages', '>=', rtrim($request->garages, '+'));
            } else {
                $query->where('garages', $request->garages);
            }
        }

        if ($request->filled('suites') && $request->suites !== 'all') {
            if (str_ends_with($request->suites, '+')) {
                $query->where('suites', '>=', rtrim($request->suites, '+'));
            } else {
                $query->where('suites', $request->suites);
            }
        }

        if ($request->filled('status') && $request->status !== 'all') {
            if ($request->status === 'pronto') {
                $query->where('delivery_key', '<=', now());
            } elseif ($request->status === 'planta') {
                $query->where('delivery_key', '>', now());
            }
        }

        if ($request->filled('revenue')) {
            $revenue = (float) $request->revenue;
            if ($revenue <= 5000) {
                $query->where('price', '<=', 275000);
            } elseif ($revenue <= 9600) {
                $query->where('price', '<=', 400000);
            } else {
                $query->where('price', '<=', 600000);
            }
            $query->orderBy('price', 'desc');
        }

        if ($request->filled('alto_padrao') && $request->alto_padrao == 'true') {
            $query->orderBy('price', 'desc');
        }

        if ($request->filled('keyword')) {
            $keyword = $request->keyword;
            $query->where(function ($q) use ($keyword) {
                $q->where('description', 'like', '%' . $keyword . '%')
                  ->orWhere('address', 'like', '%' . $keyword . '%')
                  ->orWhere('obs', 'like', '%' . $keyword . '%');
            });
        }

        return Inertia::render('site/properties', [
            'properties' => ($request->filled('revenue') || $request->filled('alto_padrao') ? $query : $query->latest())->paginate(8)->withQueryString(),
            'regions' => Region::all(),
            'filters' => $request->only([
                'region',
                'type',
                'rooms',
                'building_area',
                'bathrooms',
                'garages',
                'suites',
                'status',
                'revenue',
                'keyword',
                'alto_padrao'
            ])
        ]);
    }

    public function showProperty(Property $property)
    {
        return Inertia::render('site/property-details', [
            'property' => $property->load(['region', 'district', 'images']),
        ]);
    }
}
