import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { SignInForm } from '../components/Sign';
import SigninMobile from '../assets/images/SigninMobile.png';
import SigninMovileWaveMove from '../assets/images/SigninMovileWaveMove.png';
import COLOR from '../constants/color';
import { mobileSize } from '../utils/MediaSize';

const SignInLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  margin: auto;
  overflow: hidden;
  @media (max-width: ${mobileSize}px) {
    background-image: ${(props) => `url(${props.$datasrc})`};
    background-size: cover;
    min-height: 844px;
    z-index: 99;
    position: relative;
    margin: initial;
  }
`;

const MobileBackWave = styled.img`
  width: 100%;
  height: 100%;
  bottom: 0;
  position: absolute;
  transition: bottom 1s ease;
  @media (max-width: ${mobileSize}px) {
    bottom: 0;
  }
`;

const SignupContainer = styled.span`
  margin-top: 1rem;
  @media (max-width: ${mobileSize}px) {
    z-index: 1;
    font-size: 12px;
  }
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
const SignUpFormWrapper = styled.div`
  opacity: ${(props) => (props.animate ? 1 : 0)};
  transition: opacity 1s ease;
  width: 100%;

  z-index: 100;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate('/signup');
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const [animateMobileWave, setAnimateMobileWave] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileSize);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setAnimateMobileWave(true);
    return () => {
      window.removeEventListener('resize', handleResize);
      setAnimateMobileWave(false);
    };
  }, []);
  return (
    <SignInLayout $datasrc={SigninMobile}>
      {isMobile && (
        <MobileBackWave
          src={SigninMovileWaveMove}
          style={{
            bottom: animateMobileWave ? '-17rem' : 0,
          }}
        />
      )}
      <SignUpFormWrapper animate={animateMobileWave}>
        <SignInForm />
      </SignUpFormWrapper>
      <SignupContainer>
        <SignupText>아직 계정을 만들지 않았다면?</SignupText>
        <SignupBtn onClick={goToSignUp}>회원가입</SignupBtn>
      </SignupContainer>
    </SignInLayout>
  );
};

export default SignIn;
