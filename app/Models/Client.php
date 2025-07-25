<?php

namespace App\Models;

use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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
    public function maritalStatOpt()
    {
        return [
            'solteiro' => 'Solteiro',
            'casado' => 'Casado',
            'divorciado' => 'Divorciado',
            'viúvo' => 'Viúvo',
        ];
    }
    public function boolOpt()
    {
        return [
            'true' => 'Sim',
            'false' => 'Não',
        ];
    }
    public function range()
    {
        if ($this->revenue <= 1518) {
            return 0;
        } elseif ($this->revenue <= 2800) {
            return 1;
        } elseif ($this->revenue <= 4600) {
            return 2;
        } elseif ($this->revenue <= 8500) {
            return 3;
        } elseif ($this->revenue <= 12500) {
            return 4;
        } else {
            return 5;
        }
    }

    // blocks access to other users' clients
    protected static function booted()
    {
        static::addGlobalScope('user', function (Builder $builder) {
            $builder->where('user_id', Auth::id());
        });
    }
}
