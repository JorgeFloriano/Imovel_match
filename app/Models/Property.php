<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'properties';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'district_id',
        'contact_name',
        'contact_phone',
        'contact_link',
        'type',
        'iptu',
        'description',
        'price',
        'land_area',
        'building_area',
        'image',
        'address',
        'rooms',
        'bathrooms',
        'suites',
        'garages',
        'floor',
        'building_floors',
        'property_floors',
        'delivery_key',
        'min_act',
        'installment_payment',
        'incc_financing',
        'documents',
        'finsh_type',
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
        'price' => 'integer',
        'land_area' => 'float',
        'building_area' => 'float',
        'delivery_key' => 'date',
        'installment_payment' => 'boolean',
        'incc_financing' => 'boolean',
        'documents' => 'boolean',
        'garden' => 'boolean',
        'pool' => 'boolean',
        'balcony' => 'boolean',
        'acept_pets' => 'boolean',
        'acessibility' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the property.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the district that owns the property.
     */
    public function district()
    {
        return $this->belongsTo(District::class);
    }
}