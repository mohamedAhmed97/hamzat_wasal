<?php

use Illuminate\Database\Seeder;
use App\User;

class CreateAdmin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user=User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'avatar'=>'miimi.png',
            'isAdmin'=>2,
            'email_verified_at'=>'2020-06-23 10:46:56',
        ]);
        $user->assignRole('admin');
    }
}
