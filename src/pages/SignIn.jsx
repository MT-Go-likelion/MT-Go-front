import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { SignInForm } from '../components/Sign';
import SigninMobile from '../assets/images/SigninMobile.png';
import SigninMobileWave from '../assets/images/SigninMobileWave.png';
import COLOR from '../constants/color';
import { mobileSize } from '../utils/MediaSize';

const SignInLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  margin: auto;
  @media (max-width: ${mobileSize}px) {
    background-image: ${(props) => `url(${props.dataSrc})`};
    background-size: cover;
    height: 844px;
    z-index: 99;
    position: relative;
  }
`;

const MobileBackWave = styled.img`
  width: 100%;
  bottom: 0;
  position: absolute;
`;

const SignupContainer = styled.span`
  margin-top: 1rem;
`;

const SignupText = styled.span`
  margin-right: 0.8rem;
`;

const SignupBtn = styled.span`
  text-decoration: underline;
  color: ${COLOR.primary.blue};
  font-weight: bold;
  cursor: pointer;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate('/signup');
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <SignInLayout dataSrc={SigninMobile}>
      {isMobile && <MobileBackWave src={SigninMobileWave} />}
      <SignInForm />
      <SignupContainer>
        <SignupText>아직 계정을 만들지 않았다면?</SignupText>
        <SignupBtn onClick={goToSignUp}>회원가입</SignupBtn>
      </SignupContainer>
    </SignInLayout>
  );
};

export default SignIn;
