import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export function PriceDisplay({ price, mrp, discount, size = 'md' }) {
  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-extrabold',
  };

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`${sizeClasses[size]} text-[#282C3F]`}>
        {formatCurrency(price)}
      </span>
      {mrp && mrp > price && (
        <span className="text-xs text-[#696E79] line-through">
          {formatCurrency(mrp)}
        </span>
      )}
      {discount && (
        <span className="text-xs font-semibold text-[#00897B] bg-[#E0F2F1] px-1.5 py-0.5 rounded">
          {discount}
        </span>
      )}
    </div>
  );
}
