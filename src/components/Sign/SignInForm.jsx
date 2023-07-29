import React from 'react';
import styled from 'styled-components';

import SignWrapper from './SignWrapper';
import InputWithLabel from './InputWithLabel';
import useInput from '../../hooks/useInput';
import Checkbox from '../CheckBox/CheckBox';
import COLOR from '../../constants/color';

const LoginForm = styled.form`
  width: 80%;
`;

const LoginSubmitBtn = styled.button`
  width: 100%;
  height: 3rem;
  background: ${COLOR.primary.gradient};
  border: none;
  font-size: 1rem;
  color: ${COLOR.white};
  font-weight: 900;
`;

const LoginBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

const PasswordSearchText = styled.span`
  color: ${COLOR.primary.blue};
  cursor: pointer;
`;

const SignInForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitLogin = (e) => {
    e.preventDefault();

    // 추후에 API 연동 작업 추가
  };

  return (
    <SignWrapper title="로그인">
      <LoginForm onSubmit={onSubmitLogin}>
        <InputWithLabel label="E-mail" value={email} name="id" onChange={onChangeEmail} />
        <InputWithLabel
          type="password"
          label="Password"
          value={password}
          name="password"
          onChange={onChangePassword}
        />
        <LoginBottomContainer>
          <Checkbox text="로그인 기억하기" />
          <PasswordSearchText>패스워드 찾기</PasswordSearchText>
        </LoginBottomContainer>

        <LoginSubmitBtn type="submit">로그인</LoginSubmitBtn>
      </LoginForm>
    </SignWrapper>
  );
};

export default SignInForm;
