import React, { useState } from 'react';
import styled from 'styled-components';
import COLOR from '../constants/color';

import BestlocationCard from '../components/Card/BestlocationCard';
import BagCard from '../components/Card/BagCard';
import RecreationCard from '../components/Card/RecreationCard';
import TeamspacePopup from '../components/Popup/TeamspacePopup';

// 전체 여백
const Container = styled.div`
  margin: 0 5rem;
  padding: 0 5rem;
  display: flex;
  gap: 2.5rem;
`;

const Hrbar = styled.hr`
  border: 0.5px solid ${COLOR.primary.blue};
  margin: 4rem 10rem 0 10rem;
`;

const TeamspaceDiv = styled.div`
  width: 100%;
`;

const ScrapDiv = styled.div`
  width: 80%;
  padding-top: 4rem;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin: 3rem 0 10rem 0;
  border-bottom: 1.4px solid ${COLOR.primary.blue};
  width: 120px;
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
  const [IspopupVisivle, setIspopupVisivle] = useState(false);

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
          <Title>스크랩</Title>
          <SubTitle>팀 스페이스</SubTitle>
          <DivTeamlist>
            <TeamspacePlus onClick={handleTeamspacePlusClick}>팀 스페이스 +</TeamspacePlus>
            {IspopupVisivle && <TeamspacePopup handlePopupClose={handlePopupClose} />}
            <TeamspaceButton>국민대스페이스</TeamspaceButton>
            <TeamspaceButton>동아리스페이스</TeamspaceButton>
            <TeamspaceButton>동아리스페이스</TeamspaceButton>
            <TeamspaceButton>동아리스페이스</TeamspaceButton>
            <TeamspaceButton>동아리스페이스</TeamspaceButton>
          </DivTeamlist>
        </TeamspaceDiv>
        <ScrapDiv>
          <SubTitle>숙소</SubTitle>
          <Flex>
            <BestlocationCard />
            <BestlocationCard />
            <BestlocationCard />
            <BestlocationCard />
            <BestlocationCard />
          </Flex>
          <SubTitle>장바구니</SubTitle>
          <Flex>
            <BagCard />
            <BagCard />
            <BagCard />
            <BagCard />
            <BagCard />
          </Flex>
          <SubTitle>레크레이션</SubTitle>
          <Flex>
            <RecreationCard />
            <RecreationCard />
            <RecreationCard />
            <RecreationCard />
            <RecreationCard />
          </Flex>
        </ScrapDiv>
      </Container>
    </>
  );
};

export default MyPage;
