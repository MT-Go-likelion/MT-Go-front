import React, { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import useInput from '../hooks/useInput';
import RecreationEditor from '../components/Editor/RecreationEditor';
import useRecreation from '../hooks/queries/Recreation/useRecreation';
import COLOR from '../constants/color';
import ApiCallSuccessPopup from '../components/Common/Popup/ApiCallSuccessPopup';

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

const SuccessText = styled.div`
  font-size: 1.75rem;
  font-size: bold;
`;

const RecreationRegistration = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [name, onChangeName] = useInput('');
  const [headCountMin, onChangeHeadCountMin] = useInput(0);
  const [headCountMax, onChangeHeadCountMax] = useInput(0);
  const [img, setImg] = useState('');
  const imgInputRef = useRef();
  const editorRef = useRef();
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const { recreaetionMutation } = useRecreation();

  const onChangeImg = (e) => {
    const file = e.target.files[0];
    setImg(file);
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
    <RegisterForm onSubmit={onSubmitRecreation}>
      <ApiCallSuccessPopup success={success} />
      {success && <SuccessText className="text-2xl font-semibold">{success}</SuccessText>}

      <TitleContainer>
        <TitleLabel>제목</TitleLabel>
        <TitleInput onChange={onChangeName} />
      </TitleContainer>
      <RecommenedNumContainer>
        <RecommenedNumLabel>최소 인원</RecommenedNumLabel>
        <RecommenedNumInput onChange={onChangeHeadCountMin} />
      </RecommenedNumContainer>
      <RecommenedNumContainer>
        <RecommenedNumLabel>최대 인원</RecommenedNumLabel>
        <RecommenedNumInput onChange={onChangeHeadCountMax} />
      </RecommenedNumContainer>
      <ImgInput type="file" accept="image/*" ref={imgInputRef} onChange={onChangeImg} />
      <SelectedImg>{img.name}</SelectedImg>
      <RecreationEditor
        content=""
        editorRef={editorRef}
        onhandleRegisterButton={onhandleRegisterButton}
      />
      <SubmitBtn type="submit" onClick={onhandleRegisterButton}>
        제출
      </SubmitBtn>
    </RegisterForm>
  );
};

export default RecreationRegistration;
