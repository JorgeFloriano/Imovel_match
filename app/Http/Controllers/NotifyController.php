<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotifyController extends Controller
{
    public function index()
    {
        $clients = Client::with('wishe.regions')->where('user_id', Auth::user()->id)->orderBy('name')->get();

        $propertyOptions = Property::where('user_id', Auth::id())->orderBy('description')->get()->map(fn($property) => [
            'value' => strval($property->id), // Convert to string
            'label' => $property->description,
        ])->prepend([
            'value' => '0',
            'label' => 'Customizado para o cliente',
        ])->all();

        foreach ($clients as $client) {
            $client->wishe->regions_descr = $client->wishe->regionsDescr();
        }

        return Inertia::render('notify/notify-index', [
            'clients' => $clients,
            'propertyOptions' => $propertyOptions
        ]);
    }
}
