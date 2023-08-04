import React from 'react';
import styled from 'styled-components';
import COLOR from '../constants/color';

import banner from '../assets/images/banner-shopping.png';
import search from '../assets/images/search.png';

import BagCard from '../components/Card/BagCard';

const ShoppingLayout = styled.div`
  justify-content: center;
`;

// const ShoppingContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

const BannerContainer = styled.div`
  width: 100%;
  position: relative;
`;

const BannerImgBox = styled.div`
  width: 100%;
  height: 18.75rem;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
`;

const BannerContentContainer = styled.div`
  position: absolute;
  left: 20%;
  top: 20%;
`;

const BannerTitle = styled.div`
  font-size: 2rem;
  color: ${COLOR.white};
  font-weight: bold;
  line-height: 1.5;
`;

const BannerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-left: 1rem;
  margin-top: 1rem;
`;

const BannerItem = styled.li`
  color: ${COLOR.white};
  font-weight: bold;
  list-style: circle;
`;

const ShoppingContentContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShoppingBestContainer = styled.div`
  width: 100%;
  margin: 3rem 0;
`;

const ShoppingBestTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ShoppingBestSubTitle = styled.h3`
  font-size: 1.5rem;
  color: ${COLOR.gray};
  font-weight: 600;
`;

const ShoppingBestList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  padding: 3rem 2rem;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 44.25rem;
  height: 3rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  border: 2px solid ${COLOR.primary.blue};
  padding: 0 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const SearchImg = styled.img`
  position: absolute;
  top: 10%;
  right: 2%;
`;

const Shopping = () => {
  return (
    <ShoppingLayout>
      <BannerContainer>
        <BannerImgBox>
          <BannerImg src={banner} />
        </BannerImgBox>
        <BannerContentContainer>
          <BannerTitle>
            MT-GO를 통해 필요한 물품들을 <br /> 빠르고 쉽게 체크하세요!
          </BannerTitle>
          <BannerList>
            <BannerItem>장바구니에 원하는 물품들을 담고</BannerItem>
            <BannerItem>여행메이트와 체크리스트를 확인하세요!</BannerItem>
          </BannerList>
        </BannerContentContainer>
      </BannerContainer>
      <ShoppingContentContainer>
        <ShoppingBestContainer>
          <ShoppingBestTitle>Best Top5</ShoppingBestTitle>
          <ShoppingBestSubTitle>무엇을 사야할지 고민된다면?</ShoppingBestSubTitle>
          <ShoppingBestList>
            {Array.from(Array(5), () => (
              <BagCard />
            ))}
          </ShoppingBestList>
        </ShoppingBestContainer>
        <SearchContainer>
          <SearchInput placeholder="담고싶은 물품을 검색하세요" />
          <SearchImg src={search} />
        </SearchContainer>
      </ShoppingContentContainer>
    </ShoppingLayout>
  );
};

export default Shopping;
