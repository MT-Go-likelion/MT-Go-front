import React from 'react';
import styled from 'styled-components';

import RegisterCalendar from '../components/Calendar/RegisterCalendar';

const CalenderBox = styled.div`
  width: 26.25rem;
  max-width: 100%;
  height: 25rem;
  flex-basis: 30%;
`;

const Shopping = () => {
  return (
    <CalenderBox>
      <RegisterCalendar />
    </CalenderBox>
  );
};

export default Shopping;
