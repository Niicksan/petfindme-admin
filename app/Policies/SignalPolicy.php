<?php

namespace App\Policies;

use App\Models\User;

class SignalPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user !== null && $user->role_id === 1;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user): bool
    {
        return $user !== null && $user->role_id === 1;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user !== null && $user->role_id === 1;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return $user !== null && $user->role_id === 1;
    }

    /**
     * Determine whether the user can activate the model.
     */
    public function activate(User $user): bool
    {
        dd($$user->role_id === 1);
        return $user !== null && $user->role_id === 1;
    }

    /**
     * Determine whether the user can deactivate the model.
     */
    public function deactivate(User $user): bool
    {
        return $user !== null && $user->role_id === 1;
    }
    /**
     * Determine whether the user can archive the model.
     */
    public function archive(User $user): bool
    {
        return $user !== null && $user->role_id === 1;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        return $user !== null && $user->role_id === 1;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user): bool
    {
        return $user !== null && $user->role_id === 1;
    }
}
