<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
   public function authenticate(){
    //apply validator
        $validator = Validator::make(request()->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }else {
            $credentials = request()->only('email', 'password');

            if(Auth::attempt($credentials)){
                $user = User::find(Auth::user()->id);

                $token = $user->createToken('token')->plainTextToken;

                return response()->json([
                    'status' => true,
                    'message' => 'Authentication successful',
                    'id'=> $user->id,
                    'token' => $token
                ], 200);

            }else{
                 return response()->json([
                'status' => false,
                'message' => 'Invalid credentials',
                'errors' => $validator->errors()
            ], 422);
            }

            return response()->json([
                'status' => true,
                'message' => 'Validation successful'
            ], 200);
        }


   }

   public function logout(){
    $user = User::find(Auth::user()->id);
    $user->tokens()->delete();

    return response()->json([
        'status' => true,
        'message' => 'Logged out successfully'
    ], 200);
   }
}
