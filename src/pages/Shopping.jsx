import React from 'react';
import styled from 'styled-components';

import ShoppingTable from '../components/Common/Shopping/ShoppingTable';
import ShoppingTag from '../components/Button/ShoppingTag';
import MainBanner from '../assets/images/ShoppingMain.png';

const BannerImg = styled.img`
  width: 100%;
`;

const Container = styled.div`
  margin: 4rem 8rem;
  display: flex;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  max-width: 40rem;
  justify-content: center;
`;

const CalDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  margin-left: 8rem;
  width: 100%;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 900;
`;

const SelectName = styled.select`
  width: 160px;
  height: 33px;
  border-radius: 32px;
  padding-left: 2rem;
`;

const Shopping = () => {
  const TagOptions = [
    { Tag: 1, name: '소고기 등심' },
    { Tag: 2, name: '소고기 안심' },
    { Tag: 3, name: 'LA갈비' },
    { Tag: 4, name: '소고기 모듬구이' },
    { Tag: 5, name: '스테이크' },
    { Tag: 6, name: '돼지고기' },
    { Tag: 7, name: '돼지고기' },
    { Tag: 8, name: '돼지고기' },
  ];

  const spaceOptions = [
    { id: 1, name: '개인 스페이스' },
    { id: 2, name: '국민대 스페이스' },
    { id: 3, name: '동아리 스페이스' },
  ];
  return (
    <>
      <BannerImg src={MainBanner} />
      <Container>
        <Flex>
          {TagOptions.map((options) => (
            <ShoppingTag>{options.name}</ShoppingTag>
          ))}
        </Flex>
      </Container>
      <CalDiv>
        <Title>장바구니 계산</Title>
        <SelectName>
          {spaceOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </SelectName>
      </CalDiv>
      <Container>
        <ShoppingTable />
      </Container>
    </>
  );
};

export default Shopping;
