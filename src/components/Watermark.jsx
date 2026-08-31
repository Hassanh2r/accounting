import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Watermark() {
  return (
    <div className="fixed bottom-4 left-4 z-[999] pointer-events-auto transition-all duration-300 opacity-75 hover:opacity-100">
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-2xl backdrop-blur-md">
        <GraduationCap size={16} className="text-amber-400 shrink-0" />
        <span>إعداد وتطوير: Dr. Hassan Hassani | مخصص لـ: د. أحمد رزق</span>
      </div>
    </div>
  );
}
