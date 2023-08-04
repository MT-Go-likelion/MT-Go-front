import React, { useState } from 'react';
import styled from 'styled-components';

import Calendar from 'react-calendar';
import '../styles/Calendar.css';
// import moment from 'moment';
import COLOR from '../constants/color';

// const DATES = [
//   { date: '2023-08-04', price: 2000000 },
//   { date: '2023-08-10', price: 1000000 },
//   { date: '2023-08-23', price: 3000000 },
// ];

const CalendarLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const SelectedDateContainer = styled.div`
  color: ${COLOR.gray};
  margin-top: 4rem;
`;

const Shopping = () => {
  const [value, onChange] = useState(new Date());
  // const [mark, setMark] = useState([]);

  // useEffect(() => {
  //   setMark(DATES);
  // }, []);

  return (
    <CalendarLayout>
      <Calendar onChange={onChange} value={value} />
      <SelectedDateContainer>asd</SelectedDateContainer>
    </CalendarLayout>
  );
};

export default Shopping;
