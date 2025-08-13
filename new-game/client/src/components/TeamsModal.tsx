import { useState } from 'react';
import type { TeamWithMembers, PlayerWithStats } from '@shared/schema';

interface TeamsModalProps {
  open: boolean;
  onClose: () => void;
  teams: TeamWithMembers[];
  currentPlayer: PlayerWithStats | null;
  onCreateTeam: (name: string, color: string) => void;
  onJoinTeam: (teamId: string) => void;
}

export default function TeamsModal({
  open,
  onClose,
  teams,
  currentPlayer,
  onCreateTeam,
  onJoinTeam,
}: TeamsModalProps) {
  const [activeTab, setActiveTab] = useState<'view' | 'create' | 'join'>('view');
  const [teamName, setTeamName] = useState('');
  const [teamColor, setTeamColor] = useState('#ff3366');

  const handleCreateTeam = () => {
    if (teamName.trim()) {
      onCreateTeam(teamName.trim(), teamColor);
      setTeamName('');
      setActiveTab('view');
    }
  };

  const currentPlayerTeam = currentPlayer ? teams.find(team => 
    team.members.some(member => member.id === currentPlayer.id)
  ) : null;

  if (!open) return null;

  return (
    <div className="modal-overlay open">
      <div className="modal-content">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-neon-blue">👥 إدارة الفرق</h3>
          <button 
            className="text-light-cyan text-xl cursor-pointer hover:text-neon-blue" 
            onClick={onClose}
          >
            ✖️
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-center gap-4 mb-4">
            <button 
              className={`tab-button ${activeTab === 'view' ? 'active' : ''}`}
              onClick={() => setActiveTab('view')}
            >
              عرض الفرق
            </button>
            <button 
              className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              إنشاء فريق
            </button>
            <button 
              className={`tab-button ${activeTab === 'join' ? 'active' : ''}`}
              onClick={() => setActiveTab('join')}
            >
              انضمام
            </button>
          </div>
          
          {activeTab === 'view' && (
            <div className="space-y-4">
              {teams.length === 0 ? (
                <div className="text-center text-light-cyan">لا توجد فرق حالياً</div>
              ) : (
                teams.map(team => (
                  <div key={team.id} className="bg-dark-blue bg-opacity-60 p-4 rounded-lg">
                    <div className="text-lg font-bold mb-2" style={{ color: team.color }}>
                      {team.color === '#ff3366' ? '🔴' : '🔵'} {team.name}
                    </div>
                    <div className="text-sm text-light-cyan mb-2">
                      النقاط: {team.totalPoints}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {team.members.map(member => (
                        <span 
                          key={member.id}
                          className={`team-member ${team.color === '#ff3366' ? 'team-a' : 'team-b'}`}
                          style={{ color: member.color }}
                        >
                          {member.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          {activeTab === 'create' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-light-cyan mb-2">اسم الفريق:</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full p-2 rounded-lg bg-darker-blue text-light-cyan border-none outline-none"
                  placeholder="ادخل اسم الفريق"
                  maxLength={20}
                />
              </div>
              
              <div>
                <label className="block text-sm text-light-cyan mb-2">لون الفريق:</label>
                <div className="flex gap-2">
                  <button
                    className={`w-8 h-8 rounded-full border-2 ${teamColor === '#ff3366' ? 'border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: '#ff3366' }}
                    onClick={() => setTeamColor('#ff3366')}
                  />
                  <button
                    className={`w-8 h-8 rounded-full border-2 ${teamColor === '#00e5ff' ? 'border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: '#00e5ff' }}
                    onClick={() => setTeamColor('#00e5ff')}
                  />
                </div>
              </div>
              
              <button 
                className="w-full btn-gradient"
                onClick={handleCreateTeam}
                disabled={!teamName.trim()}
              >
                إنشاء الفريق
              </button>
            </div>
          )}
          
          {activeTab === 'join' && (
            <div className="space-y-4">
              {currentPlayerTeam ? (
                <div className="text-center text-light-cyan">
                  أنت عضو في فريق: 
                  <span className="font-bold mr-2" style={{ color: currentPlayerTeam.color }}>
                    {currentPlayerTeam.name}
                  </span>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-light-cyan mb-3">اختر فريق للانضمام:</div>
                  {teams.map(team => (
                    <button
                      key={team.id}
                      className="w-full p-3 mb-2 rounded-lg text-right transition-colors border-2 border-transparent hover:border-cyan-400"
                      style={{ backgroundColor: 'rgba(0, 64, 112, 0.8)' }}
                      onClick={() => {
                        onJoinTeam(team.id);
                        setActiveTab('view');
                      }}
                    >
                      <div className="font-bold" style={{ color: team.color }}>
                        {team.name}
                      </div>
                      <div className="text-sm text-light-cyan">
                        {team.members.length} أعضاء - {team.totalPoints} نقطة
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
