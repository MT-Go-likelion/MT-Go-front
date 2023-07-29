import React, { useState } from 'react';
import styled from 'styled-components';

import SignWrapper from './SignWrapper';
import InputWithLabel from './InputWithLabel';

const SignForm = styled.form``;

const SignSubmitBtn = styled.button``;

const SignInForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    console.log(id, password);
  };

  return (
    <SignWrapper title="로그인">
      <SignForm onSubmit={onSubmitLogin}>
        <InputWithLabel
          label="ID"
          value={id}
          name="id"
          placeholder="ID를 입력하세요"
          onChange={onChangeId}
        />
        <InputWithLabel
          label="Password"
          value={password}
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={onChangePassword}
        />
        <SignSubmitBtn type="submit">로그인</SignSubmitBtn>
      </SignForm>
    </SignWrapper>
  );
};

export default SignInForm;
