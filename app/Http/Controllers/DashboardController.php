<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Signal;
use App\Models\Contact;
use Inertia\Inertia;

class DashboardController extends Controller
{
	public function index()
	{
		$totalUsers = User::count();
		$totalSignals = Signal::count();
		$totalContacts = Contact::count();
		$newSignals = Signal::where('status_id', 1)->count();
		$newEmails = Contact::where('opened_at', null)->count();

		return Inertia::render('Dashboard', [
			'totalUsers' => $totalUsers,
			'totalSignals' => $totalSignals,
			'totalContacts' => $totalContacts,
			'newSignals' => $newSignals,
			'newEmails' => $newEmails,
		]);
	}
}