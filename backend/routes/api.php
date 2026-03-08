<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Employees\EmployeeController;
use App\Http\Controllers\Teams\TeamController;
use App\Http\Controllers\Projects\ProjectController;
use App\Http\Controllers\Tasks\TaskController;
use App\Http\Controllers\Timesheets\TimesheetController;
use App\Http\Controllers\Leaves\LeaveController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {

    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);

});


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::apiResource('employees', EmployeeController::class);

    Route::apiResource('teams', TeamController::class);

    Route::apiResource('projects', ProjectController::class);

    Route::apiResource('tasks', TaskController::class);

    Route::apiResource('timesheets', TimesheetController::class);

    Route::apiResource('leaves', LeaveController::class);

});