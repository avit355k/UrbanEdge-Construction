<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Mail\ContactEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
            ]);
        }

         $mailData = $request->only([
            'name', 'email', 'phone', 'subject', 'message'
        ]);

        try {
        Mail::to('urbanedge@admin.com')->send(new ContactEmail($mailData));

        return response()->json([
            'status' => true,
            'message' => 'Message sent successfully',
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
    }
}
