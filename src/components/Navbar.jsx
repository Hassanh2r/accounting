import React from 'react';
import { 
  Building2, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon,
  Home
} from 'lucide-react';
import ModeSelectorMenu from './ModeSelectorMenu';
import { sounds } from '../utils/soundEffects';

export default function Navbar({ 
  activeMode, 
  setActiveMode, 
  theme, 
  toggleTheme, 
  soundEnabled, 
  toggleSound,
  onOpenGuide,
  onGoHome
}) {
  return (
    <header className="app-navbar">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-xl bg-card border border-color hover:border-cyan-500/40 text-secondary hover:text-cyan-400 transition"
          onClick={() => {
            sounds.playClick();
            onGoHome();
          }}
          title="الصفحة الرئيسية"
        >
          <Home size={18} />
        </button>

        <div className="brand-badge cursor-pointer" onClick={onGoHome}>
          <div className="brand-icon-wrapper">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="brand-title-text">مكتب المحاسب التفاعلي</h1>
            <span className="block text-xs text-secondary font-medium">Interactive Accounting Lab</span>
          </div>
        </div>
      </div>

      {/* Mode Action Selector Dropdown Menu */}
      <ModeSelectorMenu activeMode={activeMode} setActiveMode={setActiveMode} />

      {/* Utility Controls */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary border border-color hover:bg-card-hover text-amber-300 font-bold text-xs transition"
          onClick={() => {
            sounds.playClick();
            onOpenGuide();
          }}
        >
          <BookOpen size={16} />
          <span>دليل الاستخدام</span>
        </button>

        <button 
          className="p-2 rounded-xl bg-card border border-color hover:bg-card-hover text-secondary hover:text-primary transition"
          onClick={() => {
            const state = toggleSound();
            if (state) sounds.playClick();
          }}
          title={soundEnabled ? 'إيقاف الصوت' : 'تشغيل الصوت'}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button 
          className="p-2 rounded-xl bg-card border border-color hover:bg-card-hover text-secondary hover:text-primary transition"
          onClick={() => {
            sounds.playClick();
            toggleTheme();
          }}
          title="تغيير المظهر"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
