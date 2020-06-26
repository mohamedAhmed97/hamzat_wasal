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
        'meeting_link',
        'meeting_password',
        'meeting_backup_link',
        'meeting_backup_password',
    ];

    public function categories()
    {
        return $this->belongsTo('App\Category', 'category_id', 'id');
    }
    
    // this is a function for many users can join many workshops(pivot table)
    public function users()
    {
        return $this->belongsToMany('App\User');
    }
    // function for mentor can create workshop
    public function user(){
        return $this->belongsTo('App\User');
    }
}
