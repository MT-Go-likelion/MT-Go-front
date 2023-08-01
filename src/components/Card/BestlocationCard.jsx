import React, { useState } from 'react';
import styled from 'styled-components';

import COLOR from '../../constants/color';
import Heart from '../../assets/images/heart-gray.png';
import SelectHeart from '../../assets/images/Select_Heart.png';
import Star from '../../assets/images/star.png';

const BestLoContainer = styled.div`
  width: 240px;
  height: 400px;
`;

const BackImg = styled.div`
  position: relative;
  width: 240px;
  height: 320px;
  background-color: ${COLOR.blue};
  border-radius: 20px;
`;

const LikeButton = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0 8px 0;
`;

const Flexdirection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Price = styled.div`
  font-size: 20px;
  color: ${COLOR.lightGray};
`;

const Score = styled.div`
  font-size: 16px;
`;

const BlueStar = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 2px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

// const Bestlocation = ({ title, price , score}) => {
//   <BestLoContainer>
//     <BackImg></BackImg>
//     <Flex>
//       <Title>{title}</Title>
//       <div>
//         <Price>{price}</Price>
//         <Score>{score}</Score>
//       </div>
//     </Flex>
//   </BestLoContainer>
// }

// {{만약 하트 눌렀다면 }} => 이미지 변경 (Sellectheart로)
const BestlocationCard = () => {
  const [liked, setLiked] = useState(false);

  const handlelikeClick = () => {
    setLiked((prevState) => !prevState);
  };

  return (
    <BestLoContainer>
      <BackImg>
        <LikeButton src={liked ? SelectHeart : Heart} alt="Like" onClick={handlelikeClick} />
      </BackImg>
      <Title>Title</Title>
      <Flexdirection>
        <Price>000,000원</Price>
        <Flex>
          <BlueStar src={Star} />
          <Score>5.0</Score>
        </Flex>
      </Flexdirection>
    </BestLoContainer>
  );
};
export default BestlocationCard;
