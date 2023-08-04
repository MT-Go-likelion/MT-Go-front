import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

/**
 * 카드 컴포넌트 설명
 * @param {number} pk 카드 id
 * @param {string} name 카드 title
 * @param {number} price 가격
 * @param {any} mainPhoto 사진 url
 * @param {number} avg_score  별점
 */
// const BestlocationCard = ({pk, name, place, price, headCount, mainPhoto}) => {
const BestlocationCard = ({ pk, name, price, mainPhoto, avg_score }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handlelikeClick = () => {
    setLiked((prevState) => !prevState);
  };

  const handleCardClick = () => {
    navigate(`#${pk}`);
  };

  return (
    <BestLoContainer onClick={handleCardClick}>
      <BackImg dataSrc={mainPhoto}>
        <LikeButton src={liked ? SelectHeart : Heart} alt="Like" onClick={handlelikeClick} />
      </BackImg>
      <Title>{name}</Title>
      <Flexdirection>
        <Price>{price} 원</Price>
        <Flex>
          <BlueStar src={Star} />
          <Score>{avg_score}</Score>
        </Flex>
      </Flexdirection>
    </BestLoContainer>
  );
};
export default BestlocationCard;
