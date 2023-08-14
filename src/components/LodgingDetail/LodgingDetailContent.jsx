import React from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import COLOR from '../../constants/color';
import LodgingMap from '../Map/LodgingMap';

const LodgingDetailContent = ({ lodging }) => {
  const {
    address,
    homePageURL,
    amenities,
    phoneNumber,
    headCount,
    content,
    precaution,
    checkInTime,
    checkOutTime,
    place,
  } = lodging;

  const navigate = useNavigate();

  const onClickUpdateBtn = () => {
    navigate('/lodging/update', { state: { lodging } });
  };

  return (
    <>
      <ContentContainer>
        <ContentLeftContainer>
          <Header>
            <ContentHeaderLeft>
              <AddressText>{address}</AddressText>
              <PriceText>{place}</PriceText>
              <UrlText>{homePageURL}</UrlText>
            </ContentHeaderLeft>
            <ContentHeaderRight>
              <PhoneNumText>{phoneNumber}</PhoneNumText>
              <CapacityText>{headCount}</CapacityText>
            </ContentHeaderRight>
          </Header>
          <FacilitiesContainer>
            <FacilitiesList>
              {amenities &&
                amenities.split(',').map((amenity) => (
                  <FacilitiesItem key={uuid()}>
                    <FacilitiesText>{amenity}</FacilitiesText>
                  </FacilitiesItem>
                ))}
            </FacilitiesList>
          </FacilitiesContainer>
          <InformationText>{content}</InformationText>
          <CautionContainer>
            <ContentSubTitleText>주의사항</ContentSubTitleText>
            <InformationText>{precaution}</InformationText>
          </CautionContainer>
          <>
            <ContentSubTitleText>체크인 / 체크아웃</ContentSubTitleText>
            <CheckBox>
              <CheckText>체크인: {checkInTime}</CheckText>
              <CheckText>체크아웃: {checkOutTime}</CheckText>
            </CheckBox>
          </>
        </ContentLeftContainer>
        <CalenderBox />
      </ContentContainer>
      <ContentBottomContainer>
        <LodgingMap />
        <ReservationBtn width={15} height={5.6} onClick={onClickUpdateBtn}>
          수정하기
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

const CalenderBox = styled.div`
  width: 26.25rem;
  max-width: 100%;
  height: 25rem;
  flex-basis: 30%;
  background-color: ${COLOR.primary.lightBlue};
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
