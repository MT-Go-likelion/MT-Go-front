import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import COLOR from '../../../constants/color';
import { mobileSize } from '../../../utils/MediaSize';

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

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  @media (max-width: ${mobileSize}px) {
    background: none;
    align-items: flex-end;
    transform: translateY(100%);
    animation: ${(props) => (props.visible ? slideIn : slideOut)} 0.5s
      cubic-bezier(0.18, 0.25, 0.32, 1.15) forwards;
  }
`;

const PopupContainer = styled.div`
  width: 570px;
  height: 230px;
  background-color: ${COLOR.white};
  padding: 1rem;
  border-radius: 48px;
  @media (max-width: ${mobileSize}px) {
    width: 100%;
    min-height: 260px;
    border-radius: 32px;
    box-shadow: 2px -7px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
  }
`;

const PopupContent = styled.div`
  padding: 1.3rem 3.6rem;
  @media (max-width: ${mobileSize}px) {
    text-align: center;
    padding: 1.3rem 2rem;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: ${mobileSize}px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 2.6rem;
  @media (max-width: ${mobileSize}px) {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 180%;
    margin-bottom: 1rem;
  }
`;

//            <Submitbutton onClick={onConfirm}>Delete</Submitbutton>
const Button = styled.button`
  width: 110px;
  height: 36px;
  text-align: center;
  font-size: 16px;
  border-radius: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: 180%;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border 0.2s;
  @media (max-width: ${mobileSize}px) {
    width: 100%;
  }
`;

const DeleteButton = styled(Button)`
  color: ${COLOR.darkRed};
  border: 4px solid ${COLOR.darkRed};

  &:hover {
    background-color: ${COLOR.lightGray};
  }

  &:active {
    border: 3px solid ${COLOR.primary.blue};
  }
`;

const CancelButton = styled(Button)`
  color: ${COLOR.gray};
  border: 4px solid ${COLOR.gray};

  &:hover {
    background-color: ${COLOR.lightGray};
  }

  &:active {
    border: 3px solid ${COLOR.primary.blue};
  }
  @media (max-width: ${mobileSize}px) {
    color: ${COLOR.white};
    background-color: ${COLOR.gray};
  }
`;

const TextContents = styled.div`
  margin-bottom: 2rem;
  @media (max-width: ${mobileSize}px) {
    font-size: 14px;
  }
`;

const UserDeletePopup = ({ handleUserDelete, handleUserDeleteClose }) => {
  const [visible, setVisible] = useState(true);

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    setVisible(false);
    setTimeout(() => {
      handleUserDelete();
    }, 500);
  };
  const handleDeleteCancel = (e) => {
    e.preventDefault();
    setVisible(false);
    setTimeout(() => {
      handleUserDeleteClose();
    }, 500);
  };

  return (
    <PopupBackground visible={visible}>
      <PopupContainer>
        <PopupContent>
          <Title>정말 탈퇴하시겠습니까?</Title>
          <TextContents>탈퇴하게 되면 관련된 기존 데이터가 모두 삭제됩니다.</TextContents>
          <FlexDiv>
            <DeleteButton onClick={handleDeleteSubmit}>Delete</DeleteButton>
            <CancelButton onClick={handleDeleteCancel}>Cancel</CancelButton>
          </FlexDiv>
        </PopupContent>
      </PopupContainer>
    </PopupBackground>
  );
};

export default UserDeletePopup;
