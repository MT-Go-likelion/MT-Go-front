import React, { useState } from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';

const OPTION = [
  { value: '', name: '인원' },
  { value: '10Head', name: '10명 이하' },
  { value: '20Head', name: '20명 이하' },
  { value: '30Head', name: '30명 이하' },
];

// 사용자가
// 데이터 다 보내주고 필터링해서 띄워주는 거

const StyledSelect = styled.select`
  border-radius: 30px;
  background: #${COLOR.white};
  width: 110px;
  height: 33px;
  padding-left: 10px;
  color: ${(props) => (props.selectedCount === '' ? `${COLOR.lightGray}` : `${COLOR.black}`)};
`;

const SelectBox = ({ options }) => {
  const [selectedCount, setSelectedCount] = useState('');

  const handleChange = (event) => {
    setSelectedCount(event.target.value);
  };

  return (
    <StyledSelect onChange={handleChange} selectedCount={selectedCount}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

function Headcount() {
  return <SelectBox options={OPTION}> </SelectBox>;
}

export default Headcount;
