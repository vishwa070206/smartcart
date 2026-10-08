import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export function SmartInsight({ insights = [], compact = false }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-[#FFF0F4] border border-[#FF3F6C]/20 rounded-lg p-3 my-3 text-xs text-[#282C3F]">
      <div className="flex items-center gap-1.5 font-bold text-[#D81B4E] mb-2">
        <Sparkles className="w-3.5 h-3.5 fill-[#FF3F6C] text-[#FF3F6C]" />
        <span>SmartMart Insight</span>
      </div>
      <ul className="space-y-1.5">
        {insights.slice(0, compact ? 2 : 5).map((point, idx) => (
          <li key={idx} className="flex items-start gap-1.5 text-[#282C3F]/90 leading-tight">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00897B] shrink-0 mt-0.5" />
            <span>{point.replace(/^✓\s*/, '')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
