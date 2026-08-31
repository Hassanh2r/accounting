import React from 'react';
import { motion } from 'framer-motion';
import { Building2, RotateCcw, Activity, ShieldCheck, AlertCircle, History, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { sounds } from '../utils/soundEffects';

const CHART_COLORS = ['#06b6d4', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6'];

export default function CompanyDashboard({ engine, totals, trialBalance, onResetCompany, activeCompanyId, onSwitchCompany }) {
  const accounts = engine.accounts;
  const journalCount = engine.journalEntries.length;

  const cashAcc = accounts.find(a => a.id === 'cash');
  const inventoryAcc = accounts.find(a => a.id === 'inventory');
  const equipmentAcc = accounts.find(a => a.id === 'equipment');
  const recAcc = accounts.find(a => a.id === 'receivables');
  const payAcc = accounts.find(a => a.id === 'payables');
  const capitalAcc = accounts.find(a => a.id === 'capital');

  // Chart Asset Data
  const assetChartData = [
    { name: 'النقدية', value: Math.max(cashAcc?.balance || 0, 0) },
    { name: 'المخزون', value: Math.max(inventoryAcc?.balance || 0, 0) },
    { name: 'المعدات', value: Math.max(equipmentAcc?.balance || 0, 0) },
    { name: 'العملاء', value: Math.max(recAcc?.balance || 0, 0) }
  ].filter(d => d.value > 0);

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-color">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Building2 size={22} />
          </div>
          <div>
            <h3 className="font-black text-lg text-white">{engine.companyName}</h3>
            <span className="text-xs text-slate-400 font-medium">سجل الشركة النشطة</span>
          </div>
        </div>

        <button
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
          onClick={() => {
            sounds.playClick();
            if (window.confirm('هل أنت تأكد من إعادة ضبط الشركة إلى الوضع الافتتاحي؟')) {
              onResetCompany();
            }
          }}
          title="إعادة ضبط الشركة"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Select Company Preset */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 block">اختر الشركة الممثلة:</label>
        <select
          className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-white focus:outline-none focus:border-cyan-500 transition"
          value={activeCompanyId}
          onChange={(e) => {
            sounds.playClick();
            onSwitchCompany(e.target.value);
          }}
        >
          <option value="nile">شركة النيل للتجارة (المعاملات الشاملة)</option>
          <option value="hanaa">محلات هناء للتجارة (أكتوبر)</option>
          <option value="alnour">محلات النور (نوفمبر)</option>
          <option value="alhuda">منشأة الهدى (فبراير)</option>
          <option value="omar">منشأة عمر للتجارة (ديسمبر)</option>
        </select>
      </div>

      {/* COMPANY LIVE STATUS CARDS */}
      <div className="space-y-3">
        <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Activity size={16} /> حالة الشركة المباشرة (COMPANY LIVE STATUS)
        </h4>

        <div className="grid grid-cols-2 gap-3 text-sm font-mono-tabular">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="block text-xs font-semibold text-slate-400 font-sans">💵 النقدية (Cash)</span>
            <span className="font-extrabold text-base text-cyan-400 block">
              {(cashAcc?.balance || 0).toLocaleString()} ج.م
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="block text-xs font-semibold text-slate-400 font-sans">📦 المخزون (Inventory)</span>
            <span className="font-extrabold text-base text-emerald-400 block">
              {(inventoryAcc?.balance || 0).toLocaleString()} ج.م
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="block text-xs font-semibold text-slate-400 font-sans">🏢 المعدات (Equipment)</span>
            <span className="font-extrabold text-base text-blue-400 block">
              {(equipmentAcc?.balance || 0).toLocaleString()} ج.م
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="block text-xs font-semibold text-slate-400 font-sans">👥 العملاء (Receivables)</span>
            <span className="font-extrabold text-base text-amber-400 block">
              {(recAcc?.balance || 0).toLocaleString()} ج.م
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="block text-xs font-semibold text-slate-400 font-sans">💳 الموردون (Payables)</span>
            <span className="font-extrabold text-base text-rose-400 block">
              {(payAcc?.balance || 0).toLocaleString()} ج.م
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="block text-xs font-semibold text-slate-400 font-sans">👤 رأس المال (Capital)</span>
            <span className="font-extrabold text-base text-purple-400 block">
              {(capitalAcc?.balance || 0).toLocaleString()} ج.م
            </span>
          </div>
        </div>
      </div>

      {/* Asset Composition Donut Chart */}
      {assetChartData.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-300 font-bold">
            <span className="flex items-center gap-1.5"><PieIcon size={14} className="text-cyan-400" /> هيكل الأصول (Asset Allocation)</span>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {assetChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => `${val.toLocaleString()} ج.م`}
                  contentStyle={{ background: '#0f172a', borderColor: '#334155', borderRadius: '10px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Net Income Summary */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 font-mono-tabular">
        <div className="flex justify-between text-xs text-slate-400 font-semibold">
          <span className="font-sans">إجمالي الإيرادات:</span>
          <span className="text-emerald-400 font-bold">+{totals.totalRevenues.toLocaleString()} ج.م</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400 font-semibold">
          <span className="font-sans">إجمالي المصروفات:</span>
          <span className="text-rose-400 font-bold">-{totals.totalExpenses.toLocaleString()} ج.م</span>
        </div>
        <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-800 text-white">
          <span className="font-sans">صافي الدخل (Net Income):</span>
          <span className={totals.netIncome >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
            {totals.netIncome >= 0 ? `+${totals.netIncome.toLocaleString()}` : totals.netIncome.toLocaleString()} ج.م
          </span>
        </div>
      </div>

      {/* ACCOUNTING HEALTH */}
      <div className="space-y-2.5 pt-2 border-t border-slate-800">
        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          السلامة المحاسبية (ACCOUNTING HEALTH)
        </h4>

        <div className="space-y-2 text-xs font-bold">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="flex items-center gap-2">
              {totals.isBalanced ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
              معادلة المحاسبة
            </span>
            <span className={totals.isBalanced ? 'text-emerald-400 font-extrabold' : 'text-rose-400 font-extrabold'}>
              {totals.isBalanced ? 'متوازنة 🟢' : 'غير متوازنة 🔴'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="flex items-center gap-2">
              {trialBalance.isBalanced ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
              ميزان المراجعة
            </span>
            <span className={trialBalance.isBalanced ? 'text-emerald-400 font-extrabold' : 'text-rose-400 font-extrabold'}>
              {trialBalance.isBalanced ? 'متوازن 🟢' : 'غير متوازن 🔴'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-400" />
              العمليات المسجلة
            </span>
            <span className="text-cyan-400 font-mono-tabular font-extrabold text-sm">{journalCount} عملية</span>
          </div>
        </div>
      </div>
    </div>
  );
}
