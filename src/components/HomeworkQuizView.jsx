import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, Trophy, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { HOMEWORK_SETS } from '../data/curriculumData';

export default function HomeworkQuizView() {
  const [selectedHwIdx, setSelectedHwIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const activeHw = HOMEWORK_SETS[selectedHwIdx];
  const mcqs = activeHw.mcqs || [];

  const handleSelectOption = (qId, optionIdx) => {
    sounds.playClick();
    setUserAnswers({ ...userAnswers, [qId]: optionIdx });
  };

  const handleCheckAnswers = () => {
    sounds.playSuccess();
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    mcqs.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswerIndex) score++;
    });
    return score;
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-color">
        <div className="flex items-center gap-2 text-cyan-400">
          <BookOpen className="w-5 h-5" />
          <h3 className="font-bold text-lg">📝 الواجبات والتمارين الذاتية (HOMEWORK & EXERCISES)</h3>
        </div>

        <select
          className="p-2 rounded-md bg-secondary border border-color text-xs font-bold"
          value={selectedHwIdx}
          onChange={(e) => {
            sounds.playClick();
            setSelectedHwIdx(parseInt(e.target.value));
            setUserAnswers({});
            setSubmitted(false);
          }}
        >
          {HOMEWORK_SETS.map((hw, idx) => (
            <option key={hw.id} value={idx}>{hw.titleAr}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {mcqs.map((q, idx) => {
          const selected = userAnswers[q.id];
          return (
            <div key={q.id} className="p-4 rounded-lg bg-secondary border border-color space-y-2">
              <div className="font-bold text-sm text-cyan-300">
                س{idx + 1}: {q.question}
              </div>

              <div className="space-y-1.5 pt-1">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selected === oIdx;
                  let optStyle = 'bg-card border-color text-primary hover:bg-card-hover';
                  if (submitted) {
                    if (oIdx === q.correctAnswerIndex) optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    else if (isSelected) optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={submitted}
                      className={`w-full p-2.5 rounded border text-right text-xs transition flex justify-between items-center ${optStyle}`}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                    >
                      <span>{opt}</span>
                      {submitted && oIdx === q.correctAnswerIndex && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                      {submitted && isSelected && oIdx !== q.correctAnswerIndex && <XCircle size={16} className="text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="p-2.5 rounded bg-card border border-color text-xs text-secondary leading-relaxed pt-2">
                  💡 <strong>التفسير:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          className="btn-primary w-full justify-center py-3"
          onClick={handleCheckAnswers}
          disabled={Object.keys(userAnswers).length === 0}
        >
          <Trophy size={18} /> تصحيح الواجب واعتماد النتيجة
        </button>
      ) : (
        <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-center space-y-2">
          <div className="text-lg font-bold text-emerald-400">
            نتيجتك في هذا الواجب: {calculateScore()} من {mcqs.length} ({Math.round((calculateScore() / mcqs.length) * 100)}%)
          </div>
          <button
            className="btn-secondary justify-center mx-auto"
            onClick={() => {
              setUserAnswers({});
              setSubmitted(false);
            }}
          >
            إعادة المحاولة
          </button>
        </div>
      )}
    </div>
  );
}
