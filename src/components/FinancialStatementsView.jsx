import React, { useState } from 'react';
import { FileText, Search, TrendingUp, ShieldCheck, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function FinancialStatementsView({ engine, onTraceNumber }) {
  const [activeTab, setActiveTab] = useState('balanceSheet');
  const statements = engine.getFinancialStatements();
  const { tradingAccount, profitAndLoss, equityStatement, balanceSheet } = statements;

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-cyan-400">
          <FileText className="w-5 h-5" />
          <h3 className="font-bold text-lg">📑 القوائم والحسابات الختامية (FINANCIAL STATEMENTS)</h3>
        </div>

        <div className="flex gap-1 bg-secondary p-1 rounded-lg border border-color">
          <button
            className={`px-3 py-1 rounded text-xs font-bold transition ${activeTab === 'trading' ? 'bg-accent-blue text-white' : 'text-secondary'}`}
            onClick={() => { sounds.playClick(); setActiveTab('trading'); }}
          >
            حساب المتاجرة
          </button>
          <button
            className={`px-3 py-1 rounded text-xs font-bold transition ${activeTab === 'pnl' ? 'bg-accent-blue text-white' : 'text-secondary'}`}
            onClick={() => { sounds.playClick(); setActiveTab('pnl'); }}
          >
            الأرباح والخسائر
          </button>
          <button
            className={`px-3 py-1 rounded text-xs font-bold transition ${activeTab === 'equity' ? 'bg-accent-blue text-white' : 'text-secondary'}`}
            onClick={() => { sounds.playClick(); setActiveTab('equity'); }}
          >
            تغيرات رأس المال
          </button>
          <button
            className={`px-3 py-1 rounded text-xs font-bold transition ${activeTab === 'balanceSheet' ? 'bg-accent-blue text-white' : 'text-secondary'}`}
            onClick={() => { sounds.playClick(); setActiveTab('balanceSheet'); }}
          >
            المركز المالي (الميزانية)
          </button>
        </div>
      </div>

      {/* 1. Trading Account */}
      {activeTab === 'trading' && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-cyan-400">حساب المتاجرة (Trading Account) — النشاط الأساسي</h4>
          <table className="accounting-table">
            <thead>
              <tr>
                <th>البيان (Description)</th>
                <th>المبلغ (Amount)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>إيراد المبيعات (Sales Revenue)</td>
                <td className="font-mono">
                  <span className="clickable-number" onClick={() => onTraceNumber('sales_revenue')}>
                    {tradingAccount.sales.toLocaleString()} ج.م
                  </span>
                </td>
              </tr>
              <tr>
                <td>يُطرح: تكلفة المشتريات (Cost of Purchases)</td>
                <td className="font-mono text-rose-400">
                  <span className="clickable-number" onClick={() => onTraceNumber('purchases')}>
                    ({tradingAccount.purchases.toLocaleString()}) ج.م
                  </span>
                </td>
              </tr>
              <tr className="bg-secondary font-bold text-base">
                <td>مجمل الربح / الخسارة (Gross Profit/Loss)</td>
                <td className={`font-mono ${tradingAccount.grossProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {tradingAccount.grossProfit >= 0 ? `+${tradingAccount.grossProfit.toLocaleString()}` : tradingAccount.grossProfit.toLocaleString()} ج.م
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 2. Profit & Loss */}
      {activeTab === 'pnl' && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-cyan-400">حساب الأرباح والخسائر (Profit & Loss Account)</h4>
          <table className="accounting-table">
            <thead>
              <tr>
                <th>البيان (Description)</th>
                <th>المبلغ (Amount)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>مجمل الربح المنقول من حساب المتاجرة</td>
                <td className="font-mono font-bold text-emerald-400">
                  {profitAndLoss.grossProfit.toLocaleString()} ج.م
                </td>
              </tr>
              {profitAndLoss.expenses.map(e => (
                <tr key={e.id}>
                  <td>يُطرح: {e.nameAr}</td>
                  <td className="font-mono text-rose-400">
                    <span className="clickable-number" onClick={() => onTraceNumber(e.id)}>
                      ({e.amount.toLocaleString()}) ج.م
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-secondary font-extrabold text-base border-t-2 border-accent-blue">
                <td>صافي الربح / الخسارة النهائي (Net Income)</td>
                <td className={`font-mono ${profitAndLoss.netIncome >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {profitAndLoss.netIncome >= 0 ? `+${profitAndLoss.netIncome.toLocaleString()}` : profitAndLoss.netIncome.toLocaleString()} ج.م
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 3. Equity Statement */}
      {activeTab === 'equity' && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-cyan-400">قائمة التغير في رأس المال (Statement of Changes in Equity)</h4>
          <table className="accounting-table">
            <thead>
              <tr>
                <th>البيان (Description)</th>
                <th>المبلغ (Amount)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>رأس المال أول المدة (Beginning Capital)</td>
                <td className="font-mono">
                  <span className="clickable-number" onClick={() => onTraceNumber('capital')}>
                    {equityStatement.beginningCapital.toLocaleString()} ج.م
                  </span>
                </td>
              </tr>
              <tr>
                <td>يُضاف: صافي الربح المحقق (Net Income)</td>
                <td className="font-mono text-emerald-400">
                  +{equityStatement.netIncome.toLocaleString()} ج.م
                </td>
              </tr>
              <tr>
                <td>يُطرح: المسحوبات الشخصية (Drawings)</td>
                <td className="font-mono text-rose-400">
                  <span className="clickable-number" onClick={() => onTraceNumber('drawings')}>
                    ({equityStatement.drawings.toLocaleString()}) ج.م
                  </span>
                </td>
              </tr>
              <tr className="bg-secondary font-extrabold text-base border-t-2 border-accent-blue">
                <td>رأس المال صافي آخر الفترة (Ending Capital)</td>
                <td className="font-mono text-purple-400">
                  {equityStatement.endingEquity.toLocaleString()} ج.م
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Balance Sheet */}
      {activeTab === 'balanceSheet' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-cyan-400">قائمة المركز المالي — الميزانية العمومية (BALANCE SHEET)</h4>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${balanceSheet.isBalanced ? 'bg-emerald-950 text-emerald-400 border border-emerald-500' : 'bg-rose-950 text-rose-400 border border-rose-500'}`}>
              {balanceSheet.isBalanced ? '🟢 الميزانية متوازنة تماماً' : '🔴 اختلال في الميزانية'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Right: Assets */}
            <div className="p-3 rounded-lg bg-secondary border border-color space-y-2">
              <h5 className="font-bold text-xs text-cyan-400 uppercase tracking-wider">جانب الأصول (Assets)</h5>

              <div className="space-y-1 text-xs">
                <span className="font-bold block text-secondary">الأصول المتداولة (Current Assets):</span>
                {balanceSheet.currentAssets.map(a => (
                  <div key={a.id} className="flex justify-between font-mono">
                    <span>{a.nameAr}</span>
                    <span className="clickable-number" onClick={() => onTraceNumber(a.id)}>{a.amount.toLocaleString()} ج.م</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-1 border-t border-color text-cyan-300">
                  <span>إجمالي المتداولة:</span>
                  <span>{balanceSheet.totalCurrentAssets.toLocaleString()} ج.م</span>
                </div>
              </div>

              <div className="space-y-1 text-xs pt-2 border-t border-color">
                <span className="font-bold block text-secondary">الأصول غير المتداولة (Non-Current Assets):</span>
                {balanceSheet.nonCurrentAssets.map(a => (
                  <div key={a.id} className="flex justify-between font-mono">
                    <span>{a.nameAr}</span>
                    <span className="clickable-number" onClick={() => onTraceNumber(a.id)}>{a.amount.toLocaleString()} ج.م</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-1 border-t border-color text-blue-300">
                  <span>إجمالي الثابتة:</span>
                  <span>{balanceSheet.totalNonCurrentAssets.toLocaleString()} ج.م</span>
                </div>
              </div>

              <div className="flex justify-between font-extrabold text-sm pt-2 border-t-2 border-accent-blue text-cyan-400">
                <span>إجمالي الأصول (TOTAL ASSETS):</span>
                <span>{balanceSheet.totalAssets.toLocaleString()} ج.م</span>
              </div>
            </div>

            {/* Left: Liabilities & Equity */}
            <div className="p-3 rounded-lg bg-secondary border border-color space-y-2">
              <h5 className="font-bold text-xs text-rose-400 uppercase tracking-wider">الخصوم وحقوق الملكية (Liabilities & Equity)</h5>

              <div className="space-y-1 text-xs">
                <span className="font-bold block text-secondary">الخصوم والالتزامات (Liabilities):</span>
                {balanceSheet.currentLiabilities.map(l => (
                  <div key={l.id} className="flex justify-between font-mono">
                    <span>{l.nameAr}</span>
                    <span className="clickable-number text-rose-400" onClick={() => onTraceNumber(l.id)}>{l.amount.toLocaleString()} ج.م</span>
                  </div>
                ))}
                {balanceSheet.longTermLiabilities.map(l => (
                  <div key={l.id} className="flex justify-between font-mono">
                    <span>{l.nameAr} (طويل الأجل)</span>
                    <span className="clickable-number text-rose-400" onClick={() => onTraceNumber(l.id)}>{l.amount.toLocaleString()} ج.م</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-1 border-t border-color text-rose-300">
                  <span>إجمالي الالتزامات:</span>
                  <span>{balanceSheet.totalLiabilities.toLocaleString()} ج.م</span>
                </div>
              </div>

              <div className="space-y-1 text-xs pt-2 border-t border-color">
                <span className="font-bold block text-secondary">حقوق الملكية (Owner Equity):</span>
                <div className="flex justify-between font-mono">
                  <span>رأس المال صافي آخر الفترة</span>
                  <span className="text-purple-400 font-bold">{balanceSheet.endingEquity.toLocaleString()} ج.م</span>
                </div>
              </div>

              <div className="flex justify-between font-extrabold text-sm pt-2 border-t-2 border-accent-emerald text-emerald-400">
                <span>إجمالي الخصوم وحقوق الملكية:</span>
                <span>{balanceSheet.totalLiabilitiesAndEquity.toLocaleString()} ج.م</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
