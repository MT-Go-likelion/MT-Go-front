import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import COLOR from '../../constants/color';
import Recreatbtn from '../../assets/images/Recreat.png';
import SelectRecreat from '../../assets/images/Select_recreat.png';

const BestLoContainer = styled.div`
  width: 240px;
  height: 450px;
`;

const BackImg = styled.div`
  width: 240px;
  height: 320px;
  background-color: ${COLOR.blue};
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
`;

const RecreatButton = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  // position: absolute;
  top: 10px;
  right: 10px;
`;

const SaveCount = styled.span`
  font-size: 16px;
  color: ${COLOR.gray};
  margin-top: 4px;
  padding: 0 7px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
`;

const PeopleCount = styled.div`
  font-size: 20px;
  color: ${COLOR.lightGray};
`;

const Teamspace = styled.button`
  padding: 4px 10px;
  border: 2px solid ${COLOR.lightGray};
  border-radius: 16px;
  width: 148px;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  ${(props) =>
    props.teamspace &&
    css`
      background-color: ${COLOR.deepblue};
      border-color: ${COLOR.moredeepblue};
      color: ${COLOR.white};
    `}
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 17px 10px 10px 10px;
`;

// 레크리에이션 카드
// state : 팀페이스 담기 버튼 / 스크랩 후 사진 / 스크랩 수
const Recreation = () => {
  const [teamspace, setTeamspace] = useState(false);
  const [save, setSave] = useState(false);

  const handleSaveClick = () => {
    setTeamspace((prevState) => !prevState);
    setSave((prevState) => !prevState);
  };

  return (
    <BestLoContainer>
      <BackImg>
        <RecreatButton
          src={save ? SelectRecreat : Recreatbtn}
          alt="save"
          onClick={handleSaveClick}
        />
        <SaveCount>NN</SaveCount>
      </BackImg>
      <Flex>
        <Title>Title</Title>
        <PeopleCount>추천인원 : nn ~ nn 명</PeopleCount>
        <Teamspace teamspace={teamspace} onClick={handleSaveClick}>
          팀스페이스 담기
        </Teamspace>
      </Flex>
    </BestLoContainer>
  );
};
export default Recreation;
