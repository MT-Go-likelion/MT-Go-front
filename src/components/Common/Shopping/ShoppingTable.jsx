import React, { useState } from 'react';
import styled from 'styled-components';
import COLOR from '../../../constants/color';

import Submitbutton from '../../Button/SubmitButton';
import CreatePopup from '../../Popup/Shopping/CreatePopup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`;

const Border = styled.div`
  border-top: 2px solid ${COLOR.primary.blue};
  border-bottom: 2px solid ${COLOR.primary.blue};
  margin: 0 auto;
  width: 50rem;
  height: 100%;
  padding: 0.5rem 3rem 0.7rem 3rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  color: ${COLOR.lightGray};
  border-bottom: 1px solid ${COLOR.lightGray};
  padding: 1rem;
`;

const Td = styled.td`
  padding: 1rem;
  text-align: center;
`;

const Tbody = styled.tbody`
  border-bottom: 1px solid ${COLOR.lightGray};
`;

const SumPrice = styled.div`
  float: right;
  margin: 10px 5rem;
`;

const EditableTd = styled(Td)`
  position: relative;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 0.3rem;
  border: none;
  border-bottom: 1px solid ${COLOR.lightGray};
  background-color: transparent;
`;

const EditButton = styled.button`
  width: 100px;
  height: 36px;
  border-radius: 16px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05));
  background-color: ${COLOR.lightGray};
  transition: 0.2s;
  &:hover {
    background-color: ${COLOR.gray};
    color: ${COLOR.white};
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
`;

const DeleteButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 14px;
  background-color: ${COLOR.lightGray};
  text-align: center;
  color: ${COLOR.white};
  transition: 0.3s;
  &:hover {
    background-color: ${COLOR.gray};
  }
`;
const TrPlusRow = styled.tr`
  text-align: center;
`;

const TrPlus = styled.button`
  width: 6rem;
  height: 1.8rem;
  font-size: 25px;
  margin-bottom: 0.5rem;
  border-radius: 14px;
  background-color: ${COLOR.lightGray};
  text-align: center;
  color: ${COLOR.white};
  transition: 0.3s;
  &:hover {
    background-color: ${COLOR.gray};
  }
  margin: 0 auto;
`;

const ShoppingTable = ({ data, setShoppingItems }) => {
  const [editHandle, setEditHandle] = useState(false);
  const [CreatePopupVisible, setCreatePopupVisible] = useState(false);
  const totalSum = data.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleEditClick = () => {
    setEditHandle(true);
  };

  const handleEditComplete = (item, amount, price, totalPrice) => {
    setEditHandle(false);
    if (amount && price && item) {
      const newItem = {
        item,
        amount: parseInt(amount, 10),
        price: parseInt(price, 10),
        totalPrice,
      };
      setShoppingItems((prevItems) => [...prevItems, newItem]);
      console.log(item, amount, price, totalPrice);
    }
    setCreatePopupVisible(false);
  };

  const handleInputChange = (e, item) => {
    const { name, value } = e.target;
    const itemIndex = data.findIndex((i) => i.item === item.item);
    const updatedData = data.map((dataItem, index) => {
      if (index === itemIndex) {
        const updatedItem = { ...dataItem };

        if (name === 'amount') {
          updatedItem.amount = parseInt(value, 10);
          updatedItem.totalPrice = updatedItem.amount * updatedItem.price;
        } else if (name === 'price') {
          updatedItem.price = parseFloat(value);
          updatedItem.totalPrice = updatedItem.amount * updatedItem.price;
        } else if (name === 'totalPrice') {
          updatedItem.totalPrice = parseFloat(value);
        }

        return updatedItem;
      }
      return dataItem;
    });
    setShoppingItems(updatedData);
  };

  const handleDeleteClick = (e, item) => {
    e.stopPropagation();

    const updatedData = data.filter((dataItem) => dataItem.item !== item.item);
    setShoppingItems(updatedData);
  };

  const handleCreateClick = () => {
    setCreatePopupVisible(true);
  };

  const handleCreateClose = () => {
    setCreatePopupVisible(false);
  };

  return (
    <Container>
      <Border>
        <Table>
          <thead>
            <tr>
              <Th>상품명</Th>
              <Th>수량</Th>
              <Th>단가</Th>
              <Th>총금액</Th>
              {editHandle === true ? <Th>삭제</Th> : ''}
            </tr>
          </thead>
          <Tbody>
            {data.map((item) => (
              <tr key={item.item}>
                <Td>
                  {editHandle === true ? (
                    <EditInput
                      name="item"
                      value={item.item}
                      onChange={(e) => handleInputChange(e, item)}
                    />
                  ) : (
                    item.item
                  )}
                </Td>
                <EditableTd>
                  {editHandle === true ? (
                    <EditInput
                      name="amount"
                      value={item.amount}
                      onChange={(e) => handleInputChange(e, item)}
                    />
                  ) : (
                    item.amount
                  )}
                </EditableTd>
                <EditableTd>
                  {editHandle === true ? (
                    <EditInput
                      name="price"
                      value={item.price}
                      onChange={(e) => handleInputChange(e, item)}
                    />
                  ) : (
                    item.price
                  )}
                </EditableTd>
                <Td>{item.totalPrice}</Td>
                <Td>
                  {editHandle === true ? (
                    <DeleteButton onClick={(e) => handleDeleteClick(e, item)}>X</DeleteButton>
                  ) : (
                    ''
                  )}
                </Td>
              </tr>
            ))}
            {editHandle !== true ? (
              <TrPlusRow>
                <Td colSpan="5">
                  <TrPlus onClick={() => handleCreateClick()}>+</TrPlus>
                </Td>
              </TrPlusRow>
            ) : (
              ''
            )}
            <CreatePopup
              isVisible={CreatePopupVisible}
              onClose={handleCreateClose}
              onComplete={(item, amount, price, totalPrice) => {
                handleEditComplete(item, amount, price, totalPrice);
                setCreatePopupVisible(false);
              }}
            />
          </Tbody>
        </Table>
        <SumPrice>총 금액 : {totalSum} 원 </SumPrice>
      </Border>
      {CreatePopupVisible !== true ? (
        <ButtonDiv>
          {editHandle !== true ? (
            <EditButton onClick={handleEditClick}>수정</EditButton>
          ) : (
            <EditButton onClick={handleEditComplete}>완료</EditButton>
          )}
          {editHandle !== true ? <Submitbutton>제출</Submitbutton> : ''}
        </ButtonDiv>
      ) : (
        ''
      )}
    </Container>
  );
};

export default ShoppingTable;
