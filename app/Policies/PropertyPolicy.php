<?php

namespace App\Policies;

use App\Models\Property;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

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
}
