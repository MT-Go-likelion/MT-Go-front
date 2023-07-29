import React from 'react';
import styled from 'styled-components';

import SignWrapper from './SignWrapper';
import useInput from '../../hooks/useInput';
import InputWithLabel from './InputWithLabel';

const SignForm = styled.form``;

const SignSubmitBtn = styled.button``;

const PasswordText = styled.span`
  font-size: 0.7rem;
`;

const SignUpForm = () => {
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirmPassword, onChangeConfirmPassword] = useInput('');

  const onSubmitLogin = (e) => {
    e.preventDefault();

    // 추후에 API 연동 작업 추가
  };
  return (
    <SignWrapper title="회원가입">
      <SignForm onSubmit={onSubmitLogin}>
        <InputWithLabel
          label="Name"
          value={name}
          name="name"
          placeholder="닉네임을 입력하세요"
          onChange={onChangeName}
        />
        <InputWithLabel
          label="E-mail"
          value={email}
          name="E-mail"
          placeholder="이메일을 입력하세요"
          onChange={onChangeEmail}
        />
        <InputWithLabel
          label="Password"
          value={password}
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={onChangePassword}
        />
        <PasswordText>영어, 문자를 포함하여 8자 이상</PasswordText>

        <InputWithLabel
          label="Re-type Password"
          value={confirmPassword}
          name="password"
          placeholder="비밀번호를 재입력하세요"
          onChange={onChangeConfirmPassword}
        />
        <SignSubmitBtn type="submit">로그인</SignSubmitBtn>
      </SignForm>
    </SignWrapper>
  );
};

export default SignUpForm;
