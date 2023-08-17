import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';

import Pagination from 'react-js-pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import COLOR from '../constants/color';

import '../styles/Pagination.css';

import Location from '../components/SelectBox/Location';
import Headcount from '../components/SelectBox/Headcount';
import Price from '../components/SelectBox/Price';
import BestlocationCard from '../components/Card/BestlocationCard';
import LodgingMobileCard from '../components/Mobile/LodgingMobileCard';

import SearchImg from '../assets/images/search.png';
import LodgingMobileB from '../assets/images/LoadgingBackM.png';
import SearchBackgroundIMG from '../assets/images/1_background.png';
import Error from './Error';
import useLodging from '../hooks/queries/Lodging/useLodging';
import Loading from './Loading';
import { mobileSize } from '../utils/MediaSize';
import useSelect from '../hooks/useSelect';

// 검색 바 백그라운드 이미지
const SearchBack = styled.div`
  width: 100%;
  height: 280px;
  flex-shrink: 0;
  background-image: url(${SearchBackgroundIMG});
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply, normal;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  @media (max-width: ${mobileSize}px) {
    background-image: url(${LodgingMobileB});
    gap: 0.3rem;
    align-items: flex-start;
    padding-left: 1.7rem;
  }
`;

const ContentsDiv = styled.div`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1280px;
  margin: auto;
  @media (max-width: ${mobileSize}px) {
    padding: 2rem 0 7rem 0;
    background-color: ${COLOR.white};
    border-radius: 32px 0px 0px 0px;
    top: 10.9rem;
    position: absolute;
  }
`;

const LodgingList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

// 검색바 타이틀
const Title = styled.div`
  color: ${COLOR.white};

  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  @media (max-width: ${mobileSize}px) {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
  }
`;

// 위치 인원 가격 flex
const BoxFlex = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  @media (max-width: ${mobileSize}px) {
    gap: 0.8rem;
  }
`;

// 검색하기 버튼
const SearchBtn = styled.button`
  border-radius: 32px;
  border: 4px solid ${COLOR.white};
  background: none;
  width: 130px;
  height: 45px;
  color: ${COLOR.white};
`;

const SearchBtnMobile = styled.button`
  background-image: url(${SearchImg});
  background-size: cover;
  background-position: center;
  width: 35px;
  height: 35px;
  border: none;
  cursor: pointer;
  outline: none;
`;

const PaginationDiv = styled.div`
  @media (max-width: ${mobileSize}px) {
    position: relative;
    z-index: 1;
  }
`;

const Lodging = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  const [page, setPage] = useState(1);
  const [place, onChangePlace] = useSelect('');
  const [count, onChangeCount] = useSelect('');
  const [price, onChangePrice] = useSelect('');

  const navigate = useNavigate();
  const location = useLocation();

  const {
    lodgingsQuery: { isLoading, error, data: lodgings, refetch },
  } = useLodging(user ? user.token : '', page, location.state);

  const handleSearch = () => {
    const splitCount = count.split('~');
    const splitPrice = price.split('~');
    setPage(1);
    navigate('/lodging', {
      state: {
        place,
        minheadCount: splitCount[0],
        maxheadCount: splitCount[1],
        minlowWeekdayPrice: splitPrice[0],
        maxlowWeekdayPrice: splitPrice[1],
      },
    });
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <>
      {error && <Error />}
      {isLoading && <Loading />}
      <SearchBack>
        <Title>원하는 단체숙소를 검색하세요!</Title>
        {!isMobile ? (
          <>
            <BoxFlex>
              <Location place={place} onChangePlace={onChangePlace} />
              <Headcount count={count} onChangeCount={onChangeCount} />
              <Price price={price} onChangePrice={onChangePrice} />
            </BoxFlex>
            <SearchBtn onClick={handleSearch}>검색하기</SearchBtn>
          </>
        ) : (
          <BoxFlex>
            <Location />
            <Headcount />
            <Price />
            <SearchBtnMobile> </SearchBtnMobile>
          </BoxFlex>
        )}
      </SearchBack>

      <ContentsDiv>
        <LodgingList>
          {' '}
          {lodgings &&
            lodgings.results.map((obj) => (
              <div>
                {isMobile ? (
                  <LodgingMobileCard
                    key={obj.pk}
                    pk={obj.pk}
                    name={obj.name}
                    price={obj.price}
                    mainPhoto={obj.mainPhoto}
                    avgScore={obj.avgScore}
                    isScrap={obj.isScrap}
                  />
                ) : (
                  <BestlocationCard
                    key={obj.pk}
                    pk={obj.pk}
                    name={obj.name}
                    price={obj.price}
                    mainPhoto={obj.mainPhoto}
                    avgScore={obj.avgScore}
                    isScrap={obj.isScrap}
                    lowWeekdayPrice={obj.lowWeekdayPrice}
                  />
                )}
              </div>
            ))}
        </LodgingList>
        <PaginationDiv>
          {lodgings && (
            <Pagination
              activePage={page} // 현재 페이지
              itemsCountPerPage={8} // 한 페이지에 보여줄 아이템 개수
              totalItemsCount={lodgings.count} // 총 아이템 개수
              pageRangeDisplayed={Math.floor(lodgings.count / 2) + 1} // 페이지 범위
              prevPageText="‹"
              nextPageText="›"
              onChange={handlePageChange}
            />
          )}
        </PaginationDiv>
      </ContentsDiv>
    </>
  );
};

export default Lodging;
