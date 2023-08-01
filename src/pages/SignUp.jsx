import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/Sign/SignUpForm';
import COLOR from '../constants/color';

const SignUpLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

const SignInContainer = styled.span`
  margin-top: 1rem;
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

const SignUp = () => {
  const navigate = useNavigate();
  const goToSignIn = () => {
    navigate('/login');
  };
  return (
    <SignUpLayout>
      <SignUpForm />
      <SignInContainer>
        <SignInText>이미 계정이 있다면?</SignInText>
        <SignInBtn onClick={goToSignIn}>로그인</SignInBtn>
      </SignInContainer>
    </SignUpLayout>
  );
};

export default SignUp;
