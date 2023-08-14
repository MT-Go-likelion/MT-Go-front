import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../../config/api';

import COLOR from '../../constants/color';
import Heart from '../../assets/images/heart-gray.png';
import SelectHeart from '../../assets/images/Select_Heart.png';
import Star from '../../assets/images/star.png';
import useLodgingScrap from '../../hooks/queries/Lodging/useLodgingScrap';
import { mobileSize } from '../../utils/MediaSize';

const BestLoContainer = styled.div`
  width: 240px;
  height: 400px;
  cursor: pointer;
  @media (max-width: ${mobileSize}px) {
    width: 120px;
    height: 159px;
  }
`;

const BackDiv = styled.div`
  position: relative;
  width: 240px;
  height: 320px;
  background-image: ${(props) => `url(${props.dataSrc})`};
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  @media (max-width: ${mobileSize}px) {
    width: 120px;
    height: 120px;
    border-radius: 6px;
  }
`;
// background-image: ${(props) => `url(${props.dataSrc})`};
// background-color: ${COLOR.blue};
//
// background-position: center;

const LikeButton = styled.img`
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
  }
`;

const Flexdirection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: ${mobileSize}px) {
  }
`;

const Price = styled.div`
  font-size: 20px;
  color: ${COLOR.lightGray};
  @media (max-width: ${mobileSize}px) {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
  }
`;

const Score = styled.div`
  font-size: 16px;
  @media (max-width: ${mobileSize}px) {
  }
`;

const BlueStar = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 2px;
  @media (max-width: ${mobileSize}px) {
    width: 19px;
    height: 19px;
  }
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

// 모바일

const BestlocationCard = ({ pk, name, price, mainPhoto, avgScore, isScrap }) => {
  const [liked, setLiked] = useState(isScrap);
  const [isMobile, setIsMobile] = useState(false);
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

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      {isMobile ? (
        <BestLoContainer onClick={handleCardClick}>
          <Flexdirection>
            <Title>{name}</Title>
            <Flex>
              <BlueStar src={Star} />
              <Score>{avgScore}</Score>
            </Flex>
            <Price>1박 {price} 원</Price>
          </Flexdirection>
          <BackDiv dataSrc={BASE_URL + mainPhoto}>
            <LikeButton src={liked ? SelectHeart : Heart} alt="Like" onClick={handlelikeClick} />
          </BackDiv>
        </BestLoContainer>
      ) : (
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
      )}
    </div>
  );
};
export default BestlocationCard;
