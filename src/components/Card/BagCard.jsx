import React, { useState } from 'react';
import styled from 'styled-components';

import COLOR from '../../constants/color';
import bag from '../../assets/images/bag-fill.png';
import Selectbag from '../../assets/images/Select_Bag.png';

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
`;

const Bagbtn = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
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
    </BestLoContainer>
  );
};
export default BagCard;
