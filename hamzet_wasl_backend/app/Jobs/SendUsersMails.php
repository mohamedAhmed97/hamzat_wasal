<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Mail\UsersMails;
use App\Mail\MentorMail;
use App\Mail\AprroveMentor;
use App\Mail\AprrovePost;
use Illuminate\Support\Facades\Mail;
class SendUsersMails implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $email;
    protected $role;
    public function __construct($email,$role)
    {
        $this->email=$email;
        $this->role=$role;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {   
        if($this->role==1)
        {
            Mail::to($this->email)->send(new MentorMail());  
        }
        else
        {
            Mail::to($this->email)->send(new UsersMails());
        }


        if($this->role==3)
        {
            Mail::to($this->email)->send(new AprrovePost());
        }
        
        if($this->role==4)
        {
            Mail::to($this->email)->send(new AprroveMentor());
        }
        
    }
}
