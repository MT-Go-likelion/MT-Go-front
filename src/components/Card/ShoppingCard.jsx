import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import COLOR from '../../constants/color';
import { mobileSize } from '../../utils/MediaSize';
import TagPopup from '../Popup/Shopping/TagPopup';
import { formatPrice } from '../../utils/formatPrice';

const BestLoContainer = styled.div`
  width: 240px;

  padding: 19px 20px;
  border-radius: 16px;
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: ${mobileSize}px) {
    width: 110px;
    height: 140px;
    padding: 0;

    &:hover {
      box-shadow: none;
    }
  }
`;

const BackImg = styled.div`
  position: relative;
  width: 200px;
  height: 180px;
  border-radius: 20px;
  background-image: ${(props) => `url(${props.$datasrc})`};
  background-size: cover;
  margin: 0;
  @media (max-width: ${mobileSize}px) {
    width: 110px;
    height: 99px;
    border-radius: 8px;
  }
`;

const FlexDiv = styled.div`
  margin-top: 9px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  @media (max-width: ${mobileSize}px) {
    gap: 0px;
  }
`;

const Name = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  color: var(--unnamed, #888);
  @media (max-width: ${mobileSize}px) {
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
  }
`;

const Price = styled.div`
  color: var(--unnamed, #333);

  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  @media (max-width: ${mobileSize}px) {
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 160%;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Slide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 112px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--3, #bce7ff);
  background: #f4f4f4;
`;

const Amount = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const IncrementleftButton = styled.button`
  background: ${COLOR.white};
  border-radius: 8px 0px 0px 8px;
  width: 27px;
  height: 26px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  color: ${COLOR.primary.blue};
`;
const IncrementrightButton = styled.button`
  background: ${COLOR.white};
  border-radius: 0px 8px 8px 0px;
  width: 27px;
  height: 26px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  color: ${COLOR.primary.blue};
`;

const Shopping = styled.button`
  width: 80px;
  height: 28px;
  padding: 5px;
  border-radius: 8px;
  background: var(--1, #4987ff);
  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

const ShoppingCard = ({ name, price, onCardClick, img }) => {
  const [amount, setAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const [IspopupVisivle, setIspopupVisivle] = useState(false);

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const handleDecrement = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const setCartState = () => {
    onCardClick(name, price, amount);
    setAmount(0);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };

  const HandlePopup = () => {
    setIspopupVisivle(true);
  };

  const handlePopupClose = () => {
    setIspopupVisivle(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {!isMobile ? (
        <BestLoContainer>
          <BackImg $datasrc={img} />
          <FlexDiv>
            <Name>{name}</Name>
            <Price>{formatPrice(price)}원</Price>
            <Div>
              <Slide>
                <IncrementleftButton onClick={handleDecrement}>-</IncrementleftButton>
                <Amount>{amount}</Amount>
                <IncrementrightButton onClick={handleIncrement}>+</IncrementrightButton>
              </Slide>
              <Shopping onClick={setCartState}>담기</Shopping>
            </Div>
          </FlexDiv>
        </BestLoContainer>
      ) : (
        <BestLoContainer onClick={HandlePopup}>
          <BackImg $datasrc={img} />
          <FlexDiv>
            <Name>{name}</Name>
            <Price>{formatPrice(price)}원</Price>
          </FlexDiv>
        </BestLoContainer>
      )}
      {IspopupVisivle && (
        <TagPopup
          isVisible={IspopupVisivle}
          onClose={handlePopupClose}
          onComplete={(item, amount, price) => {
            onCardClick(item, amount, price);
            setIspopupVisivle(false);
          }}
          name={name}
        />
      )}
    </div>
  );
};
export default ShoppingCard;
