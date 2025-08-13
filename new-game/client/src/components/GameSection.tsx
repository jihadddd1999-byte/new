import { useState, useRef, useEffect } from 'react';
import type { GameMode } from '@shared/schema';

interface GameSectionProps {
  currentWord: string;
  gameMode: GameMode;
  answeredBy?: string;
  playerScore: number;
  recentAnswers: Array<{
    playerName: string;
    playerColor: string;
    timeMs: number;
    correct: boolean;
  }>;
  onSubmitAnswer: (answer: string) => void;
  canAnswer: boolean;
}

export default function GameSection({
  currentWord,
  gameMode,
  answeredBy,
  playerScore,
  recentAnswers,
  onSubmitAnswer,
  canAnswer,
}: GameSectionProps) {
  const [inputValue, setInputValue] = useState('');
  const [answerTime, setAnswerTime] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Clear input when new word appears
    if (!answeredBy) {
      setInputValue('');
      setAnswerTime('');
    }
  }, [currentWord, answeredBy]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canAnswer && inputValue.trim()) {
      onSubmitAnswer(inputValue);
      setInputValue('');
    }
  };

  return (
    <section className="flex flex-col items-center gap-4 mb-6">
      <div className="word-box">
        {currentWord}
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="اكتب الكلمة هنا"
        className="game-input"
        disabled={!canAnswer}
        autoComplete="off"
        spellCheck={false}
      />
      
      {answerTime && (
        <div className="text-success-green font-bold min-h-6">
          {answerTime}
        </div>
      )}
      
      <div className="text-neon-blue font-bold">
        النقاط: {playerScore}
      </div>

      {/* Enhanced answers display with player times */}
      {recentAnswers.length > 0 && (
        <div className="answer-display">
          <div className="text-sm mb-2 font-bold text-neon-blue">آخر الإجابات:</div>
          {recentAnswers.slice(-3).map((answer, index) => (
            <div key={index} className="text-xs mb-1">
              <span style={{ color: answer.playerColor }}>{answer.playerName}</span>
              {' - '}
              {(answer.timeMs / 1000).toFixed(2)} ثانية
              {answer.correct ? ' ✅' : ' ❌'}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
