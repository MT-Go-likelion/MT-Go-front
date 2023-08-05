import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import COLOR from '../constants/color';
import useInput from '../hooks/useInput';

const RegisterForm = styled.form``;

const TitleContainer = styled.div`
  display: flex;
`;

const TitleLabel = styled.div`
  font-size: 1rem;
  color: ${COLOR.black};
  margin-bottom: 0.25rem;
  margin-right: 0.2rem;
`;

const TitleInput = styled.input`
  width: 50%;
  border: 2px solid ${COLOR.primary.blue};
  outline: none;
  border-radius: 0px;
  line-height: 3rem;
  font-size: 1rem;
  padding-left: 1rem;
  color: ${COLOR.gray};
`;

const RecommenedNumContainer = styled.div`
  display: flex;
`;

const RecommenedNumLabel = styled.div`
  font-size: 1rem;
  color: ${COLOR.black};
  margin-bottom: 0.25rem;
  margin-right: 0.2rem;
`;

const RecommenedNumInput = styled.input`
  width: 50%;
  border: 2px solid ${COLOR.primary.blue};
  outline: none;
  border-radius: 0px;
  line-height: 3rem;
  font-size: 1rem;
  padding-left: 1rem;
  color: ${COLOR.gray};
`;

const SelectedImg = styled.div``;

const ImgInput = styled.input``;

const SubmitBtn = styled.button``;

const RecreationRegistration = () => {
  const [title, onChangeTitle] = useInput('');
  const [recommendedNum, onChangeRecommendedNum] = useInput(0);
  const [img, setImg] = useState('');

  const imgInputRef = useRef();
  const onChangeImg = (e) => {
    const file = e.target.files[0];
    setImg(file.name);
  };

  const onSubmitRecreation = (e) => {
    e.preventDefault();
    const form = { title, recommendedNum, img };
    console.log(form);
  };

  return (
    <RegisterForm onSubmit={onSubmitRecreation}>
      <TitleContainer>
        <TitleLabel onChange={onChangeTitle}>제목</TitleLabel>
        <TitleInput />
      </TitleContainer>
      <RecommenedNumContainer>
        <RecommenedNumLabel>추천 인원</RecommenedNumLabel>
        <RecommenedNumInput onChange={onChangeRecommendedNum} />
      </RecommenedNumContainer>
      <ImgInput type="file" accept="image/*" ref={imgInputRef} onChange={onChangeImg} />
      <SelectedImg>{img}</SelectedImg>
      <SubmitBtn type="submit">제출</SubmitBtn>
    </RegisterForm>
  );
};

export default RecreationRegistration;
