<?php

use App\Http\Controllers\AuthController;

use App\Http\Controllers\DataExtraction;
use App\Http\Controllers\DraftController;
use App\Http\Controllers\PostSchedulerController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\PosteController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewPasswordController;


// 

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/







//Route::post('/publication', [SocialiteController::class, 'handleGraphInteraction']);
//Route::post('/planification', [PostSchedulerController::class, 'schedulePost']);
Route::get('/index', [SocialiteController::class, 'index']);
Route::get('/extractFacebookData', [DataExtraction::class, 'extractFacebookData']);
Route::put('/updatePlanification/{id}', [SocialiteController::class, 'updatePlanification']);
Route::get('/facebook-data', [DataExtraction::class, 'extractFacebookData']);
//Route::post('/saveDraft', [DraftController::class, 'saveDraft']);

Route::middleware('auth:sanctum')->post('/saveDraft', [DraftController::class, 'saveDraft']);

Route::middleware('auth:sanctum')->post('/publication', [SocialiteController::class, 'handleGraphInteraction']);

Route::middleware('auth:sanctum')->post('/planification', [PostSchedulerController::class, 'schedulePost']);

Route::middleware('auth:sanctum')->post('/instagram', [PosteController::class, 'planificationfinal2']);

//genereria
Route::post('genereria', [PosteController::class, 'genereria'])->name('genereria');

Route::middleware('auth:sanctum')->get('/images', [PosteController::class, 'index']);

Route::get('imagesadm', [PosteController::class, 'indexadm'])->name('imagesadm');

Route::middleware('auth:sanctum')->get('/imagesplanif', [PosteController::class, 'planifies']);
Route::get('imagesplaniftest', [PosteController::class, 'planifiestesttt'])->name('imagesplaniftest');
Route::get('imagesdrafttest', [PosteController::class, 'drafttesttt'])->name('imagesdrafttest');
Route::get('imagespubliertest', [PosteController::class, 'publiertesttt'])->name('imagespubliertest');
Route::get('showparid/{id}', [PosteController::class, 'showid']);
Route::middleware('auth:sanctum')->put('plandraft/{post_id}', [PosteController::class, 'scheduleDraft']);
Route::middleware('auth:sanctum')->put('pubdraft/{post_id}', [PosteController::class, 'publishDraft']);



Route::get('sms', [PosteController::class, 'getsms'])->name('sms');
Route::get('email', [PosteController::class, 'email'])->name('email');
//Route::put('imagesplanif/{post}', [PosteController::class, 'update'])->name('imagesplanif');
Route::middleware('auth:sanctum')->put('imagesplanif/{post}', [PosteController::class, 'update']);
Route::get('/post/{postId}', [PosteController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/auth', [AuthController::class, 'auth']);
   // Route::get('/imagesplanif', [PosteController::class, 'planifies']);


    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/email', [AuthController::class, 'sendResetLinkEmail']);
Route::post('/reset', [AuthController::class, 'reset']);


Route::post('forgot-password', [NewPasswordController::class, 'forgotPassword']);
Route::post('reset-password', [NewPasswordController::class, 'reset']);


Route::middleware('auth:sanctum')->post('/update-pwd', [AuthController::class, 'changePassword']);
Route::middleware('auth:sanctum')->post('/update-profile', [AuthController::class, 'updateProfile']);

Route::middleware('auth:sanctum')->get('/user-profile', [AuthController::class, 'userProfile']);











