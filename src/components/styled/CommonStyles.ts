import styled from 'styled-components';
import { motion } from 'framer-motion';

// 컨테이너 스타일들
export const BracketContainer = styled.div`
  max-width: 2074px;
  margin: 0 auto;
  padding: 20px;
`;

export const RoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 40px;
`;

export const Round = styled.div`
  width: 100%;
  max-width: 1382px;
`;

export const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

export const MatchContainer = styled.div`
  width: 100%;
`;

export const MatchBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
`;

// 텍스트 스타일들
export const RoundTitle = styled.h3`
  color: white;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

export const VS = styled.div`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 10px 0;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

export const RoundProgress = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
`;

// 버튼 스타일들
export const NextRoundButton = styled(motion.button)`
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const NextRoundButtonRef = styled.div`
  scroll-margin-top: 20px;
`;

export const RestartButton = styled(motion.button)`
  background: linear-gradient(135deg, #4ECDC4, #44A08D);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin: 10px auto;
  display: block;
  box-shadow: 0 3px 10px rgba(78, 205, 196, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
