import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import UserGuideModal from './components/UserGuideModal';
import Navbar from './components/Navbar';
import Watermark from './components/Watermark';
import AccountingEquationBar from './components/AccountingEquationBar';
import CompanyDashboard from './components/CompanyDashboard';
import JournalBuilder from './components/JournalBuilder';
import LedgerView from './components/LedgerView';
import TrialBalanceView from './components/TrialBalanceView';
import FinancialStatementsView from './components/FinancialStatementsView';
import ConsequenceMapModal from './components/ConsequenceMapModal';
import TraceNumberModal from './components/TraceNumberModal';
import PredictModeView from './components/PredictModeView';
import ReverseAccountingView from './components/ReverseAccountingView';
import DetectiveModeView from './components/DetectiveModeView';
import WhatIfView from './components/WhatIfView';
import JreLabView from './components/JreLabView';
import RunCompanyChallenge from './components/RunCompanyChallenge';
import TeacherModeView from './components/TeacherModeView';
import HomeworkQuizView from './components/HomeworkQuizView';

import { FileText, BookOpen, Scale } from 'lucide-react';
import { AccountingEngine } from './engine/accountingEngine';
import { SIMULATION_COMPANIES } from './data/curriculumData';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'lab'
  const [showGuide, setShowGuide] = useState(false);

  const [activeMode, setActiveMode] = useState('simulate');
  const [activeCompanyId, setActiveCompanyId] = useState('nile');
  const [outputTab, setOutputTab] = useState('statements'); // 'statements' | 'ledger' | 'trial'

  const companyConfig = SIMULATION_COMPANIES[activeCompanyId] || SIMULATION_COMPANIES.nile;

  // Persistent accounting engine instance
  const [engine] = useState(() => new AccountingEngine(companyConfig.initialAccounts, companyConfig.nameAr));
  const [, setRefreshKey] = useState(0);

  // Modals
  const [consequenceMap, setConsequenceMap] = useState(null);
  const [traceData, setTraceData] = useState(null);

  const forceRefresh = () => setRefreshKey(prev => prev + 1);

  // Switch company preset
  const handleSwitchCompany = (companyId) => {
    setActiveCompanyId(companyId);
    const config = SIMULATION_COMPANIES[companyId] || SIMULATION_COMPANIES.nile;
    engine.reset(config.initialAccounts, config.nameAr);
    forceRefresh();
  };

  const handleResetCompany = () => {
    const config = SIMULATION_COMPANIES[activeCompanyId] || SIMULATION_COMPANIES.nile;
    engine.reset(config.initialAccounts, config.nameAr);
    forceRefresh();
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleSound = () => {
    const state = sounds.toggle();
    setSoundEnabled(state);
    return state;
  };

  const handleTraceNumber = (accountId) => {
    const data = engine.traceNumber(accountId);
    if (data) {
      setTraceData(data);
    }
  };

  const totals = engine.getTotals();
  const trialBalance = engine.getTrialBalance();

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'} relative`}>
      {/* Floating Watermark for Dr. Ahmed Rizk */}
      <Watermark />

      {currentView === 'landing' ? (
        <LandingPage
          onEnterLab={() => setCurrentView('lab')}
          onOpenGuide={() => setShowGuide(true)}
          onSelectCompany={(coId) => handleSwitchCompany(coId)}
        />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            theme={theme}
            toggleTheme={toggleTheme}
            soundEnabled={soundEnabled}
            toggleSound={toggleSound}
            onOpenGuide={() => setShowGuide(true)}
            onGoHome={() => setCurrentView('landing')}
          />

          <div className="p-4 max-w-[1650px] mx-auto space-y-4 w-full flex-1">
            {/* Animated Accounting Equation Bar */}
            <AccountingEquationBar totals={totals} />

            <div className="app-layout">
              {/* Main Interactive Workspace Area */}
              <div className="space-y-4">
                {/* Active Mode View */}
                {activeMode === 'simulate' && (
                  <JournalBuilder
                    engine={engine}
                    companyData={companyConfig}
                    onTransactionSuccess={forceRefresh}
                    onOpenConsequenceMap={(map) => setConsequenceMap(map)}
                  />
                )}

                {activeMode === 'predict' && <PredictModeView />}
                {activeMode === 'reverse' && <ReverseAccountingView />}
                {activeMode === 'detective' && <DetectiveModeView />}
                {activeMode === 'whatif' && <WhatIfView />}
                {activeMode === 'jre' && <JreLabView />}
                {activeMode === 'challenge' && (
                  <RunCompanyChallenge engine={engine} onRefreshState={forceRefresh} />
                )}
                {activeMode === 'teacher' && <TeacherModeView />}
                {activeMode === 'homework' && <HomeworkQuizView />}

                {/* Clean Tabbed Output Area */}
                <div className="space-y-3">
                  <div className="output-tab-bar">
                    <button
                      className={`output-tab-btn ${outputTab === 'statements' ? 'active' : ''}`}
                      onClick={() => { sounds.playClick(); setOutputTab('statements'); }}
                    >
                      <FileText size={18} /> 📑 القوائم والحسابات الختامية
                    </button>
                    <button
                      className={`output-tab-btn ${outputTab === 'ledger' ? 'active' : ''}`}
                      onClick={() => { sounds.playClick(); setOutputTab('ledger'); }}
                    >
                      <BookOpen size={18} /> 📒 دفتر الأستاذ (حسابات T)
                    </button>
                    <button
                      className={`output-tab-btn ${outputTab === 'trial' ? 'active' : ''}`}
                      onClick={() => { sounds.playClick(); setOutputTab('trial'); }}
                    >
                      <Scale size={18} /> 📊 ميزان المراجعة
                    </button>
                  </div>

                  {outputTab === 'statements' && (
                    <FinancialStatementsView engine={engine} onTraceNumber={handleTraceNumber} />
                  )}
                  {outputTab === 'ledger' && <LedgerView engine={engine} />}
                  {outputTab === 'trial' && (
                    <TrialBalanceView engine={engine} onTraceNumber={handleTraceNumber} />
                  )}
                </div>
              </div>

              {/* Right Panel: Live Company Status Dashboard */}
              <CompanyDashboard
                engine={engine}
                totals={totals}
                trialBalance={trialBalance}
                onResetCompany={handleResetCompany}
                activeCompanyId={activeCompanyId}
                onSwitchCompany={handleSwitchCompany}
              />
            </div>
          </div>
        </div>
      )}

      {/* User Guide Modal */}
      {showGuide && (
        <UserGuideModal onClose={() => setShowGuide(false)} />
      )}

      {/* Modals */}
      {consequenceMap && (
        <ConsequenceMapModal map={consequenceMap} onClose={() => setConsequenceMap(null)} />
      )}

      {traceData && (
        <TraceNumberModal traceData={traceData} onClose={() => setTraceData(null)} />
      )}
    </div>
  );
}
