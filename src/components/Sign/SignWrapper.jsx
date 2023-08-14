import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';
import { mobileSize } from '../../utils/MediaSize';

const LoginLayout = styled.div`
  width: 40rem;
  height: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin-top: 4rem;
  @media (max-width: ${mobileSize}px) {
    box-shadow: none;
    width: 100%;
    z-index: 10;
    padding-top: 8rem;
    padding-bottom: 0;
    margin: initial;
  }
`;

const Title = styled.div`
  font-size: 2.6rem;
  font-weight: 900;
  color: ${COLOR.black};
  margin-bottom: 3rem;
  @media (max-width: ${mobileSize}px) {
    margin-bottom: 0;
    color: ${COLOR.primary.blue};
    height: 100%;
  }
`;

const SignWrapper = ({ title, children }) => (
  <LoginLayout>
    <Title>{title}</Title>
    {children}
  </LoginLayout>
);

export default SignWrapper;
