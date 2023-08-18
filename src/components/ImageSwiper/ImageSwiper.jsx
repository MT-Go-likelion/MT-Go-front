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
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      initialSlide={2} // 나중에 이미지 개수 % 2를 시작 위치로 둘 것임.
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

      {photos &&
        photos.map((photo) => (
          <SwiperSlide key={photo.pk}>
            <SwiperImg src={photo.image} alt="slider" />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
