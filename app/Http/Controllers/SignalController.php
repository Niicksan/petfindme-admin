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

        $signals = Signal::with(['user', 'category', 'city', 'status'])
            ->orderByDesc('id')
            ->paginate($perPage, ['*'], 'page', $page)
            ->through(function ($signal) {
                return [
                    'id' => $signal->id,
                    'title' => $signal->title,
                    'user' => $signal->user ? $signal->user->name : null,
                    'category' => $signal->category ? $signal->category->name : null,
                    'city' => $signal->city ? $signal->city->name : null,
                    'status' => $signal->status ? $signal->status->name : null,
                    'is_active' => $signal->status && $signal->status->name === 'Активен',
                    'created_at' => $signal->created_at->toDateTimeString(),
                ];
            });

        return Inertia::render('Signals/Index', [
            'signals' => $signals,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Signal $signal)
    {
        Gate::authorize('view', $signal);

        return Inertia::render('Signals/Preview', [
            'signal' => $signal,
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

            return redirect(route('signals.index'))->with('success', 'Signal activated successfully');
        } catch (\Exception $e) {
            return redirect(route('signals.index'))->with('error', 'Failed to activate signal. Please try again.');
        }
    }

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

            return redirect()->route('signals.index')->with('success', 'Signal deactivated successfully');
        } catch (\Exception $e) {
            return redirect()->route('signals.index')->with('error', 'Failed to deactivate signal. Please try again.');
        }
    }

    public function archive(Signal $signal)
    {
        Gate::authorize('archive', $signal);

        try {
            $signal->update(['status_id' => 3, 'archived_at' => now()]);

            return redirect(route('signals.index'))->with('success', 'Signal archived successfully');
        } catch (\Exception $e) {
            return redirect(route('signals.index'))->with('error', 'Failed to archive signal. Please try again.');
        }
    }

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
}
