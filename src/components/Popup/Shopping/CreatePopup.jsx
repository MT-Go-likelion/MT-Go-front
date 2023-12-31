import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import COLOR from '../../../constants/color';

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
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  animation: ${(props) => (props.visible ? slideIn : slideOut)} 0.5s ease-in-out;
`;
const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  border-radius: 32px 32px 0px 0px;
  box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 245px;
  gap: 1rem;
`;

const BlueButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 32px;
  background-color: ${COLOR.primary.blue};
  color: ${COLOR.white};
  font-size: 15px;
  font-weight: 700;
  line-height: 180%;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border 0.2s;

  &:active {
    border: 3px solid ${COLOR.primary.blue};
  }
`;

const Input = styled.input`
  border-radius: 30px;
  text-align: right;
  border: 1px solid ${COLOR.lightGray};
  padding: 10px;
  width: 160px;
  margin: 0 1rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 1rem;
`;

const SumDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const SumContent = styled.div`
  font-size: 14px;
  padding: 10px 19px 10px 15px;
  margin: 0 1rem;
  width: 160px;

  border-radius: 30px;
  text-align: right;
  border: 1px solid ${COLOR.lightGray};
`;

const ShoppingPopup = ({ isVisible, onClose, onComplete }) => {
  const [item, setName] = useState('');
  const [visible, setVisible] = useState(isVisible);
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleComplete = (e) => {
    if (amount !== '' && price !== '') {
      onComplete(item, amount, price);
      e.preventDefault();
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };
  const handleClose = (e) => {
    e.preventDefault();
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  return isVisible ? (
    <PopupOverlay visible={visible}>
      <FlexDiv>
        <PopupContent>
          상품이름, 갯수, 가격을 입력해주세요
          <InputContent>
            <Input
              type="string"
              value={item}
              placeholder="상품이름"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="number"
              value={amount}
              placeholder="수량"
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              type="number"
              value={price}
              placeholder="단가"
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputContent>
          <SumDiv>
            총 금액 : <SumContent>{amount * price || 0} 원</SumContent>
          </SumDiv>
          <ButtonDiv>
            <BlueButton type="button" onClick={handleClose}>
              취소
            </BlueButton>
            <BlueButton type="button" onClick={handleComplete}>
              완료
            </BlueButton>
          </ButtonDiv>
        </PopupContent>
      </FlexDiv>
    </PopupOverlay>
  ) : null;
};

export default ShoppingPopup;
