<?php

namespace App\Class;

class Compatible {
    public function color($bool) {
        if ($bool) {
            return [
                'text' => 'text-green-800',
                'bg' => 'bg-green-200',
                'class' => 'rounded-md bg-green-200 p-1.5 text-center text-green-800'
            ];
        }
        return [
            'text' => '',
            'bg' => '',
            'class' => ''
        ];
    }
    public function number($client_wishe, $property) {
        $return['color'] = $this->color($client_wishe == $property && $client_wishe != null);
        $return['result'] = $client_wishe == $property;
        return $return;
    }
}