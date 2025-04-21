<?php

namespace App\Class;

class Compatible {
    public function color($bool) {
        if ($bool) {
            return [
                'text' => 'text-green-800',
                'bg' => 'bg-green-200',
            ];
        }
        return [
            'text' => '',
            'bg' => '',
        ];
    }
    public function number($client_wishe, $property) {
        $return['color'] = $this->color($client_wishe == $property && $client_wishe != null);
        $return['result'] = $client_wishe == $property;
        return $return;
    }
}