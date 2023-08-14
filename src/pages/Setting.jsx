import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import Loading from './Loading';
import Error from './Error';
import useTeam from '../hooks/queries/Team/useTeam';

import TeamSpaceCreatePopup from '../components/Popup/Mypage/TeamspaceCreatePopup';
import TeamSpaceJoinPopup from '../components/Popup/Mypage/TeamspaceJoinPopup';
import HorizonLine from '../components/Common/Line/HorizonLine';
import useInput from '../hooks/useInput';
import TermsModal from '../components/Common/Modal/TermsModal';
import SuggestionModal from '../components/Common/Modal/SuggestionModal';
import useUserUpdate from '../hooks/queries/Auth/useUserUpdate';

const mediaSize = 1030;

// 전체 여백
const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  display: flex;
  gap: 2.5rem;
  transition: 0.3s;
  @media (max-width: ${mediaSize}px) {
    margin: 0 3rem;
    padding: 0 2rem;
  }
`;

const Hrbar = styled.hr`
  border: 0.5px solid ${COLOR.primary.blue};
  margin: 4rem 10rem 0 10rem;
  transition: 0.3s;
  @media (max-width: ${mediaSize}px) {
    margin: 4rem 5rem 0 5rem;
  }
`;

const TeamspaceDiv = styled.div`
  width: 100%;
  flex-basis: 20%;
`;

const SidebarTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
`;

const SettingTitle = styled.button`
  font-size: 25px;
  font-weight: 700;
  margin-top: 2rem;
  width: 50px;
  border-bottom: 1.4px solid ${COLOR.primary.lightBlue};
`;

const Title = styled.button`
  font-size: 25px;
  font-weight: 400;
  margin-bottom: 10rem;
  width: 140px;
  color: ${COLOR.gray};
`;

const SubTitle = styled.div`
  font-size: 24px;
  margin: 5rem 0 2rem 0;
`;

// 팀스페이스 버튼
const TeamspacePlus = styled.button`
  width: 120px;
  height: 32px;
  border-radius: 16px;
  background: ${COLOR.primary.gradient};
`;

const TeamspaceButton = styled.button`
  width: 120px;
  height: 32px;
  border: none;
  border-radius: 16px;
  background: transparent;
  cursor: pointer;
  transition:
    background-color 0.5s,
    border 0.5s;

  &:hover {
    background-color: ${COLOR.lightGray};
  }

  &:active {
    border: 3px solid ${COLOR.primary.blue};
  }
`;

// 팀스페이스 리스트
const DivTeamlist = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const Setting = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [IsCreatepopupVisivle, setIsCreatepopupVisivle] = useState(false);
  const [IsJoinpopupVisivle, setIsJoinpopupVisivle] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);

  const [userName, onChangeUserName] = useInput(user && user.name);

  const navigate = useNavigate();
  const { userUpdateMutation } = useUserUpdate(user.pk);

  const {
    teamQuery: { isLoading: teamIsLoading, error: teamError, data: teams },
  } = useTeam(user ? user.token : '');

  const gotoTeamSpace = (teamToken, teamName) => {
    navigate(`/mypage/${teamToken}`, { state: teamName });
  };

  const gotoMypage = () => {
    navigate(`/Mypage`);
  };

  const gotoSetting = () => {
    navigate('/setting');
  };
  const handleTeamspaceCreateClick = () => {
    setIsCreatepopupVisivle(true);
  };

  const handleCreatePopupClose = () => {
    setIsCreatepopupVisivle(false);
  };

  const handleTeamspaceJoinClick = () => {
    setIsJoinpopupVisivle(true);
  };

  const handleJoinPopupClose = () => {
    setIsJoinpopupVisivle(false);
  };

  const clickUpdateBtn = () => {
    userUpdateMutation(userName);
  };

  const showTermsModal = () => {
    setTermsModalOpen(true);
  };

  const showSuggestionModal = () => {
    setSuggestionModalOpen(true);
  };

  return (
    <>
      <Hrbar />
      <Container>
        <TeamspaceDiv>
          <SidebarTopContainer>
            <SettingTitle onClick={gotoSetting}>설정</SettingTitle>
            <Title onClick={gotoMypage}>개인 스페이스</Title>
          </SidebarTopContainer>
          <SubTitle>팀 스페이스</SubTitle>
          <DivTeamlist>
            <TeamspacePlus onClick={handleTeamspaceCreateClick}>팀 스페이스 생성</TeamspacePlus>
            <TeamspacePlus onClick={handleTeamspaceJoinClick}>팀 스페이스 참가</TeamspacePlus>

            {IsCreatepopupVisivle && (
              <TeamSpaceCreatePopup handlePopupClose={handleCreatePopupClose} />
            )}
            {IsJoinpopupVisivle && <TeamSpaceJoinPopup handlePopupClose={handleJoinPopupClose} />}
            {teamIsLoading && <Loading />}
            {teamError && <Error />}
            {teams &&
              teams.map((team) => (
                <TeamspaceButton onClick={() => gotoTeamSpace(team.teamToken, team.teamName)}>
                  {team.teamName}
                </TeamspaceButton>
              ))}
          </DivTeamlist>
        </TeamspaceDiv>
        <SettingLayout>
          <UserLabel>닉네임</UserLabel>
          <UserInputContainer>
            <UserInput type="text" value={userName} onChange={onChangeUserName} />
            <UserSubmitButton onClick={clickUpdateBtn}>변경</UserSubmitButton>
          </UserInputContainer>
          <HorizonLine />
          <TermsButton onClick={showTermsModal}>이용약관</TermsButton>
          {termsModalOpen && <TermsModal setTermsModalOpen={setTermsModalOpen} />}

          <HorizonLine />
          <SuggestionsButton onClick={showSuggestionModal}>건의사항</SuggestionsButton>
          {suggestionModalOpen && (
            <SuggestionModal setSuggestionModalOpen={setSuggestionModalOpen} />
          )}

          <HorizonLine />

          <BottomContainer>
            <LogoutButton>로그아웃</LogoutButton>
            <UserDeleteButton>회원탈퇴</UserDeleteButton>
          </BottomContainer>
        </SettingLayout>
      </Container>
    </>
  );
};

export default Setting;

const SettingLayout = styled.div`
  width: 35rem;
  height: 23.75rem;
  background-color: ${COLOR.primary.lightBlue};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 3rem;
  margin-top: 5rem;
  /* flex-basis: 80%; */
`;

const UserLabel = styled.label``;

const UserInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInput = styled.input`
  width: 19.5rem;
`;

const UserSubmitButton = styled.button`
  width: 3rem;
  height: 2rem;
  background-color: ${COLOR.white};
  border-radius: 1rem;
`;

const TermsButton = styled.button``;

const SuggestionsButton = styled.button``;

const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4rem;
`;

const LogoutButton = styled.button``;

const UserDeleteButton = styled.button``;
