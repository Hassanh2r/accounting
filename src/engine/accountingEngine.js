// Interactive Accounting Simulation Engine
// Handles state, debit/credit validation, accounting equation, ledger T-accounts, trial balance, and financial statements.

export const ACCOUNT_TYPES = {
  ASSET: { nameAr: 'أصل', nameEn: 'Asset', normalSide: 'DEBIT', category: 'BALANCE_SHEET' },
  LIABILITY: { nameAr: 'التزام (خصم)', nameEn: 'Liability', normalSide: 'CREDIT', category: 'BALANCE_SHEET' },
  EQUITY: { nameAr: 'حقوق ملكية', nameEn: 'Owner Equity', normalSide: 'CREDIT', category: 'BALANCE_SHEET' },
  REVENUE: { nameAr: 'إيراد', nameEn: 'Revenue', normalSide: 'CREDIT', category: 'INCOME_STATEMENT' },
  EXPENSE: { nameAr: 'مصروف', nameEn: 'Expense', normalSide: 'DEBIT', category: 'INCOME_STATEMENT' },
  DRAWINGS: { nameAr: 'مسحوبات', nameEn: 'Drawings', normalSide: 'DEBIT', category: 'EQUITY_STATEMENT' }
};

export const INITIAL_DEFAULT_ACCOUNTS = [
  { id: 'cash', nameAr: 'النقدية بالخزينة', nameEn: 'Cash', type: 'ASSET', subType: 'CURRENT', balance: 100000 },
  { id: 'bank', nameAr: 'البنك', nameEn: 'Bank', type: 'ASSET', subType: 'CURRENT', balance: 0 },
  { id: 'inventory', nameAr: 'المخزون / البضاعة', nameEn: 'Inventory', type: 'ASSET', subType: 'CURRENT', balance: 50000 },
  { id: 'receivables', nameAr: 'العملاء / المدينون', nameEn: 'Accounts Receivable', type: 'ASSET', subType: 'CURRENT', balance: 20000 },
  { id: 'equipment', nameAr: 'الآلات والمعدات', nameEn: 'Equipment', type: 'ASSET', subType: 'NON_CURRENT', balance: 80000 },
  { id: 'furniture', nameAr: 'الأثاث', nameEn: 'Furniture', type: 'ASSET', subType: 'NON_CURRENT', balance: 0 },
  { id: 'payables', nameAr: 'الموردون / الدائنون', nameEn: 'Accounts Payable', type: 'LIABILITY', subType: 'CURRENT', balance: 30000 },
  { id: 'bank_loan', nameAr: 'قرض بنكي', nameEn: 'Bank Loan', type: 'LIABILITY', subType: 'LONG_TERM', balance: 0 },
  { id: 'capital', nameAr: 'رأس المال', nameEn: 'Owner Capital', type: 'EQUITY', balance: 220000 },
  { id: 'drawings', nameAr: 'المسحوبات الشخصية', nameEn: 'Drawings', type: 'DRAWINGS', balance: 0 },
  { id: 'sales_revenue', nameAr: 'إيراد المبيعات', nameEn: 'Sales Revenue', type: 'REVENUE', balance: 0 },
  { id: 'purchases', nameAr: 'المشتريات', nameEn: 'Purchases', type: 'EXPENSE', subType: 'DIRECT', balance: 0 },
  { id: 'rent_expense', nameAr: 'مصروف الإيجار', nameEn: 'Rent Expense', type: 'EXPENSE', balance: 0 },
  { id: 'salaries_expense', nameAr: 'مصروف الرواتب', nameEn: 'Salaries Expense', type: 'EXPENSE', balance: 0 },
  { id: 'utilities_expense', nameAr: 'مصروف المرافق', nameEn: 'Utilities Expense', type: 'EXPENSE', balance: 0 },
  { id: 'suspense_account', nameAr: 'حساب التسوية (المعلق)', nameEn: 'Suspense Account', type: 'ASSET', balance: 0 }
];

export class AccountingEngine {
  constructor(initialAccounts = INITIAL_DEFAULT_ACCOUNTS, companyName = 'شركة النيل للتجارة') {
    this.companyName = companyName;
    this.accounts = JSON.parse(JSON.stringify(initialAccounts));
    this.journalEntries = [];
    this.historySnapshots = [];
    this.recordInitialSnapshot();
  }

  reset(accounts = INITIAL_DEFAULT_ACCOUNTS, companyName = 'شركة النيل للتجارة') {
    this.companyName = companyName;
    this.accounts = JSON.parse(JSON.stringify(accounts));
    this.journalEntries = [];
    this.historySnapshots = [];
    this.recordInitialSnapshot();
  }

  recordInitialSnapshot() {
    this.historySnapshots.push({
      step: 0,
      description: 'الرصيد الافتتاحي للشركة',
      accountsSnapshot: JSON.parse(JSON.stringify(this.accounts)),
      totals: this.getTotals()
    });
  }

  getAccount(id) {
    return this.accounts.find(a => a.id === id);
  }

  getTotals() {
    let assets = 0;
    let liabilities = 0;
    let initialEquity = 0;
    let drawings = 0;
    let revenues = 0;
    let expenses = 0;

    this.accounts.forEach(acc => {
      const type = ACCOUNT_TYPES[acc.type];
      if (acc.type === 'ASSET') assets += acc.balance;
      else if (acc.type === 'LIABILITY') liabilities += acc.balance;
      else if (acc.type === 'EQUITY') initialEquity += acc.balance;
      else if (acc.type === 'DRAWINGS') drawings += acc.balance;
      else if (acc.type === 'REVENUE') revenues += acc.balance;
      else if (acc.type === 'EXPENSE') expenses += acc.balance;
    });

    const netIncome = revenues - expenses;
    const currentEquity = initialEquity + netIncome - drawings;
    const equationDiff = assets - (liabilities + currentEquity);
    const isBalanced = Math.abs(equationDiff) < 0.01;

    return {
      totalAssets: assets,
      totalLiabilities: liabilities,
      initialEquity,
      drawings,
      totalRevenues: revenues,
      totalExpenses: expenses,
      netIncome,
      totalEquity: currentEquity,
      equationDiff,
      isBalanced
    };
  }

  // Applies a journal entry to the engine
  processTransaction(entry) {
    // entry = { date, description, drAccount, crAccount, amount, explanation }
    const drAcc = this.getAccount(entry.drAccount);
    const crAcc = this.getAccount(entry.crAccount);

    if (!drAcc || !crAcc) {
      return { success: false, message: 'أحد الحسابات المختارة غير موجود.' };
    }

    if (entry.amount <= 0) {
      return { success: false, message: 'يجب أن يكون المبلغ أكبر من الصفر.' };
    }

    const beforeTotals = this.getTotals();
    const beforeAccounts = JSON.parse(JSON.stringify(this.accounts));

    // Update Dr Account
    this.updateAccountBalance(drAcc, entry.amount, 'DEBIT');

    // Update Cr Account
    this.updateAccountBalance(crAcc, entry.amount, 'CREDIT');

    const afterTotals = this.getTotals();
    const afterAccounts = JSON.parse(JSON.stringify(this.accounts));

    const newJournalEntry = {
      id: `TX-${String(this.journalEntries.length + 1).padStart(3, '0')}`,
      date: entry.date || new Date().toLocaleDateString('ar-EG'),
      description: entry.description,
      drAccount: drAcc.id,
      drAccountNameAr: drAcc.nameAr,
      crAccount: crAcc.id,
      crAccountNameAr: crAcc.nameAr,
      amount: entry.amount,
      explanation: entry.explanation || '',
      beforeTotals,
      afterTotals
    };

    this.journalEntries.push(newJournalEntry);

    this.historySnapshots.push({
      step: this.journalEntries.length,
      transactionId: newJournalEntry.id,
      description: entry.description,
      accountsSnapshot: afterAccounts,
      totals: afterTotals
    });

    return {
      success: true,
      journalEntry: newJournalEntry,
      consequenceMap: this.buildConsequenceMap(newJournalEntry, drAcc, crAcc, entry.amount)
    };
  }

  updateAccountBalance(acc, amount, side) {
    const normalSide = ACCOUNT_TYPES[acc.type].normalSide;
    if (side === normalSide) {
      acc.balance += amount;
    } else {
      acc.balance -= amount;
    }
  }

  buildConsequenceMap(entry, drAcc, crAcc, amount) {
    const drType = ACCOUNT_TYPES[drAcc.type];
    const crType = ACCOUNT_TYPES[crAcc.type];

    const drDir = drType.normalSide === 'DEBIT' ? 'زيادة ↑' : 'نقص ↓';
    const crDir = crType.normalSide === 'CREDIT' ? 'زيادة ↑' : 'نقص ↓';

    return {
      event: entry.description,
      affectedAccounts: [
        { name: drAcc.nameAr, type: drType.nameAr, amount, direction: drDir, side: 'مدين (Debit)' },
        { name: crAcc.nameAr, type: crType.nameAr, amount, direction: crDir, side: 'دائن (Credit)' }
      ],
      equationImpact: this.explainEquationImpact(drAcc, crAcc, amount),
      journal: `من حـ/ ${drAcc.nameAr} (${amount.toLocaleString()} ج.م)\nإلى حـ/ ${crAcc.nameAr} (${amount.toLocaleString()} ج.م)`,
      ledger: `تم تحديث حساب T الخاص بـ (${drAcc.nameAr}) في الجانب المدين، وحساب T الخاص بـ (${crAcc.nameAr}) في الجانب الدائن.`,
      trialBalance: 'تم إضافة التأثير المتوازن إلى ميزان المراجعة، ويظل الميزان متزناً (إجمالي المدين = إجمالي الدائن).',
      financialStatements: this.explainStatementImpact(drAcc, crAcc)
    };
  }

  explainEquationImpact(drAcc, crAcc, amount) {
    if (drAcc.type === 'ASSET' && crAcc.type === 'ASSET') {
      return `زيادة أصل (${drAcc.nameAr}) بـ ${amount.toLocaleString()} ج.م ونقص أصل آخر (${crAcc.nameAr}) بـ ${amount.toLocaleString()} ج.م $\\rightarrow$ الأصول تظل ثابتة ومستقرة، وتظل المعادلة متوازنة.`;
    }
    if (drAcc.type === 'ASSET' && crAcc.type === 'LIABILITY') {
      return `زيادة الأصول (${drAcc.nameAr}) بـ ${amount.toLocaleString()} ج.م وزيادة الالتزامات (${crAcc.nameAr}) بـ ${amount.toLocaleString()} ج.م $\\rightarrow$ يزداد جانبا المعادلة بنفس القيمة وتظل متوازنة.`;
    }
    if (drAcc.type === 'ASSET' && crAcc.type === 'EQUITY') {
      return `زيادة الأصول (${drAcc.nameAr}) بـ ${amount.toLocaleString()} ج.م وزيادة حقوق الملكية (${crAcc.nameAr}) بـ ${amount.toLocaleString()} ج.م $\\rightarrow$ يزداد جانبا المعادلة وتظل متوازنة.`;
    }
    if (drAcc.type === 'EXPENSE' && crAcc.type === 'ASSET') {
      return `زيادة المصروفات (${drAcc.nameAr}) تؤدي إلى خفض صافي الربح وبالتالي خفض حقوق الملكية بـ ${amount.toLocaleString()} ج.م، بالتوازي مع نقص النقدية/الأصول بـ ${amount.toLocaleString()} ج.م $\\rightarrow$ ينخفض الجانبان بنفس القيمة وتظل المعادلة متوازنة.`;
    }
    if (drAcc.type === 'ASSET' && crAcc.type === 'REVENUE') {
      return `زيادة الأصول (${drAcc.nameAr}) بـ ${amount.toLocaleString()} ج.م وزيادة الإيرادات التي تزيد حقوق الملكية بـ ${amount.toLocaleString()} ج.م $\\rightarrow$ يزداد الجانبان وتظل المعادلة متوازنة.`;
    }
    if (drAcc.type === 'LIABILITY' && crAcc.type === 'ASSET') {
      return `نقص الالتزامات (${drAcc.nameAr}) بـ ${amount.toLocaleString()} ج.م ونقص الأصول (${crAcc.nameAr}) بـ ${amount.toLocaleString()} ج.م $\\rightarrow$ ينخفض الجانبان وتظل المعادلة متوازنة.`;
    }
    return `تغيير متوازن قدره ${amount.toLocaleString()} ج.م يؤثر على طرفي المعادلة المحاسبية دون إخلال بالتوازن.`;
  }

  explainStatementImpact(drAcc, crAcc) {
    const list = [];
    if (drAcc.type === 'REVENUE' || crAcc.type === 'REVENUE' || drAcc.type === 'EXPENSE' || crAcc.type === 'EXPENSE') {
      list.push('تأثر حساب الأرباح والخسائر (Income Statement) بتغير الإيرادات أو المصروفات وبالتالي تغير صافي الدخل.');
    }
    if (drAcc.type === 'ASSET' || crAcc.type === 'ASSET' || drAcc.type === 'LIABILITY' || crAcc.type === 'LIABILITY' || drAcc.type === 'EQUITY' || crAcc.type === 'EQUITY') {
      list.push('تأثرت قائمة المركز المالي (Balance Sheet) بتعديل أرصدة الأصول أو الخصوم أو رأس المال.');
    }
    return list.join(' ');
  }

  getLedgerTAccounts() {
    // Generate T-Accounts dynamically from initial balances + journal entries
    const tAccounts = {};

    this.accounts.forEach(acc => {
      tAccounts[acc.id] = {
        id: acc.id,
        nameAr: acc.nameAr,
        nameEn: acc.nameEn,
        type: acc.type,
        drEntries: [],
        crEntries: [],
        initialBalance: acc.balance // current state
      };
    });

    // Populate postings from journal entries
    this.journalEntries.forEach(je => {
      if (tAccounts[je.drAccount]) {
        tAccounts[je.drAccount].drEntries.push({
          date: je.date,
          ref: je.id,
          contraAccount: je.crAccountNameAr,
          amount: je.amount
        });
      }
      if (tAccounts[je.crAccount]) {
        tAccounts[je.crAccount].crEntries.push({
          date: je.date,
          ref: je.id,
          contraAccount: je.drAccountNameAr,
          amount: je.amount
        });
      }
    });

    // Calculate totals & balances for each T-Account
    Object.values(tAccounts).forEach(tAcc => {
      const drSum = tAcc.drEntries.reduce((sum, e) => sum + e.amount, 0);
      const crSum = tAcc.crEntries.reduce((sum, e) => sum + e.amount, 0);
      
      const accObj = this.getAccount(tAcc.id);
      tAcc.drSum = drSum;
      tAcc.crSum = crSum;
      tAcc.currentBalance = accObj ? accObj.balance : 0;
      tAcc.normalSide = ACCOUNT_TYPES[accObj?.type]?.normalSide || 'DEBIT';
    });

    return Object.values(tAccounts);
  }

  getTrialBalance() {
    let totalDr = 0;
    let totalCr = 0;
    const rows = [];

    this.accounts.forEach(acc => {
      if (acc.balance === 0) return;

      const normalSide = ACCOUNT_TYPES[acc.type].normalSide;
      let drVal = 0;
      let crVal = 0;

      if (normalSide === 'DEBIT') {
        if (acc.balance >= 0) {
          drVal = acc.balance;
        } else {
          crVal = Math.abs(acc.balance);
        }
      } else {
        if (acc.balance >= 0) {
          crVal = acc.balance;
        } else {
          drVal = Math.abs(acc.balance);
        }
      }

      totalDr += drVal;
      totalCr += crVal;

      rows.push({
        id: acc.id,
        nameAr: acc.nameAr,
        nameEn: acc.nameEn,
        type: acc.type,
        dr: drVal,
        cr: crVal
      });
    });

    const isBalanced = Math.abs(totalDr - totalCr) < 0.01;

    return {
      rows,
      totalDr,
      totalCr,
      diff: totalDr - totalCr,
      isBalanced
    };
  }

  getFinancialStatements() {
    const totals = this.getTotals();

    // 1. Trading Account (حساب المتاجرة)
    const sales = this.getAccount('sales_revenue')?.balance || 0;
    const purchases = this.getAccount('purchases')?.balance || 0;
    const grossProfit = sales - purchases;

    // 2. Profit & Loss Account (حساب الأرباح والخسائر)
    const expenses = this.accounts
      .filter(a => a.type === 'EXPENSE' && a.id !== 'purchases')
      .map(a => ({ id: a.id, nameAr: a.nameAr, amount: a.balance }));
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netIncome = grossProfit - totalExpenses;

    // 3. Statement of Changes in Equity (قائمة التغير في رأس المال)
    const capital = this.getAccount('capital')?.balance || 0;
    const drawings = this.getAccount('drawings')?.balance || 0;
    const endingEquity = capital + netIncome - drawings;

    // 4. Balance Sheet (قائمة المركز المالي)
    const currentAssets = this.accounts
      .filter(a => a.type === 'ASSET' && a.subType === 'CURRENT' && a.balance !== 0)
      .map(a => ({ id: a.id, nameAr: a.nameAr, amount: a.balance }));
    const totalCurrentAssets = currentAssets.reduce((sum, a) => sum + a.amount, 0);

    const nonCurrentAssets = this.accounts
      .filter(a => a.type === 'ASSET' && a.subType === 'NON_CURRENT' && a.balance !== 0)
      .map(a => ({ id: a.id, nameAr: a.nameAr, amount: a.balance }));
    const totalNonCurrentAssets = nonCurrentAssets.reduce((sum, a) => sum + a.amount, 0);

    const totalAssets = totalCurrentAssets + totalNonCurrentAssets;

    const currentLiabilities = this.accounts
      .filter(a => a.type === 'LIABILITY' && a.subType === 'CURRENT' && a.balance !== 0)
      .map(a => ({ id: a.id, nameAr: a.nameAr, amount: a.balance }));
    const totalCurrentLiabilities = currentLiabilities.reduce((sum, l) => sum + l.amount, 0);

    const longTermLiabilities = this.accounts
      .filter(a => a.type === 'LIABILITY' && a.subType === 'LONG_TERM' && a.balance !== 0)
      .map(a => ({ id: a.id, nameAr: a.nameAr, amount: a.balance }));
    const totalLongTermLiabilities = longTermLiabilities.reduce((sum, l) => sum + l.amount, 0);

    const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;
    const totalLiabilitiesAndEquity = totalLiabilities + endingEquity;

    const isBalanced = Math.abs(totalAssets - totalLiabilitiesAndEquity) < 0.01;

    return {
      tradingAccount: { sales, purchases, grossProfit },
      profitAndLoss: { grossProfit, expenses, totalExpenses, netIncome },
      equityStatement: { beginningCapital: capital, netIncome, drawings, endingEquity },
      balanceSheet: {
        currentAssets,
        totalCurrentAssets,
        nonCurrentAssets,
        totalNonCurrentAssets,
        totalAssets,
        currentLiabilities,
        totalCurrentLiabilities,
        longTermLiabilities,
        totalLongTermLiabilities,
        totalLiabilities,
        endingEquity,
        totalLiabilitiesAndEquity,
        isBalanced
      }
    };
  }

  // Audit trail for "Trace This Number" feature
  traceNumber(accountId) {
    const acc = this.getAccount(accountId);
    if (!acc) return null;

    const auditTrail = [];
    let running = 0;

    // Check initial balance from step 0
    const initialSnap = this.historySnapshots[0];
    const initialAcc = initialSnap?.accountsSnapshot.find(a => a.id === accountId);
    if (initialAcc && initialAcc.balance !== 0) {
      running = initialAcc.balance;
      auditTrail.push({
        id: 'INIT',
        date: 'بداية الفترة',
        description: 'رصيد افتتاحي للشركة',
        drAmount: ACCOUNT_TYPES[acc.type].normalSide === 'DEBIT' ? initialAcc.balance : 0,
        crAmount: ACCOUNT_TYPES[acc.type].normalSide === 'CREDIT' ? initialAcc.balance : 0,
        runningBalance: running
      });
    }

    // Trace journal entries
    this.journalEntries.forEach(je => {
      if (je.drAccount === accountId) {
        const isNormalDr = ACCOUNT_TYPES[acc.type].normalSide === 'DEBIT';
        running += isNormalDr ? je.amount : -je.amount;
        auditTrail.push({
          id: je.id,
          date: je.date,
          description: je.description,
          drAmount: je.amount,
          crAmount: 0,
          contraAccount: je.crAccountNameAr,
          runningBalance: running
        });
      } else if (je.crAccount === accountId) {
        const isNormalCr = ACCOUNT_TYPES[acc.type].normalSide === 'CREDIT';
        running += isNormalCr ? je.amount : -je.amount;
        auditTrail.push({
          id: je.id,
          date: je.date,
          description: je.description,
          drAmount: 0,
          crAmount: je.amount,
          contraAccount: je.drAccountNameAr,
          runningBalance: running
        });
      }
    });

    return {
      account: acc,
      currentBalance: acc.balance,
      auditTrail
    };
  }
}
