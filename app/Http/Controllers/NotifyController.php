<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotifyController extends Controller
{
    public function index()
    {
        $clients = Client::with('wishe.regions')->where('user_id', Auth::user()->id)->orderBy('name')->get();

        foreach ($clients as $client) {
            $client->wishe->regions_descr = $client->wishe->regionsDescr();
        }

        return Inertia::render('notify/notify-index', [
            'clients' => $clients
        ]);
    }
}
