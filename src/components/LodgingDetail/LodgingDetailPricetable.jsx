import React from 'react';
import styled from 'styled-components';

const PricingTable = styled.div`
  display: grid;

  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    font-size: 10px;
    padding: 0.5rem;
    text-align: center;
  }
  td {
    padding: 0.5rem;
    text-align: center;
    font-size: 12px;
  }
`;

const Customtd = styled.td`
  font-size: 10px;
  min-width: 4rem;
  max-width: 4rem;
  text-align: left;
`;

const LodgingDetailPricetable = ({
  peakWeekendPrice,
  peakWeekdayPrice,
  lowWeekendPrice,
  lowWeekdayPrice,
}) => {
  return (
    <PricingTable>
      <Table>
        <thead>
          <tr>
            <th> </th>
            <th>성수기</th>
            <th>비성수기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Customtd>평일</Customtd>
            <td>{peakWeekdayPrice}원</td>
            <td>{lowWeekdayPrice}원</td>
          </tr>
          <tr>
            <Customtd>주말 (공휴일포함)</Customtd>
            <td>{peakWeekendPrice}원</td>
            <td>{lowWeekendPrice}원</td>
          </tr>
        </tbody>
      </Table>
    </PricingTable>
  );
};

export default LodgingDetailPricetable;
