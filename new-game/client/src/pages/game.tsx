import { useEffect } from 'react';
import GameHeader from '@/components/GameHeader';
import GameSection from '@/components/GameSection';
import ControlButtons from '@/components/ControlButtons';
import PlayersLeaderboard from '@/components/PlayersLeaderboard';
import StatisticsModal from '@/components/StatisticsModal';
import GameModesModal from '@/components/GameModesModal';
import TeamsModal from '@/components/TeamsModal';
import ChatContainer from '@/components/ChatContainer';
import ChangeNameDialog from '@/components/ChangeNameDialog';
import InstructionsDialog from '@/components/InstructionsDialog';
import { useSocket } from '@/hooks/useSocket';
import { useGame } from '@/hooks/useGame';

export default function Game() {
  const socket = useSocket();
  const gameState = useGame(socket);

  useEffect(() => {
    // Get player name from localStorage or generate random one
    const savedName = localStorage.getItem('playerName') || `لاعب${Math.floor(Math.random() * 1000)}`;
    const savedColor = localStorage.getItem('playerColor') || '#00e5ff';
    
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'join_game',
        name: savedName,
        color: savedColor,
      }));
    }
  }, [socket]);

  if (!socket) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950">
        <div className="text-center text-cyan-100">
          <div className="text-2xl font-bold mb-4">جاري الاتصال...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-start justify-center p-2">
      <div className="app-container">
        <GameHeader gameMode={gameState.gameMode} />
        <GameSection 
          currentWord={gameState.currentWord}
          gameMode={gameState.gameMode}
          answeredBy={gameState.answeredBy}
          playerScore={gameState.currentPlayer?.stats?.totalPoints || 0}
          recentAnswers={gameState.recentAnswers}
          onSubmitAnswer={gameState.submitAnswer}
          canAnswer={!gameState.answeredBy}
        />
        <ControlButtons 
          hasNewMessages={gameState.hasUnreadMessages}
          unreadCount={gameState.unreadCount}
          onToggleChat={() => gameState.toggleModal('chat')}
          onShowStatistics={() => gameState.toggleModal('statistics')}
          onShowGameModes={() => gameState.toggleModal('gameModes')}
          onShowTeams={() => gameState.toggleModal('teams')}
          onChangeName={() => gameState.toggleModal('changeName')}
          onShowInstructions={() => gameState.toggleModal('instructions')}
        />
        <PlayersLeaderboard 
          players={gameState.players}
          teams={gameState.teams}
          showTeams={gameState.leaderboardShowTeams}
          onToggleView={gameState.toggleLeaderboardView}
        />

        {/* Modals */}
        <StatisticsModal 
          open={gameState.modals.statistics}
          onClose={() => gameState.toggleModal('statistics')}
          players={gameState.players}
          onGetStats={gameState.getPlayerStatistics}
          currentStats={gameState.selectedPlayerStats}
        />
        <GameModesModal 
          open={gameState.modals.gameModes}
          onClose={() => gameState.toggleModal('gameModes')}
          currentMode={gameState.gameMode}
          votes={gameState.gameModeVotes}
          votesNeeded={gameState.votesNeeded}
          onVote={gameState.voteGameMode}
        />
        <TeamsModal 
          open={gameState.modals.teams}
          onClose={() => gameState.toggleModal('teams')}
          teams={gameState.teams}
          currentPlayer={gameState.currentPlayer}
          onCreateTeam={gameState.createTeam}
          onJoinTeam={gameState.joinTeam}
        />
        <ChatContainer 
          open={gameState.modals.chat}
          onClose={() => gameState.toggleModal('chat')}
          messages={gameState.chatMessages}
          onSendMessage={gameState.sendChatMessage}
        />
        <ChangeNameDialog 
          open={gameState.modals.changeName}
          onClose={() => gameState.toggleModal('changeName')}
          currentName={gameState.currentPlayer?.name || ''}
          currentColor={gameState.currentPlayer?.color || '#00e5ff'}
          onChangeName={gameState.changeName}
        />
        <InstructionsDialog 
          open={gameState.modals.instructions}
          onClose={() => gameState.toggleModal('instructions')}
        />
      </div>
    </div>
  );
}
