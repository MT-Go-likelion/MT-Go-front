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
    animation: ${(props) => (props.visible ? slideIn : slideOut)} 0.7s
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
    min-height: 190px;
    height: 190px;
    border-radius: 32px;
    box-shadow: 2px -7px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
  }
`;

const PopupContent = styled.div`
  padding: 1.3rem 3.6rem;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 2.6rem;
  @media (max-width: ${mobileSize}px) {
    font-size: 18px;
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
    background-color: ${COLOR.gray};
    color: ${COLOR.white};
  }
`;

const LeaveTeamPopup = ({ handleLeave, handleLeaveClose }) => {
  const [visible, setVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisible(false);
    setTimeout(() => {
      handleLeave();
    }, 500);
  };

  const handleCancel = () => {
    setVisible(false);
    setTimeout(() => {
      handleLeaveClose();
    }, 500);
  };

  return (
    <PopupBackground visible={visible}>
      <PopupContainer>
        <PopupContent>
          <Title>팀스페이스를 떠나시겠습니까?</Title>
          <FlexDiv>
            <DeleteButton onClick={handleSubmit}>Leave</DeleteButton>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          </FlexDiv>
        </PopupContent>
      </PopupContainer>
    </PopupBackground>
  );
};

export default LeaveTeamPopup;
