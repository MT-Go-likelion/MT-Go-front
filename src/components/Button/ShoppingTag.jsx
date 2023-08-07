import styled from 'styled-components';
import COLOR from '../../constants/color';

const BlueButton = styled.button`
  width: 160px;
  height: 33px;
  border-radius: 32px;
  background-color: ${COLOR.primary.blue};
  color: ${COLOR.white};
  font-size: 16px;
  font-weight: 700;
  line-height: 180%;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border 0.2s;

  &:active {
    border: 3px solid ${COLOR.primary.blue};
  }
`;

export default BlueButton;
