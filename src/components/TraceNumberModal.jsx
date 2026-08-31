import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Calendar, History, ArrowDown, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function TraceNumberModal({ traceData, onClose }) {
  if (!traceData) return null;

  const { account, initialBalance, runningHistory, finalBalance } = traceData;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[1200] flex justify-end">
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="drawer-content max-w-lg w-full flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3 text-cyan-400">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                  <Search size={22} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">من أين جاء هذا الرقم؟ (TRACE THIS NUMBER)</h3>
                  <span className="text-xs text-slate-400 font-medium">سجل السحب والتدفق التاريخي للحساب</span>
                </div>
              </div>
              <button
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Account Title Banner */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-bold block">الحساب المفحوص:</span>
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-black text-cyan-300">{account.nameAr}</h4>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                  {account.normalSide === 'DEBIT' ? 'مدين بطبيعته (DR)' : 'دائن بطبيعته (CR)'}
                </span>
              </div>
            </div>

            {/* Audit Flow Steps */}
            <div className="space-y-3">
              <h5 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <History size={16} /> تتبع تراكم الرصيد خطوة بخطوة:
              </h5>

              {/* Step 0: Opening Balance */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 font-sans">0. الرصيد الافتتاحي (Initial Balance)</span>
                <span className="font-bold text-white text-sm">{initialBalance.toLocaleString()} ج.م</span>
              </div>

              {/* Transactions History */}
              {runningHistory.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="font-bold text-cyan-400 font-sans">العملية #{idx + 1} — {step.date}</span>
                    <span className={`font-mono font-bold text-sm ${step.side === 'DEBIT' ? 'text-sky-400' : 'text-emerald-400'}`}>
                      {step.side === 'DEBIT' ? `+${step.amount.toLocaleString()} ج.م (مدين)` : `-${step.amount.toLocaleString()} ج.م (دائن)`}
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium leading-relaxed">{step.description}</p>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-800/80 font-mono text-[11px]">
                    <span className="text-slate-400 font-sans">الرصيد التراكمي بعدها:</span>
                    <span className="font-bold text-amber-300">{step.balanceAfter.toLocaleString()} ج.م</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="pt-4 border-t border-slate-800 space-y-3 mt-6">
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 flex justify-between items-center">
              <span className="text-sm font-extrabold text-white">الرصيد النهائي (Final Balance):</span>
              <span className="font-mono text-xl font-black text-cyan-300">{finalBalance.toLocaleString()} ج.م</span>
            </div>

            <button
              className="btn-primary w-full justify-center py-3 text-sm font-bold"
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
            >
              إغلاق كشف التتبع
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
