import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2, Search, Scale, ShieldCheck, ArrowDown } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function UserGuideModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-color">
          <div className="flex items-center gap-3 text-cyan-400">
            <BookOpen className="w-6 h-6" />
            <div>
              <h3 className="font-extrabold text-xl">دليل الاستخدام والمحاكاة المحاسبية</h3>
              <span className="text-xs text-secondary font-normal">المكالمات التعليمية والأمثلة العملية</span>
            </div>
          </div>
          <button
            className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-card transition"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Section 1: Core Philosophy */}
        <div className="p-4 rounded-xl bg-secondary border border-color space-y-2">
          <h4 className="font-bold text-base text-cyan-300 flex items-center gap-2">
            <Sparkles size={18} /> 1. الفلسفة التعليمية الأساسية
          </h4>
          <p className="text-sm text-secondary leading-relaxed">
            الهدف الرئيسي من مختبر المحاسبة التفاعلي هو الانتقال من الحفظ الآلي لقيود اليومية إلى <strong>الفهم العميق للتأثير الاقتصادي لكل عملية على الشركة</strong>.
            كل معاملة مالية تُدخلها تُغير مركز الشركة المالي وتنتقل عبر السلسلة التالية:
          </p>

          <div className="p-3 bg-card rounded-lg border border-color text-xs font-mono font-bold text-center text-cyan-400 space-y-1">
            حدث اقتصادي ← تحديد الحسابات ← أصل/خصم/ملكية ← زيادة/نقص ← مدين/دائن ← اليومية ← الأستاذ ← ميزان المراجعة ← القوائم المالية
          </div>
        </div>

        {/* Section 2: How to use Consequence Map & Simulation */}
        <div className="p-4 rounded-xl bg-secondary border border-color space-y-3">
          <h4 className="font-bold text-base text-emerald-400 flex items-center gap-2">
            <CheckCircle2 size={18} /> 2. مثال عملي: كيفية استخدام المختبر وتسجيل المعاملة
          </h4>

          <div className="p-3 bg-card rounded-lg border border-color space-y-2 text-xs">
            <span className="font-bold text-amber-300 block">🛒 مثال: اشترت الشركة بضاعة نقداً بمبلغ 20,000 جنيه.</span>
            <ol className="list-decimal list-inside space-y-1.5 text-secondary leading-relaxed">
              <li>اختر الحساب المدين: <strong>المشتريات (Purchases)</strong> — مصروف/أصل زاد $\rightarrow$ مدين.</li>
              <li>اختر الحساب الدائن: <strong>النقدية (Cash)</strong> — أصل نقص $\rightarrow$ دائن.</li>
              <li>اكتب المبلغ: <strong>20000</strong> ثم اضغط زر <strong>🔍 تحليل وتسجيل العملية</strong>.</li>
              <li>اضغط زر <strong>🔗 خريطة الآثار المحاسبية</strong> لمشاهدة التسلسل التلقائي في دفتر الأستاذ والميزانية.</li>
            </ol>
          </div>
        </div>

        {/* Section 3: Trace Number */}
        <div className="p-4 rounded-xl bg-secondary border border-color space-y-2">
          <h4 className="font-bold text-base text-cyan-300 flex items-center gap-2">
            <Search size={18} /> 3. ميزة تتبع الأرقام (Trace This Number)
          </h4>
          <p className="text-sm text-secondary leading-relaxed">
            في القوائم المالية أو ميزان المراجعة، <strong>أي رقم مكتوب باللون الأزرق أو تحته خط متقطع هو رقم تفاعلي!</strong>
            عند الضغط على الرقم، تفتح لك نافذة سريعة تعرض كشف الحساب التاريخي الكامل للشركة وتوضح كيف تراكم هذا الرقم خطوة بخطوة من بداية النشاط.
          </p>
        </div>

        {/* Section 4: JRE Reasoning */}
        <div className="p-4 rounded-xl bg-secondary border border-color space-y-2">
          <h4 className="font-bold text-base text-amber-400 flex items-center gap-2">
            <Scale size={18} /> 4. كيف تستجيب لأسئلة التفسير المدعوم بالأدلة (JRE)؟
          </h4>
          <p className="text-sm text-secondary leading-relaxed">
            في مختبر JRE، يُطلب منك الإجابة وفق صيغة البكالوريا المصرية المعتمدة:
          </p>
          <ul className="list-disc list-inside text-xs text-secondary space-y-1">
            <li><strong>الحكم (Judgment):</strong> موقفي المباشر في جملة واحدة (مثل: أرى أن أحمد يمارس حرفة فقط ولا يدير مشروعاً ناجحاً).</li>
            <li><strong>التفسير (Reasoning):</strong> الربط المنطقي بين السبب والنتيجة محاسبياً.</li>
            <li><strong>الدليل (Evidence):</strong> الاستشهاد بالحقائق والمبادئ المحاسبية (مثل غياب حساب الأرباح والخسائر ومبدأ المقابلة).</li>
          </ul>
        </div>

        {/* Section 5: Accounting Health */}
        <div className="p-4 rounded-xl bg-secondary border border-color space-y-2">
          <h4 className="font-bold text-base text-purple-400 flex items-center gap-2">
            <ShieldCheck size={18} /> 5. السلامة المحاسبية (Accounting Health)
          </h4>
          <p className="text-sm text-secondary leading-relaxed">
            يُظهر اللوح الجانبي دائماً شارات السلامة:
            <br />
            🟢 <strong>المعادلة متوازنة:</strong> يعني أن الأصول تتساوى تماماً مع الخصوم وحقوق الملكية.
            <br />
            🔴 <strong>غير متوازنة:</strong> في حالة وجود أخطاء في التسجيل (في وضع المحقق المحاسبي)، ويمكنك استخدام <strong>حساب التسوية المعلق (Suspense Account)</strong> لإثبات الفرق مؤقتاً لحين التصحيح.
          </p>
        </div>

        <button
          className="w-full btn-primary justify-center py-3 text-base font-bold"
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
        >
          فهمت الدليل وابدأ المحاكاة الآن
        </button>
      </div>
    </div>
  );
}
