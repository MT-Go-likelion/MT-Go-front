import React, { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useInput from '../hooks/useInput';
import RecreationEditor from '../components/Editor/RecreationEditor';
import useRecreation from '../hooks/queries/Recreation/useRecreation';
import COLOR from '../constants/color';
import camera from '../assets/images/camera.png';
import ApiCallSuccessPopup from '../components/Common/Popup/ApiCallSuccessPopup';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: auto;
  padding: 2rem;
`;

const FormTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const RegisterForm = styled.form``;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;

  margin-bottom: ${(props) => props.mb && `${props.mb}rem`};
`;

const FormLabel = styled.div`
  font-size: 1rem;
  color: ${COLOR.black};
  margin-bottom: 0.25rem;
  margin-right: 0.2rem;
  flex-basis: 7%;
`;

const FormInput = styled.input`
  width: 80%;
  padding: 0.5rem;
  border: 1px solid ${COLOR.gray};
  border-radius: 4px;
  flex-basis: 93%;

  height: ${(props) => props.height && `${props.height}rem`};
`;

const ImgInput = styled.input`
  display: none;
`;

const ImgBtn = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  margin-left: 1rem;
`;

const ImgText = styled.div`
  font-size: 0.8rem;
  color: ${COLOR.gray};
  margin-left: 0.7rem;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;
const PreviewImgContainer = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SubmitBtn = styled.button`
  width: 7.5rem;
  height: 2.2rem;
  background-color: ${COLOR.primary.blue};
  color: ${COLOR.white};
  border-radius: 1.5rem;
  margin-top: 2rem;
  float: right;
`;

const RecreationRegistration = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [name, onChangeName] = useInput('');
  const [headCountMin, onChangeHeadCountMin] = useInput(0);
  const [headCountMax, onChangeHeadCountMax] = useInput(0);
  const [img, setImg] = useState('');
  const [previewImg, setPreviewImg] = useState('');
  const imgInputRef = useRef();
  const editorRef = useRef();
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const { recreaetionMutation } = useRecreation();

  const onClickImgInput = (e) => {
    e.preventDefault();
    imgInputRef.current.click();
  };

  const onChangeImg = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setPreviewImg(URL.createObjectURL(file));
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
    formData.append('photo', img);
    formData.append('headCountMin', headCountMin);
    formData.append('headCountMax', headCountMax);

    if (user) {
      recreaetionMutation(formData, {
        onSuccess: () => {
          setSuccess('✅ 레크레이션이 성공적으로 추가되었습니다!');
          setTimeout(() => setSuccess(null), 3000);
        },
      });
    } else {
      navigate('/signin');
    }
  };

  return (
    <FormContainer>
      <ApiCallSuccessPopup success={success} />
      <FormTitle>레크레이션 등록</FormTitle>
      <RegisterForm onSubmit={onSubmitRecreation}>
        <InputContainer>
          <FormLabel>제목:</FormLabel>
          <FormInput onChange={onChangeName} />
        </InputContainer>
        <InputContainer>
          <FormLabel>최소 인원:</FormLabel>
          <FormInput onChange={onChangeHeadCountMin} />
        </InputContainer>
        <InputContainer>
          <FormLabel>최대 인원:</FormLabel>
          <FormInput onChange={onChangeHeadCountMax} />
        </InputContainer>

        <ImgContainer>
          {previewImg && (
            <PreviewImgContainer>
              <PreviewImg src={previewImg} alt="main" />
            </PreviewImgContainer>
          )}
          <ImgInput type="file" accept="image/*" ref={imgInputRef} onChange={onChangeImg} />
          <ImgBtn src={camera} onClick={onClickImgInput} />
          <ImgText>메인이미지(1장)</ImgText>
        </ImgContainer>
        <RecreationEditor
          content=""
          editorRef={editorRef}
          onhandleRegisterButton={onhandleRegisterButton}
        />
        <SubmitBtn type="submit" onClick={onhandleRegisterButton}>
          완료
        </SubmitBtn>
      </RegisterForm>
    </FormContainer>
  );
};

export default RecreationRegistration;
