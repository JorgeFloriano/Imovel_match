<?php

namespace App\Http\Controllers;

use App\Class\Compatible;
use App\Models\Client;
use App\Models\Property;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotifyController extends Controller
{
    public function index(\Illuminate\Http\Request $request)
    {
        $query = Client::with('wishe.regions')->where('user_id', Auth::id());

        // Configuração de filtros e defaults
        $initialDate = $request->query('initial_date', now()->timezone('America/Sao_Paulo')->subWeek()->format('Y-m-d'));
        $finalDate = $request->query('final_date', now()->timezone('America/Sao_Paulo')->format('Y-m-d'));
        $contactOrigin = $request->query('contact_origin', 'todos');
        $notifiedUntil = $request->query('notified_until', 'nulo');
        $temperature = $request->query('temperature', 'todos');
        $search = $request->query('search');

        // Filtro de Busca (ID ou Telefone)
        if ($search) {
            $searchDigits = preg_replace('/[^0-9]/', '', $search);
            if (strlen($searchDigits) > 0) {
                if (strlen($searchDigits) <= 6) {
                    $query->where('id', $searchDigits);
                } else {
                    $query->where('phone', 'LIKE', '%' . $searchDigits . '%');
                }
            }
        } else {
            // Filtro de Datas
            $query->whereDate('created_at', '>=', $initialDate)
                  ->whereDate('created_at', '<=', $finalDate);

            // Filtro de Origem
            if ($contactOrigin === 'mrv') {
                $query->where('origin', 'LIKE', '%mrv%');
            } elseif ($contactOrigin === 'access') {
                $query->where('origin', 'LIKE', '%access%');
            } elseif ($contactOrigin === 'desconhecido') {
                $query->where(function ($q) {
                    $q->whereNull('origin')
                      ->orWhere('origin', '')
                      ->orWhere('origin', '0');
                });
            }

            // Filtro de Notificado Até (last_contact_at)
            if ($notifiedUntil === 'nulo') {
                $query->whereNull('last_contact_at');
            } elseif ($notifiedUntil === 'todos') {
                // Sem filtro, pega todos
            } else {
                $now = now()->timezone('America/Sao_Paulo');
                if ($notifiedUntil === 'hoje') {
                    $query->whereDate('last_contact_at', '>=', $now->format('Y-m-d'));
                } elseif ($notifiedUntil === 'ontem') {
                    $query->whereDate('last_contact_at', '>=', $now->subDay()->format('Y-m-d'));
                } elseif ($notifiedUntil === '3_dias') {
                    $query->whereDate('last_contact_at', '>=', $now->subDays(3)->format('Y-m-d'));
                } elseif ($notifiedUntil === '7_dias') {
                    $query->whereDate('last_contact_at', '>=', $now->subDays(7)->format('Y-m-d'));
                } elseif ($notifiedUntil === '15_dias') {
                    $query->whereDate('last_contact_at', '>=', $now->subDays(15)->format('Y-m-d'));
                } elseif ($notifiedUntil === '30_dias') {
                    $query->whereDate('last_contact_at', '>=', $now->subDays(30)->format('Y-m-d'));
                }
            }

            // Filtro de Temperatura
            if ($temperature && $temperature !== 'todos') {
                $query->where('temperature', $temperature);
            }
        }

        $clients = $query->orderBy('id', 'desc')->paginate(50)->withQueryString();

        $propertyOptions = Property::orderBy('description')->get()->map(fn($property) => [
            'value' => strval($property->id),
            'label' => $property->description,
        ])->prepend([
            'value' => '0',
            'label' => 'Customizado para o cliente',
        ])->all();

        return Inertia::render('admin/notify/notify-index', [
            'clients' => $clients,
            'propertyOptions' => $propertyOptions,
            'filters' => [
                'initial_date' => $initialDate,
                'final_date' => $finalDate,
                'contact_origin' => $contactOrigin,
                'notified_until' => $notifiedUntil,
                'temperature' => $temperature,
                'search' => $search,
            ]
        ]);
    }

    public function property(Property $property)
    {
        Gate::authorize('show', $property);

        //$client = Client::find($client->id)->load('wishe.regions');
        $property = Property::find($property->id)->load('region');

        $property->typ = $property->typ();

        $clients = Client::with(['wishe.regions', 'user'])->where('user_id', Auth::user()->id)->get();

        foreach ($clients as $client) {
            if (!$client->wishe) {
                // Instead of creating a record in the DB during a GET request,
                // we create a temporary instance in memory for the compatibility check.
                $newWishe = new \App\Models\Wishe([
                    'type' => 'apartamento',
                    'rooms' => 2,
                    'suites' => 0,
                    'garages' => 1,
                    'bathrooms' => 1,
                ]);
                $client->setRelation('wishe', $newWishe);
            }

            $compatible = new Compatible($client, $property); // calss to compare client and property

            // Array of client region options ids
            $cli_reg_ids = $client->wishe->regions->pluck('id')->toArray();

            $client->wishe->typ_c = $compatible->string($client->wishe->type, $property->type)['class'];

            $client->wishe->range_c = $compatible->number($property->range(), $client->range())['class2'];

            $client->wishe->delivery_key_c = $compatible->date($client->wishe->delivery_key, $property->delivery_key)['class'];

            $client->wishe->building_area_c = $compatible->number($client->wishe->building_area, $property->building_area)['class'];

            $client->wishe->rooms_c = $compatible->number($client->wishe->rooms, $property->rooms)['class'];

            $client->wishe->suites_c = $compatible->number($client->wishe->suites, $property->suites)['class'];

            $client->wishe->garages_c = $compatible->number($client->wishe->garages, $property->garages)['class'];

            $client->wishe->balcony_c = $compatible->bool($client->wishe->balcony, $property->balcony)['class'];

            $client->wishe->region_c = $compatible->inArray($property->region->id ?? '', $cli_reg_ids ?? '')['class'];

            $client->wishe->pts = $compatible->pts;
        }

        // Convert to array after sorting
        $sortedClients = $clients->sortBy([ // Multi-level sorting
            ['pts', 'desc'], // Primary sort by pts descending
            ['name', 'asc'] // Secondary sort by client name ascending
        ])->values()->all();

        return Inertia::render('admin/notify/notify-property', [
            'clients' => $sortedClients,
            'property' => $property
        ]);
    }

    public function batchContacted(\Illuminate\Http\Request $request)
    {
        $clientIds = $request->input('ids', []);
        
        if (empty($clientIds)) {
            return response()->json(['message' => 'Nenhum cliente selecionado.'], 400);
        }

        Client::whereIn('id', $clientIds)
            ->where('user_id', Auth::id())
            ->update(['last_contact_at' => now()]);

        return response()->json(['message' => 'Contatos registrados com sucesso!']);
    }

    public function batchDestroy(\Illuminate\Http\Request $request)
    {
        $clientIds = $request->input('ids', []);
        
        if (empty($clientIds)) {
            return response()->json(['message' => 'Nenhum cliente selecionado.'], 400);
        }

        Client::whereIn('id', $clientIds)
            ->where('user_id', Auth::id())
            ->delete();

        return response()->json(['message' => 'Clientes excluídos com sucesso!']);
    }
}
