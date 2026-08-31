import React, { useState } from 'react';
import { Scale, CheckCircle2, FileText, ArrowRight, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { JRE_CASES } from '../data/curriculumData';

export default function JreLabView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({ judgment: '', reasoning: '', evidence: '' });
  const [submitted, setSubmitted] = useState(false);

  const activeCase = JRE_CASES[currentIdx];

  const handleSubmit = () => {
    sounds.playSuccess();
    setSubmitted(true);
  };

  const handleNext = () => {
    sounds.playClick();
    setUserAnswers({ judgment: '', reasoning: '', evidence: '' });
    setSubmitted(false);
    setCurrentIdx((prev) => (prev + 1) % JRE_CASES.length);
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-amber-400">
          <Scale className="w-5 h-5" />
          <h3 className="font-bold text-lg">⚖️ مختبر التفسير المدعوم بالأدلة (JRE LAB)</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500 text-amber-300">
          منهج البكالوريا المصرية
        </span>
      </div>

      <div className="p-4 rounded-lg bg-secondary border border-color space-y-2">
        <h4 className="font-bold text-base text-cyan-300">{activeCase.titleAr}</h4>
        <p className="text-xs text-secondary leading-relaxed">{activeCase.scenarioAr}</p>
        <p className="text-sm font-bold text-amber-300 flex items-center gap-1.5 pt-1">
          <HelpCircle size={16} /> {activeCase.questionAr}
        </p>
      </div>

      {/* JRE Form Steps */}
      <div className="space-y-3 p-4 rounded-lg bg-secondary border border-color">
        <div className="text-xs font-bold text-center text-cyan-400 font-mono pb-2 border-b border-color">
          معادلة البناء: (الحكم ← التفسير ← الدليل)
        </div>

        {/* Step 1: Judgment */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-primary">خطوة 1: كون حكماً واضحاً ومباشراً (الحكم):</label>
          <input
            type="text"
            placeholder="اكتب موثقك المباشر في جملة صريحة..."
            className="w-full p-2.5 rounded-md bg-card border border-color text-xs font-semibold"
            value={userAnswers.judgment}
            onChange={(e) => setUserAnswers({ ...userAnswers, judgment: e.target.value })}
            disabled={submitted}
          />
        </div>

        {/* Step 2: Reasoning */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-primary">خطوة 2: فسر استدلالك المنطقي (السبب والنتيجة):</label>
          <textarea
            rows={2}
            placeholder="اشرح لماذا يعتبر موقفك منطقياً باستخدام السبب والنتيجة..."
            className="w-full p-2.5 rounded-md bg-card border border-color text-xs font-semibold"
            value={userAnswers.reasoning}
            onChange={(e) => setUserAnswers({ ...userAnswers, reasoning: e.target.value })}
            disabled={submitted}
          />
        </div>

        {/* Step 3: Evidence */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-primary">خطوة 3: ادعم أدلتك الملموسة من واقع المنهج والمبادئ:</label>
          <textarea
            rows={2}
            placeholder="اذكر الحقائق والمبادئ والأرقام الدقيقة التي تثبت صحة استدلالك..."
            className="w-full p-2.5 rounded-md bg-card border border-color text-xs font-semibold"
            value={userAnswers.evidence}
            onChange={(e) => setUserAnswers({ ...userAnswers, evidence: e.target.value })}
            disabled={submitted}
          />
        </div>

        {!submitted ? (
          <button className="btn-primary w-full justify-center py-2.5 mt-2" onClick={handleSubmit}>
            <CheckCircle2 size={16} /> ⚖️ اعتماد إجابة الـ JRE وتقييم البناء الاستدلالي
          </button>
        ) : (
          <button className="btn-secondary w-full justify-center py-2.5 mt-2" onClick={handleNext}>
            <span>قضية JRE التالية</span> <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Model Answer & Rubric */}
      {submitted && (
        <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 space-y-3 animate-fade-in text-xs">
          <div className="font-bold text-sm text-emerald-400 flex items-center gap-1.5">
            <FileText size={16} /> النموذج الاسترشادي والتقييم المحاسبي المعياري:
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded bg-card border border-color space-y-1">
              <span className="font-bold block text-cyan-400">1) الحكم الصحيح:</span>
              <p className="text-secondary">{activeCase.guidedRubric.step1Judgment}</p>
            </div>

            <div className="p-2.5 rounded bg-card border border-color space-y-1">
              <span className="font-bold block text-amber-400">2) التفسير المنطقي:</span>
              <p className="text-secondary">{activeCase.guidedRubric.step2Reasoning}</p>
            </div>

            <div className="p-2.5 rounded bg-card border border-color space-y-1">
              <span className="font-bold block text-emerald-400">3) الدليل القاطع من المنهج:</span>
              <p className="text-secondary">{activeCase.guidedRubric.step3Evidence}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
