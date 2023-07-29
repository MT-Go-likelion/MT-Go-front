import React from 'react';
import styled from 'styled-components';

import SignWrapper from './SignWrapper';
import useInput from '../../hooks/useInput';
import InputWithLabel from './InputWithLabel';

const SignForm = styled.form``;

const SignSubmitBtn = styled.button``;

const PasswordRuleText = styled.span`
  font-size: 0.7rem;
`;

const SignUpForm = () => {
  const [nickname, onChangeNickName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [emialAuthNumber, onChangeEmailAuthNumber] = useInput('');
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
          label="닉네임"
          value={nickname}
          name="nickname"
          placeholder="닉네임을 입력하세요"
          onChange={onChangeNickName}
        />
        <InputWithLabel
          label="E-mail"
          value={email}
          name="E-mail"
          placeholder="이메일을 입력하세요"
          onChange={onChangeEmail}
        />
        <InputWithLabel
          label="인증번호"
          value={emialAuthNumber}
          name="emialAuthNumber"
          placeholder="인증번호를 입력하세요"
          onChange={onChangeEmailAuthNumber}
        />
        <InputWithLabel
          label="비밀번호"
          value={password}
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={onChangePassword}
        />
        <PasswordRuleText>영어, 문자를 포함하여 8자 이상</PasswordRuleText>

        <InputWithLabel
          label="비밀번호 확인"
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
