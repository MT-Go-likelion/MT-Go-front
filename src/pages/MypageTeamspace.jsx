import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';

import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import BestlocationCard from '../components/Card/BestlocationCard';
import RecreationCard from '../components/Card/RecreationCard';
import DeleteSharePopup from '../components/Popup/Mypage/DeleteSharePopup';
import TeamSpaceMe from '../assets/images/TeamSpaceMe.png';
import MTLOGO from '../assets/images/MTLOGO.png';
import userImg1 from '../assets/images/userImg1.png';
import userImg2 from '../assets/images/userImg2.png';
import userImg3 from '../assets/images/userImg3.png';
import userImg4 from '../assets/images/userImg4.png';
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
import LeaveTeamPopup from '../components/Popup/Mypage/LeaveTeamPopup';
import { mobileSize } from '../utils/MediaSize';

const mediaSize = 1030;

const Margin = styled.div`
  height: 3rem;
`;
// 전체 여백
const Container = styled.div`
  border-top: 2px solid ${COLOR.primary.blue};
  width: 100%;

  max-width: 1000px;
  margin: auto;
  display: flex;
  gap: 6rem;
  transition: 0.3s;

  @media (max-width: ${mediaSize}px) {
    margin: 0 3rem;
    max-width: 800px;
  }
  @media (max-width: ${mobileSize}px) {
    max-width: none;
    border-top: none;
    width: 80%;
    display: block;
    margin: 4rem 2rem;
    padding: 0;
  }
`;

const TeamspaceDiv = styled.div`
  width: 100%;
`;

const ScrapDiv = styled.div`
  width: 100%;
  padding-top: 4rem;
  min-width: 700px;
  padding-right: 3rem;

  @media (max-width: ${mobileSize}px) {
    width: 100%;
    height: 100%;
    min-width: 0;
    border-radius: 12px;
    padding: 1.2rem 1.4rem;
    margin: 1.2rem 0 2rem 0;
    background: #f0f6f9;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
`;

const SidebarTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
`;

const SettingTitle = styled.button`
  font-size: 25px;
  font-weight: 400;
  margin-top: 2rem;
  width: 50px;
  color: ${COLOR.gray};
`;

const Title = styled.button`
  font-size: 1.5rem;
  font-weight: 400;
  width: 140px;
  margin-bottom: 10rem;
  color: ${COLOR.gray};
`;

const SubTitle = styled.div`
  font-size: 24px;
  margin: 5rem 0 2rem 0;
  font-weight: 700;
  @media (max-width: ${mobileSize}px) {
    margin: 1rem 0 0.3rem 0;
    font-size: 12px;
  }
`;

const Flex = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding-bottom: 1rem;
  @media (max-width: ${mobileSize}px) {
  }
`;

const FlexlistTable = styled.div`
  display: flex;
  gap: 3rem;
  padding-bottom: 2rem;
`;

// 팀스페이스 버튼
const TeamspacePlus = styled.button`
  width: 120px;
  height: 32px;
  border-radius: 16px;
  background: ${COLOR.primary.gradient};
  @media (max-width: ${mobileSize}px) {
    width: 100%;
    background: var(--linear, linear-gradient(133deg, #45bcff 0%, #3c7eff 45.77%, #8247ff 100%));
    color: ${COLOR.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
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
  color: ${COLOR.black};
  &:hover {
    background-color: ${COLOR.lightGray};
  }

  ${(props) =>
    props.active &&
    css`
      border: 2px solid ${COLOR.blue};
      font-weight: bold;
    `}

  @media (max-width: ${mobileSize}px) {
    width: 100%;
    height: 32px;
    border-radius: 30px;
    margin-bottom: 0.3rem;
    margin-top: 0.6rem;
    border: 1px solid ${COLOR.lightGray};
    ${(props) =>
      props.active &&
      css`
        border: 2px solid ${COLOR.blue};
        font-weight: bold;
      `}
  }
`;

const TeamspaceButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;
  @media (max-width: ${mobileSize}px) {
    width: 100%;
    gap: 1rem;
  }
`;

// 팀스페이스 리스트
const DivTeamlist = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  @media (max-width: ${mobileSize}px) {
    flex-direction: row;
    gap: 0.5rem;
  }
`;

// Teamspace name
const TNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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
  @media (max-width: ${mobileSize}px) {
    width: 32px;
    height: 32px;
  }
`;

const UserName = styled.span`
  font-size: 18px;
  @media (max-width: ${mobileSize}px) {
    font-size: 12px;
  }
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
  color: ${COLOR.red};
  border: 4px solid ${COLOR.red};

  &:hover {
    background-color: ${COLOR.lightGray};
  }

  &:active {
    border: 3px solid ${COLOR.primary.blue};
  }
`;

const LeaveButton = styled(Button)`
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
  @media (max-width: ${mobileSize}px) {
    border: 2px solid ${COLOR.primary.blue};
    height: 22px;
    font-size: 12px;
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

// 모바일
const Mypageme = styled.img`
  width: 32px;
  height: 32px;
`;

const MypageTitle = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  line-height: 180%;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  @media (max-width: ${mobileSize}px) {
    margin-bottom: 1rem;
  }
`;

const ScrapTitle = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: 180%;
`;

const Footer = styled.div`
  border-radius: 48px 48px 0px 0px;
  background: #f0f6f9;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1) inset;
  width: 100%;
  height: 410px;
  padding: 2.5rem;
  @media (max-width: ${mobileSize}px) {
    height: 350px;
  }
`;
const FooterSub = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Sub = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 180%;
`;

const LogoImg = styled.img`
  width: 91px;
  height: 38px;
  float: right;
`;

const MemberDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 100%;
`;

const MypageTeamspace = () => {
  const [IsCreatepopupVisivle, setIsCreatepopupVisivle] = useState(false);
  const [IsJoinpopupVisivle, setIsJoinpopupVisivle] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [isLeavePopupVisible, setIsLeavePopupVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const { state: teamName } = useLocation();

  const { teamToken } = useParams();
  const inviteCode = teamToken;

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    teamQuery: { isLoading: teamIsLoading, error: teamError, data: teams },
    teamDeleteMutation,
  } = useTeam(user ? user.token : '');

  const {
    teamUserQuery: { isLoading: teamUserLoading, error: teamUserError, data: users },
    teamUserDeleteMutation,
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

  const gotoSetting = () => {
    navigate('/setting');
  };

  const checkTeamAuth = (teams) => {
    let isAuth = false;
    teams.forEach((team) => {
      console.log(team.user, user.pk);
      if (team.user === user.pk) {
        isAuth = true;
      }
    });
    return isAuth;
  };

  const handleDeleteClick = () => {
    setIsDeletePopupVisible(true);
  };

  const handleCancelClose = () => {
    setIsDeletePopupVisible(false);
  };

  const handleLeaveClick = () => {
    setIsLeavePopupVisible(true);
  };

  const handleLeaveClose = () => {
    setIsLeavePopupVisible(false);
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
    teamDeleteMutation({ userToken: user.token, teamToken });
    navigate('/');
  };

  const handleLeave = () => {
    setIsLeavePopupVisible(false);
    teamUserDeleteMutation({ userToken: user.token, teamToken });
    navigate('/');
  };

  // 복사가 성공적으로 이루어질 때
  const handleCopyInviteCode = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // 모바일
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };

  const userImgs = [userImg1, userImg2, userImg3, userImg4];

  useEffect(() => {
    setShoppingItems(teamShoppingList || []);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [teamShoppingList]);

  // 랜덤이미지
  function getRandomUserImg() {
    const randomIndex = Math.floor(Math.random() * userImgs.length);
    return userImgs[randomIndex];
  }

  return (
    <div>
      {isMobile ? (
        <>
          <Notification visible={showNotification}>클립보드에 복사되었습니다!</Notification>

          <Container>
            <TitleDiv>
              <Mypageme src={TeamSpaceMe} />
              <MypageTitle>팀스페이스</MypageTitle>
            </TitleDiv>
            <TeamspaceButtonDiv>
              <TeamspacePlus onClick={handleTeamspaceCreateClick}>팀 스페이스 생성</TeamspacePlus>
              <TeamspacePlus onClick={handleTeamspaceJoinClick}>팀 스페이스 참가</TeamspacePlus>
              {IsCreatepopupVisivle && (
                <TeamSpaceCreatePopup handlePopupClose={handleCreatePopupClose} />
              )}
              {IsJoinpopupVisivle && <TeamSpaceJoinPopup handlePopupClose={handleJoinPopupClose} />}
            </TeamspaceButtonDiv>
            <DivTeamlist>
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
            <ScrapDiv>
              <MemberDiv>
                <ScrapTitle>팀스페이스 멤버</ScrapTitle>
                <CopyToClipboard text={inviteCode} onCopy={handleCopyInviteCode}>
                  <ShareButton type="share">Share Link</ShareButton>
                </CopyToClipboard>
              </MemberDiv>
              <Flex>
                {teamUserLoading && <Loading />}
                {teamUserError && <Error />}
                {users &&
                  users.map((user) => (
                    <TeamspaceName>
                      <Userimg src={getRandomUserImg()} />
                      <UserName>{user.name}</UserName>
                    </TeamspaceName>
                  ))}
              </Flex>
            </ScrapDiv>
            <ScrapDiv>
              <ScrapTitle>스크랩</ScrapTitle>
              <SubTitle>숙소</SubTitle>
              {lodgingLoading && <Loading />}
              {lodgingError && <Error />}
              <Flex>
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
                      lowWeekdayPrice={lodging.lowWeekdayPrice}
                    />
                  ))}
              </Flex>
              <SubTitle>레크레이션</SubTitle>
              {recreationLoading && <Loading />}
              {recreationError && <Error />}
              <Flex>
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
            </ScrapDiv>
            <ScrapDiv>
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
          <Footer>
            <FooterSub>
              <Sub>팀스페이스 관리</Sub>
              <CopyToClipboard text={inviteCode} onCopy={handleCopyInviteCode}>
                <Sub type="share">코드 복사</Sub>
              </CopyToClipboard>
              {teams && checkTeamAuth(teams) && (
                <Sub onClick={handleDeleteClick}>팀스페이스 삭제</Sub>
              )}
              {teams && !checkTeamAuth(teams) && (
                <Sub onClick={handleLeaveClick}>팀스페이스 떠나기</Sub>
              )}
              {isDeletePopupVisible && (
                <DeleteSharePopup
                  handleDeleteClose={handleDeleteClose}
                  handleCancelClose={handleCancelClose}
                />
              )}
              {isLeavePopupVisible && (
                <LeaveTeamPopup handleLeave={handleLeave} handleLeaveClose={handleLeaveClose} />
              )}
            </FooterSub>
            <LogoImg src={MTLOGO} />
          </Footer>
        </>
      ) : (
        <>
          <Notification visible={showNotification}>클립보드에 복사되었습니다!</Notification>
          <Margin> </Margin>
          <Container>
            <TeamspaceDiv>
              <SidebarTopContainer>
                <SettingTitle onClick={gotoSetting}>설정</SettingTitle>
                <Title onClick={gotoMypage}>개인 스페이스</Title>
              </SidebarTopContainer>
              <SubTitle>팀 스페이스</SubTitle>
              <DivTeamlist>
                <TeamspacePlus onClick={handleTeamspaceCreateClick}>팀 스페이스 생성</TeamspacePlus>
                <TeamspacePlus onClick={handleTeamspaceJoinClick}>
                  팀 스페이스 참가
                </TeamspacePlus>{' '}
                {IsCreatepopupVisivle && (
                  <TeamSpaceCreatePopup handlePopupClose={handleCreatePopupClose} />
                )}
                {IsJoinpopupVisivle && (
                  <TeamSpaceJoinPopup handlePopupClose={handleJoinPopupClose} />
                )}
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
                  {teams && checkTeamAuth(teams) && (
                    <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
                  )}
                  {teams && !checkTeamAuth(teams) && (
                    <LeaveButton onClick={handleLeaveClick}>Leave</LeaveButton>
                  )}
                  {isDeletePopupVisible && (
                    <DeleteSharePopup
                      handleDeleteClose={handleDeleteClose}
                      handleCancelClose={handleCancelClose}
                    />
                  )}
                  {isLeavePopupVisible && (
                    <LeaveTeamPopup handleLeave={handleLeave} handleLeaveClose={handleLeaveClose} />
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
                      lowWeekdayPrice={lodging.lowWeekdayPrice}
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
              <FlexlistTable>
                {shoppingLoading && <Loading />}
                {shoppingError && <Error />}
                {teamShoppingList && (
                  <ListTable data={shoppingItems} setShoppingItems={setShoppingItems} />
                )}
              </FlexlistTable>
            </ScrapDiv>
          </Container>
        </>
      )}
    </div>
  );
};

export default MypageTeamspace;
