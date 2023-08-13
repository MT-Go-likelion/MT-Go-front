/* global kakao */

import React, { useEffect, useState } from 'react';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
      style={{ width: '100%', height: '20rem' }}
      level={4}
    >
      <MapMarker position={state.center} />
    </Map>
  );
};

export default LodgingMap;
