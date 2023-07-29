import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${COLOR.black};
  margin-bottom: 1rem;
`;

const SignWrapper = ({ title, children }) => (
  <>
    <Title>{title}</Title>
    {children}
  </>
);

export default SignWrapper;
