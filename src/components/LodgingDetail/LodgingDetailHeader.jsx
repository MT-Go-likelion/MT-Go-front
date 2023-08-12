import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heart from '../../assets/images/heart-gradient.png';
import booking from '../../assets/images/booking.png';
import ImageSwiper from '../ImageSwiper/ImageSwiper';
import COLOR from '../../constants/color';
import RatingContainer from '../Common/Review/RatingContainer';
import LodingPopup from '../Popup/Lodging/LodingPopup';
import useLodging from '../../hooks/queries/Lodging/useLodging';

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
  cursor: pointer;
`;

const Booking = styled.img`
  width: 3.75rem;
  height: 3.75rem;
  cursor: pointer;
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

const LodgingDetailHeader = ({ pk, name, mainPhoto, photos }) => {
  const [IspopupVisivle, setIspopupVisivle] = useState(false);
  const navigate = useNavigate();
  const { lodgingDeleteMutation } = useLodging();

  const onClickDeleteBtn = () => {
    lodgingDeleteMutation(pk);
    navigate('/');
  };

  const handleTeamBtnClick = (e) => {
    e.stopPropagation();
    setIspopupVisivle(true);
  };

  const handlePopupClose = () => {
    setIspopupVisivle(false);
  };

  return (
    <HeaderContainer>
      <Header>
        <TitleText>{name}</TitleText>
        <HeaderRight>
          <LodingDealingContainer>
            <RatingContainer score="4.9" />
            <Heart src={heart} />
            <Booking src={booking} onClick={handleTeamBtnClick} />
          </LodingDealingContainer>
          <ReservationBtn width={11.25} height={3.75} onClick={onClickDeleteBtn}>
            삭제하기
          </ReservationBtn>
        </HeaderRight>
      </Header>
      <ImageSwiper mainPhoto={mainPhoto} photos={photos} />
      {IspopupVisivle && <LodingPopup pk={pk} handlePopupClose={handlePopupClose} />}
    </HeaderContainer>
  );
};

export default LodgingDetailHeader;
