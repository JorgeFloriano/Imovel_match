<?php

namespace App\Class;

use DateTime;

class Compatible
{
    public object $client;
    public object $property;
    public int $pts = 0;

    public $ok = [
        'text' => 'text-green-800',
        'bg' => 'bg-green-200',
        'class' => 'rounded-md bg-green-200 p-1 text-center text-green-800',
        'class2' => 'rounded-md bg-green-200 text-green-800 px-2 py-1',
    ];

    public $no = [
        'text' => 'text-red-800',
        'bg' => 'bg-red-200',
        'class' => 'rounded-md bg-red-200 p-1 text-center text-red-800',
        'class2' => 'rounded-md bg-red-200 text-red-800 px-2 py-1',
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

        $this->client->wishe->regions_msg = $this->client->wishe->regionsMsg();
        $this->client->wishe->regions_descr = $this->client->wishe->regionsDescr();
    }

    public function number($client_wishe, $property)
    {
        if ($property == null || $client_wishe == null) {
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
    public function inArray($client_wishe = null, $property = null)
    {
        if ($property == null || $client_wishe == null) {
            return [
                'class' => $this->undef['class2'],
                'count' => 1,
                'result' => null
            ];
        }

        if (in_array($client_wishe, $property)) {
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
}
