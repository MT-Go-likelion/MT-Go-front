import styled from 'styled-components';
import COLOR from '../../constants/color';

const Submitbutton = styled.button`
  width: 120px;
  height: 36px;
  border-radius: 16px;
  background-color: ${COLOR.primary.lightBlue};
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.05));
  color: ${COLOR.white};
  transition: 0.1s;

  &:hover {
    background-color: ${COLOR.primary.blue};
  }
`;

export default Submitbutton;
