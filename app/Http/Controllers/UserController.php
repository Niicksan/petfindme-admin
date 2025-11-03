<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
	public function index()
	{
		$perPage = request('per_page', 10);
		$page = request('page', 1);

		// Get filter parameters
		$name = request('name');
		$email = request('email');
		$role = request('role');
		$status = request('status');

		$query = User::with('role')
			->orderByDesc('id')
			// ->where('role_id', '!=', 1) // exclude admin role
			->select('id', 'name', 'email', 'role_id', 'is_active', 'created_at');

		// Apply filters
		if ($name) {
			$query->where('name', 'like', '%' . $name . '%');
		}

		if ($email) {
			$query->where('email', 'like', '%' . $email . '%');
		}

		if ($role) {
			$query->where('role_id', $role);
		}

		if ($status !== null && $status !== '') {
			$query->where('is_active', $status === 'Active' ? 1 : 0);
		}

		$users = $query->paginate($perPage, ['*'], 'page', $page);
		$users->through(function ($user) {
			return [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'role' => $user->role ? $user->role->name : null,
				'status' => $user->is_active ? 'Active' : 'Inactive',
				'created_at' => $user->created_at->toDateTimeString(),
			];
		});

		return Inertia::render('Users/Index', [
			'users' => $users,
			'roles' => \App\Models\Role::all(),
			'filters' => [
				'name' => $name,
				'email' => $email,
				'role' => $role,
				'status' => $status,
			],
		]);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(User $user)
	{
		Gate::authorize('view', $user);

		return Inertia::render('Users/Preview', [
			'user' => [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'role' => $user->role ? $user->role->name : null,
				'status' => $user->is_active ? 'Active' : 'Inactive',
				'created_at' => $user->created_at->toDateTimeString(),
			],
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(User $user)
	{
		Gate::authorize('update', $user);

		return Inertia::render('Users/Edit', [
			'user' => [
				'id' => $user->id,
				'name' => $user->name,
				'email' => $user->email,
				'role_id' => $user->role_id,
				'is_active' => $user->is_active,
			],
			'roles' => \App\Models\Role::all(),
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UserRequest $request, User $user)
	{
		Gate::authorize('update', $user);

		// Retrieve the validated input data
		$validated = $request->validated();

		// Only update password if it's provided
		if (empty($validated['password'])) {
			unset($validated['password']);
		}

		$user->update($validated);

		return redirect()->route('users.show', $user)->with('success', 'User updated successfully');
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(User $user)
	{
		Gate::authorize('forceDelete', $user);

		$user->delete();

		return redirect()->route('users.index')->with('success', 'User deleted successfully');
	}
}