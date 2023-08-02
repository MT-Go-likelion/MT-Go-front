import React, { useState } from 'react';
import styled from 'styled-components';

import SignWrapper from './SignWrapper';
import useInput from '../../hooks/useInput';
import InputWithLabel from './InputWithLabel';
import COLOR from '../../constants/color';

import eye from '../../assets/images/eye.png';
import blueEye from '../../assets/images/eye_blue.png';
import TermsModal from '../Common/Modal/TermsModal';
import Checkbox from '../Common/CheckBox/CheckBox';
import HorizonLine from '../Common/Line/HorizonLine';
import useSignUpMutation from '../../hooks/queries/useSignUp';

const SignForm = styled.form`
  width: 80%;
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

const TermsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const TermsText = styled.span`
  text-decoration: underline;
  color: ${COLOR.lightGray};
  cursor: pointer;
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

const ErrorText = styled.div`
  font-size: 0.7rem;
  color: ${COLOR.red};
  float: right;
  margin-top: 0.5rem;
`;

const SignUpForm = () => {
  const [name, onChangeName] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [confirmedPassword, onChangeConfirmedPassword] = useInput('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  const [confirmedPasswordError, setConfirmedPasswordError] = useState('');

  const [showPassWord, setShowPassword] = useState(false);
  const [showRetypePassWord, setShowRetypePassword] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const { signUpMutation } = useSignUpMutation();

  const checkNameValidation = () => {
    let isChekced = false;

    if (name.length < 2) setNameError('최소 2글자 이상 작성해주세요');
    else {
      setNameError('');
      isChekced = true;
    }

    return isChekced;
  };

  const checkEmailValidation = () => {
    let isChekced = false;
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    if (!emailRegEx.test(email)) setEmailError('올바른 이메일 형식을 작성해주세요');
    else {
      setEmailError('');
      isChekced = true;
    }

    return isChekced;
  };

  const checkPasswordValidation = () => {
    // test 끝나면 나중에 추가 (회원가입 쉽게 하기 위해)
    return true;
  };

  const checkConfirmedPasswordValidation = () => {
    let isChecked = false;
    if (password !== confirmedPassword) setConfirmedPasswordError('비밀번호가 일치하지 않습니다');
    else {
      setConfirmedPasswordError('');
      isChecked = true;
    }

    return isChecked;
  };

  const checkAllValidation = (name, email, password) => {
    const checkedName = checkNameValidation(name);
    const checkedEmail = checkEmailValidation(email);
    const checkedPassWord = checkPasswordValidation(password);
    const checkedConfirmedPassword = checkConfirmedPasswordValidation();

    return checkedName && checkedEmail && checkedPassWord && checkedConfirmedPassword;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassWord);
  };

  const toggleShowRetypePassword = () => {
    setShowRetypePassword(!showRetypePassWord);
  };

  const showModal = () => {
    setTermsModalOpen(true);
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();

    console.log(email, password, name);

    const formValid = checkAllValidation(name, email, password);

    // 추후에 API 연동 작업 추가

    return formValid && signUpMutation({ email, password, name });
  };

  return (
    <SignWrapper title="회원가입">
      <SignForm onSubmit={onSubmitLogin}>
        <HorizonLine mb="2" />
        <InputWithLabel label="Name" required value={name} name="name" onChange={onChangeName} />
        <ErrorText>{nameError}</ErrorText>
        <InputWithLabel
          label="E-mail"
          required
          value={email}
          name="E-mail"
          onChange={onChangeEmail}
        />
        <ErrorText>{emailError}</ErrorText>
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
            value={confirmedPassword}
            name="Re-type password"
            onChange={onChangeConfirmedPassword}
          />
          <ErrorText>{confirmedPasswordError}</ErrorText>
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
        <TermsContainer>
          <Checkbox text="이용약관 동의" />
          <TermsText onClick={showModal}>더보기</TermsText>
          {termsModalOpen && <TermsModal setTermsModalOpen={setTermsModalOpen} />}
        </TermsContainer>
        <SignSubmitBtn type="submit">회원가입</SignSubmitBtn>
      </SignForm>
    </SignWrapper>
  );
};

export default SignUpForm;
