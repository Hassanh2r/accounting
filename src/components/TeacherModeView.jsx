import React, { useState } from 'react';
import { GraduationCap, Play, ChevronRight, ChevronLeft, MessageSquare, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const TEACHER_STEPS = [
  { step: 1, title: 'الخطوة 1: عرض المعاملة المالية أمام الطلاب (Present Event)', content: 'دفعت الشركة مصروف إيجار المقر البالغ 5,000 جنيه نقداً.' },
  { step: 2, title: 'الخطوة 2: سؤال العصف الذهني (Classroom Prompt)', content: 'ما الحسابان المتأثران بهذه العملية؟ وهل حدثت زيادة أم نقص في الأصول؟' },
  { step: 3, title: 'الخطوة 3: تجميع توقعات الطلاب (Collect Predictions)', content: 'اجمع إجابات الطلاب واستمع للتفسيرات قبل الكشف عن النتيجة الفعلي.' },
  { step: 4, title: 'الخطوة 4: الكشف عن النتيجة (Reveal Answers)', content: 'النقدية ينخفض أصلها بـ 5,000 ج.م، ومصروف الإيجار يزداد بـ 5,000 ج.م.' },
  { step: 5, title: 'الخطوة 5: شرح المدين والدائن (Explain Debit/Credit)', content: 'مصروف الإيجار مدين بطبيعته وزاد $\\rightarrow$ مدين 5,000 ج.م.\nالنقدية أصل بطبيعتها ونقصت $\\rightarrow$ دائن 5,000 ج.م.' },
  { step: 6, title: 'الخطوة 6: تحديث المعادلة المحاسبية (Update Equation)', content: 'الأصول تنخفض بـ 5,000 (النقدية) وحقوق الملكية تنخفض بـ 5,000 (بسبب خفض الربح بالمصروف) $\\rightarrow$ المعادل تظل متوازنة.' },
  { step: 7, title: 'الخطوة 7: تحديث دفتر الأستاذ T-Accounts (Update Ledger)', content: 'رحّل 5,000 ج.م لجانب منه في حساب مصروف الإيجار، ولجانب له في حساب النقدية.' },
  { step: 8, title: 'الخطوة 8: تحديث ميزان المراجعة (Update Trial Balance)', content: 'تأكد من توازن إجمالي المدين مع إجمالي الدائن في ميزان المراجعة.' },
  { step: 9, title: 'الخطوة 9: أثر القوائم المالية (Financial Statement Impact)', content: 'يظهر المصروف في حساب الأرباح والخسائر لتحديد صافي الربح، والنقدية المعدلة تظهر بالميزانية.' },
  { step: 10, title: 'الخطوة 10: مناقشة ختامية واستنتاج (Classroom Discussion)', content: 'ماذا كان سيحدث لو تم دفع الإيجار بشيك بدلاً من النقدية؟' }
];

export default function TeacherModeView() {
  const [currentStep, setCurrentStep] = useState(0);

  const activeSlide = TEACHER_STEPS[currentStep];

  const handleNext = () => {
    sounds.playClick();
    if (currentStep + 1 < TEACHER_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-cyan-400">
          <GraduationCap className="w-5 h-5" />
          <h3 className="font-bold text-lg">🎓 وضع المعلم للعرض والمناقشة (TEACHER PRESENTATION MODE)</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-secondary border border-color text-cyan-400">
          التحكم المرحلي أثناء المحاضرة
        </span>
      </div>

      {/* Slide Box */}
      <div className="p-6 rounded-lg bg-secondary border-2 border-accent-blue space-y-4 min-h-[220px] flex flex-col justify-between">
        <div className="flex justify-between items-center text-xs text-secondary border-b border-color pb-2">
          <span className="font-bold text-amber-400">{activeSlide.title}</span>
          <span className="font-mono">{currentStep + 1} / {TEACHER_STEPS.length}</span>
        </div>

        <p className="text-lg font-bold leading-relaxed text-cyan-200 whitespace-pre-wrap">
          {activeSlide.content}
        </p>

        <div className="flex justify-between items-center pt-2">
          <button
            className="btn-secondary text-xs"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            <ChevronRight size={16} /> الخطوة السابقة
          </button>

          <button
            className="btn-primary text-xs"
            onClick={handleNext}
            disabled={currentStep === TEACHER_STEPS.length - 1}
          >
            الخطوة التالية <ChevronLeft size={16} />
          </button>
        </div>
      </div>

      {/* Classroom Discussion Prompts */}
      <div className="p-4 rounded-lg bg-card border border-color space-y-2">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <MessageSquare size={14} /> أسئلة تحفيز التفكير والمناقشة الفصلية:
        </h4>
        <ul className="text-xs text-secondary space-y-1 list-disc list-inside">
          <li>ماذا تتوقع أن يحدث للسيولة بالنقدية؟</li>
          <li>هل أثرت العملية على حقوق الملكية بشكل مباشر أم غير مباشر؟</li>
          <li>لماذا يعتبر هذا الحساب مديناً وليس دائناً؟</li>
          <li>ماذا كان سيحدث لو تمت العملية بالآجل بدلاً من السداد النقدي؟</li>
        </ul>
      </div>
    </div>
  );
}
