import { useState } from 'react';
import type { PlayerWithStats, PlayerStats } from '@shared/schema';

interface StatisticsModalProps {
  open: boolean;
  onClose: () => void;
  players: PlayerWithStats[];
  onGetStats: (playerId?: string) => void;
  currentStats: { player: PlayerWithStats; stats: PlayerStats } | null;
}

export default function StatisticsModal({
  open,
  onClose,
  players,
  onGetStats,
  currentStats,
}: StatisticsModalProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');

  const handlePlayerSelect = (playerId: string) => {
    setSelectedPlayerId(playerId);
    onGetStats(playerId);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-neon-blue">📊 إحصائيات اللعبة</h3>
          <button 
            className="text-light-cyan text-xl cursor-pointer hover:text-neon-blue" 
            onClick={onClose}
          >
            ✖️
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm text-light-cyan mb-2">اختر لاعب:</label>
          <select 
            className="w-full p-2 rounded-lg bg-darker-blue text-light-cyan border-none outline-none"
            value={selectedPlayerId}
            onChange={(e) => handlePlayerSelect(e.target.value)}
          >
            <option value="">-- اختر لاعب --</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>
        </div>
        
        {currentStats && (
          <div className="space-y-4">
            <div className="bg-dark-blue bg-opacity-60 p-3 rounded-lg">
              <div className="text-sm text-light-cyan">عدد مرات الفوز</div>
              <div className="text-2xl font-bold text-success-green">
                {currentStats.stats.wins || 0}
              </div>
            </div>
            
            <div className="bg-dark-blue bg-opacity-60 p-3 rounded-lg">
              <div className="text-sm text-light-cyan">أسرع وقت إجابة</div>
              <div className="text-2xl font-bold text-neon-blue">
                {currentStats.stats.fastestTime 
                  ? `${(currentStats.stats.fastestTime / 1000).toFixed(2)} ثانية`
                  : 'لا يوجد'
                }
              </div>
            </div>
            
            <div className="bg-dark-blue bg-opacity-60 p-3 rounded-lg">
              <div className="text-sm text-light-cyan">إجمالي النقاط</div>
              <div className="text-2xl font-bold text-yellow-400">
                {currentStats.stats.totalPoints || 0}
              </div>
            </div>
            
            <div className="bg-dark-blue bg-opacity-60 p-3 rounded-lg">
              <div className="text-sm text-light-cyan">معدل الإجابة</div>
              <div className="text-2xl font-bold text-purple-400">
                {currentStats.stats.averageTime 
                  ? `${(currentStats.stats.averageTime / 1000).toFixed(2)} ثانية`
                  : 'لا يوجد'
                }
              </div>
            </div>
            
            <div className="bg-dark-blue bg-opacity-60 p-3 rounded-lg">
              <div className="text-sm text-light-cyan">الإجابات الصحيحة</div>
              <div className="text-2xl font-bold text-green-400">
                {currentStats.stats.correctAnswers || 0}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
