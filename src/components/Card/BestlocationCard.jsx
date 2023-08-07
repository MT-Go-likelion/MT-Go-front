import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../../config/api';

import COLOR from '../../constants/color';
import Heart from '../../assets/images/heart-gray.png';
import SelectHeart from '../../assets/images/Select_Heart.png';
import Star from '../../assets/images/star.png';
import useLoding from '../../hooks/queries/Lodging/useLodging';

const BestLoContainer = styled.div`
  width: 240px;
  height: 400px;
  cursor: pointer;
`;

const BackDiv = styled.div`
  position: relative;
  width: 240px;
  height: 320px;
  background-color: ${COLOR.blue};
  border-radius: 20px;
  background-image: ${(props) => `url(${props.dataSrc})`}; // Use props to set the background image
  background-size: cover;
  background-position: center;
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
 * @param {number} avgScore  별점
 * @param {boolean} isScrap 스크랩 여부
 */

const BestlocationCard = ({ pk, name, price, mainPhoto, avgScore, isScrap }) => {
  const [liked, setLiked] = useState(isScrap);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const { scrapMutation } = useLoding();

  const handlelikeClick = (e) => {
    e.stopPropagation();

    if (user) {
      setLiked((prevState) => !prevState);
      scrapMutation({
        isScrap: !liked,
        lodging: pk,
        token: user.token,
      });
    } else {
      navigate('/signin');
    }
  };

  // 상세페이지 링크 걸면 됨. (카드누르면 링크 바뀌게만 해둔 상태)
  const handleCardClick = () => {
    navigate(`/lodging/${pk}`, { state: pk });
  };

  return (
    <BestLoContainer onClick={handleCardClick}>
      <BackDiv dataSrc={BASE_URL + mainPhoto}>
        <LikeButton src={liked ? SelectHeart : Heart} alt="Like" onClick={handlelikeClick} />
      </BackDiv>
      <Title>{name}</Title>
      <Flexdirection>
        <Price>{price} 원</Price>
        <Flex>
          <BlueStar src={Star} />
          <Score>{avgScore}</Score>
        </Flex>
      </Flexdirection>
    </BestLoContainer>
  );
};
export default BestlocationCard;
