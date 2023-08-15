import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../constants/color';
import MainBanner from '../assets/images/banner.png';
import BestlocationCard from '../components/Card/BestlocationCard';
import BagCard from '../components/Card/BagCard';
import RecreationCard from '../components/Card/RecreationCard';

import MobileBanner from '../assets/images/MobileBanner.png';
import { mobileSize } from '../utils/MediaSize';
import useLodgingMain from '../hooks/queries/Lodging/useLodgingMain';
import Error from './Error';
import useRecreationMain from '../hooks/queries/Recreation/useRecreationMain';
import Loading from './Loading';

const mediaSize = 1100;

const MainLayout = styled.div`
  width: 100%;
  height: 80%;
`;

const Banner = styled.div`
  width: 100%;
  max-height: 320px;
  min-height: 200px;
  position: relative;
`;

const BannerImg = styled.img`
  width: 100%;
  max-height: 330px;
  min-height: 250px;
  object-fit: cover;
  @media (max-width: ${mobileSize}px) {
    content: url(${MobileBanner});
  }
`;
const ContentLayout = styled.div`
  margin: 5rem 11vh;
  padding: 0 3rem;
  position: relative;
  transition: 0.3s;
  @media (max-width: ${mediaSize}px) {
    margin: 4rem 6vh;
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
  margin: 2rem 2rem 5rem 2rem;
  padding-bottom: 0.5rem;
  height: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;

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
  font-size: 26px;
  font-weight: 700;
  margin: 1rem 0;
  transition: 0.3s;
  @media (max-width: ${mediaSize}px) {
    font-size: 22px;
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
  font-size: 17px;
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

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    mainLodgingsQuery: { isLoading: lodgingsLoading, lodgingsError, data: lodgings },
  } = useLodgingMain(user.token);

  const {
    mainRecreationsQuery: {
      isLoading: recreationsLoading,
      error: recreationsError,
      data: recreations,
    },
  } = useRecreationMain(user.token);

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
          {lodgingsLoading && <Loading />}
          {lodgingsError && <Error />}
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
          {recreationsLoading && <Loading />}
          {recreationsError && <Error />}
          {recreations &&
            recreations.map((recreation) => (
              <RecreationCard
                key={recreation.key}
                name={recreation.name}
                photo={recreation.photo}
                headCountMin={recreation.headCountMin}
                headCountMax={recreation.headCountMax}
                isScrap={recreation.isScrap}
              />
            ))}

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
