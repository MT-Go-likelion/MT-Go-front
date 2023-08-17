import React, { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useInput from '../hooks/useInput';
import RecreationEditor from '../components/Editor/RecreationEditor';
import COLOR from '../constants/color';
import useRecreationUpdate from '../hooks/queries/Recreation/useRecreationUpdate';
import ApiCallSuccessPopup from '../components/Common/Popup/ApiCallSuccessPopup';
import camera from '../assets/images/camera.png';
import { BASE_URL } from '../config/api';

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

const SubmitBtn = styled.button`
  width: 7.5rem;
  height: 2.2rem;
  background-color: ${COLOR.primary.blue};
  color: ${COLOR.white};
  border-radius: 1.5rem;
  margin-top: 2rem;
  float: right;
`;
const UpdateRecreation = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const location = useLocation();

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

  const { lodgingUpdateMutation } = useRecreationUpdate(location.state.recreationDetail.pk);

  const onClickImgInput = (e) => {
    e.preventDefault();
    imgInputRef.current.click();
  };

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
      lodgingUpdateMutation(formData, {
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
    <FormContainer>
      <ApiCallSuccessPopup success={success} />
      <FormTitle>레크레이션 등록</FormTitle>
      <RegisterForm onSubmit={onSubmitRecreation}>
        <InputContainer>
          <FormLabel>제목:</FormLabel>
          <FormInput onChange={onChangeName} value={name} />
        </InputContainer>
        <InputContainer>
          <FormLabel>최소 인원:</FormLabel>
          <FormInput onChange={onChangeHeadCountMin} value={headCountMin} />
        </InputContainer>
        <InputContainer>
          <FormLabel>최대 인원:</FormLabel>
          <FormInput onChange={onChangeHeadCountMax} value={headCountMax} />
        </InputContainer>

        <ImgContainer>
          <ImgInput type="file" accept="image/*" ref={imgInputRef} onChange={onChangeImg} />
          <ImgBtn src={camera} onClick={onClickImgInput} />

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

          {/* {previewImg && (
            <PreviewImgContainer>
              <PreviewImg src={previewImg} alt="main" />
            </PreviewImgContainer>
          )} */}
          <ImgText>메인이미지(1장)</ImgText>
        </ImgContainer>
        <RecreationEditor
          content={location.state.recreationDetail.content}
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
