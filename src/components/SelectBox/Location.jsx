import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';
import { mobileSize } from '../../utils/MediaSize';

const OPTION = [
  { value: '', name: '위치' },
  { value: '대성리', name: '대성리' },
  { value: '우이동', name: '우이동' },
  { value: '가평', name: '가평' },
];

const StyledSelect = styled.select`
  border-radius: 30px;
  background: #${COLOR.white};
  width: 150px;
  height: 33px;
  padding-left: 10px;
  color: ${(props) => (props.$place === '' ? `${COLOR.lightGray}` : `${COLOR.black}`)};
  ::selection {
    color: ${COLOR.black};
  }
  @media (max-width: ${mobileSize}px) {
    width: 78px;
    height: 26px;
  }
`;

const SelectBox = ({ options, place, onChangePlace }) => {
  return (
    <StyledSelect onChange={onChangePlace} $place={place}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

function Location({ place, onChangePlace }) {
  return (
    <SelectBox options={OPTION} place={place} onChangePlace={onChangePlace}>
      {' '}
    </SelectBox>
  );
}

export default Location;
