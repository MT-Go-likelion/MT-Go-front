import React from 'react';
import styled, { css } from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import Submitbutton from '../../Button/SubmitButton';

import COLOR from '../../../constants/color';
import close from '../../../assets/images/close.png';
import useTeam from '../../../hooks/queries/Team/useTeam';
import Loading from '../../../pages/Loading';
import Error from '../../../pages/Error';
import useTeamRecreation from '../../../hooks/queries/Team/useTeamRecreation';

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
  height: 100%;
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

const TeamList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const TeamBtn = styled.div`
  padding: 4px 10px;
  border: 2px solid ${COLOR.lightGray};
  border-radius: 16px;
  text-align: center;
  width: 148px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  &:hover {
    border: 2px solid ${COLOR.gray};
    background: ${COLOR.lightGray};
  }

  ${(props) =>
    props.active &&
    css`
      background-color: ${COLOR.primary.blue};
      border-color: ${COLOR.primary.blue};
      color: ${COLOR.white};
    `}
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const RecreationPopup = ({ pk, handlePopupClose }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    teamQuery: { isLoading: teamIsLoading, error: teamError, data: teams },
  } = useTeam(user ? user.token : '');

  const { teamRecreationMutation } = useTeamRecreation();

  const handleTeamClick = (teamToken) => {
    teamRecreationMutation({ teamToken, recreationPk: pk });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handlePopupClose();
  };
  return (
    <PopupBackground>
      <PopupContainer>
        <CloseBtn src={close} onClick={handlePopupClose} />
        <PopupContent>
          <Title>팀스페이스 추가하기</Title>
          <SubTitle>추가할 팀스페이스를 선택해주세요</SubTitle>
          {teamIsLoading && <Loading />}
          {teamError && <Error />}
          <TeamList>
            {teams &&
              teams.map((team) => (
                <TeamBtn
                  key={team.teamToken}
                  active={team.teamName === true}
                  onClick={() => handleTeamClick(team.teamToken)}
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
