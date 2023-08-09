import React from 'react';
import styled from 'styled-components';
import COLOR from '../../../constants/color';

const Line = styled.div`
  width: 100%;
  border-bottom: 2px solid ${COLOR.darkGray};
  line-height: 0.1rem;
  margin-bottom: ${(props) => `${props.$mb}rem`};
  margin-top: ${(props) => `${props.$mt}rem`};
  border-color: ${(props) => props.color};
`;

const HorizonLine = ({ mb, mt, color }) => {
  return <Line $mb={mb} $mt={mt} color={color} />;
};

export default HorizonLine;
