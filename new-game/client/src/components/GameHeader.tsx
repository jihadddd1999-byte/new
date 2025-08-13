import type { GameMode } from '@shared/schema';

interface GameHeaderProps {
  gameMode: GameMode;
}

function getGameModeTitle(mode: GameMode): string {
  switch (mode) {
    case 'normal': return 'الوضع الطبيعي';
    case 'missing': return 'كلمات ناقصة';
    case 'reversed': return 'كلمات معكوسة';
    default: return 'غير معروف';
  }
}

export default function GameHeader({ gameMode }: GameHeaderProps) {
  return (
    <header className="text-center mb-6">
      <h1 className="game-title">
        ⚡ لعبة الكلمات السريعة ⚡
      </h1>
      <div className="text-center mb-3">
        <span className="text-sm text-light-cyan">النمط الحالي:</span>
        <span className="text-neon-blue font-bold mr-2">
          {getGameModeTitle(gameMode)}
        </span>
      </div>
    </header>
  );
}
