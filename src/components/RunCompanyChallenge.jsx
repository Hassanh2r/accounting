import React, { useState } from 'react';
import { Trophy, Award, CheckCircle2, RotateCcw, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

const CHALLENGE_STEPS = [
  {
    step: 1,
    titleAr: 'الحدث 01 — استثمار المالك الأولي',
    eventAr: 'بدأ المالك النشاط التجاري باستثمار مبلغ 200,000 جنيه نقداً تم إيداع نصفها بخزينة الشركة والنصف الآخر بحساب الشركة بالبنك.',
    drAccount: 'cash',
    crAccount: 'capital',
    amount: 100000,
    hintAr: 'النقدية بالخزينة تزيد بـ 100,000 والبنك يزيد بـ 100,000 ورأس المال يزداد بـ 200,000 ج.م.'
  },
  {
    step: 2,
    titleAr: 'الحدث 02 — شراء أصل ثابت (معدات)',
    eventAr: 'اشترت الشركة آلات ومعدات حديثة بمبلغ 40,000 جنيه بشيك من البنك.',
    drAccount: 'equipment',
    crAccount: 'bank',
    amount: 40000,
    hintAr: 'المعدات أصل زاد (مدين بـ 40,000) والبنك أصل نقص (دائن بـ 40,000).'
  },
  {
    step: 3,
    titleAr: 'الحدث 03 — شراء بضاعة على الحساب',
    eventAr: 'اشترت الشركة بضاعة بمبلغ 30,000 جنيه على الحساب من محلات النور.',
    drAccount: 'purchases',
    crAccount: 'payables',
    amount: 30000,
    hintAr: 'المشتريات مصروف زاد (مدين بـ 30,000) والدائنون التزام زاد (دائن بـ 30,000).'
  },
  {
    step: 4,
    titleAr: 'الحدث 04 — بيع بضاعة نقداً',
    eventAr: 'باعت الشركة بضاعة بمبلغ 45,000 جنيه وتم تحصيل المبلغ نقداً بالخزينة.',
    drAccount: 'cash',
    crAccount: 'sales_revenue',
    amount: 45000,
    hintAr: 'النقدية تزيد بـ 45,000 والمبيعات تزيد بـ 45,000 ج.م.'
  },
  {
    step: 5,
    titleAr: 'الحدث 05 — سداد مصروفات تشغيلية',
    eventAr: 'دفعت الشركة مرتبات الموظفين بمبلغ 12,000 جنيه نقداً.',
    drAccount: 'salaries_expense',
    crAccount: 'cash',
    amount: 12000,
    hintAr: 'مصروف الرواتب زاد (مدين بـ 12,000) والنقدية نقصت (دائن بـ 12,000).'
  }
];

export default function RunCompanyChallenge({ engine, onRefreshState }) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const activeStep = CHALLENGE_STEPS[currentStepIdx];

  const handleStepSubmit = () => {
    // Process step transaction in engine
    engine.processTransaction({
      date: new Date().toLocaleDateString('ar-EG'),
      description: activeStep.eventAr,
      drAccount: activeStep.drAccount,
      crAccount: activeStep.crAccount,
      amount: activeStep.amount
    });

    sounds.playSuccess();
    onRefreshState();

    const nextCompleted = [...completedSteps, activeStep.step];
    setCompletedSteps(nextCompleted);

    if (currentStepIdx + 1 < CHALLENGE_STEPS.length) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      setIsFinished(true);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) { console.error(e); }
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    setCurrentStepIdx(0);
    setCompletedSteps([]);
    setIsFinished(false);
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-amber-400">
          <Trophy className="w-5 h-5" />
          <h3 className="font-bold text-lg">🏢 تحدي تشغيل الشركة (RUN THE COMPANY SIMULATION)</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500 text-amber-300">
          خطوات متسلسلة لنهاية الفترة
        </span>
      </div>

      {!isFinished ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-secondary">
            <span>التقدم في المحاكاة:</span>
            <span className="font-mono font-bold text-cyan-400">
              الخطوة {currentStepIdx + 1} من {CHALLENGE_STEPS.length}
            </span>
          </div>

          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden border border-color">
            <div
              className="bg-gradient-to-r from-cyan-500 to-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentStepIdx + 1) / CHALLENGE_STEPS.length) * 100}%` }}
            />
          </div>

          <div className="p-4 rounded-lg bg-secondary border border-color space-y-2">
            <h4 className="font-bold text-base text-cyan-300">{activeStep.titleAr}</h4>
            <p className="text-sm font-bold leading-relaxed text-primary">{activeStep.eventAr}</p>
            <p className="text-xs text-secondary border-t border-color pt-2">
              💡 <strong>تلميح:</strong> {activeStep.hintAr}
            </p>
          </div>

          <button className="btn-primary w-full justify-center py-3" onClick={handleStepSubmit}>
            <CheckCircle2 size={18} /> تسجيل القيد وتحديث سجلات الشركة مباشرة
          </button>
        </div>
      ) : (
        /* ACCOUNTANT CERTIFICATION */
        <div className="p-6 rounded-lg bg-gradient-to-b from-secondary to-amber-950/40 border-2 border-amber-500/60 text-center space-y-4 animate-fade-in">
          <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500">
            <Award className="w-12 h-12" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-amber-300">👨‍💼 شهادة محاسب مالي معتمد</h2>
            <p className="text-xs text-secondary">ACCOUNTANT CERTIFICATION — LAB GRADUATE</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono py-2">
            <div className="p-2.5 bg-card rounded border border-color">
              <span className="block text-secondary text-sans">دقة اليومية</span>
              <span className="text-emerald-400 font-bold text-base">100%</span>
            </div>
            <div className="p-2.5 bg-card rounded border border-color">
              <span className="block text-secondary text-sans">ترصيد الأستاذ</span>
              <span className="text-cyan-400 font-bold text-base">مكتمل</span>
            </div>
            <div className="p-2.5 bg-card rounded border border-color">
              <span className="block text-secondary text-sans">ميزان المراجعة</span>
              <span className="text-emerald-400 font-bold text-base">متوازن 🟢</span>
            </div>
            <div className="p-2.5 bg-card rounded border border-color">
              <span className="block text-secondary text-sans">المركز المالي</span>
              <span className="text-amber-400 font-bold text-base">سليم 🟢</span>
            </div>
          </div>

          <p className="text-xs text-secondary leading-relaxed max-w-lg mx-auto">
            تهانينا! لقد أدرت جميع عمليات الشركة بنجاح، وراجعت التوازن الحسابي في ميزان المراجعة، وأنشأت القوائم المالية المعتمدة بنسبة دقة فائقة.
          </p>

          <button className="btn-secondary justify-center mx-auto" onClick={handleRestart}>
            <RotateCcw size={16} /> إعادة تشغيل تحدي الشركة
          </button>
        </div>
      )}
    </div>
  );
}
