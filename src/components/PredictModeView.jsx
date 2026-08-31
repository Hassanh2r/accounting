import React, { useState } from 'react';
import { Eye, Sparkles, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const PREDICT_SCENARIOS = [
  {
    id: 'p1',
    eventAr: 'دفعت الشركة مصروف إيجار المكتب بمبلغ 5,000 جنيه نقداً.',
    questionAr: 'ما التغيرات التي تتوقع حدوثها في النقدية، المصروفات، وحقوق الملكية؟',
    cashExpected: 'نقص ↓ 5,000 ج.م',
    expenseExpected: 'زيادة ↑ 5,000 ج.م',
    equityExpected: 'نقص ↓ 5,000 ج.م',
    journalDr: 'حـ/ مصروف الإيجار 5,000 ج.م',
    journalCr: 'حـ/ النقدية 5,000 ج.م',
    reasoningAr: 'سداد المصروف نقداً ينقص أصل النقدية وفي نفس الوقت يزيد المصروفات التي تخفض صافي الربح وبالتالي ينخفض جانب حقوق الملكية بنفس القيمة لتظل المعادلة متوازنة.'
  },
  {
    id: 'p2',
    eventAr: 'حصلت الشركة مبلغ 10,000 جنيه من أحد العملاء المدينين نقداً.',
    questionAr: 'ما الذي سيحدث لحساب النقدية وحساب العملاء المدينين؟',
    cashExpected: 'زيادة ↑ 10,000 ج.م',
    expenseExpected: 'لا تغيير (0 ج.م)',
    equityExpected: 'لا تغيير (0 ج.م)',
    journalDr: 'حـ/ النقدية 10,000 ج.م',
    journalCr: 'حـ/ العملاء 10,000 ج.م',
    reasoningAr: 'تحصيل الدين هو استبدال أصل مستحق على العملاء بأصل نقدي ملموس، فتزداد النقدية وينخفض رصيد العملاء بنفس المبلغ، وتظل الأصول ثابته والمعادلة متوازنة.'
  }
];

export default function PredictModeView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [userPrediction, setUserPrediction] = useState({ cash: '', equity: '' });

  const activeScenario = PREDICT_SCENARIOS[currentIdx];

  const handleReveal = () => {
    sounds.playReveal();
    setRevealed(true);
  };

  const handleNext = () => {
    sounds.playClick();
    setRevealed(false);
    setUserPrediction({ cash: '', equity: '' });
    setCurrentIdx((prev) => (prev + 1) % PREDICT_SCENARIOS.length);
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-cyan-400">
          <Eye className="w-5 h-5" />
          <h3 className="font-bold text-lg">🎯 وضع التوقع قبل الكشف (PREDICT BEFORE REVEAL)</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-secondary border border-color text-amber-400">
          وضع الشرح والتفاعل الإدراكي
        </span>
      </div>

      <div className="p-4 rounded-lg bg-secondary border border-color space-y-2">
        <span className="text-xs text-secondary font-bold">الحدث الاقتصادي المطروح للتفكير:</span>
        <p className="text-lg font-bold text-cyan-300">"{activeScenario.eventAr}"</p>
        <p className="text-xs text-secondary flex items-center gap-1">
          <HelpCircle size={14} className="text-amber-400" />
          {activeScenario.questionAr}
        </p>
      </div>

      {/* Prediction inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg bg-secondary border border-color">
        <div className="space-y-1">
          <label className="text-xs font-bold text-secondary">توقعك للنقدية (Cash):</label>
          <select
            className="w-full p-2.5 rounded-md bg-card border border-color text-sm font-semibold"
            value={userPrediction.cash}
            onChange={(e) => setUserPrediction({ ...userPrediction, cash: e.target.value })}
            disabled={revealed}
          >
            <option value="">-- اختر توقعك للنقدية --</option>
            <option value="increase">زيادة ↑ النقدية</option>
            <option value="decrease">نقص ↓ النقدية</option>
            <option value="none">لا تغير في النقدية</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-secondary">توقعك لحقوق الملكية (Equity):</label>
          <select
            className="w-full p-2.5 rounded-md bg-card border border-color text-sm font-semibold"
            value={userPrediction.equity}
            onChange={(e) => setUserPrediction({ ...userPrediction, equity: e.target.value })}
            disabled={revealed}
          >
            <option value="">-- اختر توقعك لحقوق الملكية --</option>
            <option value="increase">زيادة ↑ حقوق الملكية</option>
            <option value="decrease">نقص ↓ حقوق الملكية</option>
            <option value="none">لا تغير في حقوق الملكية</option>
          </select>
        </div>
      </div>

      {!revealed ? (
        <button className="btn-primary w-full justify-center py-3 text-base" onClick={handleReveal}>
          <Eye size={18} /> 🔍 اكشف النتيجة والشرح المحاسبي المباشر (REVEAL)
        </button>
      ) : (
        <div className="space-y-3 p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 animate-fade-in">
          <div className="font-bold text-base flex items-center gap-2 text-emerald-400">
            <CheckCircle2 size={20} /> نتيجة التحليل المحاسبي الفعلي:
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono font-bold text-sm">
            <div className="p-2 bg-card rounded border border-color">
              <span className="block text-xs text-secondary font-sans">النقدية</span>
              <span className="text-cyan-400">{activeScenario.cashExpected}</span>
            </div>
            <div className="p-2 bg-card rounded border border-color">
              <span className="block text-xs text-secondary font-sans">المصروفات</span>
              <span className="text-rose-400">{activeScenario.expenseExpected}</span>
            </div>
            <div className="p-2 bg-card rounded border border-color">
              <span className="block text-xs text-secondary font-sans">حقوق الملكية</span>
              <span className="text-amber-400">{activeScenario.equityExpected}</span>
            </div>
          </div>

          <div className="p-3 bg-card rounded border border-color space-y-1">
            <span className="block font-bold text-xs text-amber-400">القيد الدفتري المسجل:</span>
            <div className="font-mono text-xs text-primary">
              من {activeScenario.journalDr}<br />
              إلى {activeScenario.journalCr}
            </div>
          </div>

          <p className="text-xs leading-relaxed text-secondary border-t border-color pt-2">
            💡 <strong>التفسير العلمي:</strong> {activeScenario.reasoningAr}
          </p>

          <button className="btn-secondary w-full justify-center mt-2" onClick={handleNext}>
            <span>السيناريو التالي</span> <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
