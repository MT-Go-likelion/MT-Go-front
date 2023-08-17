import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import COLOR from '../../constants/color';
import bag from '../../assets/images/bag-fill.png';

const mobileSize = 450;
const BestLoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackImg = styled.div`
  position: relative;
  width: 160px;
  height: 240px;
  background-image: ${(props) => `url(${props.dataSrc})`};
  background-size: cover;
  border-radius: 20px;
  @media (max-width: ${mobileSize}px) {
    width: 120px;
    height: 120px;
    border-radius: 6px;
  }
`;

const Bagbtn = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  @media (max-width: ${mobileSize}px) {
    width: 18px;
    height: 18px;
    top: 95px;
    right: 5px;
  }
`;
const Title = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  margin: 10px 0 8px 0;
  display: flex;
  justify-content: center;
  @media (max-width: ${mobileSize}px) {
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    margin: 2px 0 5px 0;
    color: ${COLOR.gary};
  }
`;

// Bag 장바구니
const BagCard = ({ options }) => {
  const navigate = useNavigate();
  const onClickCard = () => {
    navigate('/shopping');
  };

  return (
    <BestLoContainer>
      <BackImg dataSrc={options && options.img}>
        <Bagbtn src={bag} alt="Bag" onClick={onClickCard} />
      </BackImg>
      <Title>{options && options.name}</Title>
    </BestLoContainer>
  );
};
export default BagCard;
