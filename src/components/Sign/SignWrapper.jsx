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
  transition: 0.4s;
  @media (max-width: ${mobileSize}px) {
    box-shadow: none;
    width: 100%;
    z-index: 10;
    padding-top: ${(props) => (props.title === '회원가입' ? '1rem' : '8rem')};
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
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
  }
`;

const SignWrapper = ({ title, children }) => (
  <LoginLayout title={title}>
    <Title>{title}</Title>
    {children}
  </LoginLayout>
);

export default SignWrapper;
