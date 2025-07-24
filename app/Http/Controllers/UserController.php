<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserController extends Controller
{
	public function index()
	{
		$users = User::with('role')
			->orderByDesc('id')
			// ->where('role_id', '!=', 1) // exclude admin role
			->select('id', 'name', 'email', 'role_id', 'is_active', 'created_at')
			->get()
			->map(function ($user) {
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
	 * Remove the specified resource from storage.
	 */
	public function destroy(User $user)
	{
		Gate::authorize('forceDelete', $user);

		$user->delete();

		return redirect()->route('users.index')->with('success', 'User deleted successfully');
	}
}