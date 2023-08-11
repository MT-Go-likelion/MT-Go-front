import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import COLOR from '../constants/color';
import MainBanner from '../assets/images/banner.png';
import BestlocationCard from '../components/Card/BestlocationCard';
import BagCard from '../components/Card/BagCard';
import RecreationCard from '../components/Card/RecreationCard';

import MobileBanner from '../assets/images/MobileBanner.png';
import { mobileSize } from '../utils/MediaSize';

// import COLOR from '../constants/color';

const mediaSize = 1030;

const MainLayout = styled.div`
  width: 100%;
  height: 80%;
`;

// 배너 - 메인 img
const Banner = styled.div`
  width: 100%;
  position: relative;
`;

const BannerImg = styled.img`
  width: 100%;
  @media (max-width: ${mobileSize}px) {
    content: url(${MobileBanner});
  }
`;

// 전체 적용 마진
const ContentLayout = styled.div`
  margin: 4rem 7rem;
  padding: 0 3rem;
  position: relative;
  transition: 0.3s;
  @media (max-width: ${mediaSize}px) {
    margin: 4rem 2rem;
  }
  @media (max-width: ${mobileSize}px) {
    margin: 0;
    padding: 1rem 2rem;
    background-color: ${COLOR.white};
    margin-bottom: 4.5rem;
  }
`;

const Flexdiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3rem;
  margin: 4rem;
  padding-bottom: 0.5rem;
  height: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  transition: 0.3s;
  @media (max-width: ${mediaSize}px) {
    margin: 4rem 2rem;
  }
  @media (max-width: ${mobileSize}px) {
    margin: 1rem 0 2rem 0;
    gap: 1rem;
  }
`;

// 추천 단체숙소
const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin: 1rem 0;
  transition: 0.3s;
  @media (max-width: ${mediaSize}px) {
    font-size: 24px;
  }
  @media (max-width: ${mobileSize}px) {
    font-size: 16px;
    font-style: normal;
    font-weight: 900;
    line-height: 180%;
    margin: 0;
  }
`;

const SubTitle = styled.span`
  font-size: 20px;
  color: ${COLOR.gray};
  transition: 0.3s;
  @media (max-width: ${mediaSize}px) {
    font-size: 16px;
  }
  @media (max-width: ${mobileSize}px) {
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 180%;
    content: ${({ isMobile }) =>
      isMobile ? `"내용변경"` : `"파트너들과 함께 장바구니에 담을 물품들을 골라보세요."`};
  }
`;

const More = styled.a`
  font-size: 16px;
  color: ${COLOR.gray};
  margin-right: 4rem;
  cursor: pointer;
  @media (max-width: ${mobileSize}px) {
    margin-right: 0;
    text-align: right;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 180%;
  }
`;

const Divstyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: ${mobileSize}px) {
  }
`;

const Main = () => {
  const navigate = useNavigate();

  const handleLodgingClick = () => {
    navigate(`/Lodging`);
  };

  const handleShoppingClick = () => {
    navigate(`/Shopping`);
  };

  const handleRecreationClick = () => {
    navigate(`/Recreation`);
  };
  const isMobile = window.innerWidth <= mobileSize;

  return (
    <>
      <MainLayout>
        <Banner>
          <BannerImg src={MainBanner} />
        </Banner>
      </MainLayout>
      <ContentLayout>
        <Title>추천 단체 숙소</Title>
        <Divstyled>
          <SubTitle>마음에 드는 숙박 장소를 골라보세요.</SubTitle>
          <More onClick={handleLodgingClick}>더보기</More>
        </Divstyled>
        <Flexdiv>
          <BestlocationCard />
          <BestlocationCard />
          <BestlocationCard />
          <BestlocationCard />
          <BestlocationCard />
        </Flexdiv>
        <Title>장보기</Title>
        <Divstyled>
          <SubTitle>
            {isMobile
              ? '장바구니에 담을 물품들을 골라보세요.'
              : '파트너들과 함께 장바구니에 담을 물품들을 골라보세요.'}
          </SubTitle>

          <More onClick={handleShoppingClick}>더보기</More>
        </Divstyled>
        <Flexdiv>
          <BagCard />
          <BagCard />
          <BagCard />
          <BagCard />
          <BagCard />
        </Flexdiv>
        <Title>추천 레크레이션</Title>
        <Divstyled>
          <SubTitle>MT의 꽃, 레크레이션! 무엇을 할지 모르겠다면?</SubTitle>
          <More onClick={handleRecreationClick}>더보기</More>
        </Divstyled>
        <Flexdiv>
          <RecreationCard />
          <RecreationCard />
          <RecreationCard />
          <RecreationCard />
          <RecreationCard />
        </Flexdiv>
      </ContentLayout>
    </>
  );
};

export default Main;
