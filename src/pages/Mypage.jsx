import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import MypageMe from '../assets/images/MypageMe.png';
import MTLOGO from '../assets/images/MTLOGO.png';
// import BagCard from '../components/Card/BagCard';
import Loading from './Loading';
import Error from './Error';
import { useSignOut } from '../hooks/queries/Auth/useSignOut';
import useLodgingScrapList from '../hooks/queries/Lodging/useLodgingScrapList';
import useRecreationScrapList from '../hooks/queries/Recreation/useRecreationScrapList';
import useUserUpdate from '../hooks/queries/Auth/useUserUpdate';

import useTeam from '../hooks/queries/Team/useTeam';
import useShopping from '../hooks/queries/Shopping/useShopping';
import TermsModal from '../components/Common/Modal/TermsModal';
import BestlocationCard from '../components/Card/BestlocationCard';
import RecreationCard from '../components/Card/RecreationCard';
import ListTable from '../components/Common/Shopping/ListTable';
import TeamSpaceCreatePopup from '../components/Popup/Mypage/TeamspaceCreatePopup';
import TeamSpaceJoinPopup from '../components/Popup/Mypage/TeamspaceJoinPopup';
import UserDeletePopup from '../components/Popup/Mypage/UserDeletePopup';
// import InquiryPopup from '../components/Popup/Mypage/inquiryPopup';
import SuggestionModal from '../components/Common/Modal/SuggestionModal';

import { mobileSize } from '../utils/MediaSize';
import UserUpdateModal from '../components/Common/Modal/UserUpdateModal';

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
    width: 80%;
    display: block;
    margin: 4rem 2rem;
    padding: 0;
  }
`;

// const Hrbar = styled.hr`
//   border: 0.5px solid ${COLOR.primary.blue};
//   margin: 4rem 10rem 0 10rem;
//   transition: 0.3s;
//   @media (max-width: ${mediaSize}px) {
//     margin: 4rem 5rem 0 5rem;
//   }
// `;

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
  width: 100%;
`;

const SettingTitle = styled.button`
  font-size: 25px;
  font-weight: 400;
  margin-top: 2rem;
  width: 50px;
  color: ${COLOR.gray};
`;

const Title = styled.button`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10rem;
  border-bottom: 1.4px solid ${COLOR.primary.lightBlue};
  width: 140px;
`;

const SubTitle = styled.div`
  font-size: 24px;
  margin: 5rem 0 2rem 0;
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

  &:hover {
    background-color: ${COLOR.lightGray};
  }

  &:active {
    border: 3px solid ${COLOR.primary.blue};
  }

  @media (max-width: ${mobileSize}px) {
    width: 100%;
    height: 32px;
    border-radius: 30px;
    margin-bottom: 0.3rem;
    margin-top: 0.6rem;
    border: 1px solid ${COLOR.lightGray};
    &:active {
      border: 3px solid ${COLOR.blue};
    }
  }
`;

const FlexlistTable = styled.div`
  display: flex;
  gap: 3rem;
  padding-bottom: 2rem;
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
  @media (max-width: ${mobileSize}px) {
    margin-bottom: 1rem;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
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
  margin-bottom: 1rem;
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

const MyPage = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [IsCreatepopupVisivle, setIsCreatepopupVisivle] = useState(false);
  const [IsJoinpopupVisivle, setIsJoinpopupVisivle] = useState(false);

  const navigate = useNavigate();

  const {
    teamQuery: { isLoading: teamIsLoading, error: teamError, data: teams },
  } = useTeam(user ? user.token : '');

  const {
    lodgingScrapQuery: { isLoading: lodgingIsLoading, error: lodgingError, data: lodgingScrapList },
  } = useLodgingScrapList(user ? user.token : '');

  const {
    recreationScrapQuery: {
      isLoading: recreationIsLoading,
      error: recreationError,
      data: recreationScrapList,
    },
  } = useRecreationScrapList(user ? user.token : '');

  const {
    shoppingQuery: { data: shoppingList },
  } = useShopping(user ? user.token : '');
  const [shoppingItems, setShoppingItems] = useState(shoppingList || []);

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

  const signOut = useSignOut();
  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  useEffect(() => {
    setShoppingItems(shoppingList || []);
  }, [shoppingList]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [suggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [userUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const [isDeleteUserPopupVisible, setIsDeleteUserPopupVisible] = useState(false);
  const { userDeleteMutation } = useUserUpdate(user.pk);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };
  const showTermsModal = () => {
    setTermsModalOpen(true);
  };

  const handleUserDeleteClick = () => {
    setIsDeleteUserPopupVisible(true);
  };

  const handleUserDeleteClose = () => {
    setIsDeleteUserPopupVisible(false);
  };

  const handleUserDelete = () => {
    setIsDeleteUserPopupVisible(false);
    userDeleteMutation();
    signOut();
    navigate('/');
  };

  const showSuggestionModal = () => {
    setSuggestionModalOpen(true);
  };

  const showUserUpdateModal = () => {
    setUserUpdateModalOpen(true);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <>
          <Container>
            <TitleDiv>
              <Mypageme src={MypageMe} />
              <MypageTitle>마이페이지</MypageTitle>
            </TitleDiv>
            <TeamspaceButtonDiv>
              <TeamspacePlus onClick={handleTeamspaceCreateClick}>팀 스페이스 생성</TeamspacePlus>
              <TeamspacePlus onClick={handleTeamspaceJoinClick}>팀 스페이스 참가</TeamspacePlus>
              {IsCreatepopupVisivle && (
                <TeamSpaceCreatePopup handlePopupClose={handleCreatePopupClose} />
              )}
              {IsJoinpopupVisivle && <TeamSpaceJoinPopup handlePopupClose={handleJoinPopupClose} />}
            </TeamspaceButtonDiv>
            <TeamspaceButtonDiv>
              {teams &&
                teams.map((team) => (
                  <TeamspaceButton onClick={() => gotoTeamSpace(team.teamToken, team.teamName)}>
                    {team.teamName}
                  </TeamspaceButton>
                ))}
            </TeamspaceButtonDiv>
            <ScrapDiv>
              <ScrapTitle>스크랩</ScrapTitle>
              <SubTitle>숙소</SubTitle>
              {lodgingIsLoading && <Loading />}
              {lodgingError && <Error />}
              <Flex>
                {lodgingScrapList &&
                  lodgingScrapList.map((scrapItem) => (
                    <BestlocationCard
                      key={scrapItem.pk}
                      pk={scrapItem.pk}
                      name={scrapItem.name}
                      price={scrapItem.price}
                      mainPhoto={scrapItem.mainPhoto}
                      isScrap={scrapItem.isScrap}
                      lowWeekdayPrice={scrapItem.lowWeekdayPrice}
                    />
                  ))}
              </Flex>
              <SubTitle>레크레이션</SubTitle>
              {recreationIsLoading && <Loading />}
              {recreationError && <Error />}
              <Flex>
                {recreationScrapList &&
                  recreationScrapList.map((scrapItem) => (
                    <RecreationCard
                      key={scrapItem.pk}
                      pk={scrapItem.pk}
                      name={scrapItem.name}
                      photo={scrapItem.photo}
                      headCountMin={scrapItem.headCountMin}
                      headCountMax={scrapItem.headCountMax}
                      isScrap={scrapItem.isScrap}
                    />
                  ))}
              </Flex>
            </ScrapDiv>
            <ScrapDiv>
              <SubTitle>장바구니</SubTitle>
              <Flex>
                <ListTable data={shoppingItems} setShoppingItems={setShoppingItems} />
              </Flex>
            </ScrapDiv>
          </Container>
          <Footer>
            <FooterSub>
              <Sub>설정</Sub>
              <Sub onClick={showUserUpdateModal}>개인정보 변경</Sub>
              {userUpdateModalOpen && (
                <UserUpdateModal setUserUpdateModalOpen={setUserUpdateModalOpen} />
              )}
              <Sub
                onClick={() => {
                  handleLogout();
                }}
              >
                로그아웃
              </Sub>

              <Sub onClick={showSuggestionModal}>문의하기</Sub>
              {suggestionModalOpen && (
                <SuggestionModal setSuggestionModalOpen={setSuggestionModalOpen} />
              )}
              <Sub onClick={showTermsModal}>이용약관</Sub>
              {termsModalOpen && <TermsModal setTermsModalOpen={setTermsModalOpen} />}

              <Sub onClick={handleUserDeleteClick}>회원탈퇴</Sub>
              {isDeleteUserPopupVisible && (
                <UserDeletePopup
                  handleUserDelete={handleUserDelete}
                  handleUserDeleteClose={handleUserDeleteClose}
                />
              )}
            </FooterSub>
            <LogoImg src={MTLOGO} />
          </Footer>
        </>
      ) : (
        <div>
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
                <TeamspacePlus onClick={handleTeamspaceJoinClick}>팀 스페이스 참가</TeamspacePlus>

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
                    <TeamspaceButton onClick={() => gotoTeamSpace(team.teamToken, team.teamName)}>
                      {team.teamName}
                    </TeamspaceButton>
                  ))}
              </DivTeamlist>
            </TeamspaceDiv>
            <ScrapDiv>
              <SubTitle>숙소</SubTitle>
              {lodgingIsLoading && <Loading />}
              {lodgingError && <Error />}
              <Flex>
                {lodgingScrapList &&
                  lodgingScrapList.map((scrapItem) => (
                    <BestlocationCard
                      key={scrapItem.pk}
                      pk={scrapItem.pk}
                      name={scrapItem.name}
                      price={scrapItem.price}
                      mainPhoto={scrapItem.mainPhoto}
                      isScrap={scrapItem.isScrap}
                      lowWeekdayPrice={scrapItem.lowWeekdayPrice}
                    />
                  ))}
              </Flex>
              <SubTitle>레크레이션</SubTitle>
              {recreationIsLoading && <Loading />}
              {recreationError && <Error />}
              <Flex>
                {recreationScrapList &&
                  recreationScrapList.map((scrapItem) => (
                    <RecreationCard
                      key={scrapItem.pk}
                      pk={scrapItem.pk}
                      name={scrapItem.name}
                      photo={scrapItem.photo}
                      headCountMin={scrapItem.headCountMin}
                      headCountMax={scrapItem.headCountMax}
                      isScrap={scrapItem.isScrap}
                    />
                  ))}
              </Flex>
              <SubTitle>장바구니</SubTitle>
              <FlexlistTable>
                <ListTable data={shoppingItems} setShoppingItems={setShoppingItems} />
              </FlexlistTable>
            </ScrapDiv>
          </Container>
        </div>
      )}
    </div>
  );
};

export default MyPage;
