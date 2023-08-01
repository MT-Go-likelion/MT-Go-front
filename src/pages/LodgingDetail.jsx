import React from 'react';
import styled from 'styled-components';

import heart from '../assets/images/heart.png';
import booking from '../assets/images/booking.png';
import COLOR from '../constants/color';
import RatingContainer from '../components/Common/Review/RatingContainer';
import HorizonLine from '../components/Common/Line/HorizonLine';
import ImageSwiper from '../components/ImageSwiper/ImageSwiper';

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
  width: 11.25rem;
  height: 3.75rem;
  border-radius: 1rem;
  background: ${COLOR.primary.gradient};
  font-size: 1.5rem;
  font-weight: bold;
  color: ${COLOR.white};
`;

// const ImageContainer = styled.div`
//   width: 100%;
//   background-color: ${COLOR.primary.blue};
//   height: 25rem;
// `;

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

// Review

const ReviewContainer = styled.div``;

const ReviewHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 2.3rem;
  margin-bottom: 2rem;
`;

const ReviewCntText = styled.span`
  font-size: 1.5rem;
`;

const ReviewContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ReviewWritingContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ReviewTextarea = styled.textarea`
  width: 36.5rem;
  height: 15rem;
`;

const ReviewWritingRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.5rem;
`;

const TmpBox = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: ${COLOR.primary.lightBlue};
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ReviewItem = styled.li`
  display: flex;
  gap: 2rem;
`;

const ReviewItemLeft = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: column;
`;

const UserText = styled.span``;

const DateText = styled.span`
  font-size: 0.75rem;
  color: ${COLOR.lightGray};
`;

const ReviewText = styled.span`
  flex-basis: 70%;
  line-height: 1.7;
`;

const ReviewItemRight = styled.div`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.5rem;
`;

const LodgingDetail = () => {
  return (
    <LodgingLayout>
      {/* Header */}
      <HeaderContainer>
        <Header>
          <TitleText>TitleText</TitleText>
          <HeaderRight>
            <LodingDealingContainer>
              <RatingContainer score="4.9" />
              <Heart src={heart} />
              <Booking src={booking} />
            </LodingDealingContainer>
            <ReservationBtn>예약하기</ReservationBtn>
          </HeaderRight>
        </Header>
        <ImageSwiper />
        {/* <ImageContainer>챱!</ImageContainer> */}
      </HeaderContainer>

      {/* Content */}
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

      {/* Review */}
      <HorizonLine mt={5} mb={2} color={COLOR.primary.blue} />
      <ReviewContainer>
        <ReviewHeader>
          <RatingContainer score="5.0" />
          <ReviewCntText>후기 3433개</ReviewCntText>
        </ReviewHeader>
        <ReviewContentContainer>
          <ReviewWritingContainer>
            <ReviewTextarea placeholder="후기를 입력하세요" />
            <ReviewWritingRight>
              <RatingContainer score="5.0" />
              <TmpBox />
            </ReviewWritingRight>
          </ReviewWritingContainer>
          <ReviewList>
            <ReviewItem>
              <ReviewItemLeft>
                <UserText>Name</UserText>
                <DateText>yyyy년 mm월 dd일</DateText>
              </ReviewItemLeft>
              <ReviewText>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis{' '}
              </ReviewText>
              <ReviewItemRight>
                <RatingContainer score="5.0" />
                <TmpBox />
              </ReviewItemRight>
            </ReviewItem>
            <ReviewItem>
              <ReviewItemLeft>
                <UserText>Name</UserText>
                <DateText>yyyy년 mm월 dd일</DateText>
              </ReviewItemLeft>
              <ReviewText>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis{' '}
              </ReviewText>
              <ReviewItemRight>
                <RatingContainer score="5.0" />
                <TmpBox />
              </ReviewItemRight>
            </ReviewItem>
            <ReviewItem>
              <ReviewItemLeft>
                <UserText>Name</UserText>
                <DateText>yyyy년 mm월 dd일</DateText>
              </ReviewItemLeft>
              <ReviewText>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis{' '}
              </ReviewText>
              <ReviewItemRight>
                <RatingContainer score="5.0" />
                <TmpBox />
              </ReviewItemRight>
            </ReviewItem>
            <ReviewItem>
              <ReviewItemLeft>
                <UserText>Name</UserText>
                <DateText>yyyy년 mm월 dd일</DateText>
              </ReviewItemLeft>
              <ReviewText>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis{' '}
              </ReviewText>
              <ReviewItemRight>
                <RatingContainer score="5.0" />
                <TmpBox />
              </ReviewItemRight>
            </ReviewItem>
          </ReviewList>
        </ReviewContentContainer>
      </ReviewContainer>
    </LodgingLayout>
  );
};

export default LodgingDetail;
