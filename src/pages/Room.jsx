import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import COLOR from '../constants/color';
import { RoomAPI } from '../config/api';

import Location from '../components/SelectBox/Location';
import Headcount from '../components/SelectBox/Headcount';
import Price from '../components/SelectBox/Price';
import Date from '../components/SelectBox/Date';

import BestlocationCard from '../components/Card/BestlocationCard';
import SearchBackgroundIMG from '../assets/images/1_background.png';

// 검색 바 백그라운드 이미지
const SearchBack = styled.div`
  width: 100%;
  height: 330px;
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
`;

const ContentsDiv = styled.div`
  padding: 5rem 0;
  display: flex;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1280px;
  margin: auto;
`;

// 검색바 타이틀
const Title = styled.div`
  color: ${COLOR.white};
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

// 위치 인원 가격 flex
const BoxFlex = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
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

const Room = () => {
  const [data, setData] = useState([]);

  // 로딩 중 처리
  const [isLoading, setIsLoading] = useState(false);

  // 토큰
  const tokenData = localStorage.getItem('USER');
  let token = '';
  if (tokenData) {
    const parsedData = JSON.parse(tokenData);
    token = parsedData.token;
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // 로그인 된 상태 -> 좋아요 누를 수 있게 토큰 보내주고
      // 로그아웃 된 상태 -> 리스트만 보이게
      const headers = token ? { Authorization: `Token ${token}` } : {};
      const response = await axios.get(RoomAPI.MAINLIST, { headers });

      setIsLoading(false);
      setData(response.data);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <div>
      <SearchBack>
        <Title>원하는 단체숙소를 검색하세요!</Title>
        <BoxFlex>
          <Location />
          <Headcount />
          <Price />
        </BoxFlex>
        <BoxFlex>
          <Date />
        </BoxFlex>
        <SearchBtn>검색하기</SearchBtn>
      </SearchBack>
      <ContentsDiv>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          data.map((obj) => (
            <BestlocationCard
              pk={obj?.pk}
              name={obj?.name}
              price={obj?.price}
              mainPhoto={obj?.mainPhoto}
              avgScore={obj?.avgScore}
              isScrap={obj?.isScrap}
            />
          ))
        )}
      </ContentsDiv>
    </div>
  );
};

export default Room;
