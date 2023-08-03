import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';
import LodgingMap from '../Map/LodgingMap';

const LodgingDetailContent = () => {
  return (
    <>
      <ContentContainer>
        <ContentLeftContainer>
          <Header>
            <ContentHeaderLeft>
              <AddressText>Address</AddressText>
              <PriceText>1박 000,000,00원</PriceText>
              <UrlText>https://homepage.com//example</UrlText>
            </ContentHeaderLeft>
            <ContentHeaderRight>
              <PhoneNumText>nn-nnnn-nnnn</PhoneNumText>
              <CapacityText>수용인원: NN</CapacityText>
            </ContentHeaderRight>
          </Header>
          <FacilitiesContainer>
            {/* 추후에 API 연결하면 map 함수로 처리 */}
            <FacilitiesList>
              <FacilitiesItem>
                <FacilitiesText>침실 4</FacilitiesText>
              </FacilitiesItem>
              <FacilitiesItem>
                <FacilitiesText>침실 4</FacilitiesText>
              </FacilitiesItem>
              <FacilitiesItem>
                <FacilitiesText>침실 4</FacilitiesText>
              </FacilitiesItem>
              <FacilitiesItem>
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
      <ContentBottomContainer>
        <LodgingMap />
        <ReservationBtn width={15} height={5.6}>
          예약하기
        </ReservationBtn>
      </ContentBottomContainer>
    </>
  );
};

export default LodgingDetailContent;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

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

const ContentHeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const PhoneNumText = styled.span`
  color: ${COLOR.gray};
`;

const CapacityText = styled.span`
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
  padding: 1rem 2rem;
`;

const FacilitiesItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const ContentBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 5rem;
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
