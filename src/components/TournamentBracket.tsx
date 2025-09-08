import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ProfileItem, TournamentRound, Match } from '../types/ProfileTypes';
import { 
  BracketContainer, 
  RoundContainer, 
  Round, 
  MatchesGrid, 
  RoundTitle, 
  RoundProgress,
  NextRoundButton,
  NextRoundButtonRef,
  RestartButton
} from './styled/CommonStyles';
import MatchComponent from './Match';

interface TournamentBracketProps {
  items: ProfileItem[];
  onComplete: (winner: ProfileItem) => void;
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({ items, onComplete }) => {
  const [rounds, setRounds] = useState<TournamentRound[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const nextButtonRef = useRef<HTMLDivElement>(null);

  const initializeTournament = useCallback(() => {
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    const initialMatches: Match[] = []; // 첫 번째 라운드 매치들을 저장할 배열
    
    console.log('Total items:', shuffledItems.length);
    
    // 8개 아이템을 2개씩 묶어서 4개의 매치 생성 (8강 → 4강)
    for (let i = 0; i < shuffledItems.length; i += 2) {
      initialMatches.push({
        id: `match-${i/2}`, // 매치 ID (match-0, match-1, match-2, match-3)
        leftItem: shuffledItems[i], // 왼쪽 아이템
        rightItem: shuffledItems[i + 1] || null, // 오른쪽 아이템 (홀수 개일 경우 null)
        winner: null, // 아직 승자 없음
        isComplete: false // 매치 미완료 상태
      });
    }

    console.log('Created matches:', initialMatches.length);
    console.log('Matches:', initialMatches);

    setRounds([{ round: 1, matches: initialMatches }]);
    setCurrentRound(0);
    setShowNextButton(false);
    setFlippedCards(new Set());
  }, [items]);

  const restartTournament = () => {
    initializeTournament();
  };

  useEffect(() => {
    initializeTournament();
  }, [initializeTournament]);

  const handleMatchSelection = (matchId: string, selectedItem: ProfileItem | null) => {
    console.log('Match selection:', matchId, selectedItem ? selectedItem.title : 'null');
    setRounds(prevRounds => {
      const newRounds = [...prevRounds];
      const currentRoundData = newRounds[currentRound];
      
      const updatedMatches = currentRoundData.matches.map(match => {
        if (match.id === matchId) {
          return {
            ...match, 
            winner: selectedItem, 
            isComplete: selectedItem !== null 
          };
        }
        return match;
      });

      newRounds[currentRound] = { ...currentRoundData, matches: updatedMatches };

      // 현재 라운드가 완료되었는지 확인
      const isRoundComplete = updatedMatches.every(match => match.isComplete);
      
      if (isRoundComplete) {
        const winners = updatedMatches.map(match => match.winner).filter(Boolean) as ProfileItem[];
        
        if (winners.length === 1) {
          // 토너먼트 완료 - 렌더링 중 setState 방지를 위해 setTimeout 사용
          setTimeout(() => {
            onComplete(winners[0]);
          }, 0);
        } else {
          // 자동 진행 대신 다음 버튼 표시
          setShowNextButton(true);
          // 짧은 지연 후 다음 버튼으로 스크롤
          setTimeout(() => {
            nextButtonRef.current?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }, 500);
        }
      }

      return newRounds;
    });
  };

  const goToNextRound = () => {
    const currentRoundData = rounds[currentRound];
    const winners = currentRoundData.matches.map(match => match.winner).filter(Boolean) as ProfileItem[];
    
    // 다음 라운드 매치 생성
    const nextRoundMatches: Match[] = [];
    for (let i = 0; i < winners.length; i += 2) {
      nextRoundMatches.push({
        id: `match-${i/2}`,
        leftItem: winners[i],
        rightItem: winners[i + 1] || null,
        winner: null,
        isComplete: false
      });
    }
    
    setRounds(prevRounds => [...prevRounds, { round: currentRound + 2, matches: nextRoundMatches }]);
    setCurrentRound(prev => prev + 1);
    setShowNextButton(false);
    setFlippedCards(new Set());
  };

  const handleCardFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const getCompletedMatches = () => {
    if (!rounds[currentRound]) return 0;
    return rounds[currentRound].matches.filter(match => match.isComplete).length;
  };

  const getTotalMatches = () => {
    if (!rounds[currentRound]) return 0;
    return rounds[currentRound].matches.length;
  };

  return (
    <BracketContainer>
      {rounds[currentRound] && (
        <>
          <RoundProgress>
            진행률: {getCompletedMatches()}/{getTotalMatches()} 매치 완료
          </RoundProgress>
          
          <RoundContainer>
            <Round key={rounds[currentRound].round}>
              <RoundTitle>
                🔥 {currentRound + 1}라운드 - {rounds[currentRound].matches.length}강
              </RoundTitle>
              <MatchesGrid>
                {rounds[currentRound].matches.map(match => (
                  <MatchComponent
                    key={match.id}
                    match={match}
                    isCurrentRound={true}
                    flippedCards={flippedCards}
                    onMatchSelection={handleMatchSelection}
                    onCardFlip={handleCardFlip}
                  />
                ))}
              </MatchesGrid>
            </Round>
          </RoundContainer>

          {showNextButton && (
            <NextRoundButtonRef ref={nextButtonRef}>
              <NextRoundButton
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={goToNextRound}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 다음 라운드로 진행하기
              </NextRoundButton>
            </NextRoundButtonRef>
          )}

          {currentRound === 2 && (
            <RestartButton
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={restartTournament}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 처음으로 돌아가기
            </RestartButton>
          )}
        </>
      )}
    </BracketContainer>
  );
};

export default TournamentBracket;