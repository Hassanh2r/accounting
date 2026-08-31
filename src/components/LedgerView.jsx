import React from 'react';
import { BookOpen, Layers } from 'lucide-react';
import { ACCOUNT_TYPES } from '../engine/accountingEngine';

export default function LedgerView({ engine }) {
  const tAccounts = engine.getLedgerTAccounts();

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-cyan-400">
          <BookOpen className="w-5 h-5" />
          <h3 className="font-bold text-lg">📒 دفتر الأستاذ العام — حسابات حرف T (LIVE T-ACCOUNTS)</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-secondary border border-color text-secondary">
          مستخرجة تلقائياً من اليومية
        </span>
      </div>

      <p className="text-xs text-secondary leading-relaxed">
        لكل عنصر من عناصر الدفتر حساب مستقل على شكل حرف T. يظهر الجانب المدين والجانب الدائن مع التوجيه التلقائي واستخراج رصيد آخر الفترة بالفرق بين الجانبين.
      </p>

      <div className="t-account-grid">
        {tAccounts.map(acc => {
          const typeInfo = ACCOUNT_TYPES[acc.type];
          return (
            <div key={acc.id} className="t-account-card">
              <div className="t-account-header">
                <div>حـ/ {acc.nameAr}</div>
                <div className="text-xs font-normal text-secondary">({typeInfo.nameAr} — {typeInfo.nameEn})</div>
              </div>

              <div className="t-account-columns">
                {/* Right Side in RTL: Debit (مدين) */}
                <div className="t-col dr">
                  <div className="t-col-title dr">منه (مدين - Debit)</div>
                  {acc.drEntries.length === 0 ? (
                    <div className="text-xs text-muted text-center py-2">—</div>
                  ) : (
                    acc.drEntries.map((e, idx) => (
                      <div key={idx} className="t-entry-row">
                        <span className="text-secondary truncate">{e.contraAccount}</span>
                        <span className="text-dr-color font-bold">{e.amount.toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Left Side in RTL: Credit (دائن) */}
                <div className="t-col cr">
                  <div className="t-col-title cr">له (دائن - Credit)</div>
                  {acc.crEntries.length === 0 ? (
                    <div className="text-xs text-muted text-center py-2">—</div>
                  ) : (
                    acc.crEntries.map((e, idx) => (
                      <div key={idx} className="t-entry-row">
                        <span className="text-secondary truncate">{e.contraAccount}</span>
                        <span className="text-cr-color font-bold">{e.amount.toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="t-account-footer">
                <span>رصيد الحساب المتبقي:</span>
                <span className="font-mono text-cyan-400">
                  {acc.currentBalance.toLocaleString()} ج.م ({typeInfo.normalSide === 'DEBIT' ? 'رصيد مدين' : 'رصيد دائن'})
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
