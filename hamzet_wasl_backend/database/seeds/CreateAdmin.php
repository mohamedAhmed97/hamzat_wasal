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
        ]);
        $user->assignRole('admin');
    }
}
