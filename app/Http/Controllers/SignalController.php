<?php

namespace App\Http\Controllers;

use Gate;
use Inertia\Inertia;
use App\Models\Signal;
use App\Http\Requests\UpdateSignalRequest;

class SignalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request('per_page', 10);
        $page = request('page', 1);

        // Get filter parameters
        $title = request('title');
        $category = request('category');
        $city = request('city');
        $status = request('status');

        $query = Signal::with(['user', 'category', 'city', 'status'])
            ->orderByDesc('id');

        // Apply filters
        if ($title) {
            $query->where('title', 'like', '%' . $title . '%');
        }

        if ($category) {
            $query->where('category_id', $category);
        }

        if ($city) {
            $query->where('city_id', $city);
        }

        if ($status) {
            $query->where('status_id', $status);
        }

        $signals = $query->paginate($perPage, ['*'], 'page', $page);
        $signals->through(function ($signal) {
            return [
                'id' => $signal?->id,
                'title' => $signal?->title,
                'user' => $signal?->user?->name,
                'category' => $signal?->category?->name,
                'city' => $signal?->city?->name,
                'status' => $signal?->status?->name,
                'is_active' => $signal->status && $signal->status->name === 'Активен',
                'created_at' => $signal->created_at->toDateTimeString(),
            ];
        });

        return Inertia::render('Signals/Index', [
            'signals' => $signals,
            'categories' => \App\Models\Category::all(),
            'cities' => \App\Models\City::all(),
            'statuses' => \App\Models\Status::all(),
            'filters' => [
                'title' => $title,
                'category' => $category,
                'city' => $city,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Signal $signal)
    {
        Gate::authorize('view', $signal);

        return Inertia::render('Signals/Preview', [
            'signal' => [
                'id' => $signal->id,
                'title' => $signal->title,
                'contact_name' => $signal->contact_name,
                'phone' => $signal->phone,
                'geolocation' => $signal->geolocation,
                'description' => $signal->description,
                'created_at' => $signal->created_at->toDateTimeString(),
                'user' => $signal->user ? [
                    'name' => $signal->user->name,
                    'email' => $signal->user->email,
                ] : null,
                'category' => $signal->category ? [
                    'name' => $signal->category->name,
                ] : null,
                'city' => $signal->city ? [
                    'name' => $signal->city->name,
                ] : null,
                'status' => $signal->status ? [
                    'name' => $signal->status->name,
                ] : null,
            ],
            'images' => $signal->images->map(function ($image) {
                return [
                    'path' => $image->path,
                ];
            }),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Signal $signal)
    {
        Gate::authorize('update', $signal);

        return Inertia::render('Signals/Edit', [
            'signal' => $signal,
            'categories' => \App\Models\Category::all(),
            'cities' => \App\Models\City::all(),
            'statuses' => \App\Models\Status::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSignalRequest $request, Signal $signal)
    {
        Gate::authorize('update', $signal);

        // Retrieve the validated input data
        $validated = $request->validated();

        $signal->update($validated);

        return redirect()->route('signals.index');
    }

    /**
     * Activate the specified resource.
     */
    public function activate(Signal $signal)
    {
        Gate::authorize('activate', $signal);

        try {
            $updateData = ['status_id' => 2];

            // Only set archived_at to null if it already has a value
            if ($signal->archived_at !== null) {
                $updateData['archived_at'] = null;
            }

            // Only set deleted_at to null if it already has a value
            if ($signal->deleted_at !== null) {
                $updateData['deleted_at'] = null;
            }

            $signal->update($updateData);

            return $this->redirectOnSuccess($signal, 'Signal activated successfully');
        } catch (\Exception $e) {
            return $this->redirectOnError($signal, 'Failed to activate signal. Please try again.');
        }
    }

    /**
     * Deactivate the specified resource.
     */
    public function deactivate(Signal $signal)
    {
        Gate::authorize('deactivate', $signal);

        try {
            $updateData = ['status_id' => 1];

            // Only set archived_at to null if it already has a value
            if ($signal->archived_at !== null) {
                $updateData['archived_at'] = null;
            }

            // Only set deleted_at to null if it already has a value
            if ($signal->deleted_at !== null) {
                $updateData['deleted_at'] = null;
            }

            $signal->update($updateData);

            return $this->redirectOnSuccess($signal, 'Signal deactivated successfully');
        } catch (\Exception $e) {
            return $this->redirectOnError($signal, 'Failed to deactivate signal. Please try again.');
        }
    }

    /**
     * Archive the specified resource.
     */
    public function archive(Signal $signal)
    {
        Gate::authorize('archive', $signal);

        try {
            $signal->update(['status_id' => 3, 'archived_at' => now()]);

            return $this->redirectOnSuccess($signal, 'Signal archived successfully');
        } catch (\Exception $e) {
            return $this->redirectOnError($signal, 'Failed to archive signal. Please try again.');
        }
    }

    /**
     * Soft delete the specified resource.
     */
    public function softDelete(Signal $signal)
    {
        Gate::authorize('delete', $signal);

        try {
            $signal->update(['status_id' => 4, 'deleted_at' => now()]);

            return redirect(route('signals.index'))->with('success', 'Signal soft deleted successfully');
        } catch (\Exception $e) {
            return redirect(route('signals.index'))->with('error', 'Failed to soft delete signal. Please try again.');
        }
    }

    /**
     * Helper method to redirect based on previous URL
     */
    private function redirectOnSuccess(Signal $signal, string $successMessage, string $errorMessage = null)
    {
        $previousUrl = url()->previous();
        $previewRoute = route('signals.show', $signal->id);

        if ($previousUrl === $previewRoute) {
            return redirect($previewRoute)->with('success', $successMessage);
        }

        return redirect(route('signals.index'))->with('success', $successMessage);
    }

    /**
     * Helper method to redirect on error based on previous URL
     */
    private function redirectOnError(Signal $signal, string $errorMessage)
    {
        $previousUrl = url()->previous();
        $previewRoute = route('signals.show', $signal->id);

        if ($previousUrl === $previewRoute) {
            return redirect($previewRoute)->with('error', $errorMessage);
        }

        return redirect(route('signals.index'))->with('error', $errorMessage);
    }
}