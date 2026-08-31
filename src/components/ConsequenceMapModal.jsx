import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, CheckCircle2, ArrowLeft, GitCommit, Layers, Database, FileText } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function ConsequenceMapModal({ map, onClose }) {
  if (!map) return null;

  const PIPELINE_NODES = [
    { title: '1. الحدث الاقتصادي (Business Event)', desc: map.eventAr, icon: GitCommit, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
    { title: '2. توجيه الحسابات (Account Rules)', desc: `${map.drAccountName} (مدين) ↔ ${map.crAccountName} (دائن)`, icon: Layers, color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
    { title: '3. أثر المعادلة (Equation Impact)', desc: map.equationImpactAr, icon: Sparkles, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
    { title: '4. ترحيل الأستاذ (T-Accounts Ledger)', desc: map.ledgerImpactAr, icon: Database, color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
    { title: '5. ميزان المراجعة (Trial Balance)', desc: map.trialBalanceImpactAr, icon: CheckCircle2, color: 'text-blue-400 border-blue-500/40 bg-blue-500/10' },
    { title: '6. القوائم المالية (Financial Statements)', desc: map.statementImpactAr, icon: FileText, color: 'text-rose-400 border-rose-500/40 bg-rose-500/10' }
  ];

  return (
    <div className="modal-overlay">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="modal-content max-w-4xl space-y-6"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="font-black text-xl text-white">🔗 خريطة الآثار ومجرى البيانات المالية (FINANCIAL DATA PIPELINE)</h3>
              <span className="text-xs text-slate-400">تتبع التسلسل المنطقي والتلقائي لتدفق المعاملة بالدفاتر</span>
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

        {/* Pipeline Nodes */}
        <div className="space-y-4 relative">
          {PIPELINE_NODES.map((node, idx) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`p-4 rounded-2xl border ${node.color} flex items-start gap-4 transition-all shadow-md`}
              >
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                  <Icon size={22} />
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="font-extrabold text-sm sm:text-base text-white">{node.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {node.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          className="btn-primary w-full justify-center py-3.5 text-base font-extrabold"
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
        >
          تم الاستيعاب والإغلاق
        </button>
      </motion.div>
    </div>
  );
}
