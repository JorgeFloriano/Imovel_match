<?php

namespace App\Class;

class Compatible {
    public function color($bool) {
        if ($bool) {
            return 'green-500';
        }
        return 'red-500';
    }
    public function number($client_wishe, $property) {
        $return['color'] = $this->color($client_wishe == $property);
        $return['result'] = $client_wishe == $property;
        return $return;
    }
}