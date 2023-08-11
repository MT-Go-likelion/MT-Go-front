import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';
import useSelect from '../../hooks/useSelect';
import { mobileSize } from '../../utils/MediaSize';

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
  color: ${(props) => (props.$count === '' ? `${COLOR.lightGray}` : `${COLOR.black}`)};
  @media (max-width: ${mobileSize}px) {
    width: 78px;
    height: 26px;
    padding-left: 5px;
  }
`;

const SelectBox = ({ options }) => {
  const [count, onChangeCount] = useSelect('');

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

function Headcount() {
  return <SelectBox options={OPTION}> </SelectBox>;
}

export default Headcount;
