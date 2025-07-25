<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\CustomResetPasswordNotification;


class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new CustomResetPasswordNotification($token));
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super-admin';
    }

    public function canStoreClient(): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }
        $numberOfClients = Client::where('user_id', $this->id)->count();
        if ($numberOfClients >= 10) {
            return false;
        }
        return true;
    }

    public function canStoreProperty(): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }
        $numberOfProperties = Property::where('user_id', $this->id)->count();
        if ($numberOfProperties >= 5) {
            return false;
        }
        return true;
    }

    // Delete all related models when the user is deleted
    protected static function booted()
    {
        static::deleting(function ($user) {
            // Delete all properties
            $user->properties()->delete();

            // Delete all clients and their wishes
            $user->clients()->each(function ($client) {
                $client->wish()->delete();
                $client->delete();
            });

            // Add any other related models here
        });
    }
}
