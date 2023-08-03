import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { FaStar } from 'react-icons/fa';
import HorizonLine from '../Common/Line/HorizonLine';
import COLOR from '../../constants/color';
import RatingContainer from '../Common/Review/RatingContainer';

import camera from '../../assets/images/camera.png';

const ARRAY = [0, 1, 2, 3, 4];

const LodgingDetailReview = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [reviewImg, setReviewImg] = useState('');

  const reviewImgInputRef = useRef();

  const onClickReviewInput = (e) => {
    e.preventDefault();
    reviewImgInputRef.current.click();
  };

  const onChangeReviewImg = (e) => {
    const file = e.target.files[0];
    setReviewImg(file.name);
  };

  const handleStarClick = (index) => {
    const clickStates = [...clicked];

    ARRAY.forEach((idx) => {
      clickStates[idx] = idx <= index;
      setClicked(clickStates);
    });
  };

  // 추후 후기 작성 API 연결 시 보낼 후기 평점
  useEffect(() => {
    const reviewRating = clicked.filter(Boolean).length;
    console.log(reviewRating);
  }, [clicked]);
  return (
    <>
      <HorizonLine mt={5} mb={2} color={COLOR.primary.blue} />
      <ReviewContainer>
        <ReviewHeader>
          <RatingContainer score="5.0" />
          <ReviewCntText>후기 3433개</ReviewCntText>
        </ReviewHeader>
        <ReviewContentContainer>
          <ReviewWritingContainer>
            <ReviewTextareBox>
              <ReviewTextarea placeholder="후기를 입력하세요" />
              <ReviewImgBox>
                <ReviewImgInput
                  type="file"
                  accept="image/*"
                  ref={reviewImgInputRef}
                  onChange={onChangeReviewImg}
                />
                <ReviewImgText>{reviewImg}</ReviewImgText>
                <ReviewImgBtn src={camera} onClick={onClickReviewInput} />
              </ReviewImgBox>
            </ReviewTextareBox>
            <ReviewWritingRight>
              <ReviewStarContainer>
                <ReviewStarTitle>숙소에 만족하셨나요?</ReviewStarTitle>
                <ReviewStarList>
                  {ARRAY.map((el) => {
                    return (
                      <FaStar
                        size="40"
                        onClick={() => handleStarClick(el)}
                        className={clicked[el] && 'blueStar'}
                      />
                    );
                  })}
                </ReviewStarList>
              </ReviewStarContainer>
              <ReviewWritingBtn>후기 등록하기</ReviewWritingBtn>
            </ReviewWritingRight>
          </ReviewWritingContainer>

          {/* 추후에 API 연결하면 map 함수로 처리 */}
          <ReviewList>
            <ReviewItem>
              <ReviewItemLeft>
                <UserText>Name</UserText>
                <DateText>yyyy년 mm월 dd일</DateText>
              </ReviewItemLeft>
              <ReviewText>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis{' '}
              </ReviewText>
              <ReviewItemRight>
                <RatingContainer score="5.0" />
                <TmpBox />
              </ReviewItemRight>
            </ReviewItem>
            <ReviewItem>
              <ReviewItemLeft>
                <UserText>Name</UserText>
                <DateText>yyyy년 mm월 dd일</DateText>
              </ReviewItemLeft>
              <ReviewText>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis{' '}
              </ReviewText>
              <ReviewItemRight>
                <RatingContainer score="5.0" />
                <TmpBox />
              </ReviewItemRight>
            </ReviewItem>
          </ReviewList>
        </ReviewContentContainer>
      </ReviewContainer>
    </>
  );
};

export default LodgingDetailReview;

const ReviewContainer = styled.div``;

const ReviewHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 2.3rem;
  margin-bottom: 2rem;
`;

const ReviewCntText = styled.span`
  font-size: 1.5rem;
`;

const ReviewContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ReviewWritingContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ReviewTextareBox = styled.div`
  width: 36.5rem;
  height: 15rem;
  position: relative;
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  height: 100%;
`;

const ReviewImgBox = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;

const ReviewImgText = styled.div``;

const ReviewImgInput = styled.input`
  display: none;
`;

const ReviewImgBtn = styled.img`
  cursor: pointer;
  margin-left: 1rem;
`;

const ReviewWritingRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
`;

const ReviewStarContainer = styled.div``;

const ReviewStarList = styled.ul`
  display: flex;
  gap: 0.5rem;
  padding-top: 5px;

  & svg {
    color: ${COLOR.lightGray};
    cursor: pointer;
  }

  :hover svg {
    color: ${COLOR.primary.blue};
  }

  & svg:hover ~ svg {
    color: ${COLOR.lightGray};
  }

  .blueStar {
    color: ${COLOR.primary.blue};
  }
`;

const ReviewStarTitle = styled.span`
  font-weight: bold;
`;

const ReviewWritingBtn = styled.button`
  width: 11rem;
  height: 2.25rem;
  background-color: ${COLOR.primary.blue};
  color: ${COLOR.white};
  border-radius: 1.5rem;
`;

const TmpBox = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: ${COLOR.primary.lightBlue};
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ReviewItem = styled.li`
  display: flex;
  gap: 2rem;
`;

const ReviewItemLeft = styled.div`
  flex-basis: 10%;
  display: flex;
  flex-direction: column;
`;

const UserText = styled.span``;

const DateText = styled.span`
  font-size: 0.75rem;
  color: ${COLOR.lightGray};
`;

const ReviewText = styled.span`
  flex-basis: 70%;
  line-height: 1.7;
`;

const ReviewItemRight = styled.div`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1.5rem;
`;
