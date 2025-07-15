<?php

namespace App\Policies;

use App\Models\Client;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClientPolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can view the model.
     */

    public function edit(User $user, Client $client): bool
    {
        return $user->id === $client->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */

    public function update(User $user, Client $client): bool
    {
        return $user->id === $client->user_id;
    }

    /**
     * Determine whether the user can show the model.
     */
    public function show(User $user, Client $client): bool
    {
        return $user->id === $client->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Client $client): bool
    {
        return $user->id === $client->user_id;
    }
}
