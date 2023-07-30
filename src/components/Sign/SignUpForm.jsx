import React, { useState } from 'react';
import styled from 'styled-components';

import SignWrapper from './SignWrapper';
import useInput from '../../hooks/useInput';
import InputWithLabel from './InputWithLabel';
import COLOR from '../../constants/color';

import eye from '../../assets/images/eye.png';
import blueEye from '../../assets/images/eye_blue.png';
import Checkbox from '../CheckBox/CheckBox';

const SignForm = styled.form`
  width: 80%;
`;

const HorizonLine = styled.div`
  width: 100%;
  border-bottom: 2px solid ${COLOR.darkGray};
  line-height: 0.1rem;
  margin-bottom: ${(props) => `${props.mb}rem`};
  margin-top: ${(props) => `${props.mt}rem`};
`;

const PassWordContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 1rem;
`;

const EyeImg = styled.img`
  position: absolute;
  width: 1.2rem;
  height: 0.8rem;
  right: 1rem;
  top: 3.2rem;

  color: ${(props) => (props.showPassWord ? `${COLOR.primary.blue}` : `${COLOR.lightGray}`)};
`;

const SignSubmitBtn = styled.button`
  width: 100%;
  height: 3rem;
  background: ${COLOR.primary.gradient};
  border: none;
  font-size: 1rem;
  color: ${COLOR.white};
  font-weight: 900;
  cursor: pointer;
  margin: 2rem 0;
`;

const SignUpForm = () => {
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirmPassword, onChangeConfirmPassword] = useInput('');

  const [showPassWord, setShowPassword] = useState(false);
  const [showRetypePassWord, setShowRetypePassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassWord);
  };

  const toggleShowRetypePassword = () => {
    setShowRetypePassword(!showRetypePassWord);
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();

    // 추후에 API 연동 작업 추가
  };
  return (
    <SignWrapper title="회원가입">
      <SignForm onSubmit={onSubmitLogin}>
        <HorizonLine mb="2" />
        <InputWithLabel label="Name" required value={name} name="name" onChange={onChangeName} />
        <InputWithLabel
          label="E-mail"
          required
          value={email}
          name="E-mail"
          onChange={onChangeEmail}
        />
        <PassWordContainer>
          <InputWithLabel
            required
            type={showPassWord ? 'text' : 'password'}
            label="Password"
            value={password}
            name="password"
            onChange={onChangePassword}
          />
          {showPassWord ? (
            <EyeImg src={blueEye} onClick={toggleShowPassword} showPassWord={showPassWord} />
          ) : (
            <EyeImg src={eye} onClick={toggleShowPassword} showPassWord={showPassWord} />
          )}
        </PassWordContainer>
        <PassWordContainer>
          <InputWithLabel
            required
            type={showRetypePassWord ? 'text' : 'password'}
            label="Re-type Password"
            value={confirmPassword}
            name="Re-type password"
            onChange={onChangeConfirmPassword}
          />
          {showRetypePassWord ? (
            <EyeImg
              src={blueEye}
              onClick={toggleShowRetypePassword}
              showRetypePassWord={showRetypePassWord}
            />
          ) : (
            <EyeImg
              src={eye}
              onClick={toggleShowRetypePassword}
              showRetypePassWord={showRetypePassWord}
            />
          )}
        </PassWordContainer>
        <HorizonLine mb="2" mt="4" />
        <Checkbox text="이용약관 동의" underline />

        <SignSubmitBtn type="submit">로그인</SignSubmitBtn>
      </SignForm>
    </SignWrapper>
  );
};

export default SignUpForm;
