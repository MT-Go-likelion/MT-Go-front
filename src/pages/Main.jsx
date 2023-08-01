import React from 'react';
import styled from 'styled-components';
import COLOR from '../constants/color';

import MainBanner from '../assets/images/banner-main.png';
import BestlocationCard from '../components/Card/BestlocationCard';
import BagCard from '../components/Card/BagCard';
import RecreationCard from '../components/Card/RecreationCard';

// import COLOR from '../constants/color';

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 4rem;
`;

// 배너 - 메인 img
const Banner = styled.div`
  width: 100%;
  position: relative; /* 추가: Banner를 상대적으로 배치 */
  margin-bottom: 10px; /* 추가: Banner 아래로 10px 마진 설정 */
`;

const BannerImg = styled.img`
  width: 100%;
`;

// 배너 - 리스트 3개
// const Tmpul = styled.ul`
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 2rem;
//   flex-direction: row;
//   justify-content: center;
//   position: absolute;
//   top: 185px;
// `;

// const TmpLi = styled.li`
//   width: 10rem;
//   height: 12rem;
//   background-color: ${COLOR.black};ss
//   opacity: 0.5%;
// `;

// 전체 적용 마진
const ContentLayout = styled.div`
  margin: 0 6rem;
  padding: 0 3rem;
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
`;

// 추천 단체숙소
const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin: 1rem 0;
`;

const SubTitle = styled.span`
  font-size: 20px;
  color: ${COLOR.gray};
`;

const More = styled.a`
  font-size: 16px;
  color: ${COLOR.gray};
  margin-right: 4rem;
`;

const Divstyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const Main = () => {
  return (
    <div>
      <MainLayout>
        <Banner>
          <BannerImg src={MainBanner} />
        </Banner>
        {/* <Tmpul>
          <TmpLi>리스트1</TmpLi>
          <TmpLi>리스트1</TmpLi>
          <TmpLi>리스트1</TmpLi>
        </Tmpul> */}
      </MainLayout>

      <ContentLayout>
        <Title>추천 단체 숙소</Title>
        <Divstyled>
          <SubTitle>마음에 드는 숙박 장소를 골라보세요.</SubTitle>
          <More>더보기</More>
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
          <SubTitle>파트너들과 함께 장바구니에 담을 물품들을 골라보세요.</SubTitle>
          <More>더보기</More>
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
          <SubTitle>MT의 꽃, 레크레이션! 만약 무엇을 할지 모르겠다면?</SubTitle>
          <More>더보기</More>
        </Divstyled>
        <Flexdiv>
          <RecreationCard />
          <RecreationCard />
          <RecreationCard />
          <RecreationCard />
          <RecreationCard />
        </Flexdiv>
      </ContentLayout>
    </div>
  );
};

export default Main;
