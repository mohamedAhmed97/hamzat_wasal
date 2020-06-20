<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUserWorkshopTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_workshop', function (Blueprint $table) {
            $table->renameColumn('id', 'uw_id');
            $table->dropColumn('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_workshop', function (Blueprint $table) {
            $table->renameColumn('uw_id', 'id');
            $table->boolean('status')->default(true);         
        });   
    }
}

// $table->dropColumn(['status']);
// $table->enum('status' ,['Pending' , 'Accepted'])->default('Pending');