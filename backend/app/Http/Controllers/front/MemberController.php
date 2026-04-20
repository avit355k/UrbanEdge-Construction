<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    //show all members
    public function index()
    {
        $members = member::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'data' => $members,
            'message' => 'Member List Fetched Successfully',
        ]);
    }

    //show member details
    public function show($id)
    {
        $member = member::find($id);

        if ($member) {
            return response()->json([
                'status' => 200,
                'data' => $member,
                'message' => 'Member Details Fetched Successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Member Not Found',
            ]);
        }
    }
}
