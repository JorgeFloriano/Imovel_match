<?php

namespace App\Policies;

use App\Models\Property;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PropertyPolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can view the model.
     */

    public function edit(User $user, Property $property): bool
    {
        return $user->id === $property->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */

    public function update(User $user, Property $property): bool
    {
        return $user->id === $property->user_id;
    }

    /**
     * Determine whether the user can show the model.
     */
    public function show(User $user, Property $property): bool
    {
        return $user->id === $property->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Property $property): bool
    {
        return $user->id === $property->user_id;
    }

    public function canStore(User $user): Response
    {
        if ($user->isSuperAdmin()) {
            return Response::allow();
        }
        $numberOfProperties = Property::where('user_id', $user->id)->count();
        if ($numberOfProperties >= 5) {
            return Response::deny('Você já atingiu o limite de 5 propriedades.');
        }
        return Response::allow();
    }
}
