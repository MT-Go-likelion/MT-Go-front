import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';

import { FaStar } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import HorizonLine from '../Common/Line/HorizonLine';
import COLOR from '../../constants/color';
import RatingContainer from '../Common/Review/RatingContainer';

import camera from '../../assets/images/camera.png';
import useLodgingReview from '../../hooks/queries/Lodging/useLodgingReview';
import { BASE_URL } from '../../config/api';
import Loading from '../../pages/Loading';
import Error from '../../pages/Error';

const ARRAY = [0, 1, 2, 3, 4];

const LodgingDetailReview = ({ lodging }) => {
  const { pk } = lodging;
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [content, setContent] = useState('');
  const [selectedImgName, setSelectedReviewImgName] = useState('');
  const [selectedImg, setSelectedImg] = useState('');

  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const reviewImgInputRef = useRef();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const {
    lodgingReviewQuery: { isLoading, error, data: reviews, refetch },
    lodgingReviewMutation,
    lodgingReviewDeleteMutation,
  } = useLodgingReview(user ? user.token : '', pk, page);

  const onClickReviewInput = (e) => {
    e.preventDefault();
    reviewImgInputRef.current.click();
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeReviewImg = (e) => {
    const file = e.target.files[0];
    setSelectedReviewImgName(file.name);
    setSelectedImg(file);
  };

  const handleStarClick = (index) => {
    const clickStates = [...clicked];

    ARRAY.forEach((idx) => {
      clickStates[idx] = idx <= index;
      setClicked(clickStates);
    });
  };

  const onSubmitReview = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('score', clicked.filter(Boolean).length);
    formData.append('contents', content);
    formData.append('image', selectedImg);
    formData.append('lodgingPk', pk);

    if (user) {
      lodgingReviewMutation(formData);
    } else {
      navigate('/signin');
    }

    setContent('');
    setSelectedImg('');
    setSelectedReviewImgName('');
    setClicked([false, false, false, false, false]);
  };

  const onClickDeleteBtn = (reviewPk) => {
    lodgingReviewDeleteMutation(reviewPk);
    refetch();
  };

  return (
    <>
      <HorizonLine mt={5} mb={2} color={COLOR.primary.blue} />
      <ReviewContainer>
        {isLoading && <Loading />}
        {error && <Error />}
        <ReviewHeader>
          <RatingContainer score="5.0" />
          <ReviewCntText>후기 3433개</ReviewCntText>
        </ReviewHeader>
        <ReviewContentContainer>
          <ReviewWritingContainer>
            <ReviewTextareBox>
              <ReviewTextarea
                value={content}
                placeholder="후기를 입력하세요"
                onChange={handleContent}
              />

              <ReviewImgBox>
                <ReviewImgInput
                  type="file"
                  accept="image/*"
                  ref={reviewImgInputRef}
                  onChange={onChangeReviewImg}
                />
                <ReviewImgText>{selectedImgName}</ReviewImgText>
                <ReviewImgBtn src={camera} onClick={onClickReviewInput} />
              </ReviewImgBox>
            </ReviewTextareBox>
            <ReviewWritingRight>
              <ReviewStarContainer>
                <ReviewStarTitle>숙소에 만족하셨나요?</ReviewStarTitle>
                <ReviewStarList>
                  {ARRAY.map((el) => (
                    <ReviewStarItem key={el}>
                      <FaStar
                        size="40"
                        onClick={() => handleStarClick(el)}
                        className={clicked[el] && 'blueStar'}
                      />
                    </ReviewStarItem>
                  ))}
                </ReviewStarList>
              </ReviewStarContainer>
              <ReviewWritingBtn onClick={onSubmitReview}>후기 등록하기</ReviewWritingBtn>
            </ReviewWritingRight>
          </ReviewWritingContainer>
          <ReviewList>
            {reviews &&
              reviews.results.map((review) => (
                <ReviewItem key={uuid()}>
                  <ReviewItemLeft>
                    <UserText>{review.userName}</UserText>
                    <DateText>{review.createdAt}</DateText>
                    <DeleteBtn onClick={() => onClickDeleteBtn(review.pk)}>삭제하기</DeleteBtn>
                  </ReviewItemLeft>
                  <ReviewText>{review.contents}</ReviewText>
                  <ReviewItemRight>
                    <RatingContainer score={review.score} />
                    {review.image ? <ReviewImg src={BASE_URL + review.image} /> : <TmpImg />}
                  </ReviewItemRight>
                </ReviewItem>
              ))}
          </ReviewList>
          {reviews && (
            <Pagination
              activePage={page} // 현재 페이지
              itemsCountPerPage={1} // 한 페이지에 보여줄 아이템 개수
              totalItemsCount={reviews.count} // 총 아이템 개수
              pageRangeDisplayed={Math.floor(reviews.count / 2) + 1} // 페이지 범위
              prevPageText="‹"
              nextPageText="›"
              onChange={handlePageChange}
            />
          )}
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

const ReviewStarItem = styled.div``;

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

const ReviewImg = styled.img`
  width: 10rem;
  height: 10rem;
`;

const TmpImg = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: ${COLOR.primary.lightBlue};
`;

const ReviewList = styled.ul`
  width: 100%;
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

const DeleteBtn = styled.button``;

const ReviewText = styled.div`
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
