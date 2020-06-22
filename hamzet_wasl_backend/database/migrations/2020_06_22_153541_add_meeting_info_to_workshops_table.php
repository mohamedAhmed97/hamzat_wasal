<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMeetingInfoToWorkshopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('workshops', function (Blueprint $table) {
            $table->string('meeting_link');
            $table->string('meeting_password')->nullable();
            $table->string('meeting_backup_link')->nullable();
            $table->string('meeting_backup_password')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('workshops', function (Blueprint $table) {
            $table->dropColumn(['meeting_link']);
            $table->dropColumn(['meeting_password']);
            $table->dropColumn(['meeting_backup_link']);
            $table->dropColumn(['meeting_backup_password']);
        });
    }
}
