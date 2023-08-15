import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import BestlocationCard from '../components/Card/BestlocationCard';
// import BagCard from '../components/Card/BagCard';
import RecreationCard from '../components/Card/RecreationCard';
import useLodgingScrapList from '../hooks/queries/Lodging/useLodgingScrapList';
import useRecreationScrapList from '../hooks/queries/Recreation/useRecreationScrapList';
import Loading from './Loading';
import Error from './Error';
import useTeam from '../hooks/queries/Team/useTeam';
import useShopping from '../hooks/queries/Shopping/useShopping';
import ListTable from '../components/Common/Shopping/ListTable';
import TeamSpaceCreatePopup from '../components/Popup/Mypage/TeamspaceCreatePopup';
import TeamSpaceJoinPopup from '../components/Popup/Mypage/TeamspaceJoinPopup';

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
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10rem;
  border-bottom: 1.4px solid ${COLOR.primary.lightBlue};
  width: 140px;
`;

const SubTitle = styled.div`
  font-size: 24px;
  margin: 5rem 0 2rem 0;
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

  useEffect(() => {
    setShoppingItems(shoppingList || []);
  }, [shoppingList]);

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
                  hideTeamspace
                />
              ))}
          </Flex>
          <SubTitle>장바구니</SubTitle>
          <Flex>
            <ListTable data={shoppingItems} setShoppingItems={setShoppingItems} />
          </Flex>
        </ScrapDiv>
      </Container>
    </>
  );
};

export default MyPage;
