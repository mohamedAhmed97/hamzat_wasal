<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Mayar Elabbasy',
            'email' => 'mayar@gmail.com',
            'password' => Hash::make('password'),
            'avatar' => ''
        ]);
    }
}
