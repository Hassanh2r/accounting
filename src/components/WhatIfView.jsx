import React, { useState } from 'react';
import { GitCompare, ArrowRightLeft, TrendingUp, HelpCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { sounds } from '../utils/soundEffects';
import { WHAT_IF_SCENARIOS } from '../data/curriculumData';

export default function WhatIfView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const activeScenario = WHAT_IF_SCENARIOS[currentIdx];

  // Derive simple quantitative comparison data for chart if available
  const chartData = [
    { name: 'النقدية (Cash)', optionA: 50000, optionB: 100000 },
    { name: 'المخزون (Inventory)', optionA: 80000, optionB: 30000 },
    { name: 'الموردون (Payables)', optionA: 0, optionB: 50000 }
  ];

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-color">
        <div className="flex items-center gap-3 text-purple-400">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
            <GitCompare size={24} />
          </div>
          <div>
            <h3 className="font-black text-xl text-white">⚡ محاكي المقارنات والسيناريوهات المالية (WHAT-IF SIMULATOR)</h3>
            <span className="text-xs text-slate-400 font-medium">تحليل بدائل الأثر المالي والقرارات الاقتصادية</span>
          </div>
        </div>
        <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500 text-purple-300">
          أداة تحليل الحسابات والبدائل
        </span>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
        <span className="text-xs text-slate-400 font-bold block">القرار الاقتصادي المطروح للمقارنة:</span>
        <p className="text-lg sm:text-xl font-black text-cyan-300">{activeScenario.titleAr}</p>
        <p className="text-xs sm:text-sm text-slate-300 font-medium">{activeScenario.baseEventAr}</p>
      </div>

      {/* Side by Side Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option A */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-4 shadow-lg">
          <div className="font-extrabold text-base text-cyan-400 pb-3 border-b border-slate-800 flex items-center justify-between">
            <span>السيناريو الأول (أ):</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-300">{activeScenario.optionA.labelAr}</span>
          </div>

          <div className="space-y-2">
            {activeScenario.optionA.impacts.map((imp, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm">
                <span className="font-bold text-slate-200">{imp.account}</span>
                <span className="font-mono font-black text-cyan-300">{imp.effect}</span>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
            💡 <strong>التفسير المحاسبي:</strong> {activeScenario.optionA.explanationAr}
          </p>
        </div>

        {/* Option B */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/40 space-y-4 shadow-lg">
          <div className="font-extrabold text-base text-amber-400 pb-3 border-b border-slate-800 flex items-center justify-between">
            <span>السيناريو البديل (ب):</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-950 text-amber-300">{activeScenario.optionB.labelAr}</span>
          </div>

          <div className="space-y-2">
            {activeScenario.optionB.impacts.map((imp, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm">
                <span className="font-bold text-slate-200">{imp.account}</span>
                <span className="font-mono font-black text-amber-300">{imp.effect}</span>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
            💡 <strong>التفسير المحاسبي:</strong> {activeScenario.optionB.explanationAr}
          </p>
        </div>
      </div>

      {/* Visual Comparison Chart */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <TrendingUp size={16} className="text-purple-400" /> الرسم البياني للمقارنة المباشرة بين البديلين
        </h4>

        <div className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '10px' }} />
              <Legend />
              <Bar dataKey="optionA" name={activeScenario.optionA.labelAr} fill="#06b6d4" radius={[6, 6, 0, 0]} />
              <Bar dataKey="optionB" name={activeScenario.optionB.labelAr} fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button
        className="btn-secondary w-full justify-center py-3.5 text-base font-bold"
        onClick={() => {
          sounds.playClick();
          setCurrentIdx((prev) => (prev + 1) % WHAT_IF_SCENARIOS.length);
        }}
      >
        <ArrowRightLeft size={18} /> الانتقال لمقارنة "ماذا لو؟" التالية
      </button>
    </div>
  );
}
