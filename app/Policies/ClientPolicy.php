<?php

namespace App\Policies;

use App\Models\Client;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

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

    public function canStore(User $user): Response
    {
        if ($user->isSuperAdmin()) {
            return Response::allow();
        }
        $numberOfClients = Client::where('user_id', $user->id)->count();
        if ($numberOfClients >= 10) {
            return Response::deny('Você já atingiu o limite de 10 clientes.');
        }
        return Response::allow();
    }
}
