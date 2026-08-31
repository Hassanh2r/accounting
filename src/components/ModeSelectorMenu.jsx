import React, { useState } from 'react';
import { 
  ChevronDown, 
  FlaskConical, 
  Eye, 
  RotateCcw, 
  SearchCode, 
  GitCompare, 
  Scale, 
  Trophy, 
  GraduationCap, 
  BookOpen,
  Sparkles,
  X
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const MODE_CATEGORIES = [
  {
    id: 'lab',
    titleAr: '🧪 التسجيل والمحاكاة المباشرة',
    modes: [
      { id: 'simulate', labelAr: 'المختبر والتسجيل', descAr: 'تسجيل العمليات اليومية وبناء قيود اليومية مع التحليل المباشر', icon: FlaskConical },
      { id: 'predict', labelAr: 'توقع قبل الكشف', descAr: 'تخمين أثر المعاملة على النقدية والربحية قبل الكشف عن النتيجة', icon: Eye },
      { id: 'reverse', labelAr: 'المحاسبة العكسية', descAr: 'قراءة القيد المسجل واستقراء الحدث الاقتصادي الواقعي', icon: RotateCcw }
    ]
  },
  {
    id: 'reasoning',
    titleAr: '⚖️ التحليل والتحقيق الجنائي المحاسبي',
    modes: [
      { id: 'detective', labelAr: 'المحقق المحاسبي', descAr: 'اكتشاف الأخطاء بدفاتر معطوبة واستخدام حساب التسوية المعلق', icon: SearchCode },
      { id: 'whatif', labelAr: 'ماذا لو؟', descAr: 'مقارنة السيناريوهات البديلة جنبًا إلى جنب (نقدي vs آجل / استحقاق)', icon: GitCompare },
      { id: 'jre', labelAr: 'مختبر JRE', descAr: 'صياغة التفسير المدعوم بالأدلة وفق نموذج (الحكم ← التفسير ← الدليل)', icon: Scale }
    ]
  },
  {
    id: 'challenge',
    titleAr: '🏆 التحديات والتمارين والمستويات',
    modes: [
      { id: 'challenge', labelAr: 'تحدي إدارة الشركة', descAr: 'تشغيل شركة بالكامل عبر سلسلة معاملات حتى استخراج الشهادة', icon: Trophy },
      { id: 'teacher', labelAr: 'وضع المعلم والعرض', descAr: 'العرض المرحلي خطوة بخطوة أثناء المحاضرات والدروس', icon: GraduationCap },
      { id: 'homework', labelAr: 'الواجبات والأسئلة', descAr: 'تمارين وأسئلة الواجب التفاعلية والمصححة تلقائياً للمنهج', icon: BookOpen }
    ]
  }
];

export default function ModeSelectorMenu({ activeMode, setActiveMode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Find active mode info
  let activeModeObj = null;
  MODE_CATEGORIES.forEach(cat => {
    cat.modes.forEach(m => {
      if (m.id === activeMode) activeModeObj = m;
    });
  });

  const ActiveIcon = activeModeObj ? activeModeObj.icon : FlaskConical;

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-white font-bold text-sm transition shadow-sm"
        onClick={() => {
          sounds.playClick();
          setIsOpen(!isOpen);
        }}
      >
        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
          <ActiveIcon size={18} />
        </div>
        <div className="text-right">
          <span className="block text-[10px] text-slate-400 font-normal">وضع التعلم النشط:</span>
          <span className="block text-sm font-bold text-cyan-300">{activeModeObj?.labelAr}</span>
        </div>
        <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Modal Dropdown */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[200] flex justify-center items-start pt-16 p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-lg">
                <Sparkles size={20} />
                <span>اختر وضع المحاكاة أو النمط التعليمي</span>
              </div>
              <button
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {MODE_CATEGORIES.map(category => (
                <div key={category.id} className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 tracking-wider">
                    {category.titleAr}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {category.modes.map(mode => {
                      const Icon = mode.icon;
                      const isSelected = activeMode === mode.id;

                      return (
                        <button
                          key={mode.id}
                          className={`p-3 rounded-xl border text-right transition flex flex-col justify-between space-y-2 ${
                            isSelected
                              ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                          }`}
                          onClick={() => {
                            sounds.playClick();
                            setActiveMode(mode.id);
                            setIsOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-900 text-slate-400'}`}>
                              <Icon size={18} />
                            </div>
                            <span className="font-bold text-sm">{mode.labelAr}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                            {mode.descAr}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
