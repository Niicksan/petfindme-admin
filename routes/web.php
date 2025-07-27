<?php
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SignalController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect('/dashboard');
    }
    return redirect('/login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified', 'admin'])->name('dashboard');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/users/edit/{user}', [UserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/signals', [SignalController::class, 'index'])->name('signals.index');
    Route::get('/signals/{signal}', [SignalController::class, 'show'])->name('signals.show');
    Route::get('/signals/edit/{signal}', [SignalController::class, 'edit'])->name('signals.edit');
    Route::patch('/signals/{signal}', [SignalController::class, 'update'])->name('signals.update');
    Route::patch('/signals/activate/{signal}', [SignalController::class, 'activate'])->name('signals.activate');
    Route::patch('/signals/deactivate/{signal}', [SignalController::class, 'deactivate'])->name('signals.deactivate');
    Route::patch('/signals/archive/{signal}', [SignalController::class, 'archive'])->name('signals.archive');
    Route::patch('/signals/soft-delete/{signal}', [SignalController::class, 'softDelete'])->name('signals.soft-delete');
    Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::get('/contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Error pages
Route::get('/403', function () {
    return Inertia::render('Errors/403');
})->name('errors.403');

Route::get('/404', function () {
    return Inertia::render('Errors/404');
})->name('errors.404');

require __DIR__ . '/auth.php';
