import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import Submitbutton from '../../Button/SubmitButton';

import COLOR from '../../../constants/color';
import close from '../../../assets/images/close.png';
import Loading from '../../../pages/Loading';
import Error from '../../../pages/Error';
import useTeamRecreationIsScrap from '../../../hooks/queries/Team/useTeamRecreationIsScrap';
import useTeamRecreationScrap from '../../../hooks/queries/Team/useTeamRecreationScrap';
import { mobileSize } from '../../../utils/MediaSize';
import ApiCallSuccessPopup from '../../Common/Popup/ApiCallSuccessPopup';

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
    transform: translateY(100%);
    animation: ${(props) => (props.visible ? slideIn : slideOut)} 0.5s ease-in-out forwards;
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
    height: 240px;
    border-radius: 32px;
    box-shadow: 2px -7px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
  }
`;

const PopupContent = styled.div`
  padding: 1.3rem 3.6rem;
  height: 100%;
  @media (max-width: ${mobileSize}px) {
    padding: 0.1rem 1rem;
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
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 0.4rem;
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  margin: 1.5rem 0;
  @media (max-width: ${mobileSize}px) {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    margin: 0.5rem 0 1.4rem 0;
  }
`;

const TeamList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 3rem;
  @media (max-width: ${mobileSize}px) {
    margin-bottom: 1.6rem;
  }
`;

const TeamBtn = styled.div`
  padding: 4px 10px;
  border: 2px solid ${COLOR.lightGray};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 148px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  &:hover {
    border: 2px solid ${COLOR.gray};
    background: ${COLOR.lightGray};
  }
  @media (max-width: ${mobileSize}px) {
    padding: 6px 5px;
    font-size: 14px;
    text-align: center;
  }

  ${(props) =>
    props.isScrap &&
    css`
      background-color: ${COLOR.primary.blue};
      color: ${COLOR.white};
      border: none;
    `}
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const RecreationPopup = ({ pk, handlePopupClose }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  const [visible, setVisible] = useState(true);
  const [success, setSuccess] = useState('');

  const {
    teamRecreationScrapQuery: { isLoading, error, data: teams },
  } = useTeamRecreationIsScrap(user ? user.token : '', pk);

  const { teamRecreationMutation } = useTeamRecreationScrap(user ? user.token : '', pk);

  const handleTeamClick = (teamToken, teamName) => {
    teamRecreationMutation(
      { teamToken, recreationPk: pk },
      {
        onSuccess: (data) => {
          if (data.message) setSuccess(`${teamName} 팀스페이스에서 삭제되었습니다`);
          if (!data.message) setSuccess(`✅ ${teamName} 팀스페이스에 추가되었습니다`);
          setTimeout(() => setSuccess(null), 1500);
        },
      },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisible(false);
    setTimeout(() => {
      handlePopupClose();
    }, 500);
  };
  return (
    <PopupBackground visible={visible}>
      <ApiCallSuccessPopup success={success} />
      <PopupContainer>
        <CloseBtn src={close} onClick={handlePopupClose} />
        <PopupContent>
          <Title>팀스페이스 추가하기</Title>
          <SubTitle>추가할 팀스페이스를 선택해주세요</SubTitle>
          {isLoading && <Loading />}
          {error && <Error />}
          <TeamList>
            {teams &&
              teams.map((team) => (
                <TeamBtn
                  key={team.teamToken}
                  onClick={() => handleTeamClick(team.teamToken, team.teamName)}
                  isScrap={team.isScrap}
                >
                  {team.teamName}
                </TeamBtn>
              ))}
          </TeamList>
          <FlexDiv>
            <Submitbutton onClick={handleSubmit}>완료</Submitbutton>
          </FlexDiv>
        </PopupContent>
      </PopupContainer>
    </PopupBackground>
  );
};

export default RecreationPopup;
