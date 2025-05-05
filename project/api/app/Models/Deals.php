<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property integer $id
 * @property Cities $city
 * @property Cities|integer $city_id
 * @property string $status
 * @property string $reason
 *
 * @property Carbon|string $created_at
 */
class Deals extends Model
{
    use HasFactory;

    protected $fillable = [
        'city_id',
        'status',
        'reason'
    ];

    protected $guarded = [
        'id'
    ];

    public function city(): BelongsTo
    {
        return $this->belongsTo(Cities::class);
    }
}
