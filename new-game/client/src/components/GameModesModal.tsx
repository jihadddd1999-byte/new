import { useState } from 'react';
import type { GameMode } from '@shared/schema';

interface GameModesModalProps {
  open: boolean;
  onClose: () => void;
  currentMode: GameMode;
  votes: Array<{ gameMode: GameMode; count: number }>;
  votesNeeded: number;
  onVote: (gameMode: GameMode) => void;
}

const gameModeInfo = {
  normal: {
    title: '🎯 الوضع الطبيعي',
    description: 'اكتب الكلمة كما تظهر',
  },
  missing: {
    title: '🧩 كلمات ناقصة',
    description: 'املأ الأحرف الناقصة في الكلمة',
  },
  reversed: {
    title: '🔄 كلمات معكوسة',
    description: 'اكتب الكلمة المعكوسة بالشكل الصحيح',
  },
};

export default function GameModesModal({
  open,
  onClose,
  currentMode,
  votes,
  votesNeeded,
  onVote,
}: GameModesModalProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const handleVote = () => {
    if (selectedMode) {
      onVote(selectedMode);
      setSelectedMode(null);
    }
  };

  const getVoteCount = (mode: GameMode) => {
    return votes.find(v => v.gameMode === mode)?.count || 0;
  };

  const totalVotes = votes.reduce((sum, v) => sum + v.count, 0);

  if (!open) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-neon-blue">🎮 أنماط اللعب</h3>
          <button 
            className="text-light-cyan text-xl cursor-pointer hover:text-neon-blue" 
            onClick={onClose}
          >
            ✖️
          </button>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-light-cyan mb-3">اختر نمط اللعب وصوت له:</div>
          
          {(Object.keys(gameModeInfo) as GameMode[]).map(mode => (
            <div
              key={mode}
              className={`vote-option ${selectedMode === mode ? 'selected' : ''}`}
              onClick={() => setSelectedMode(mode)}
            >
              <div className="font-bold text-neon-blue">
                {gameModeInfo[mode].title}
                {currentMode === mode && ' (الحالي)'}
              </div>
              <div className="text-sm text-light-cyan mt-1">
                {gameModeInfo[mode].description}
              </div>
              <div className="text-xs text-success-green mt-2">
                {getVoteCount(mode)} أصوات
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="text-sm text-light-cyan mb-3">
            يحتاج {votesNeeded} أصوات لتغيير النمط
            {totalVotes > 0 && ` (${totalVotes}/${votesNeeded})`}
          </div>
          <button 
            className="btn-gradient"
            onClick={handleVote}
            disabled={!selectedMode}
          >
            تأكيد التصويت
          </button>
        </div>
      </div>
    </div>
  );
}
