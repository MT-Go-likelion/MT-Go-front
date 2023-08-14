import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import SigninMobile from '../assets/images/SigninMobile.png';
import SigninMovileWaveMove from '../assets/images/SigninMovileWaveMove.png';
import SignUpForm from '../components/Sign/SignUpForm';
import COLOR from '../constants/color';
import { mobileSize } from '../utils/MediaSize';

const SignUpLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  max-width: 1280px;
  margin: auto;
  @media (max-width: ${mobileSize}px) {
    background-image: ${(props) => `url(${props.dataSrc})`};
    background-size: cover;
    height: 844px;
    z-index: 99;
    position: relative;
    margin: initial;
  }
`;

const MobileBackWave = styled.img`
  width: 100%;
  bottom: 0;
  position: absolute;
  transition: bottom 1s ease;
  @media (max-width: ${mobileSize}px) {
    bottom: -17rem;
  }
`;

const SignInContainer = styled.span`
  margin-top: 1rem;

  @media (max-width: ${mobileSize}px) {
    z-index: 1;
    font-size: 12px;
  }
`;

const SignInText = styled.span`
  margin-right: 0.8rem;
`;

const SignInBtn = styled.span`
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

const SignUp = () => {
  const navigate = useNavigate();
  const goToSignIn = () => {
    navigate('/signin');
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
    <SignUpLayout dataSrc={SigninMobile}>
      {isMobile && (
        <MobileBackWave
          src={SigninMovileWaveMove}
          style={{
            bottom: animateMobileWave ? 0 : '-17rem',
          }}
        />
      )}
      <SignUpFormWrapper animate={animateMobileWave}>
        <SignUpForm />
      </SignUpFormWrapper>

      <SignInContainer>
        <SignInText>이미 계정이 있다면?</SignInText>
        <SignInBtn onClick={goToSignIn}>로그인</SignInBtn>
      </SignInContainer>
    </SignUpLayout>
  );
};

export default SignUp;
