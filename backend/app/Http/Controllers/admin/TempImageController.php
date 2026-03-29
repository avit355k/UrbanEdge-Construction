<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class TempImageController extends Controller
{
    public function store(Request $request)
    {
       $validator = Validator::make($request->all(),[
        'image'=>'required|image|mimes:jpeg,png,jpg,gif,svg,webp,avif|max:2048',
       ]);

       if($validator->fails()){
         return response()->json([
             'status'=>400,
             'errors'=>$validator->errors('image'),
         ]);
       }
         $image = $request->file('image');

         if(!empty($image)){
                $ext = $image->getClientOriginalExtension();
                $imageName = strtotime('now').'.'.$ext;

                $model = new TempImage();
                $model->name = $imageName;
                $model->save();

                $image->move(public_path('uploads/temp'), $imageName);

                //create small thumbnail
                $sourcePath = public_path('uploads/temp/'.$imageName);
                $destPath = public_path('uploads/temp/thumb/'.$imageName);
                $manager = ImageManager::usingDriver(Driver::class);
                $image = $manager->decode($sourcePath);
                $image->coverDown(600, 360);
                $image->save($destPath);

                  return response()->json([
                 'status'=>true,
                 'data'=>$model,
                'message'=>'Image Uploaded Successfully',
            ]);
         }else {
            return response()->json([
                'status'=>false,
                'message'=>'No Image Found',
            ]);
         }

          

    }
}
