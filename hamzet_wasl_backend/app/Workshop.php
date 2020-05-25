<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    protected $fillable = [
        'title',
        'description',
        'start_day',
        'end_date',
        'capcity',
        'workshop_price',
        'admin_id',
        'category_id',
    ];

    public function categories()
    {
        return $this->belongsTo('App\Category', 'category_id', 'id');
    }
    

    public function admins()
    {
        return $this->belongsTo('App\Admin', 'admin_id', 'id');
    }
}
