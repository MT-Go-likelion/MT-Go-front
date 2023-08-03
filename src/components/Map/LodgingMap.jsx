import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const LodgingMap = () => {
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: '43rem', height: '20rem' }}
      level={4}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
        <div style={{ color: '#000' }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
};

export default LodgingMap;
