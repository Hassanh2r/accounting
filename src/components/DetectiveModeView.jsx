import React, { useState } from 'react';
import { SearchCode, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { DETECTIVE_CASES } from '../data/curriculumData';

export default function DetectiveModeView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [resolved, setResolved] = useState(false);

  const activeCase = DETECTIVE_CASES[currentIdx];

  const handleResolve = () => {
    sounds.playSuccess();
    setResolved(true);
  };

  const handleNext = () => {
    sounds.playClick();
    setShowHint(false);
    setResolved(false);
    setCurrentIdx((prev) => (prev + 1) % DETECTIVE_CASES.length);
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-rose-400">
          <SearchCode className="w-5 h-5" />
          <h3 className="font-bold text-lg">🕵️ المحقق المحاسبي (ACCOUNTING DETECTIVE)</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-rose-950/60 border border-rose-500 text-rose-300">
          🚨 هناك خلل أو خطأ بدفاتر الشركة!
        </span>
      </div>

      <div className="p-4 rounded-lg bg-secondary border border-rose-500/40 space-y-2">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
          <AlertTriangle size={18} /> {activeCase.titleAr}
        </div>
        <p className="text-sm leading-relaxed text-secondary">{activeCase.scenarioAr}</p>
      </div>

      {/* Flawed Data vs Reality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-secondary border border-color space-y-1">
          <span className="block text-xs font-bold text-rose-400">البيان المسجل بالدفاتر (المغلوط):</span>
          <pre className="font-mono text-xs text-rose-300 bg-card p-2 rounded border border-color">
            {activeCase.flawedJournal}
          </pre>
          <span className="block text-xs text-secondary font-bold pt-1">نوع الخطأ: {activeCase.errorType}</span>
        </div>

        <div className="p-3 rounded-lg bg-secondary border border-color space-y-1">
          <span className="block text-xs font-bold text-emerald-400">الواقع الاقتصادي الصحيح:</span>
          <p className="text-xs font-bold text-cyan-300 bg-card p-2 rounded border border-color">
            {activeCase.actualEvent}
          </p>
          <span className="block text-xs text-secondary font-bold pt-1">القيد المزدوج الواجب إثباته:</span>
          <div className="font-mono text-xs text-emerald-300">{activeCase.correctJournal}</div>
        </div>
      </div>

      {/* ERROR IMPACT ANALYZER */}
      <div className="p-4 rounded-lg bg-secondary border border-color space-y-2">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          📊 محاكي أثر الخطأ المحاسبي (ERROR IMPACT ANALYZER)
        </h4>
        <div className="p-3 rounded bg-card border border-color text-xs text-secondary leading-relaxed">
          {activeCase.impactOnStatements}
        </div>
      </div>

      {/* Investigation Controls */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          className="btn-secondary"
          onClick={() => {
            sounds.playClick();
            setShowHint(!showHint);
          }}
        >
          <HelpCircle size={16} className="text-amber-400" /> {showHint ? 'إخفاء التلميح' : '💡 طلب تلميح محقق'}
        </button>

        {!resolved ? (
          <button className="btn-primary" onClick={handleResolve}>
            <CheckCircle2 size={16} /> ✅ تطبيق قيد التصحيح ومعالجة الخلل (CORRECT ERROR)
          </button>
        ) : (
          <button className="btn-primary" onClick={handleNext}>
            <span>القضية التالية</span> <ArrowRight size={16} />
          </button>
        )}
      </div>

      {showHint && (
        <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs leading-relaxed animate-fade-in">
          💡 <strong>تلميح المحقق:</strong> ابحث أولاً هل الخطأ يؤثر على توازن ميزان المراجعة أم لا؟ إذا كان الميزان متوازناً فابحث عن الخلل الفني بين الأصول والمصروفات.
        </div>
      )}

      {resolved && (
        <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 space-y-2 animate-fade-in">
          <div className="font-bold text-base text-emerald-400 flex items-center gap-2">
            <ShieldCheck size={20} /> تم تصحيح الخطأ المحاسبي واكتشاف الخلل بنجاح!
          </div>
          <p className="text-xs leading-relaxed text-secondary">{activeCase.correctionSteps}</p>
        </div>
      )}
    </div>
  );
}
