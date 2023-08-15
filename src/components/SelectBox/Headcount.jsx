import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';
import { mobileSize } from '../../utils/MediaSize';

const OPTION = [
  { value: '', name: '인원' },
  { value: '10~20', name: '10~20명' },
  { value: '20~30', name: '20~30명' },
  { value: '30~40', name: '30~40명' },
];

const StyledSelect = styled.select`
  border-radius: 30px;
  background: #${COLOR.white};
  width: 110px;
  height: 33px;
  padding-left: 10px;
  color: ${(props) => (props.$count === '' ? `${COLOR.lightGray}` : `${COLOR.black}`)};
  @media (max-width: ${mobileSize}px) {
    width: 78px;
    height: 26px;
    padding-left: 5px;
  }
`;

const SelectBox = ({ options, count, onChangeCount }) => {
  return (
    <StyledSelect onChange={onChangeCount} $count={count}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

function Headcount({ count, onChangeCount }) {
  return (
    <SelectBox options={OPTION} count={count} onChangeCount={onChangeCount}>
      {' '}
    </SelectBox>
  );
}

export default Headcount;
