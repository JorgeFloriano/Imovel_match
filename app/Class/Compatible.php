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
        'class' => '',
    ];

   
    public function number($client_wishe = null, $property = null)
    {
        $return['class'] = $this->undef['class'];
        

        return $return;
    }

    public function bool($client_wishe = null, $property = null)
    {
       
    }
}
