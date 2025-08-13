interface ControlButtonsProps {
  hasNewMessages: boolean;
  unreadCount: number;
  onToggleChat: () => void;
  onShowStatistics: () => void;
  onShowGameModes: () => void;
  onShowTeams: () => void;
  onChangeName: () => void;
  onShowInstructions: () => void;
}

export default function ControlButtons({
  hasNewMessages,
  unreadCount,
  onToggleChat,
  onShowStatistics,
  onShowGameModes,
  onShowTeams,
  onChangeName,
  onShowInstructions,
}: ControlButtonsProps) {
  return (
    <section className="flex justify-center gap-4 mb-6 flex-wrap">
      <button className="btn-main relative" onClick={onToggleChat}>
        💬 الشات
        {hasNewMessages && (
          <span className="notification-badge">
            {unreadCount}
          </span>
        )}
      </button>
      
      <button className="btn-main" onClick={onShowStatistics}>
        📊 إحصائيات
      </button>
      
      <button className="btn-main" onClick={onShowGameModes}>
        🎮 أنماط اللعب
      </button>
      
      <button className="btn-main" onClick={onShowTeams}>
        👥 الفرق
      </button>
      
      <button className="btn-main" onClick={onChangeName}>
        ✍️ تغيير الاسم
      </button>
      
      <button className="btn-main" onClick={onShowInstructions}>
        📖 تعليمات اللعبة
      </button>
    </section>
  );
}
