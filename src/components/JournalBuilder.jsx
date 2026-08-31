import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { ACCOUNT_TYPES } from '../engine/accountingEngine';

export default function JournalBuilder({ engine, companyData, onTransactionSuccess, onOpenConsequenceMap }) {
  const sampleTransactions = companyData.sampleTransactions || [];
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeTx = sampleTransactions[currentIdx] || {
    descriptionAr: 'اشترت الشركة أثاثاً مكتبياً بمبلغ 15,000 جنيه نقداً.',
    drAccount: 'furniture',
    crAccount: 'cash',
    amount: 15000
  };

  const [drAccount, setDrAccount] = useState('');
  const [crAccount, setCrAccount] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [lastProcessedMap, setLastProcessedMap] = useState(null);

  const accounts = engine.accounts;

  const handleAnalyze = () => {
    sounds.playClick();

    if (!drAccount || !crAccount || !amountInput) {
      setFeedback({
        isCorrect: false,
        title: '⚠️ بيانات غير مكتملة',
        message: 'الرجاء اختيار الحساب المدين والحساب الدائن وإدخال المبلغ المطلوب.'
      });
      sounds.playError();
      return;
    }

    const numAmount = parseFloat(amountInput);
    if (isNaN(numAmount) || numAmount <= 0) {
      setFeedback({
        isCorrect: false,
        title: '⚠️ مبلغ غير صحيح',
        message: 'الرجاء كتابة مبلغ مالي صحيح أكبر من الصفر.'
      });
      sounds.playError();
      return;
    }

    if (drAccount === crAccount) {
      setFeedback({
        isCorrect: false,
        title: '❌ خطأ في اختيار الحسابات',
        message: 'لا يمكن اختيار نفس الحساب في الجانبين المدين والدائن لنفس العملية المالية.'
      });
      sounds.playError();
      return;
    }

    // Check correctness against expected active transaction
    const isDrCorrect = drAccount === activeTx.drAccount;
    const isCrCorrect = crAccount === activeTx.crAccount;
    const isAmountCorrect = Math.abs(numAmount - activeTx.amount) < 0.01;

    const drAccObj = engine.getAccount(drAccount);
    const crAccObj = engine.getAccount(crAccount);

    if (isDrCorrect && isCrCorrect && isAmountCorrect) {
      // Process in engine
      const res = engine.processTransaction({
        date: new Date().toLocaleDateString('ar-EG'),
        description: activeTx.descriptionAr,
        drAccount,
        crAccount,
        amount: numAmount,
        explanation: activeTx.explanationAr
      });

      sounds.playSuccess();
      setFeedback({
        isCorrect: true,
        title: '✅ إجابة صحيحة وتسجيل ناجح!',
        message: `تم تحليل المعاملة بنجاح وتأثير القيد:\n• الحساب المدين: ${drAccObj.nameAr} (طبيعة ${ACCOUNT_TYPES[drAccObj.type].nameAr} زاد $\\rightarrow$ مدين).\n• الحساب الدائن: ${crAccObj.nameAr} (طبيعة ${ACCOUNT_TYPES[crAccObj.type].nameAr} زاد/نقص $\\rightarrow$ دائن).\n• يظل توازن المعادلة المحاسبية مستقراً.`,
        consequenceMap: res.consequenceMap
      });

      setLastProcessedMap(res.consequenceMap);
      onTransactionSuccess();
    } else {
      sounds.playError();
      const expectedDrObj = engine.getAccount(activeTx.drAccount);
      const expectedCrObj = engine.getAccount(activeTx.crAccount);

      setFeedback({
        isCorrect: false,
        title: '❌ التوجيه المحاسبي يحتاج مراجعة (NOT QUITE)',
        message: `دعنا نفكر معاً في هذه العملية:\n1) ماذا استلم النشاط؟ (${expectedDrObj?.nameAr} $\\rightarrow$ طرف مدين بقيمة ${activeTx.amount.toLocaleString()} ج.م).\n2) ماذا أعطى النشاط؟ (${expectedCrObj?.nameAr} $\\rightarrow$ طرف دائن بقيمة ${activeTx.amount.toLocaleString()} ج.م).\n3) اختيارك للحساب المدين (${drAccObj?.nameAr}) والحساب الدائن (${crAccObj?.nameAr}) غير مطابق للواقع الاقتصادي لهذه العملية. حاول مرة أخرى!`
      });
    }
  };

  const handleNextTx = () => {
    sounds.playClick();
    setFeedback(null);
    setDrAccount('');
    setCrAccount('');
    setAmountInput('');
    setCurrentIdx((prev) => (prev + 1) % sampleTransactions.length);
  };

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6">
      {/* Event Header */}
      <div className="flex items-center justify-between pb-4 border-b border-color">
        <div className="flex items-center gap-3 text-cyan-400">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            <Sparkles size={24} />
          </div>
          <h3 className="font-extrabold text-xl sm:text-2xl text-white">🛒 العملية المالية رقم #{currentIdx + 1}</h3>
        </div>
        <span className="text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
          مهمة المحاسب المسؤول
        </span>
      </div>

      {/* Description Box */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-inner">
        <div className="text-xs sm:text-sm text-slate-400 font-bold">الحدث الاقتصادي بالشركة:</div>
        <p className="text-xl sm:text-2xl font-black text-cyan-300 leading-snug">
          "{activeTx.descriptionAr}"
        </p>
        <div className="text-xs sm:text-sm text-slate-400 flex items-center gap-2 pt-2 border-t border-slate-800">
          <HelpCircle size={18} className="text-amber-400 shrink-0" />
          <span>مطلوب: حدد الحساب المدين، الحساب الدائن، اكتب المبلغ، ثم انقر زر التحليل.</span>
        </div>
      </div>

      {/* Entry Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        {/* Debit Account */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-bold text-sky-400 block">الطرف المدين (Debit Account):</label>
          <select
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-sm sm:text-base font-bold text-white focus:outline-none focus:border-sky-500 transition"
            value={drAccount}
            onChange={(e) => setDrAccount(e.target.value)}
          >
            <option value="">-- اختر الحساب المدين --</option>
            {accounts.map(acc => (
              <option key={acc.id} value={acc.id}>
                {acc.nameAr} ({ACCOUNT_TYPES[acc.type].nameAr})
              </option>
            ))}
          </select>
        </div>

        {/* Credit Account */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-bold text-emerald-400 block">الطرف الدائن (Credit Account):</label>
          <select
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-sm sm:text-base font-bold text-white focus:outline-none focus:border-emerald-500 transition"
            value={crAccount}
            onChange={(e) => setCrAccount(e.target.value)}
          >
            <option value="">-- اختر الحساب الدائن --</option>
            {accounts.map(acc => (
              <option key={acc.id} value={acc.id}>
                {acc.nameAr} ({ACCOUNT_TYPES[acc.type].nameAr})
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-bold text-amber-400 block">المبلغ (Amount in EGP):</label>
          <input
            type="number"
            placeholder="مثال: 20000"
            className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-sm sm:text-base font-mono font-bold text-white focus:outline-none focus:border-amber-500 transition"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button className="btn-primary py-3.5 px-6 text-base" onClick={handleAnalyze}>
          <Play size={20} /> 🔍 تحليل وتسجيل العملية (ANALYZE TRANSACTION)
        </button>

        {lastProcessedMap && (
          <button
            className="btn-secondary py-3.5 px-5 text-sm flex items-center gap-2"
            onClick={() => {
              sounds.playClick();
              onOpenConsequenceMap(lastProcessedMap);
            }}
          >
            <Sparkles size={18} className="text-amber-400" /> 🔗 خريطة الآثار المحاسبية
          </button>
        )}

        <button className="btn-secondary py-3.5 px-5 text-sm flex items-center gap-2 mr-auto" onClick={handleNextTx}>
          <span>العملية التالية</span> <ArrowRight size={18} />
        </button>
      </div>

      {/* Educational Feedback */}
      {feedback && (
        <div className={`p-5 rounded-2xl border text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${
          feedback.isCorrect 
            ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200' 
            : 'bg-rose-950/50 border-rose-500/60 text-rose-200'
        }`}>
          <div className="font-bold text-lg mb-2 flex items-center gap-2">
            {feedback.isCorrect ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <XCircle className="w-6 h-6 text-rose-400" />}
            {feedback.title}
          </div>
          <p>{feedback.message}</p>
        </div>
      )}
    </div>
  );
}
