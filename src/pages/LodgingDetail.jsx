import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  LodgingDetailHeader,
  LodgingDetailContent,
  LodgingDetailReview,
  LodgingDetailPricetable,
} from '../components/LodgingDetail/index';
import useLodgingDetail from '../hooks/queries/Lodging/useLodgingDetail';
import RatingContainer from '../components/Common/Review/RatingContainer';

import ErrorPage from './Error';
import Loading from './Loading';
import LodgingMap from '../components/Map/LodgingMap';
import COLOR from '../constants/color';
import { mobileSize } from '../utils/MediaSize';

const mediaSize = 1150;

const LodgingLayout = styled.div`
  max-width: 1280px;
  margin: auto;
  height: 100%;

  padding: 0;
`;
const Container = styled.div`
  margin: 0 7rem;
  transition: all 0.5s;
  @media (max-width: ${mediaSize}px) {
    margin: 0 9rem 0 7rem;
  }
  @media (max-width: ${mobileSize}px) {
    margin: 0;
  }
`;

const LodgingContent = styled.div`
  padding: 1rem 1.5rem;
`;

const Title = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
`;

const Address = styled.div`
  color: ${COLOR.gray};
  font-size: 14px;
  font-style: normal;

  line-height: 180%;
  margin-bottom: 5px;
`;

const LodgingDetailImg = styled.img`
  width: 100%;
  height: 9.6rem;
  border-radius: 8px;
  color: ${COLOR.lightGray};
  background-color: ${COLOR.primary.blue};
`;

const RowFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ETC = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  color: ${COLOR.gray};
`;

const Peoplecount = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
`;

// 음

const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 32px 32px 0px 0px;
  background: ${COLOR.white};
  padding: 3rem 2rem 7rem 2rem;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  animation: ${(props) => (props.isLifted ? liftAnimation : 'none')} 0.4s ease;
`;

const ButtonDiv = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 32px;
  transition: transform 0.3s ease;
  animation: ${(props) => (props.isLifted ? liftAnimation : 'none')} 0.4s ease;
`;
const SubButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  line-height: 160%;
  width: 100%;
  text-align: center;
  border-radius: 12px 12px 0px 0px;
  background: ${(props) => (props.isActive ? COLOR.white : COLOR.lightGray)};
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
`;

const liftAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// 시설
const DetailTitle = styled.div`
  font-size: 14px;
  color: ${COLOR.darkGray};
  font-weight: 700;
  line-height: 180%;
  margin-bottom: 0.2rem;
`;

const DetailContent = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FacilitiesContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLOR.gray};
  border-radius: 1rem;

  margin: 0.5rem 0 1rem 0;
`;

const FacilitiesList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding: 1rem 1rem;
`;

const FacilitiesItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FacilitiesText = styled.span``;

const LodgingDetail = () => {
  const { lodgingId } = useParams();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    lodgingDetailQuery: { isLoading, error, data: lodgingDetail },
  } = useLodgingDetail(lodgingId, user ? user.token : '');

  // 모바일 관련
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [activeButton, setActiveButton] = useState('about');
  const [isLifted, setIsLifted] = useState(false);

  return (
    <LodgingLayout>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {lodgingDetail && (
        <Container>
          {isMobile ? (
            <>
              <LodgingDetailHeader lodging={lodgingDetail} />
              <LodgingContent>
                <Title>{lodgingDetail.name}</Title>
                <Address>{lodgingDetail.address}</Address>
                <LodgingDetailImg src={lodgingDetail.mainPhoto} />
                <RowFlexDiv>
                  <div>
                    <ETC>{lodgingDetail.phoneNumber}</ETC>
                    <ETC>{lodgingDetail.homePageURL}</ETC>
                  </div>
                  <div>
                    <Peoplecount>수용인원 : {lodgingDetail.headCount}명</Peoplecount>
                    <RatingContainer score="5.0" />
                  </div>
                </RowFlexDiv>
              </LodgingContent>
              <ButtonDiv isLifted={isLifted}>
                <SubButton
                  onClick={() => {
                    setActiveButton('about');
                    setIsLifted(true);
                    setTimeout(() => {
                      setIsLifted(false);
                    }, 300);
                  }}
                  isActive={activeButton === 'about'}
                >
                  시설
                </SubButton>
                <SubButton
                  onClick={() => {
                    setActiveButton('map');
                    setIsLifted(true);
                    setTimeout(() => {
                      setIsLifted(false);
                    }, 300);
                  }}
                  isActive={activeButton === 'map'}
                >
                  지도
                </SubButton>
                <SubButton
                  onClick={() => {
                    setActiveButton('review');
                    setIsLifted(true);
                    setTimeout(() => {
                      setIsLifted(false);
                    }, 300);
                  }}
                  isActive={activeButton === 'review'}
                >
                  후기
                </SubButton>
              </ButtonDiv>
              <ContentDiv isLifted={isLifted}>
                {activeButton === 'about' && (
                  <>
                    <div>
                      <DetailTitle>숙박요금</DetailTitle>
                      <LodgingDetailPricetable
                        peakWeekendPrice={lodgingDetail.peakWeekendPrice}
                        peakWeekdayPrice={lodgingDetail.peakWeekdayPrice}
                        lowWeekendPrice={lodgingDetail.lowWeekendPrice}
                        lowWeekdayPrice={lodgingDetail.lowWeekdayPrice}
                      />
                    </div>
                    <FlexDiv>
                      <div>
                        <DetailTitle>시설</DetailTitle>
                        <FacilitiesContainer>
                          <FacilitiesList>
                            {lodgingDetail.amenities &&
                              lodgingDetail.amenities.split(',').map((amenity) => (
                                <FacilitiesItem key={uuid()}>
                                  <FacilitiesText>{amenity}</FacilitiesText>
                                </FacilitiesItem>
                              ))}
                          </FacilitiesList>
                        </FacilitiesContainer>
                        <DetailContent>{lodgingDetail.content}</DetailContent>
                      </div>
                      <div>
                        <DetailTitle>주의사항</DetailTitle>
                        <DetailContent>{lodgingDetail.precaution}</DetailContent>
                      </div>
                      <div>
                        <DetailTitle>체크인/체크아웃</DetailTitle>
                        <DetailContent>체크인: {lodgingDetail.checkInTime}</DetailContent>
                        <DetailContent>체크아웃: {lodgingDetail.checkOutTime}</DetailContent>
                      </div>
                    </FlexDiv>
                  </>
                )}
                {activeButton === 'map' && (
                  <div>
                    <LodgingMap />
                  </div>
                )}
                {activeButton === 'review' && <LodgingDetailReview lodging={lodgingDetail} />}
              </ContentDiv>
            </>
          ) : (
            <>
              <LodgingDetailHeader lodging={lodgingDetail} />
              <LodgingDetailContent lodging={lodgingDetail} />
              <LodgingDetailReview lodging={lodgingDetail} />
            </>
          )}
        </Container>
      )}
    </LodgingLayout>
  );
};

export default LodgingDetail;
