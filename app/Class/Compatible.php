<?php

namespace App\Class;

class Compatible
{

    public $ok = [
        'text' => 'text-green-800',
        'bg' => 'bg-green-200',
        'class' => 'rounded-md bg-green-200 p-1 text-center text-green-800',
    ];

    public $no = [
        'text' => 'text-red-800',
        'bg' => 'bg-red-200',
        'class' => 'rounded-md bg-red-200 p-1 text-center text-red-800',
    ];

    public $undef = [
        'text' => '',
        'bg' => '',
        'class' => 'p-1 text-center',
    ];

   
    public function number($client_wishe = null, $property = null)
    {
        if ( in_array($client_wishe, [null, '']) || in_array($property, [null, '']) ) {
            return [
                'class' => $this->undef['class'],
                'count' => 1,
            ];
        }

        if ($client_wishe > $property) {
            return [
                'class' => $this->no['class'],
                'count' => 0,
            ];
        }
        
        return [
            'class' => $this->ok['class'],
            'count' => 2,
        ];
    }

    public function bool($client_wishe = null, $property = null)
    {
       
    }

    public function string($client_wishe = null, $property = null)
    {
       if ($client_wishe == $property) {
            return [
                'class' => $this->ok['class'],
                'count' => 2,
            ];
        }
        
        return [
            'class' => $this->undef['class'],
            'count' => 1,
        ];
    }
}
