import React from 'react';
import { 
  Building2, 
  Sparkles, 
  FlaskConical, 
  Scale, 
  SearchCode, 
  Trophy, 
  ArrowLeft, 
  BookOpen, 
  ShieldCheck, 
  Activity,
  Layers,
  FileText,
  GraduationCap,
  Award
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function LandingPage({ onEnterLab, onOpenGuide, onSelectCompany }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-10 font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Background Glow Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"></div>
      </div>

      {/* Top Header / Navigation */}
      <header className="relative z-10 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto w-full gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10">
            <Building2 size={32} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-sm">
              مكتب المحاسب التفاعلي
            </h1>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-bold mt-0.5">
              <GraduationCap size={14} className="text-amber-400" />
              <span>إعداد وتطوير: Dr. Hassan Hassani | مخصص لـ: د. أحمد رزق</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
            onClick={() => {
              sounds.playClick();
              onOpenGuide();
            }}
          >
            <BookOpen size={18} className="text-amber-400" />
            <span>دليل الاستخدام</span>
          </button>

          <button
            className="btn-primary py-2.5 px-5 text-xs sm:text-sm rounded-xl"
            onClick={() => {
              sounds.playClick();
              onEnterLab();
            }}
          >
            <span>دخول المختبر</span>
            <ArrowLeft size={18} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 space-y-10">
        
        {/* Title & Pitch */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Dr. Hassan Hassani & Dr. Ahmed Rizk Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/15 via-cyan-500/15 to-purple-500/15 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-black shadow-lg">
            <Award size={18} className="text-amber-400 animate-bounce" />
            <span>المحاكاة المحاسبية التفاعلية — إعداد وتطوير: Dr. Hassan Hassani | مخصص لطلاب د. أحمد رزق</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight text-white tracking-tight">
            لا تحفظ القيد المحاسبي.. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 font-black drop-shadow-md">
              افهم ماذا حدث للشركة بالفعل!
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-200 leading-relaxed font-semibold max-w-3xl mx-auto">
            مختبر تعليمي ذكي يعيد تشكيل تعلم المحاسبة المالية: كل معاملة تسجلها تغير حسابات الأصول والخصوم، وتحدث دفتر الأستاذ وميزان المراجعة والقوائم المالية فورياً أمام عينيك.
          </p>

          {/* Action Call to Action Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              className="btn-primary py-4 px-8 text-base sm:text-lg rounded-2xl shadow-2xl shadow-blue-600/30 font-extrabold flex items-center justify-center gap-3 transform hover:scale-[1.02] transition"
              onClick={() => {
                sounds.playClick();
                onEnterLab();
              }}
            >
              <FlaskConical size={24} />
              <span>🚀 ابدأ المحاكاة ودخول المختبر</span>
              <ArrowLeft size={20} />
            </button>

            <button
              className="px-6 py-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-200 font-bold text-base transition-all flex items-center justify-center gap-2"
              onClick={() => {
                sounds.playClick();
                onOpenGuide();
              }}
            >
              <BookOpen size={20} className="text-amber-400" />
              <span>دليل الاستخدام والأمثلة الشاملة</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-500/60 hover:bg-slate-900 transition-all duration-300 space-y-3 group shadow-lg">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit group-hover:scale-110 transition-transform">
              <Activity size={26} />
            </div>
            <h3 className="font-extrabold text-lg text-white group-hover:text-cyan-400 transition-colors">
              محاكاة حية متكاملة
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              تأثير مزدوج مباشر لكل حدث تجاري على الأصول، الخصوم، حقوق الملكية، دفتر الأستاذ، والقوائم المالية.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500/60 hover:bg-slate-900 transition-all duration-300 space-y-3 group shadow-lg">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit group-hover:scale-110 transition-transform">
              <FileText size={26} />
            </div>
            <h3 className="font-extrabold text-lg text-white group-hover:text-emerald-400 transition-colors">
              تتبع الأرقام (Trace)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              اضغط على أي رقم في الميزانية أو الأرباح والخسائر لتستكشف سجل العمليات التاريخية التي كونته.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-500/60 hover:bg-slate-900 transition-all duration-300 space-y-3 group shadow-lg">
            <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit group-hover:scale-110 transition-transform">
              <Scale size={26} />
            </div>
            <h3 className="font-extrabold text-lg text-white group-hover:text-amber-400 transition-colors">
              مختبر JRE الاستدلالي
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              تدرب على صياغة التفسير المدعوم بالأدلة وفق هيكل البكالوريا المصرية (الحكم ← التفسير ← الدليل).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-500/30 hover:border-rose-500/60 hover:bg-slate-900 transition-all duration-300 space-y-3 group shadow-lg">
            <div className="p-3.5 rounded-xl bg-rose-500/10 text-rose-400 w-fit group-hover:scale-110 transition-transform">
              <SearchCode size={26} />
            </div>
            <h3 className="font-extrabold text-lg text-white group-hover:text-rose-400 transition-colors">
              المحقق المحاسبي
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              افحص دفاتر معطوبة، شخّص نوع الخطأ المحاسبي (فني/سهو/ترحيل)، واستخدم حساب التسوية للمعالجة.
            </p>
          </div>

        </div>

        {/* Company Quick Selectors Showcase */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-5 text-center shadow-xl">
          <div className="space-y-1">
            <h3 className="font-extrabold text-xl text-white flex items-center justify-center gap-2">
              <Building2 className="text-cyan-400" size={24} />
              <span>اختر الشركة الممثلة لبدء التشغيل والمحاكاة:</span>
            </h3>
            <p className="text-xs text-slate-300 font-medium">شركات واقعية مأخوذة مباشرة من تمارين المنهج الدراسي</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-right">
            <button
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-800/80 transition-all space-y-1.5 group"
              onClick={() => { onSelectCompany('nile'); onEnterLab(); }}
            >
              <span className="font-extrabold block text-sm text-cyan-300 group-hover:text-cyan-200">
                🏢 شركة النيل للتجارة
              </span>
              <span className="text-[11px] text-slate-400 block leading-relaxed">
                المعاملات والتسجيل الشامل والحسابات الختامية
              </span>
            </button>

            <button
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800/80 transition-all space-y-1.5 group"
              onClick={() => { onSelectCompany('hanaa'); onEnterLab(); }}
            >
              <span className="font-extrabold block text-sm text-emerald-300 group-hover:text-emerald-200">
                🛍️ محلات هناء (أكتوبر)
              </span>
              <span className="text-[11px] text-slate-400 block leading-relaxed">
                مبيعات ومشتريات وتأثير T-Accounts
              </span>
            </button>

            <button
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/60 hover:bg-slate-800/80 transition-all space-y-1.5 group"
              onClick={() => { onSelectCompany('alnour'); onEnterLab(); }}
            >
              <span className="font-extrabold block text-sm text-amber-300 group-hover:text-amber-200">
                📦 محلات النور (نوفمبر)
              </span>
              <span className="text-[11px] text-slate-400 block leading-relaxed">
                شراء معدات بالآجل وترصيد الحسابات
              </span>
            </button>

            <button
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/60 hover:bg-slate-800/80 transition-all space-y-1.5 group"
              onClick={() => { onSelectCompany('alhuda'); onEnterLab(); }}
            >
              <span className="font-extrabold block text-sm text-purple-300 group-hover:text-purple-200">
                🏪 منشأة الهدى (فبراير)
              </span>
              <span className="text-[11px] text-slate-400 block leading-relaxed">
                تأسيس رأس المال والمسحوبات الشخصية
              </span>
            </button>

            <button
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/60 hover:bg-slate-800/80 transition-all space-y-1.5 group"
              onClick={() => { onSelectCompany('omar'); onEnterLab(); }}
            >
              <span className="font-extrabold block text-sm text-rose-300 group-hover:text-rose-200">
                📊 منشأة عمر (ديسمبر)
              </span>
              <span className="text-[11px] text-slate-400 block leading-relaxed">
                حساب المتاجرة، P&L، والمركز المالي
              </span>
            </button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-400 pt-6 border-t border-slate-900 space-y-1">
        <p className="font-bold text-amber-300">المحاكاة المحاسبية التفاعلية © 2026 — إعداد وتطوير: Dr. Hassan Hassani | مخصص لـ: د. أحمد رزق</p>
        <p className="text-[11px] text-slate-500">مصممة خصيصاً للمنهج المصري والبكالوريا المعتمدة</p>
      </footer>

    </div>
  );
}
