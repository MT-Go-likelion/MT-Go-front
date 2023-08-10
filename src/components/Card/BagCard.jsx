import React, { useState } from 'react';
import styled from 'styled-components';

import COLOR from '../../constants/color';
import bag from '../../assets/images/bag-fill.png';
import Selectbag from '../../assets/images/Select_Bag.png';

const mobileSize = 450;
const BestLoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const BackImg = styled.div`
  position: relative;
  width: 160px;
  height: 240px;
  background-color: ${COLOR.blue};
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
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0 8px 0;
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
const BagCard = () => {
  const [save, setSave] = useState(false);

  const handleSaveClick = () => {
    setSave((prevState) => !prevState);
  };

  return (
    <BestLoContainer>
      <BackImg>
        <Bagbtn src={save ? Selectbag : bag} alt="Bag" onClick={handleSaveClick} />
      </BackImg>
      <Title>title</Title>
    </BestLoContainer>
  );
};
export default BagCard;
