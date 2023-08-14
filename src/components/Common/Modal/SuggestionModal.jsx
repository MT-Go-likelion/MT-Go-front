import React, { useEffect } from 'react';
import styled from 'styled-components';

import COLOR from '../../../constants/color';
import close from '../../../assets/images/close.png';

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
`;

const ModalContainter = styled.div`
  width: 20rem;
  height: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

const TermsTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TermsContent = styled.textarea`
  width: 100%;
  height: 80%;
`;

const BottomContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
`;

const CancelBtn = styled.button``;

const SubmitBtn = styled.button``;

const SuggestionModal = ({ setSuggestionModalOpen }) => {
  const closeModal = () => {
    setSuggestionModalOpen(false);
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
    <ModalBackdrop onClick={closeModal}>
      <ModalContainter onClick={(e) => e.stopPropagation()}>
        <CloseBtn src={close} onClick={closeModal} />
        <ModalLayout>
          <TermsTitle>건의사항</TermsTitle>
          <TermsContent />
          <BottomContainer>
            <CancelBtn onClick={closeModal}>취소</CancelBtn>
            <SubmitBtn>작성</SubmitBtn>
          </BottomContainer>
        </ModalLayout>
      </ModalContainter>
    </ModalBackdrop>
  );
};

export default SuggestionModal;
