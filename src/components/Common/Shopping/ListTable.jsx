import React, { useState } from 'react';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import COLOR from '../../../constants/color';

// import Submitbutton from '../../Button/SubmitButton';
import useShopping from '../../../hooks/queries/Shopping/useShopping';
import { formatPrice } from '../../../utils/formatPrice';
import { mobileSize } from '../../../utils/MediaSize';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
  gap: 1rem;
  @media (max-width: ${mobileSize}px) {
    width: 100%;
    align-items: center;
  }
`;
const Border = styled.div`
  border-top: 2px solid ${COLOR.primary.blue};
  border-bottom: 2px solid ${COLOR.primary.blue};
  margin: 0 auto;
  width: 42rem;
  height: 100%;

  padding: 0.5rem 3rem 0.7rem 3rem;
  @media (max-width: ${mobileSize}px) {
    padding: 0;
    border-top: 1px solid ${COLOR.black};
    border-bottom: 1px solid ${COLOR.black};
    width: 100%;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Th = styled.th`
  color: ${COLOR.lightGray};
  border-bottom: 1px solid ${COLOR.lightGray};
  padding: 1rem;
  @media (max-width: ${mobileSize}px) {
    font-size: 14px;
    padding: 0.4rem 0.5rem;
    border-bottom: none;
    width: 100%;
  }
`;
const Td = styled.td`
  padding: 1rem;
  text-align: center;
  @media (max-width: ${mobileSize}px) {
    font-size: 12px;
    padding: 0 0.5rem;
    min-width: 3rem;
    width: 100%;
  }
`;

const Tbody = styled.tbody`
  border-bottom: 1px solid ${COLOR.lightGray};
`;
const SumPrice = styled.div`
  float: right;
  margin: 10px 5rem;
  @media (max-width: ${mobileSize}px) {
    font-size: 14px;
    margin: 0.3rem 0;
  }
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
  width: 6.3rem;
  height: 2.2rem;
  border-radius: 16px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05));
  background-color: ${COLOR.lightGray};
  transition: 0.2s;
  &:hover {
    background-color: ${COLOR.gray};
    color: ${COLOR.white};
  }
  @media (max-width: ${mobileSize}px) {
    height: 1.7rem;
    width: 6.5rem;
    color: ${COLOR.black};
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
  @media (max-width: ${mobileSize}px) {
  }
`;

const Submitbtn = styled.button`
  padding: 0 2.5rem;
  height: 2.2rem;
  background-color: ${COLOR.primary.blue};
  border-radius: 16px;
  @media (max-width: ${mobileSize}px) {
    height: 26px;
    color: ${COLOR.white};
  }
`;

const ListTable = ({ data, setShoppingItems }) => {
  const [editHandle, setEditHandle] = useState(false);
  const totalSum = data.reduce((acc, item) => acc + item.price * item.amount, 0);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const { shoppingMutation } = useShopping(user ? user.token : '');

  const handleEditClick = () => {
    if (user) {
      setEditHandle(true);
    } else {
      navigate('/signin');
    }
  };

  const handleEditComplete = () => {
    setEditHandle(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      shoppingMutation(data);
    } else {
      navigate('/signin');
    }
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
            </tr>
          </thead>
          <Tbody>
            {data.map((item) => (
              <tr key={item.item}>
                <EditableTd>
                  {editHandle === true ? (
                    <EditInput
                      name="item"
                      value={item.item || ''}
                      onChange={(e) => handleInputChange(e, item)}
                    />
                  ) : (
                    item.item
                  )}
                </EditableTd>
                <EditableTd>
                  {editHandle === true ? (
                    <EditInput
                      name="amount"
                      value={item.amount || ''}
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
                      value={item.price || ''}
                      onChange={(e) => handleInputChange(e, item)}
                    />
                  ) : (
                    formatPrice(item.price)
                  )}
                </EditableTd>
                <Td>{formatPrice(item.amount * item.price)}</Td>
              </tr>
            ))}
          </Tbody>
        </Table>
        <SumPrice>총 금액 : {formatPrice(totalSum)} 원 </SumPrice>
      </Border>
      <ButtonDiv>
        {editHandle !== true ? (
          <>
            <EditButton onClick={handleEditClick}>수정</EditButton>

            <Submitbtn onClick={handleSubmit}>제출</Submitbtn>
          </>
        ) : (
          <EditButton onClick={handleEditComplete}>완료</EditButton>
        )}
      </ButtonDiv>
    </Container>
  );
};
export default ListTable;
