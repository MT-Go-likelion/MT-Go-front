import React from 'react';
import styled from 'styled-components';
import COLOR from '../../../constants/color';

const Border = styled.div`
  border-top: 2px solid ${COLOR.primary.blue};
  border-bottom: 2px solid ${COLOR.primary.blue};
  margin: 0 auto;
  width: 50rem;
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

const Calculator = () => {
  const data = [
    { item: 'name', amount: 3, price: 10000 },
    { item: 'name', amount: 2, price: 15000 },
    { item: 'name', amount: 1, price: 20000 },
    { item: 'name', amount: 1, price: 20000 },
    { item: 'name', amount: 1, price: 20000 },
    { item: 'name', amount: 1, price: 20000 },
    { item: 'name', amount: 2, price: 15000 },
    { item: 'name', amount: 2, price: 15000 },
    { item: 'name', amount: 3, price: 10000 },
    { item: 'name', amount: 3, price: 10000 },
  ];
  const dataWithTotalPrice = data.map((item) => ({
    ...item,
    totalPrice: item.amount * item.price,
  }));
  const totalSum = dataWithTotalPrice.reduce((acc, item) => acc + item.totalPrice, 0);
  return (
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
          {dataWithTotalPrice.map((item) => (
            <tr key={item.item}>
              <Td>{item.item}</Td>
              <Td>{item.amount}</Td>
              <Td>{item.price}</Td>
              <Td>{item.totalPrice}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
      <SumPrice>총 금액 : {totalSum} 원 </SumPrice>
    </Border>
  );
};

export default Calculator;
