import React from 'react';
import { Star } from 'lucide-react';

export function RatingDisplay({ rating, count }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className="inline-flex items-center gap-1 bg-[#00897B] text-white px-1.5 py-0.5 rounded font-semibold text-[11px]">
        <span>{rating}</span>
        <Star className="w-3 h-3 fill-current" />
      </span>
      {count !== undefined && (
        <span className="text-[#696E79]">({count.toLocaleString()})</span>
      )}
    </div>
  );
}
