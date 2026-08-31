import React from 'react';
import { Scale, ShieldCheck, AlertTriangle, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function TrialBalanceView({ engine, onTraceNumber }) {
  const trialData = engine.getTrialBalance();
  const { rows, totalDr, totalCr, diff, isBalanced } = trialData;

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-cyan-400">
          <Scale className="w-5 h-5" />
          <h3 className="font-bold text-lg">📊 ميزان المراجعة بالأرصدة (LIVE TRIAL BALANCE)</h3>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
          isBalanced ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-400' : 'bg-rose-950/60 border border-rose-500 text-rose-400'
        }`}>
          {isBalanced ? (
            <>
              <ShieldCheck size={14} /> 🟢 متوازن (BALANCED)
            </>
          ) : (
            <>
              <AlertTriangle size={14} /> 🔴 غير متوازن (فرق: {diff.toLocaleString()} ج.م)
            </>
          )}
        </div>
      </div>

      <p className="text-xs text-secondary leading-relaxed">
        كشف منظم تُعرض فيه أرصدة دفتر الأستاذ بعد ترصيدها، للتحقق من الاتساق الداخلي وصحة النظام المحاسبي. اضغط على أي رقم لمشاهدة مصدر الحساب التاريخي.
      </p>

      <div className="overflow-x-auto">
        <table className="accounting-table">
          <thead>
            <tr>
              <th>اسم الحساب (Account Name)</th>
              <th className="text-dr-color">الأرصدة المدينة (Debit)</th>
              <th className="text-cr-color">الأرصدة الدائنة (Credit)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="font-semibold">{row.nameAr} <span className="text-xs text-secondary font-normal">({row.nameEn})</span></td>
                <td className="font-mono">
                  {row.dr > 0 ? (
                    <span
                      className="clickable-number"
                      onClick={() => {
                        sounds.playClick();
                        onTraceNumber(row.id);
                      }}
                    >
                      {row.dr.toLocaleString()} ج.م
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="font-mono">
                  {row.cr > 0 ? (
                    <span
                      className="clickable-number text-cr-color"
                      onClick={() => {
                        sounds.playClick();
                        onTraceNumber(row.id);
                      }}
                    >
                      {row.cr.toLocaleString()} ج.م
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-secondary font-extrabold text-base border-t-2 border-accent-blue">
              <td>إجمالي المجموع (TOTAL)</td>
              <td className="font-mono text-dr-color">{totalDr.toLocaleString()} ج.م</td>
              <td className="font-mono text-cr-color">{totalCr.toLocaleString()} ج.م</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {!isBalanced && (
        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong>تنبيه الأخطاء المحاسبية:</strong> هناك اختلال في توازن الميزان بمقدار {Math.abs(diff).toLocaleString()} ج.م.
            هذا يشير إلى تسجيل طرف واحد فقط من قيد، أو تسجيل مبالغ غير متساوية في المدين والدائن، أو وقوع أخطاء حسابية في الترصيد.
          </div>
        </div>
      )}
    </div>
  );
}
