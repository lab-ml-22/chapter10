import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TournamentBracket from './components/TournamentBracket';
import ProfileData from './data/ProfileData';
import { ProfileItem } from './types/ProfileTypes';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 40px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ResultModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ResultContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
`;

const ResultTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
`;

const ResultDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const SecondaryButton = styled.button`
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
`;

function App() {
  const [tournamentResult, setTournamentResult] = useState<ProfileItem | null>(null);

  const handleTournamentComplete = (winner: ProfileItem) => {
    setTournamentResult(winner);
  };

  const closeResult = () => {
    setTournamentResult(null);
  };

  return (
    <AppContainer>
      <Header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>🏆 저를 채용하셔야 하는 이유</Title>
        <Subtitle>지금 이걸 보고 계신 당신! 저와 동료로써 결이 맞는지 선택해보세요</Subtitle>
      </Header>

      <TournamentBracket 
        items={ProfileData} 
        onComplete={handleTournamentComplete}
      />

      <AnimatePresence>
        {tournamentResult && (
          <ResultModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeResult}
          >
            <ResultContent
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ResultTitle>🎉 최종 결과!</ResultTitle>
              <ResultDescription>
                <strong>{tournamentResult.title === '지속적 성장' ? '지속적 성장을 선택한 당신' : tournamentResult.title}</strong><br/><br/>
                {tournamentResult.description}
              </ResultDescription>
              {tournamentResult.title === '지속적 성장' ? (
                <SecondaryButton onClick={closeResult}>
                  다시 선택하기
                </SecondaryButton>
              ) : (
                <CloseButton onClick={closeResult}>
                  다시 시작하기
                </CloseButton>
              )}
            </ResultContent>
          </ResultModal>
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;
