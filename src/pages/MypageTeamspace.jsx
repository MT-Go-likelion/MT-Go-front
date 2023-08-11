import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import BestlocationCard from '../components/Card/BestlocationCard';
import RecreationCard from '../components/Card/RecreationCard';
import DeleteSharePopup from '../components/Popup/Mypage/DeleteSharePopup';
import useTeam from '../hooks/queries/Team/useTeam';
import Loading from './Loading';
import Error from './Error';
import useTeamLodging from '../hooks/queries/Team/useTeamLodging';
import useTeamRecreation from '../hooks/queries/Team/useTeamRecreation';
import useTeamShopping from '../hooks/queries/Team/useTeamShopping';
import ListTable from '../components/Common/Shopping/ListTable';
import TeamSpaceCreatePopup from '../components/Popup/Mypage/TeamspaceCreatePopup';
import TeamSpaceJoinPopup from '../components/Popup/Mypage/TeamspaceJoinPopup';
import useTeamUserList from '../hooks/queries/Team/useTeamUserList';

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

const ScrapDiv = styled.div`
  width: 170px;
  padding-top: 4rem;
  flex-basis: 80%;
`;

const Title = styled.button`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 3rem 0 10rem 0;
  width: 140px;
  color: ${COLOR.gray};
`;

const SubTitle = styled.div`
  font-size: 24px;
  margin: 5rem 0 2rem 0;
  font-weight: 700;
`;

const Flex = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding-bottom: 1rem;
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

  ${(props) =>
    props.active &&
    css`
      border: 2px solid ${COLOR.blue};
      font-weight: bold;
    `}
`;

// 팀스페이스 리스트
const DivTeamlist = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

// Teamspace name
const TNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TeamspaceName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
`;

const Userimg = styled.img`
  border-radius: 50px;
  width: 64px;
  height: 64px;
  background-color: ${COLOR.primary.lightBlue};
`;

const UserName = styled.span`
  font-size: 18px;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 100px;
  height: 34px;
  text-align: center;
  font-size: 16px;
  border-radius: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: 180%;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border 0.2s;
`;

const DeleteButton = styled(Button)`
  color: ${COLOR.gray};
  border: 4px solid ${COLOR.gray};

  &:hover {
    background-color: ${COLOR.lightGray};
  }

  &:active {
    border: 3px solid ${COLOR.primary.blue};
  }
`;

const ShareButton = styled(Button)`
  color: ${COLOR.primary.blue};
  border: 4px solid ${COLOR.primary.blue};

  &:hover {
    background-color: ${COLOR.lightGray};
  }

  &:active {
    border: 3px solid ${COLOR.primary.blue};
  }
`;

// 코드 복사 알림 창
const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${COLOR.primary.blue};
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 9999;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const MypageTeamspace = () => {
  const [IsCreatepopupVisivle, setIsCreatepopupVisivle] = useState(false);
  const [IsJoinpopupVisivle, setIsJoinpopupVisivle] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // Notification state
  const navigate = useNavigate();
  const { state: teamName } = useLocation();

  const { teamToken } = useParams();
  const inviteCode = teamToken;

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    teamQuery: { isLoading: teamIsLoading, error: teamError, data: teams },
  } = useTeam(user ? user.token : '');

  const {
    teamUserQuery: { isLoading: teamUserLoading, error: teamUserError, data: users },
  } = useTeamUserList(user ? user.token : '', teamToken);

  const {
    teamLodgingQuery: { isLoading: lodgingLoading, error: lodgingError, data: lodgings },
  } = useTeamLodging(user ? user.token : '', teamToken);

  const {
    teamRecreationQuery: {
      isLoading: recreationLoading,
      error: recreationError,
      data: recreations,
    },
  } = useTeamRecreation(user ? user.token : '', teamToken);

  const {
    teamShoppingQuery: { isLoading: shoppingLoading, error: shoppingError, data: teamShoppingList },
  } = useTeamShopping(user ? user.token : '', teamToken);

  const [shoppingItems, setShoppingItems] = useState(teamShoppingList || []);

  const gotoTeamSpace = (teamToken, teamName) => {
    navigate(`/mypage/${teamToken}`, { state: teamName });
  };

  const gotoMypage = () => {
    navigate(`/mypage`);
  };

  const handleDeleteClick = () => {
    setIsDeletePopupVisible(true);
    console.log('잘 됨');
  };

  const handleCancelClose = () => {
    setIsDeletePopupVisible(false);
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

  const handleDeleteClose = () => {
    setIsDeletePopupVisible(false);
    // 팀스페이스 삭제하는 api 구현
  };

  // 복사가 성공적으로 이루어질 때
  const handleCopyInviteCode = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  useEffect(() => {
    setShoppingItems(teamShoppingList || []);
  }, [teamShoppingList]);

  return (
    <>
      <Notification visible={showNotification}>클립보드에 복사되었습니다!</Notification>
      <Hrbar />
      <Container>
        <TeamspaceDiv>
          <Title onClick={gotoMypage}>개인 스페이스</Title>
          <SubTitle>팀 스페이스</SubTitle>
          <DivTeamlist>
            <TeamspacePlus onClick={handleTeamspaceCreateClick}>팀 스페이스 생성</TeamspacePlus>
            <TeamspacePlus onClick={handleTeamspaceJoinClick}>팀 스페이스 참가</TeamspacePlus>{' '}
            {IsCreatepopupVisivle && (
              <TeamSpaceCreatePopup handlePopupClose={handleCreatePopupClose} />
            )}
            {IsJoinpopupVisivle && <TeamSpaceJoinPopup handlePopupClose={handleJoinPopupClose} />}
            {teamIsLoading && <Loading />}
            {teamError && <Error />}
            {teams &&
              teams.map((team) => (
                <TeamspaceButton
                  active={teamToken === team.teamToken}
                  onClick={() => gotoTeamSpace(team.teamToken, team.teamName)}
                >
                  {team.teamName}
                </TeamspaceButton>
              ))}
          </DivTeamlist>
        </TeamspaceDiv>
        <ScrapDiv>
          <TNameDiv>
            <SubTitle>{teamName}</SubTitle>
            <ButtonDiv>
              <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
              {isDeletePopupVisible && (
                <DeleteSharePopup
                  handleDeleteClose={handleDeleteClose}
                  handleCancelClose={handleCancelClose}
                />
              )}
              <CopyToClipboard text={inviteCode} onCopy={handleCopyInviteCode}>
                <ShareButton type="share">Share Link</ShareButton>
              </CopyToClipboard>
            </ButtonDiv>
          </TNameDiv>
          <Flex>
            {teamUserLoading && <Loading />}
            {teamUserError && <Error />}
            {users &&
              users.map((user) => (
                <TeamspaceName>
                  <Userimg />
                  <UserName>{user.name}</UserName>
                </TeamspaceName>
              ))}
          </Flex>
          <SubTitle>담은 숙소</SubTitle>
          <Flex>
            {lodgingLoading && <Loading />}
            {lodgingError && <Error />}
            {lodgings &&
              lodgings.map((lodging) => (
                <BestlocationCard
                  key={lodging.pk}
                  pk={lodging.pk}
                  name={lodging.name}
                  price={lodging.price}
                  mainPhoto={lodging.mainPhoto}
                  avgScore={lodging.avgScore}
                  isScrap={lodging.isScrap}
                />
              ))}
          </Flex>
          <SubTitle>공유한 레크레이션</SubTitle>
          <Flex>
            {recreationLoading && <Loading />}
            {recreationError && <Error />}
            {recreations &&
              recreations.map((recreation) => (
                <RecreationCard
                  pk={recreation.pk}
                  name={recreation.name}
                  photo={recreation.photo}
                  headCountMin={recreation.headCountMin}
                  headCountMax={recreation.headCountMax}
                  isScrap={recreation.isScrap}
                />
              ))}
          </Flex>
          <SubTitle>장바구니</SubTitle>
          <Flex>
            {shoppingLoading && <Loading />}
            {shoppingError && <Error />}
            {teamShoppingList && (
              <ListTable data={shoppingItems} setShoppingItems={setShoppingItems} />
            )}
          </Flex>
        </ScrapDiv>
      </Container>
    </>
  );
};

export default MypageTeamspace;
