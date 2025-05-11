<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishe extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'wishes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'district_id',
        'region_id',
        'type',
        'rooms',
        'bathrooms',
        'suites',
        'garages',
        'delivery_key',
        'building_area',
        'installment_payment',
        'air_conditioning',
        'garden',
        'pool',
        'balcony',
        'acept_pets',
        'acessibility',
        'obs',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'delivery_key' => 'date',
        'installment_payment' => 'boolean',
        'garden' => 'boolean',
        'pool' => 'boolean',
        'balcony' => 'boolean',
        'acept_pets' => 'boolean',
        'acessibility' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the district that owns the wishe.
     */
    public function district()
    {
        return $this->belongsTo(District::class);
    }

    // App/Models/Wishe.php
    public function regions()
    {
        return $this->belongsToMany(Region::class, 'region_wishe', 'wishe_id', 'region_id');
    }

    public function typ()
    {
        if (isset($this->type)) {
            switch ($this->type) {
                case 'casa':
                    return 'Casa';
                case 'casa (condom.)':
                    return 'Casa (Con.)';
                case 'apart. c/ elevad.':
                    return 'AP c/e';
                case 'apartamento':
                    return 'AP.';
                case 'sobrado':
                    return 'Sobrado';
                case 'loja':
                    return 'Loja';
                case 'garagem':
                    return 'Garagem';
                case 'sala':
                    return 'Sala';
                case 'outros':
                    return 'Outro';
                case 'terreno':
                    return 'Terreno';
                default:
                    return '';
            }
        }
        return '';
    }
}
