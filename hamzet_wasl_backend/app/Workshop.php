<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'capcity',
        'workshop_price',
        'user_id',
        'category_id',
    ];

    public function categories()
    {
        return $this->belongsTo('App\Category', 'category_id', 'id');
    }
    

    public function users()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
