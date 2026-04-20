<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

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
    //store member
    public function store(Request $request)
    {
      $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job-title' => 'required',
            'linkdin' => 'nullable|url',
            'image'=>'nullable|image|mimes:jpeg,png,jpg,webp,avif|max:5120',  
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        };

        $model = new member();
        $model->name = $request->input('name');
        $model->job_title = $request->input('job-title');
        $model->linkdin = $request->input('linkdin');

        $model->save();

            // Image Upload
            if ($request->hasFile('image') && $request->file('image')->isValid()) {

                $image = $request->file('image');

                $filename = time() . '_' . $model->id . '.' . $image->getClientOriginalExtension();

                $destination = public_path('uploads/members');

                // Create the destination directory if it doesn't exist
                if (!File::exists($destination)) {
                    File::makeDirectory($destination, 0755, true);
                }

                $manager = ImageManager::usingDriver(Driver::class);

                // decode image
                $img = $manager->decode($image->getPathname());

                // resize + compress
                $img->scaleDown(1200); // max width
                $img->save($destination . '/' . $filename);

                $model->image = $filename;
                $model->save();
            }

            return response()->json([
                'status' => 200,
                'data' => $model,
                'message' => 'Member Created Successfully',
            ]);
    }
    //show single member
    public function show($id)
    {
        $member = member::find($id);

        if (!$member) {
            return response()->json([
                'status' => 404,
                'message' => 'Member Not Found',
            ]);
        }

        return response()->json([
            'status' => 200,
            'data' => $member,
            'message' => 'Member Fetched Successfully',
        ]);
    }
    //update member
    public function update(Request $request, $id)
    {   
        $Members = member::find($id);

                if (!$Members) {
                 return response()->json([
                'status' => 404,
                'message' => 'Member Not Found',
                ]);
               }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job-title' => 'required',
            'linkdin' => 'nullable|url',
            'image'=>'nullable|image|mimes:jpeg,png,jpg,webp,avif|max:5120',  
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        };

        
        $Members->name = $request->input('name');
        $Members->job_title = $request->input('job-title');
        $Members->linkdin = $request->input('linkdin');

              //update image
                if ($request->hasFile('image') && $request->file('image')->isValid()) {

            // Delete old image if exists
            if ($Members->image) {
                 File::delete(public_path('uploads/members' . $Members->image));
            }

            $image = $request->file('image');

            $filename = time() . '_' . $Members->id . '.' . $image->getClientOriginalExtension();

            $destination = public_path('uploads/members');

            // Create the destination directory if it doesn't exist
            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $manager = ImageManager::usingDriver(Driver::class);

            // decode image
            $img = $manager->decode($image->getPathname());

            // resize + compress
            $img->scaleDown(1200); // max width
            $img->save($destination . '/' . $filename);

            $Members->image = $filename;
           }

        $Members->save();

        return response()->json([
            'status' => 200,
            'data' => $Members,
            'message' => 'Member Updated Successfully',
        ]);
    }
    //delete member
    public function destroy($id)
    {
        $member = member::find($id);

        if (!$member) {
            return response()->json([
                'status' => 404,
                'message' => 'Member Not Found',
            ]);
        }

        // Delete image if exists
        if ($member->image) {
            File::delete(public_path('uploads/members' . $member->image));
        }

        $member->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Member Deleted Successfully',
        ]);
    }
}
