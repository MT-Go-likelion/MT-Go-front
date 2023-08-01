import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { SignInForm } from '../components/Sign';
import COLOR from '../constants/color';

const SignInLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1280px;
  margin: auto;
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
  return (
    <SignInLayout>
      <SignInForm />
      <SignupContainer>
        <SignupText>아직 계정을 만들지 않았다면?</SignupText>
        <SignupBtn onClick={goToSignUp}>회원가입</SignupBtn>
      </SignupContainer>
    </SignInLayout>
  );
};

export default SignIn;
