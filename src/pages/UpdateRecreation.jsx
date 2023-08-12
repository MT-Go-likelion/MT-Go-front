import React, { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useInput from '../hooks/useInput';
import RecreationEditor from '../components/Editor/RecreationEditor';
import useRecreation from '../hooks/queries/Recreation/useRecreation';
import COLOR from '../constants/color';
import { BASE_URL } from '../config/api';

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

const ImgInput = styled.input``;

const SubmitBtn = styled.button``;

const SuccessText = styled.div`
  font-size: 1.75rem;
  font-size: bold;
`;

const UpdateRecreation = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const location = useLocation();

  console.log(location.state.recreationDetail);

  const [name, onChangeName] = useInput(location.state.recreationDetail.name);
  const [headCountMin, onChangeHeadCountMin] = useInput(
    location.state.recreationDetail.headCountMin,
  );
  const [headCountMax, onChangeHeadCountMax] = useInput(
    location.state.recreationDetail.headCountMax,
  );
  const [img, setImg] = useState(location.state.recreationDetail.photo);
  const [addedImage, setAddedImage] = useState('');
  const imgInputRef = useRef();
  const editorRef = useRef();
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const { recreaetionMutation } = useRecreation();

  const onChangeImg = (e) => {
    const file = e.target.files[0];
    setAddedImage(file);
    setImg(URL.createObjectURL(file));
  };

  // 에디터 등록 시 에디터 내용 HTML or Markdown 형식으로 변환
  const onhandleRegisterButton = () => {
    // 입력창에 입력한 내용을 HTML 태그 형태로 취득
    console.log(editorRef.current?.getInstance().getHTML());
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
    console.log(editorRef.current?.getInstance().getMarkdown());
  };

  const onSubmitRecreation = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', editorRef.current?.getInstance().getHTML());
    formData.append('headCountMin', headCountMin);
    formData.append('headCountMax', headCountMax);

    if (img !== location.state.recreationDetail.photo) {
      formData.append('photo', addedImage);
    }

    if (user) {
      recreaetionMutation(formData, {
        onSuccess: () => {
          setSuccess('✅ 해당 레크레이션이 성공적으로 업데이트 되었습니다!');
          setTimeout(() => setSuccess(null), 3000);
        },
      });
    } else {
      navigate('/signin');
    }
  };

  return (
    <RegisterForm onSubmit={onSubmitRecreation}>
      {success && <SuccessText className="text-2xl font-semibold">{success}</SuccessText>}

      <TitleContainer>
        <TitleLabel>제목</TitleLabel>
        <TitleInput onChange={onChangeName} value={name} />
      </TitleContainer>
      <RecommenedNumContainer>
        <RecommenedNumLabel>최소 인원</RecommenedNumLabel>
        <RecommenedNumInput onChange={onChangeHeadCountMin} value={headCountMin} />
      </RecommenedNumContainer>
      <RecommenedNumContainer>
        <RecommenedNumLabel>최대 인원</RecommenedNumLabel>
        <RecommenedNumInput onChange={onChangeHeadCountMax} value={headCountMax} />
      </RecommenedNumContainer>
      <ImgInput type="file" accept="image/*" ref={imgInputRef} onChange={onChangeImg} />

      {img === location.state.recreationDetail.photo && (
        <ThumbImgContainer>
          <ThumbImg src={BASE_URL + location.state.recreationDetail.photo} alt="recreation" />
        </ThumbImgContainer>
      )}

      {img !== location.state.recreationDetail.photo && (
        <ThumbImgContainer>
          <ThumbImg src={img} alt="recreation" />
        </ThumbImgContainer>
      )}

      <RecreationEditor
        content={location.state.recreationDetail.content}
        editorRef={editorRef}
        onhandleRegisterButton={onhandleRegisterButton}
      />
      <SubmitBtn type="submit" onClick={onhandleRegisterButton}>
        제출
      </SubmitBtn>
    </RegisterForm>
  );
};

export default UpdateRecreation;

const ThumbImgContainer = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
`;

const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
`;
