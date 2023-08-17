import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../../../constants/color';
import close from '../../../assets/images/close.png';
import { mobileSize } from '../../../utils/MediaSize';
import useSuggestion from '../../../hooks/queries/Auth/useSuggestion';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;
const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR.grayWithOpacity};
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @media (max-width: ${mobileSize}px) {
    background: none;
    align-items: flex-end;
    transform: translateY(100%);
    animation: ${(props) => (props.visible ? slideIn : slideOut)} 0.5s ease-in-out forwards;
  }
`;

const ModalContainter = styled.div`
  width: 20rem;
  height: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${mobileSize}px) {
    background-color: ${COLOR.white};
    padding: 1rem;
    justify-content: initial;
    width: 100%;
    height: 530px;
    border-radius: 32px;
    box-shadow: 2px -7px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
  }
`;

const CloseBtn = styled.img`
  margin-left: auto;
  width: 1.2rem;
  height: 1.2rem;
  color: black;
  cursor: pointer;
`;

const ModalLayout = styled.div`
  width: 100%;
  height: 70%;
  z-index: 999;
  background-color: ${COLOR.white};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  padding: 2rem 1rem;
  font-size: 0.9rem;
  overflow-y: scroll;
  margin-top: 1rem;
  @media (max-width: ${mobileSize}px) {
    box-shadow: none;
    padding: 0 1.5rem 2rem 1.5rem;
  }
`;

const TermsTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  @media (max-width: ${mobileSize}px) {
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 180%;
  }
`;

const TermsContent = styled.input`
  width: 100%;
  height: 80%;
  @media (max-width: ${mobileSize}px) {
    height: 70%;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  @media (max-width: ${mobileSize}px) {
    width: 100%;
    height: 36px;
    text-align: center;
    font-size: 12px;
    border-radius: 50px;
    font-style: normal;
    font-weight: 700;
    line-height: 180%;
    cursor: pointer;
    margin-top: 1rem;
    transition:
      background-color 0.2s,
      border 0.2s;
  }
`;

const CancelBtn = styled(Button)`
  @media (max-width: ${mobileSize}px) {
    border: 4px solid ${COLOR.gray};
    color: ${COLOR.gray};
  }
`;

const SubmitBtn = styled(Button)`
  @media (max-width: ${mobileSize}px) {
    border: 4px solid ${COLOR.primary.blue};
    color: ${COLOR.primary.blue};
  }
`;

const TextContents = styled.div`
  margin-bottom: 2rem;
  @media (max-width: ${mobileSize}px) {
    font-size: 14px;
    text-align: center;
    margin-bottom: 1rem;
  }
`;

const SuggestionModal = ({ setSuggestionModalOpen }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(true);

  const { suggestionMutation } = useSuggestion(user ? user.token : '');

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const closeModal = () => {
    setSuggestionModalOpen(false);
    setVisible(false);
  };

  const submitSuggestion = (e) => {
    e.preventDefault();

    suggestionMutation(content);
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ModalBackdrop onClick={closeModal} visible={visible}>
      <ModalContainter onClick={(e) => e.stopPropagation()}>
        <CloseBtn src={close} onClick={closeModal} />
        <ModalLayout>
          <TermsTitle>건의사항</TermsTitle>
          <TextContents>MTGO에 문의하고 싶은 내용을 기재해주세요.</TextContents>
          <TermsContent placeholder="자유롭게 문의사항을 적어주세요." onChange={onChangeContent} />
          <BottomContainer>
            <CancelBtn onClick={closeModal}>취소</CancelBtn>
            <SubmitBtn onClick={submitSuggestion}>작성</SubmitBtn>
          </BottomContainer>
        </ModalLayout>
      </ModalContainter>
    </ModalBackdrop>
  );
};

export default SuggestionModal;
