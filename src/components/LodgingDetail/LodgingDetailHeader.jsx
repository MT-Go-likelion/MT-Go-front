import styled from 'styled-components';
import React from 'react';
import heart from '../../assets/images/heart-gradient.png';
import booking from '../../assets/images/booking.png';
import ImageSwiper from '../ImageSwiper/ImageSwiper';
import COLOR from '../../constants/color';
import RatingContainer from '../Common/Review/RatingContainer';

const HeaderContainer = styled.div`
  margin-bottom: 3rem;
  margin-top: 4rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const TitleText = styled.span`
  font-size: 2rem;
  font-weight: 900;
`;

const Heart = styled.img`
  width: 3.75rem;
  height: 3.75rem;
`;

const Booking = styled.img`
  width: 3.75rem;
  height: 3.75rem;
`;

const LodingDealingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

const ReservationBtn = styled.button`
  width: ${(props) => `${props.width}rem`};
  height: 3.75rem;
  border-radius: 1.5rem;
  background: ${COLOR.gradient};
  font-size: 1.5rem;
  font-weight: bold;
  color: ${COLOR.white};
`;

const LodgingDetailHeader = ({ name, mainPhoto, photos }) => {
  return (
    <HeaderContainer>
      <Header>
        <TitleText>{name}</TitleText>
        <HeaderRight>
          <LodingDealingContainer>
            <RatingContainer score="4.9" />
            <Heart src={heart} />
            <Booking src={booking} />
          </LodingDealingContainer>
          <ReservationBtn width={11.25} height={3.75}>
            예약하기
          </ReservationBtn>
        </HeaderRight>
      </Header>
      <ImageSwiper mainPhoto={mainPhoto} photos={photos} />
    </HeaderContainer>
  );
};

export default LodgingDetailHeader;
