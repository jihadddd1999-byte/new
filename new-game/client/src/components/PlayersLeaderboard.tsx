import type { PlayerWithStats, TeamWithMembers } from '@shared/schema';

interface PlayersLeaderboardProps {
  players: PlayerWithStats[];
  teams: TeamWithMembers[];
  showTeams: boolean;
  onToggleView: () => void;
}

export default function PlayersLeaderboard({
  players,
  teams,
  showTeams,
  onToggleView,
}: PlayersLeaderboardProps) {
  const sortedPlayers = players
    .filter(p => p.stats)
    .sort((a, b) => (b.stats?.totalPoints || 0) - (a.stats?.totalPoints || 0));

  const sortedTeams = teams
    .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));

  const getRankColor = (index: number) => {
    if (index === 0) return 'text-red-400';
    if (index === 1) return 'text-green-400';
    if (index === 2) return 'text-orange-400';
    return 'text-cyan-300';
  };

  return (
    <section className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 المتصدرون</h2>
      
      {/* Team mode toggle */}
      <div className="mb-3 text-center">
        <span className="text-sm text-light-cyan">عرض:</span>
        <button 
          className={`tab-button mr-2 ${!showTeams ? 'active' : ''}`}
          onClick={onToggleView}
        >
          أفراد
        </button>
        <button 
          className={`tab-button ${showTeams ? 'active' : ''}`}
          onClick={onToggleView}
        >
          فرق
        </button>
      </div>
      
      <ul className="list-none m-0 p-0">
        {showTeams ? (
          sortedTeams.map((team, index) => (
            <li key={team.id} className={`leaderboard-item ${getRankColor(index)}`}>
              {index + 1}. {team.name} - {team.totalPoints || 0} نقطة
              <div className="text-xs text-light-cyan mt-1">
                الأعضاء: {team.members.map(m => m.name).join(', ')}
              </div>
            </li>
          ))
        ) : (
          sortedPlayers.map((player, index) => {
            const playerTeam = teams.find(team => 
              team.members.some(member => member.id === player.id)
            );
            
            return (
              <li key={player.id} className={`leaderboard-item ${getRankColor(index)}`}>
                {index + 1}. 
                <span style={{ color: player.color, fontWeight: 700, marginRight: '4px' }}>
                  {player.name}
                </span>
                - {player.stats?.totalPoints || 0} نقطة
                {playerTeam && (
                  <span className="text-xs mr-2" style={{ color: playerTeam.color }}>
                    ({playerTeam.name})
                  </span>
                )}
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
