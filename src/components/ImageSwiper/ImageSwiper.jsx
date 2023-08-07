import React from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { BASE_URL } from '../../config/api';

const SwiperImg = styled.img`
  width: 100%;
  height: 100%;
`;

export default function ImageSwiper({ mainPhoto, photos }) {
  console.log(photos);
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      initialSlide={3} // 나중에 이미지 개수 % 2를 시작 위치로 둘 것임.
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <SwiperImg src={BASE_URL + mainPhoto} alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperImg src="https://swiperjs.com/demos/images/nature-2.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperImg src="https://swiperjs.com/demos/images/nature-3.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperImg src="https://swiperjs.com/demos/images/nature-4.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperImg src="https://swiperjs.com/demos/images/nature-5.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperImg src="https://swiperjs.com/demos/images/nature-6.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperImg src="https://swiperjs.com/demos/images/nature-7.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperImg src="https://swiperjs.com/demos/images/nature-8.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperImg src="https://swiperjs.com/demos/images/nature-9.jpg" alt="slider" />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperImg src="https://swiperjs.com/demos/images/nature-10.jpg" alt="slider" />
      </SwiperSlide>
    </Swiper>
  );
}
