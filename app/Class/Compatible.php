<?php

namespace App\Class;

use App\Models\Client;
use App\Models\Property;
use DateTime;
use Illuminate\Support\Facades\Auth;

class Compatible
{
    public object $client;
    public object $property;
    public int $pts = 0;

    public $ok = [
        'text' => 'text-green-800',
        'bg' => 'bg-green-200',
        'class' => 'rounded-md bg-green-200 p-1 text-center text-green-800 border-1 border-green-800',
        'class2' => 'rounded-md bg-green-200 text-green-800 px-2 py-1 border-1 border-green-800',
    ];

    public $no = [
        'text' => 'text-red-800',
        'bg' => 'bg-red-200',
        'class' => 'rounded-md bg-red-200 p-1 text-center text-red-800 border-1 border-red-800',
        'class2' => 'rounded-md bg-red-200 text-red-800 px-2 py-1 border-1 border-red-800',
    ];

    public $undef = [
        'text' => '',
        'bg' => '',
        'class' => 'p-1 text-center',
        'class2' => 'px-2 py-1',
    ];
    public function __construct($client = null, $property = null)
    {
        $this->calculateCompatibility($client, $property);
    }

    public function calculateCompatibility($client, $property)
    {
        if (!isset($client) || !isset($property)) {
            return 0;
        }
        $this->client = $client;

        $this->property = $property;

        $this->pts += $this->string($client->wishe->type, $property->type)['count'];

        $this->pts = $this->pts + ($this->number($this->property->range(), $this->client->range())['count'] * 3);

        $this->pts += $this->date($client->wishe->delivery_key, $property->delivery_key)['count'];

        $this->pts += $this->number($client->wishe->building_area, $property->building_area)['count'];

        $this->pts += $this->number($client->wishe->rooms, $property->rooms)['count'];

        $this->pts += $this->number($client->wishe->suites, $property->suites)['count'];

        $this->pts += $this->number($client->wishe->garages, $property->garages)['count'];

        $this->pts += $this->bool($client->wishe->balcony, $property->balcony)['count'];

        $this->pts += $this->inArray($property->region_id, $client->wishe->regions()->get()->pluck('id')->toArray())['count'];

        $this->pts += $this->number($client->wishe->bathrooms, $property->bathrooms)['count'] - 1;

        $this->pts += $this->string($client->wishe->air_conditioning, $property->air_conditioning)['count'] - 1;

        $this->pts += $this->bool($client->wishe->garden, $property->garden)['count'] - 1;

        $this->pts += $this->bool($client->wishe->pool, $property->pool)['count'] - 1;

        $this->pts += $this->bool($client->wishe->acept_pets, $property->acept_pets)['count'] - 1;

        $this->pts += $this->bool($client->wishe->acessibility, $property->acessibility)['count'] - 1;

        $this->pts += $this->bool($client->wishe->install_payment, $property->install_payment)['count'] - 1;

        $this->pts += $this->bool($client->wishe->min_act, $property->min_act)['count'] - 1;

        $this->client->wishe->regions_msg = $this->client->wishe->regionsMsg();
        $this->client->wishe->regions_descr = $this->client->wishe->regionsDescr();
    }

    public function detailsData($client_id, $property_id)
    {
        $client = Client::find($client_id)->load('wishe.regions');

        $client->wishe->regions_msg = $client->wishe->regionsMsg();

        $client->wishe->regions_descr = $client->wishe->regionsDescr();

        $property = Property::with(['user', 'region'])->find($property_id);

        $compatible = new Compatible($client, $property); // calss to compare client and property

        $property->region_bool_c = $compatible->inArray($property->region->id ?? '', $client->wishe->regions()->get()->pluck('id')->toArray())['class'];

        return [
            'client' => $client,
            'property' => $property,
            'match' => [
                'type' => $compatible->string(
                    $client->wishe->type,
                    $property->type
                )['result'],

                'range' => $compatible->number(
                    $compatible->property->range(),
                    $compatible->client->range()
                )['result'],

                'delivery_key' => $compatible->date(
                    $client->wishe->delivery_key,
                    $property->delivery_key
                )['result'],

                'building_area' => $compatible->number(
                    $client->wishe->building_area,
                    $property->building_area
                )['result'],

                'rooms' => $compatible->number(
                    $client->wishe->rooms,
                    $property->rooms
                )['result'],

                'suites' => $compatible->number(
                    $compatible->client->wishe->suites,
                    $compatible->property->suites
                )['result'],

                'garages' => $compatible->number(
                    $client->wishe->garages,
                    $property->garages
                )['result'],

                'balcony' => $compatible->bool(
                    $client->wishe->balcony,
                    $property->balcony
                )['result'],

                'region' => $compatible->inArray(
                    $property->region->id ?? '',
                    $client->wishe->regions()
                        ->get()->pluck('id')->toArray()
                )['result'],

                'bathrooms' => $compatible->number(
                    $client->wishe->bathrooms,
                    $property->bathrooms
                )['result'],

                'air_conditioning' => $compatible->string(
                    $client->wishe->air_conditioning,
                    $property->air_conditioning
                )['result'],

                'garden' => $compatible->bool(
                    $client->wishe->garden,
                    $property->garden
                )['result'],

                'pool' => $compatible->bool(
                    $client->wishe->pool,
                    $property->pool
                )['result'],

                'acept_pets' => $compatible->bool(
                    $client->wishe->acept_pets,
                    $property->acept_pets
                )['result'],

                'acessibility' => $compatible->bool(
                    $client->wishe->acessibility,
                    $property->acessibility
                )['result'],

                'installment_payment' => $compatible->bool(
                    $client->wishe->installment_payment,
                    $property->installment_payment
                )['result'],

                'min_act' => $compatible->number(
                    $property->min_act,
                    $client->wishe->min_act
                )['result']
            ]
        ];
    }

    public function dashboardData($conection_object)
    {
        return [
            'matches' => $conection_object->map(function ($compatible, $key) {
                return [
                    'pts' => $compatible->pts,
                    'id' => $key,
                    'client_id' => $compatible->client->id,
                    'client_name' => $compatible->client->name,
                    'property_id' => $compatible->property->id,
                    'property_description' => $compatible->property->description,
                    'type' => $compatible->string(
                        $compatible->client->wishe->type,
                        $compatible->property->type
                    )['result'],

                    'range' => $compatible->number(
                        $compatible->property->range(),
                        $compatible->client->range()
                    )['result'],

                    'delivery_key' => $compatible->date(
                        $compatible->client->wishe->delivery_key,
                        $compatible->property->delivery_key
                    )['result'],

                    'building_area' => $compatible->number(
                        $compatible->client->wishe->building_area,
                        $compatible->property->building_area
                    )['result'],

                    'rooms' => $compatible->number(
                        $compatible->client->wishe->rooms,
                        $compatible->property->rooms
                    )['result'],

                    'suites' => $compatible->number(
                        $compatible->client->wishe->suites,
                        $compatible->property->suites
                    )['result'],

                    'garages' => $compatible->number(
                        $compatible->client->wishe->garages,
                        $compatible->property->garages
                    )['result'],

                    'balcony' => $compatible->bool(
                        $compatible->client->wishe->balcony,
                        $compatible->property->balcony
                    )['result'],

                    'region' => $compatible->inArray(
                        $compatible->property->region->id ?? '',
                        $compatible->client->wishe->regions()
                            ->get()->pluck('id')->toArray()
                    )['result'],
                ];
            })->toArray(),
            'clientOptions' => Client::where('user_id', Auth::user()->id)->orderBy('name')->get()->map(fn($client) => [
                'value' => strval($client->id), // Convert to string
                'label' => $client->name,
            ])->prepend([
                'value' => '0',
                'label' => 'Selecionar todos',
            ])->all(),
            'propertyOptions' => Property::where('user_id', Auth::user()->id)->orderBy('description')->get()->map(fn($property) => [
                'value' => strval($property->id), // Convert to string
                'label' => $property->description,
            ])->prepend([
                'value' => '0',
                'label' => 'Selecionar todos',
            ])->all(),
        ];
    }

    public function number($client_wishe, $property)
    {
        if ($property === null || $client_wishe === null) {
            return [
                'class' => $this->undef['class'],
                'class2' => $this->undef['class2'],
                'count' => 1,
                'result' => null
            ];
        } elseif ($client_wishe > $property) {
            return [
                'class' => $this->no['class'],
                'class2' => $this->no['class2'],
                'count' => 0,
                'result' => false
            ];
        }

        return [
            'class' => $this->ok['class'],
            'class2' => $this->ok['class2'],
            'count' => 2,
            'result' => true
        ];
    }

    public function bool($client_wishe, $property)
    {
        if (($property === false || $property === true) &&
            ($client_wishe === true || $client_wishe === false) &&
            $client_wishe != $property
        ) {
            return [
                'class' => $this->no['class'],
                'count' => 0,
                'result' => false
            ];
        }

        if ($client_wishe === $property && $client_wishe !== null) {
            return [
                'class' => $this->ok['class'],
                'count' => 2,
                'result' => true
            ];
        }

        return [
            'class' => $this->undef['class'],
            'count' => 1,
            'result' => null
        ];
    }

    public function string($client_wishe = null, $property = null)
    {
        if ($property == null || $client_wishe == null) {
            return [
                'class' => $this->undef['class2'],
                'count' => 1,
                'result' => null
            ];
        }

        if ($client_wishe == $property) {
            return [
                'class' => $this->ok['class2'],
                'count' => 2,
                'result' => true
            ];
        }

        return [
            'class' => $this->no['class2'],
            'count' => 0,
            'result' => false
        ];
    }
    public function date($client_wishe, $property)
    {
        if ($property == null || $client_wishe == null) {
            return [
                'class' => $this->undef['class'],
                'class2' => $this->undef['class2'],
                'count' => 1,
                'result' => null
            ];
        }

        $client_wishe = new DateTime($client_wishe);
        $property = new DateTime($property);

        if ($client_wishe >= $property) {
            return [
                'class' => $this->ok['class'],
                'class2' => $this->ok['class2'],
                'count' => 2,
                'result' => true
            ];
        }

        return [
            'class' => $this->no['class'],
            'class2' => $this->no['class2'],
            'count' => 0,
            'result' => false
        ];
    }
    public function inArray($property = null, $client_wishe = null)
    {
        if ($property == null || $client_wishe == null) {
            return [
                'class' => $this->undef['class'],
                'count' => 1,
                'result' => null
            ];
        }

        if (in_array($property, $client_wishe)) {
            return [
                'class' => $this->ok['class'],
                'count' => 2,
                'result' => true
            ];
        }

        return [
            'class' => $this->no['class'],
            'count' => 0,
            'result' => false
        ];
    }
}
