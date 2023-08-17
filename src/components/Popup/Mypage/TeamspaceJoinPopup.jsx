// TeamSpacePopup.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import Submitbutton from '../../Button/SubmitButton';

import COLOR from '../../../constants/color';
import close from '../../../assets/images/close.png';
import useTeam from '../../../hooks/queries/Team/useTeam';
import useInput from '../../../hooks/useInput';
import { mobileSize } from '../../../utils/MediaSize';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;
const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;
const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  @media (max-width: ${mobileSize}px) {
    background: none;
    align-items: flex-end;
    min-height: 230px;
    transform: translateY(100%);
    animation: ${(props) => (props.visible ? slideIn : slideOut)} 0.7s
      cubic-bezier(0.18, 0.25, 0.32, 1.15) forwards;
  }
`;

const PopupContainer = styled.div`
  width: 560px;
  height: 360px;
  background-color: ${COLOR.white};
  padding: 1rem;
  border-radius: 48px;
  @media (max-width: ${mobileSize}px) {
    width: 100%;
    min-height: 330px;
    height: 330px;
    border-radius: 32px 32px 0 0;
    box-shadow: 2px -7px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
  }
`;

const PopupContent = styled.div`
  padding: 1.3rem 3.6rem;
  @media (max-width: ${mobileSize}px) {
    padding: 1.5rem 2rem;
  }
`;

const CloseBtn = styled.img`
  position: fixed;
  width: 1rem;
  height: 1rem;
  color: black;
  cursor: pointer;
  position: relative;
  top: -1.5rem;
  right: -33.5rem;
  z-index: 1001;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 2.6rem;
  @media (max-width: ${mobileSize}px) {
    font-size: 18px;
    margin-bottom: 1rem;
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  margin: 1.5rem 0;
  @media (max-width: ${mobileSize}px) {
    font-size: 14px;
    text-align: center;
    margin: 0 0 1.5rem 0;
  }
`;

const Minibox = styled.input`
  width: 100%;
  border: 1px solid ${COLOR.primary.blue};
  height: 45px;
  padding: 1rem;
  margin-bottom: 37px;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const Cancelbutton = styled.button`
  height: 30px;
  font-size: 16px;
  width: 100%;
  border: 1px solid ${COLOR.gray};
  border-radius: 16px;
  color: ${COLOR.gray};
`;

const TeamSpaceJoinPopup = ({ handlePopupClose }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [teamToken, onChangeTeamToken] = useInput();
  const { teamJoinMutation } = useTeam(user ? user.token : '');
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  console.log(isMobile);

  const handleSubmit = (e) => {
    e.preventDefault();

    teamJoinMutation({ teamToken });
    setVisible(false);
    setTimeout(() => {
      handlePopupClose();
    }, 500);
  };

  const handleCancel = () => {
    setVisible(false);
    setTimeout(() => {
      handlePopupClose();
    }, 500);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <PopupBackground visible={visible}>
      <PopupContainer>
        <CloseBtn src={close} onClick={handlePopupClose} />
        <PopupContent>
          <Title>팀스페이스 참여하기</Title>
          <SubTitle>코드를 입력해주세요</SubTitle>
          <Minibox placeholder="코드 입력" onChange={onChangeTeamToken} />
          <FlexDiv>
            <Submitbutton onClick={handleSubmit}>완료</Submitbutton>
            <Cancelbutton onClick={handleCancel}>Cancel</Cancelbutton>
          </FlexDiv>
        </PopupContent>
      </PopupContainer>
    </PopupBackground>
  );
};

export default TeamSpaceJoinPopup;
