import React from 'react';
import styled from 'styled-components';
import COLOR from '../../constants/color';
import useSelect from '../../hooks/useSelect';

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
  color: ${(props) => (props.place === '' ? `${COLOR.lightGray}` : `${COLOR.black}`)};
  ::selection {
    color: ${COLOR.black};
  }
`;

const SelectBox = ({ options }) => {
  const [place, onChangePlace] = useSelect('');

  return (
    <StyledSelect onChange={onChangePlace} place={place}>
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
