import React from 'react';
import styled from 'styled-components';
import COLOR from '../../../constants/color';

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
`;

const PopupContainer = styled.div`
  width: 570px;
  height: 230px;
  background-color: ${COLOR.white};
  padding: 1rem;
  border-radius: 48px;
`;

const PopupContent = styled.div`
  padding: 1.3rem 3.6rem;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 2.6rem;
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
`;

const TextContents = styled.div`
  margin-bottom: 2rem;
`;

const DeleteSharePopup = ({ handleDeleteClose, handleCancelClose }) => {
  return (
    <PopupBackground>
      <PopupContainer>
        <PopupContent>
          <Title>팀스페이스를 삭제하시겠습니까?</Title>
          <TextContents>
            팀스페이스를 삭제하게 되면 관련된 기존 데이터가 모두 삭제됩니다.
          </TextContents>
          <FlexDiv>
            <DeleteButton onClick={handleDeleteClose}>Delete</DeleteButton>
            <CancelButton onClick={handleCancelClose}>Cancel</CancelButton>
          </FlexDiv>
        </PopupContent>
      </PopupContainer>
    </PopupBackground>
  );
};

export default DeleteSharePopup;
