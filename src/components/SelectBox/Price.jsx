import React, { useState } from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';

const OPTION = [
  { value: '', name: '가격' },
  { value: '10', name: '10만원 이하' },
  { value: '20', name: '20만원 이하' },
  { value: '30', name: '30만원 이하' },
];

const StyledSelect = styled.select`
  border-radius: 30px;
  background: #${COLOR.white};
  width: 150px;
  height: 33px;
  padding-left: 10px;
  color: ${COLOR.lightGray};
  color: ${(props) => (props.selectedPrice === '' ? `${COLOR.lightGray}` : `${COLOR.black}`)};
  ::selection {
    color: ${COLOR.black};
  }
`;

const SelectBox = ({ options }) => {
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  return (
    <StyledSelect onChange={handleChange} selectedPrice={selectedPrice}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

function Price() {
  return <SelectBox options={OPTION}> </SelectBox>;
}

export default Price;
