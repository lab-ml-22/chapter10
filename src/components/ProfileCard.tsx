import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ProfileItem } from '../types/ProfileTypes';

// ProfileCard 스타일드 컴포넌트들
const ProfileCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isWinner', 'isClickable', 'isFlipped'].includes(prop),
})<{ isWinner?: boolean; isClickable?: boolean; isFlipped?: boolean }>`
  background: ${props => props.isWinner ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'rgba(255,255,255,0.9)'};
  color: ${props => props.isWinner ? 'white' : '#333'};
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;
  border: 2px solid ${props => props.isWinner ? '#4CAF50' : 'transparent'};
  box-shadow: ${props => props.isWinner ? '0 4px 15px rgba(76, 175, 80, 0.3)' : '0 2px 10px rgba(0,0,0,0.1)'};
  min-height: ${props => props.isFlipped ? '314px' : '156px'};
  transform-style: preserve-3d;
  transition: all 0.6s ease;
  position: relative;

  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'} !important;

  &:hover {
    box-shadow: ${props => props.isClickable ? '0 4px 15px rgba(0,0,0,0.2)' : 'none'};
    transform: ${props => props.isClickable ? 'translateY(-2px)' : 'none'};
  }
`;

const CardFront = styled.div`
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  padding: 20px;
  box-sizing: border-box;
`;

const CardBack = styled.div`
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  padding: 20px;
  box-sizing: border-box;
  transform: rotateY(180deg);
`;

const ProfileIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const ProfileTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3;
`;

const ProfileDescription = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'isWinner',
})<{ isWinner?: boolean }>`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  letter-spacing: 0.3px;
  word-spacing: 1px;
  color: ${props => props.isWinner ? 'white' : '#333'};
  margin-top: 5px;
  opacity: 0.9;
`;

const FlipButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isBack',
})<{ isBack?: boolean }>`
  background: rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 5px;
  padding: 2px 6px;
  font-size: 0.6rem;
  color: ${props => props.isBack ? 'white' : '#333'};
  cursor: pointer;
  margin-top: 5px;
  
  &:hover {
    background: rgba(0,0,0,0.2);
  }
`;

interface ProfileCardProps {
  item: ProfileItem;
  isWinner?: boolean;
  isClickable?: boolean;
  isFlipped?: boolean;
  onSelect?: () => void;
  onFlip?: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  item,
  isWinner = false,
  isClickable = false,
  isFlipped = false,
  onSelect,
  onFlip
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect();
    }
  };

  const handleFlipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFlip) {
      onFlip();
    }
  };

  return (
    <ProfileCard
      isWinner={isWinner}
      isClickable={isClickable}
      isFlipped={isFlipped}
      onClick={handleCardClick}
      whileHover={isClickable ? { scale: 1.02 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
    >
      <CardFront>
        <ProfileIcon>{item.icon}</ProfileIcon>
        <ProfileTitle>{item.title}</ProfileTitle>
        <FlipButton onClick={handleFlipClick} isBack={false}>
          자세히 보기
        </FlipButton>
      </CardFront>
      
      <CardBack>
        <ProfileDescription isWinner={isWinner}>{item.description}</ProfileDescription>
        <FlipButton onClick={handleFlipClick} isBack={true}>
          뒤로 가기
        </FlipButton>
      </CardBack>
    </ProfileCard>
  );
};

export default ProfileCardComponent;
