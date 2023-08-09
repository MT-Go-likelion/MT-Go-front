import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import BestlocationCard from '../components/Card/BestlocationCard';
// import BagCard from '../components/Card/BagCard';
import RecreationCard from '../components/Card/RecreationCard';
import TeamspacePopup from '../components/Popup/Mypage/TeamspacePopup';
import useLodgingScrapList from '../hooks/queries/Lodging/useLodgingScrapList';
import useRecreationScrapList from '../hooks/queries/Recreation/useRecreationScrapList';
import Loading from './Loading';
import Error from './Error';
import useTeam from '../hooks/queries/Team/useTeam';

// 전체 여백
const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: auto;
  display: flex;
  gap: 1rem;
`;

const Hrbar = styled.hr`
  border: 0.5px solid ${COLOR.primary.blue};
  margin: 4rem 10rem 0 10rem;
`;

const TeamspaceDiv = styled.div`
  width: 100%;
  flex-basis: 20%;
`;

const ScrapDiv = styled.div`
  width: 100%;
  padding-top: 4rem;
  flex-basis: 80%;
`;

const Title = styled.button`
  font-size: 25px;
  font-weight: 700;
  margin: 3rem 0 10rem 0;
  border-bottom: 1.4px solid ${COLOR.primary.lightBlue};
  width: 140px;
`;

const SubTitle = styled.div`
  font-size: 24px;
  margin: 2rem 0;
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
    background-color 0.2s,
    border 0.2s;

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
  gap: 10px;
  flex-direction: column;
`;

const MyPage = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [IspopupVisivle, setIspopupVisivle] = useState(false);
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

  const gotoTeamSpace = (teamToken) => {
    navigate(`/mypage/${teamToken}`);
  };

  const gotoMypage = () => {
    navigate(`/Mypage`);
  };

  const handleTeamspacePlusClick = () => {
    setIspopupVisivle(true);
  };

  const handlePopupClose = () => {
    setIspopupVisivle(false);
  };

  return (
    <>
      <Hrbar />
      <Container>
        <TeamspaceDiv>
          <Title onClick={gotoMypage}>개인 스페이스</Title>
          <SubTitle>팀 스페이스</SubTitle>
          <DivTeamlist>
            <TeamspacePlus onClick={handleTeamspacePlusClick}>팀 스페이스 +</TeamspacePlus>
            {IspopupVisivle && <TeamspacePopup handlePopupClose={handlePopupClose} />}
            {teamIsLoading && <Loading />}
            {teamError && <Error />}
            {teams &&
              teams.map((team) => (
                <TeamspaceButton onClick={() => gotoTeamSpace(team.teamToken)}>
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
                />
              ))}
          </Flex>
          <SubTitle>장바구니</SubTitle>
          <Flex>장바구니 컴포넌트</Flex>
        </ScrapDiv>
      </Container>
    </>
  );
};

export default MyPage;
