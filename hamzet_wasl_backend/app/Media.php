<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'file',
        'post_id'
    ];
    public function posts()
    {
        return $this->belongsTo('App\Post');
    }
}
