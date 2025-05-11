<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegionWishe extends Model
{
    protected $table = "region_wishe";
    protected $primaryKey = "id";

    public $timestamps = false;
    protected $fillable = [
        'region_id',
        'wishe_id',
    ];
}
