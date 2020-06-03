<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         // Reset cached roles and permissions
         app()[PermissionRegistrar::class]->forgetCachedPermissions();

         // create permissions
         //posts
         Permission::create(['name' => 'edit posts']);
         Permission::create(['name' => 'delete posts']);
         Permission::create(['name' => 'add posts']);
         //workshop
         Permission::create(['name' => 'edit workshop']);
         Permission::create(['name' => 'delete workshop']);
         Permission::create(['name' => 'add workshop']);
         //category
         Permission::create(['name' => 'edit category']);
         Permission::create(['name' => 'delete category']);
         Permission::create(['name' => 'add category']);
         Permission::create(['name' => 'show category']);

 
         // create roles and assign existing permissions
         $role1 = Role::create(['name' => 'user']);
         $role1->givePermissionTo('edit posts');
         $role1->givePermissionTo('delete posts');
         $role1->givePermissionTo('add posts');
         $role1->givePermissionTo('show category');
 
         $role2 = Role::create(['name' => 'mentor']);
         $role2->givePermissionTo('edit workshop');
         $role2->givePermissionTo('delete workshop');
         $role2->givePermissionTo('add workshop');
         $role2->givePermissionTo('show category');   
         
 
         $role3 = Role::create(['name' => 'admin']);

         $role3->givePermissionTo('delete workshop');
         $role3->givePermissionTo('delete category');
         $role3->givePermissionTo('edit category');
         $role3->givePermissionTo('add category');
         $role3->givePermissionTo('show category');
     }
    
}
