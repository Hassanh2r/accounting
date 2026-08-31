import React, { useState } from 'react';
import { RotateCcw, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { REVERSE_ACCOUNTING_CASES } from '../data/curriculumData';

export default function ReverseAccountingView() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const activeCase = REVERSE_ACCOUNTING_CASES[currentIdx];

  const handleSubmit = (optionId) => {
    sounds.playClick();
    setSelectedOption(optionId);
    setSubmitted(true);

    const isCorrect = activeCase.options.find(o => o.id === optionId)?.isCorrect;
    if (isCorrect) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }
  };

  const handleNext = () => {
    sounds.playClick();
    setSelectedOption(null);
    setSubmitted(false);
    setCurrentIdx((prev) => (prev + 1) % REVERSE_ACCOUNTING_CASES.length);
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-cyan-400">
          <RotateCcw className="w-5 h-5" />
          <h3 className="font-bold text-lg">🔄 وضع المحاسبة العكسية (REVERSE ACCOUNTING)</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-secondary border border-color text-cyan-400">
          تنمية الفهم والتفسير المحاسبي
        </span>
      </div>

      <p className="text-xs text-secondary leading-relaxed">
        في هذا الوضع، سننعكس الآية: نعرض عليك القيد المحاسبي المكتمل، والمطلوب منك استنتاج واستقراء ما الذي حدث بالفعل في واقع الشركة الاقتصادي!
      </p>

      {/* Journal Box */}
      <div className="p-4 rounded-lg bg-secondary border border-accent-blue space-y-2">
        <span className="text-xs text-secondary font-bold">قيد اليومية المسجل بالدفاتر:</span>
        <pre className="font-mono text-base font-bold text-amber-300 bg-card p-3 rounded border border-color whitespace-pre-wrap">
          {activeCase.journal}
        </pre>
      </div>

      {/* Question */}
      <div className="space-y-3">
        <h4 className="font-bold text-base text-cyan-300 flex items-center gap-1.5">
          <HelpCircle size={18} /> {activeCase.questionAr}
        </h4>

        <div className="space-y-2">
          {activeCase.options.map(opt => {
            const isSelected = selectedOption === opt.id;
            let btnClass = 'bg-secondary border-color text-primary hover:bg-card-hover';
            if (submitted) {
              if (opt.isCorrect) btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
              else if (isSelected) btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
            }

            return (
              <button
                key={opt.id}
                disabled={submitted}
                className={`w-full p-3 rounded-lg border text-right font-medium text-sm transition flex items-center justify-between ${btnClass}`}
                onClick={() => handleSubmit(opt.id)}
              >
                <span>{opt.text}</span>
                {submitted && opt.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {submitted && isSelected && !opt.isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Explanation */}
      {submitted && (
        <div className="p-4 rounded-lg bg-card border border-color space-y-2 animate-fade-in">
          <div className="font-bold text-sm text-cyan-400">💡 التفسير المحاسبي الاقتصادي:</div>
          <p className="text-xs leading-relaxed text-secondary">{activeCase.explanationAr}</p>

          <button className="btn-primary w-full justify-center py-2.5 mt-2" onClick={handleNext}>
            <span>التحدي العكسي التالي</span> <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
