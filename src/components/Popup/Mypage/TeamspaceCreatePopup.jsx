// TeamSpacePopup.js
import React from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import Submitbutton from '../../Button/SubmitButton';

import COLOR from '../../../constants/color';
import close from '../../../assets/images/close.png';
import useTeam from '../../../hooks/queries/Team/useTeam';
import useInput from '../../../hooks/useInput';

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
`;

const PopupContainer = styled.div`
  width: 560px;
  height: 360px;
  background-color: ${COLOR.white};
  padding: 1rem;
  border-radius: 48px;
`;

const PopupContent = styled.div`
  padding: 1.3rem 3.6rem;
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
`;

const SubTitle = styled.div`
  font-size: 20px;
  margin: 1.5rem 0;
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
  flex-direction: row;
  justify-content: center;
`;

const TeamSpaceCreatePopup = ({ handlePopupClose }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [teamName, onChangeTeamName] = useInput();
  const { teamMutation } = useTeam(user ? user.token : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    teamMutation({ teamName });
    handlePopupClose();
  };
  return (
    <PopupBackground>
      <PopupContainer>
        <CloseBtn src={close} onClick={handlePopupClose} />
        <PopupContent>
          <Title>팀스페이스 추가하기</Title>
          <SubTitle>팀스페이스 이름을 입력해주세요.</SubTitle>
          <Minibox placeholder="최대 N자까지 가능" onChange={onChangeTeamName} />
          <FlexDiv>
            <Submitbutton onClick={handleSubmit}>완료</Submitbutton>
          </FlexDiv>
        </PopupContent>
      </PopupContainer>
    </PopupBackground>
  );
};

export default TeamSpaceCreatePopup;
