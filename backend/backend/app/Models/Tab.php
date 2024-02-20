<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tab extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'url'];

    public function snapshot()
    {
        return $this->belongsTo(Snapshot::class);
    }
}
