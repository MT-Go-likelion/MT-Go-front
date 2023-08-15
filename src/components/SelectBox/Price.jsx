import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';

import { mobileSize } from '../../utils/MediaSize';

const OPTION = [
  { value: '', name: '가격' },
  { value: '10~20', name: '10~20만원' },
  { value: '20~30', name: '20-30만원' },
  { value: '30~40', name: '30~40만원' },
];

const StyledSelect = styled.select`
  border-radius: 30px;
  background: #${COLOR.white};
  width: 150px;
  height: 33px;
  padding-left: 10px;
  color: ${COLOR.lightGray};
  color: ${(props) => (props.$price === '' ? `${COLOR.lightGray}` : `${COLOR.black}`)};
  ::selection {
    color: ${COLOR.black};
  }
  @media (max-width: ${mobileSize}px) {
    width: 110px;
    height: 26px;
  }
`;

const SelectBox = ({ options, price, onChangePrice }) => {
  return (
    <StyledSelect onChange={onChangePrice} $price={price}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

function Price({ price, onChangePrice }) {
  return (
    <SelectBox options={OPTION} price={price} onChangePrice={onChangePrice}>
      {' '}
    </SelectBox>
  );
}

export default Price;
