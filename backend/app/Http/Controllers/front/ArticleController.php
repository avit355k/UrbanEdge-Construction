<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //all active articles
    public function index()
    {
        $articles = Article::where('status', 1)->orderBy('created_at', 'desc')->get();
        return response()->json([
            'status'=>200,
            'data'=>$articles,
            'message'=>'Article List Fetched Successfully',
        ]);

    }
    //latest active articles
    public function latest()
    {
        $articles = Article::where('status', 1)
        ->orderBy('created_at')
        ->take(4)
        ->get();
        
        return response()->json([
            'status'=>200,
            'data'=>$articles,
            'message'=>'Article List Fetched Successfully',
        ]);
    }

    //show single article details
    public function show($id)
    {
        $article = Article::find($id);
         
         if(!$article){
            return response()->json([
                'status'=>404,
                'message'=>'Article Not Found',
            ]);
         }

         return response()->json([
            'status'=>200,
            'data'=>$article,
            'message'=>'Article Fetched Successfully',
        ]);
    }
}
