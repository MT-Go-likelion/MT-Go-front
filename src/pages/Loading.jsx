import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import COLOR from '../constants/color';

const Loading = () => {
  return (
    <ColorRing
      visible
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={[COLOR.white, COLOR.primary.lightBlue, COLOR.primary.blue, '#abbd81', '#849b87']}
    />
  );
};

export default Loading;
