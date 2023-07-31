import React from 'react';
import styled from 'styled-components';

import star from '../assets/images/star.png';
import heart from '../assets/images/heart.png';
import booking from '../assets/images/booking.png';
import COLOR from '../constants/color';

const LodgingLayout = styled.div``;

const HeaderContainer = styled.div`
  margin-bottom: 3rem;
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

const Star = styled.img`
  width: 2.3rem;
  height: 2.3rem;
`;

const Heart = styled.img`
  width: 3.75rem;
  height: 3.75rem;
`;

const Booking = styled.img`
  width: 3.75rem;
  height: 3.75rem;
`;

const ReviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`;

const ReviewText = styled.span`
  font-size: 1.5rem;
  color: ${COLOR.gray};
  padding-top: 1rem;
`;

const LodingDealingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

const ReservationBtn = styled.button`
  width: 11.25rem;
  height: 3.75rem;
  border-radius: 1rem;
  background: ${COLOR.primary.gradient};
  font-size: 1.5rem;
  font-weight: bold;
  color: ${COLOR.white};
`;

const ImageContainer = styled.div`
  width: 100%;
  background-color: ${COLOR.primary.blue};
  height: 25rem;
`;

// Content

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
`;

const ContentLeftContainer = styled.div`
  flex-basis: 70%;
`;

const ContentHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const AddressText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const PriceText = styled.span`
  font-size: 1.15rem;
  font-weight: bold;
  color: ${COLOR.gray};
`;

const UrlText = styled.span`
  color: ${COLOR.gray};
`;

const PhoneNumText = styled.span`
  color: ${COLOR.gray};
`;

const Calender = styled.div`
  width: 26.25rem;
  height: 25rem;
  background-color: ${COLOR.lightGray};
  flex-basis: 30%;
`;

const FacilitiesContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLOR.gray};
  border-radius: 1rem;
  padding: 1rem 4rem;
  margin-bottom: 3rem;
`;

const FacilitiesList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem;
`;

const FacilitiesItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FacilitiesImg = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: ${COLOR.primary.lightBlue};
  margin-bottom: 1rem;
`;

const FacilitiesText = styled.span``;

const InformationText = styled.span`
  line-height: 1.5;
`;

const CautionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
`;

const ContentSubTitleText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${COLOR.darkGray};
  margin-bottom: 0.5rem;
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CheckText = styled.span``;

const LodgingDetail = () => {
  return (
    <LodgingLayout>
      <HeaderContainer>
        <Header>
          <TitleText>TitleText</TitleText>
          <HeaderRight>
            <LodingDealingContainer>
              <ReviewContainer>
                <Star src={star} />
                <ReviewText>5.0</ReviewText>
              </ReviewContainer>
              <Heart src={heart} />
              <Booking src={booking} />
            </LodingDealingContainer>
            <ReservationBtn>예약하기</ReservationBtn>
          </HeaderRight>
        </Header>
        <ImageContainer>챱!</ImageContainer>
      </HeaderContainer>
      <ContentContainer>
        <ContentLeftContainer>
          <Header>
            <ContentHeaderLeft>
              <AddressText>Address</AddressText>
              <PriceText>1박 000,000,00원</PriceText>
              <UrlText>https://homepage.com//example</UrlText>
            </ContentHeaderLeft>
            <PhoneNumText>nn-nnnn-nnnn</PhoneNumText>
          </Header>
          <FacilitiesContainer>
            <FacilitiesList>
              <FacilitiesItem>
                <FacilitiesImg />
                <FacilitiesText>침실 4</FacilitiesText>
              </FacilitiesItem>
              <FacilitiesItem>
                <FacilitiesImg />
                <FacilitiesText>침실 4</FacilitiesText>
              </FacilitiesItem>
              <FacilitiesItem>
                <FacilitiesImg />
                <FacilitiesText>침실 4</FacilitiesText>
              </FacilitiesItem>
              <FacilitiesItem>
                <FacilitiesImg />
                <FacilitiesText>침실 4</FacilitiesText>
              </FacilitiesItem>
            </FacilitiesList>
          </FacilitiesContainer>
          <InformationText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
            quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros dolore eu feugiat
            nulla facilisis at vero eros
          </InformationText>
          <CautionContainer>
            <ContentSubTitleText>주의사항</ContentSubTitleText>
            <InformationText>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
              veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros
              dolore eu feugiat nulla facilisis at vero eros
            </InformationText>
          </CautionContainer>
          <>
            <ContentSubTitleText>체크인 / 체크아웃</ContentSubTitleText>
            <CheckBox>
              <CheckText>체크인: nnn</CheckText>
              <CheckText>체크아웃: nnn</CheckText>
            </CheckBox>
          </>
        </ContentLeftContainer>
        <Calender />
      </ContentContainer>
    </LodgingLayout>
  );
};

export default LodgingDetail;
