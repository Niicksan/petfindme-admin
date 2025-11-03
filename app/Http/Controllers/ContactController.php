<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $perPage = request('per_page', 10);
        $page = request('page', 1);

        $contacts = Contact::orderByDesc('id')
            ->paginate($perPage, ['*'], 'page', $page)
            ->through(function ($contact) {
                return [
                    'id' => $contact->id,
                    'name' => $contact->name,
                    'email' => $contact->email,
                    'subject' => $contact->subject,
                    'message' => $contact->message,
                    'opened_at' => $contact->opened_at?->toDateTimeString(),
                    'created_at' => $contact->created_at->toDateTimeString(),
                ];
            });

        return Inertia::render('Contacts/Index', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        Gate::authorize('view', $contact);

        return Inertia::render('Contacts/Preview', [
            'contact' => [
                'id' => $contact->id,
                'name' => $contact->name,
                'email' => $contact->email,
                'subject' => $contact->subject,
                'message' => $contact->message,
                'created_at' => $contact->created_at->toDateTimeString(),
            ],
        ]);
    }

    /**
     * Mark the email as opened.
     */
    public function markAsOpened(Contact $contact)
    {
        Gate::authorize('view', $contact);

        if ($contact->opened_at === null) {
            $contact->update(['opened_at' => now()]);
        }

        return redirect()->route('contacts.show', $contact);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        Gate::authorize('forceDelete', $contact);

        $contact->delete();

        return redirect()->route('contacts.index')->with('success', 'Email deleted successfully');
    }
}
