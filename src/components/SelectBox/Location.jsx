import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';

const OPTION = [
  { value: '', name: '위치' },
  { value: 'Daeseongri', name: '대성리' },
  { value: 'uidong', name: '우이동' },
  { value: 'Gapyeong', name: '가평' },
];

const StyledSelect = styled.select`
  border-radius: 30px;
  background: #${COLOR.white};
  width: 150px;
  height: 33px;
  padding-left: 10px;
  color: ${COLOR.lightGray};
  ::selection {
    color: ${COLOR.black};
  }
`;

const SelectBox = ({ options }) => {
  return (
    <StyledSelect>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

function Location() {
  return <SelectBox options={OPTION}> </SelectBox>;
}

export default Location;
