import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { useQueryClient } from '@tanstack/react-query';
import COLOR from '../../../constants/color';
import close from '../../../assets/images/close.png';
import { mobileSize } from '../../../utils/MediaSize';
import useUserUpdate from '../../../hooks/queries/Auth/useUserUpdate';
import useInput from '../../../hooks/useInput';
import ApiCallSuccessPopup from '../Popup/ApiCallSuccessPopup';

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
  z-index: 999;

  @media (max-width: ${mobileSize}px) {
    background: none;
    align-items: flex-end;
    transform: translateY(100%);
    animation: ${(props) => (props.visible ? slideIn : slideOut)} 0.5s ease-in-out forwards;
  }
`;

const ModalContainter = styled.div`
  width: 20rem;
  height: 50%;
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
    height: 300px;
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

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserLabel = styled.label`
  margin-right: 1rem;
`;

const UserInput = styled.input`
  border: 1px solid ${COLOR.primary.lightBlue};
  width: 150px;
  height: 30px;
  border-radius: 0.75rem;
  text-align: center;
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

const UserUpdateModal = ({ setUserUpdateModalOpen }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const [userName, onChangeUserName] = useInput(user && user.name);
  const [visible, setVisible] = useState(true);
  const [success, setSuccess] = useState('');

  const { userUpdateMutation } = useUserUpdate(user.pk);

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      setUserUpdateModalOpen(false);
    }, 500);
  };

  const updateUser = (e) => {
    e.preventDefault();

    userUpdateMutation(userName, {
      onSuccess: () => {
        setSuccess('✅ 닉네임이 변경사항이 적용됐습니다!');
        setTimeout(() => setSuccess(null), 3000);
      },
    });
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
    <>
      <ApiCallSuccessPopup success={success} />

      <ModalBackdrop onClick={closeModal} visible={visible}>
        <ModalContainter onClick={(e) => e.stopPropagation()}>
          <CloseBtn src={close} onClick={closeModal} />
          <ModalLayout>
            <TermsTitle>닉네임 변경</TermsTitle>
            <InputContainer>
              <UserLabel>닉네임</UserLabel>
              <UserInput value={userName} onChange={onChangeUserName} />
            </InputContainer>
            <BottomContainer>
              <CancelBtn onClick={closeModal}>취소</CancelBtn>
              <SubmitBtn onClick={updateUser}>변경</SubmitBtn>
            </BottomContainer>
          </ModalLayout>
        </ModalContainter>
      </ModalBackdrop>
    </>
  );
};

export default UserUpdateModal;
