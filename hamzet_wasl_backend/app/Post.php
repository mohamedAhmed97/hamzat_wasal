<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'category_id',
        'user_id',
        'description',
        'approval'
    ];
    
    public function categories()
    {
        return $this->belongsTo('App\Category', 'category_id', 'id');
    }
    public function users()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function media()
    {
       return $this->hasMany('App\Media');
    }
}
