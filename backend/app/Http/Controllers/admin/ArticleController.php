<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ArticleController extends Controller
{
    //show all articles
    public function index()
    {
        $articles = Article::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'data' => $articles,
            'message' => 'Article List Fetched Successfully',
        ]);
    }
    //store a new article
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug',
            'image'=>'nullable|image|mimes:jpeg,png,jpg,webp,avif|max:5120',  
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ], 422);
        };

        $model = new Article();
        $model->title = $request->input('title');
        $model->slug = Str::slug($request->input('slug'));
        $model->content = $request->input('content');
        $model->author = $request->input('author');
        $model->status = $request->input('status');
        
        $model->save();
           
            // Iamage Upload
            if ($request->hasFile('image') && $request->file('image')->isValid()) {

                $image = $request->file('image');

                $filename = time() . '_' . $model->id . '.' . $image->getClientOriginalExtension();

                $destination = public_path('uploads/Articles');

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
                'message' => 'Article Added Successfully',
            ]);

    }
    //show a single article
    public function show($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'status' => 404,
                'message' => 'Article Not Found',
            ]);
        }

        return response()->json([
            'status' => 200,
            'data' => $article,
            'message' => 'Article Fetched Successfully',
        ]);
    }
    //update an article
    public function update(Request $request, $id)
    {
            $article = Article::find($id);
    
            if (!$article) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Article Not Found',
                ]);
            }

            $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,' . $id,
            'image'=>'nullable|image|mimes:jpeg,png,jpg,webp,avif|max:5120',  
        ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->messages(),
                ], 422);
            }

            $article->title = $request->input('title');
            $article->slug = Str::slug($request->input('slug'));
            $article->content = $request->input('content');
            $article->author = $request->input('author');

                // upate image
                if ($request->hasFile('image') && $request->file('image')->isValid()) {

            // Delete old image if exists
            if ($article->image) {
                 File::delete(public_path('uploads/articles' . $article->image));
            }

            $image = $request->file('image');

            $filename = time() . '_' . $article->id . '.' . $image->getClientOriginalExtension();

            $destination = public_path('uploads/articles');

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

            $article->image = $filename;
           }
            $article->save();

            return response()->json([
                'status' => 200,
                'message' => 'Article Updated Successfully',
            ]);

    }
    //delete an article
    public function destroy($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'status' => 404,
                'message' => 'Article Not Found',
            ]);
        }

        // Delete image if exists
        if ($article->image) {
            File::delete(public_path('uploads/articles' . $article->image));
        }

        $article->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Article Deleted Successfully',
        ]);
    }
}
