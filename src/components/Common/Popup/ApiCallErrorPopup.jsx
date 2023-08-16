import { styled } from 'styled-components';
import COLOR from '../../../constants/color';

const Popup = styled.div`
  position: fixed;
  bottom: 0;
  left: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23rem;
  height: 3rem;
  background-color: ${COLOR.red};
  color: ${COLOR.white};
  padding: 0.5rem 0;
  border-radius: 1rem;
  font-size: 1rem;
  z-index: 9999;
  opacity: ${(props) => (props.error ? 1 : 0)};
  transform: ${(props) => (props.error ? 'translateY(-3rem)' : 'none')};
  transition: all 0.3s ease-in-out;
`;

const ApiCallErrorPopup = ({ error }) => {
  return <Popup error={error}>{error}</Popup>;
};

export default ApiCallErrorPopup;
