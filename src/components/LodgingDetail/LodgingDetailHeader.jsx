import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heart from '../../assets/images/heart-gradient.png';
import booking from '../../assets/images/booking.png';
import ImageSwiper from '../ImageSwiper/ImageSwiper';
import COLOR from '../../constants/color';
import RatingContainer from '../Common/Review/RatingContainer';
import LodingPopup from '../Popup/Lodging/LodingPopup';
import useLodging from '../../hooks/queries/Lodging/useLodging';
import Backimg from '../../assets/images/chevron-left.png';
import LodgingDetailMobileLike from '../../assets/images/LodgingDetailMobileLike.png';
import LodgingDetailMobileScrap from '../../assets/images/LodgingDetailMobileScrap.png';

import { mobileSize } from '../../utils/MediaSize';

const HeaderContainer = styled.div`
  margin-bottom: 3rem;
  margin-top: 4rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: ${mobileSize}px) {
    height: 4.5rem;
    background-color: ${COLOR.white};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    margin-bottom: 1rem;
    align-items: center;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  }
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

// mobile 관련

const Back = styled.img`
  width: 32px;
  height: 32px;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const TeamButton = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50px;
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

  return (
    <div>
      {isMobile ? (
        <Header>
          <Back src={Backimg} onClick={() => navigate('/Lodging')} />
          <FlexDiv>
            <TeamButton src={LodgingDetailMobileScrap} onClick={handleTeamBtnClick} />
            <TeamButton src={LodgingDetailMobileLike} />
          </FlexDiv>
        </Header>
      ) : (
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
      )}
    </div>
  );
};

export default LodgingDetailHeader;
