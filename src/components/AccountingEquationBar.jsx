import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AccountingEquationBar({ totals }) {
  const { totalAssets, totalLiabilities, totalEquity, equationDiff, isBalanced } = totals;

  // Calculate funding proportions
  const sourceSum = Math.max(totalLiabilities + totalEquity, 1);
  const liabPct = Math.min(Math.max((totalLiabilities / sourceSum) * 100, 0), 100);
  const eqPct = Math.min(Math.max((totalEquity / sourceSum) * 100, 0), 100);

  return (
    <div className="glass-card p-6 border border-blue-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-blue-950/40 shadow-2xl space-y-4">
      {/* Top Numeric Header Row */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Assets Card */}
        <div className="flex-1 text-center lg:text-right space-y-1">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs sm:text-sm font-bold text-slate-300">💵 إجمالي الأصول (Total Assets)</span>
          </div>
          <motion.div 
            key={totalAssets}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-mono-tabular text-3xl sm:text-4xl font-extrabold text-cyan-400 tracking-tight"
          >
            {totalAssets.toLocaleString()} <small className="text-sm font-sans font-normal text-slate-400">ج.م</small>
          </motion.div>
        </div>

        <span className="text-3xl font-black text-slate-500 hidden lg:block">=</span>

        {/* Liabilities Card */}
        <div className="flex-1 text-center lg:text-right space-y-1">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="text-xs sm:text-sm font-bold text-slate-300">💳 الخصوم والالتزامات (Liabilities)</span>
          </div>
          <motion.div 
            key={totalLiabilities}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-mono-tabular text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight"
          >
            {totalLiabilities.toLocaleString()} <small className="text-sm font-sans font-normal text-slate-400">ج.م</small>
          </motion.div>
        </div>

        <span className="text-3xl font-black text-slate-500 hidden lg:block">+</span>

        {/* Equity Card */}
        <div className="flex-1 text-center lg:text-right space-y-1">
          <div className="flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
            <span className="text-xs sm:text-sm font-bold text-slate-300">👤 حقوق الملكية (Owner Equity)</span>
          </div>
          <motion.div 
            key={totalEquity}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-mono-tabular text-3xl sm:text-4xl font-extrabold text-purple-400 tracking-tight"
          >
            {totalEquity.toLocaleString()} <small className="text-sm font-sans font-normal text-slate-400">ج.م</small>
          </motion.div>
        </div>

        {/* Status Chip */}
        <div className={`px-5 py-3 rounded-2xl flex items-center gap-2.5 text-sm sm:text-base font-extrabold shadow-lg shrink-0 ${
          isBalanced 
            ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300' 
            : 'bg-rose-950/80 border border-rose-500/60 text-rose-300'
        }`}>
          {isBalanced ? (
            <>
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>المعادلة متوازنة 🟢</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-6 h-6 text-rose-400 animate-pulse" />
              <span>خلل بالتوازن ({equationDiff > 0 ? `+${equationDiff.toLocaleString()}` : equationDiff.toLocaleString()} ج.م) 🔴</span>
            </>
          )}
        </div>

      </div>

      {/* Visual Asset Funding Sources Progress Bar */}
      <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
        <div className="flex justify-between text-xs text-slate-400 font-bold">
          <span>هيكل تمويل أصول الشركة (Assets Funding Structure):</span>
          <span>الخصوم ({liabPct.toFixed(1)}%) + حقوق الملكية ({eqPct.toFixed(1)}%)</span>
        </div>

        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden flex border border-slate-800 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${liabPct}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-amber-600 to-amber-400 h-full"
            title={`الخصوم: ${totalLiabilities.toLocaleString()} ج.م (${liabPct.toFixed(1)}%)`}
          />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${eqPct}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-600 to-purple-400 h-full"
            title={`حقوق الملكية: ${totalEquity.toLocaleString()} ج.م (${eqPct.toFixed(1)}%)`}
          />
        </div>
      </div>
    </div>
  );
}
