<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Testing extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamps();
        });

        Schema::create('snapshots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->dateTime('date');
            $table->timestamps();
        });

        Schema::create('tabs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('snapshot_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('url');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tabs');
        Schema::dropIfExists('snapshots');
        Schema::dropIfExists('users');
    }
}
