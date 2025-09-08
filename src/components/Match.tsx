import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Match as MatchType } from '../types/ProfileTypes';
import ProfileCardComponent from './ProfileCard';

const MatchContainer = styled.div`
  width: 100%;
`;

const MatchBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
`;

const VS = styled.div`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 10px 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

interface MatchProps {
  match: MatchType;
  isCurrentRound: boolean;
  flippedCards: Set<string>;
  onMatchSelection: (matchId: string, selectedItem: any) => void;
  onCardFlip: (cardId: string) => void;
}

const MatchComponent: React.FC<MatchProps> = ({
  match,
  isCurrentRound,
  flippedCards,
  onMatchSelection,
  onCardFlip
}) => {
  const isClickable = isCurrentRound; // 현재 라운드에서는 항상 클릭 가능 (재선택 허용)
  const isMatchComplete = match.isComplete;

  const handleLeftCardSelect = () => {
    if (isClickable && match.leftItem) {
      if (match.winner?.id === match.leftItem.id) {
        // 이미 선택된 카드면 선택 취소
        onMatchSelection(match.id, null);
      } else {
        // 선택되지 않은 카드면 선택
        onMatchSelection(match.id, match.leftItem);
      }
    }
  };

  const handleRightCardSelect = () => {
    if (isClickable && match.rightItem) {
      if (match.winner?.id === match.rightItem.id) {
        // 이미 선택된 카드면 선택 취소
        onMatchSelection(match.id, null);
      } else {
        // 선택되지 않은 카드면 선택
        onMatchSelection(match.id, match.rightItem);
      }
    }
  };

  const handleLeftCardFlip = () => {
    onCardFlip(`${match.id}-left`);
  };

  const handleRightCardFlip = () => {
    onCardFlip(`${match.id}-right`);
  };

  return (
    <MatchContainer>
      <MatchBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {match.leftItem && (
          <ProfileCardComponent
            item={match.leftItem}
            isWinner={match.winner?.id === match.leftItem.id}
            isClickable={isClickable && !!match.leftItem}
            isFlipped={flippedCards.has(`${match.id}-left`)}
            onSelect={handleLeftCardSelect}
            onFlip={handleLeftCardFlip}
          />
        )}
        
        {match.leftItem && match.rightItem && (
          <VS>VS</VS>
        )}
        
        {match.rightItem && (
          <ProfileCardComponent
            item={match.rightItem}
            isWinner={match.winner?.id === match.rightItem.id}
            isClickable={isClickable && !!match.rightItem}
            isFlipped={flippedCards.has(`${match.id}-right`)}
            onSelect={handleRightCardSelect}
            onFlip={handleRightCardFlip}
          />
        )}
      </MatchBox>
    </MatchContainer>
  );
};

export default MatchComponent;
