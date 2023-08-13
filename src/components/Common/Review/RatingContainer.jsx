import React from 'react';
import styled from 'styled-components';

import COLOR from '../../../constants/color';
import star from '../../../assets/images/star.png';
import { mobileSize } from '../../../utils/MediaSize';

const ReviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  @media (max-width: ${mobileSize}px) {
  }
`;

const Star = styled.img`
  width: 2.3rem;
  height: 2.3rem;
  @media (max-width: ${mobileSize}px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ReviewText = styled.span`
  font-size: 1.5rem;
  color: ${COLOR.gray};
  padding-top: 1rem;
  @media (max-width: ${mobileSize}px) {
    font-size: 1rem;
    padding-top: 5px;
  }
`;

const RatingContainer = ({ score }) => {
  return (
    <ReviewContainer>
      <Star src={star} />
      <ReviewText>{score}</ReviewText>
    </ReviewContainer>
  );
};

export default RatingContainer;
