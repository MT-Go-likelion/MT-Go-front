import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../../config/api';

// import COLOR from '../../constants/color';
import Heart from '../../assets/images/heart-gray.png';
import SelectHeart from '../../assets/images/Select_Heart.png';
import Star from '../../assets/images/star.png';
import useLodgingScrap from '../../hooks/queries/Lodging/useLodgingScrap';
// import { mobileSize } from '../../utils/MediaSize';

const BestLoContainer = styled.div`
  width: 317px;
  height: 100px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: space-between;
`;

const BackDiv = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 6px;
  background-image: ${(props) => `url(${props.$datasrc})`};
  background-size: cover;
  background-position: center;
`;

const LikeButton = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
  position: absolute;
  top: 75px;
  right: 5px;
`;

const Title = styled.div`
≈
`;

const Flexdirection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 5px;
`;

const Price = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%;
`;

const Score = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 180%;
`;

const BlueStar = styled.img`
  width: 19px;
  height: 19px;
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

  const { lodgingScrapMutation } = useLodgingScrap();

  const handlelikeClick = (e) => {
    e.stopPropagation();

    if (user) {
      setLiked((prevState) => !prevState);
      lodgingScrapMutation({
        isScrap: !liked,
        lodging: pk,
        token: user.token,
      });
    } else {
      navigate('/signin');
    }
  };

  const handleCardClick = () => {
    navigate(`/lodging/${pk}`, { state: pk });
  };

  return (
    <BestLoContainer onClick={handleCardClick}>
      <Flexdirection>
        <Title>{name}</Title>
        <Flex>
          <BlueStar src={Star} />
          <Score>{avgScore}</Score>
        </Flex>
        <Price>1박 {price} 원</Price>
      </Flexdirection>
      <BackDiv $datasrc={BASE_URL + mainPhoto}>
        <LikeButton src={liked ? SelectHeart : Heart} alt="Like" onClick={handlelikeClick} />
      </BackDiv>
    </BestLoContainer>
  );
};
export default BestlocationCard;
