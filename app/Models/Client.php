<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'clients';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'wishe_id',
        'name',
        'phone',
        'email',
        'address',
        'marital_status',
        'need_financing',
        'dependents',
        'profession',
        'revenue',
        'capital',
        'fgts',
        'has_property',
        'compromised_income',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'need_financing' => 'boolean',
        'has_property' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the client.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the wish associated with the client.
     */
    public function wishe()
    {
        return $this->hasOne(Wishe::class, 'client_id');
    }
}