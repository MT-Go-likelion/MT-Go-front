/* global kakao */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import COLOR from '../../constants/color';

const MarkerBox = styled.div`
  width: 10rem;
  height: 3rem;
  text-align: center;
  border-radius: 1rem;
  padding: 1rem;
  background: ${COLOR.primary.blue};
  color: ${COLOR.white};
  transform: translate(-2.4rem, -4.2rem);
`;

const LodgingMap = () => {
  const [state, setState] = useState({
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    isPanto: true,
  });

  // 주소 입력하면 해당 장소로 이동하고 마커 생성
  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    const callback = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };

    // 추후에 API 연결 후 주소 연결
    geocoder.addressSearch('경기도 가평군 가평읍 북한강변로 360-89 (구)금대리 산4-8', callback);
  }, []);

  return (
    <Map
      center={state.center}
      isPanto={state.isPanto}
      style={{ width: '43rem', height: '20rem' }}
      level={3}
    >
      <MapMarker position={state.center} />
      <CustomOverlayMap position={state.center}>
        <MarkerBox>숙소 이름</MarkerBox>
      </CustomOverlayMap>
    </Map>
  );
};

export default LodgingMap;
