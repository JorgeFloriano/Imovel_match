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
        if ($client_wishe == $property) {
            $return['class'] = $this->ok['class'];
            $return['count'] = 2;
        }

        if ($client_wishe != $property) {
            $return['class'] = $this->no['class'];
            $return['count'] = 0;
        }

        if ( in_array($client_wishe, [null, '']) || in_array($property, [null, '']) ) {
            $return['class'] = $this->undef['class'];
            $return['count'] = 1;
        }
        
        return $return;
    }

    public function bool($client_wishe = null, $property = null)
    {
       
    }
}
