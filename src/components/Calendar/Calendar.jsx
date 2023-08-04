import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import '../../styles/Calendar.css';
import moment from 'moment';
import COLOR from '../../constants/color';
// import useInput from '../hooks/useInput';

const DATES = [
  { date: '2023-08-04', price: 2000000 },
  { date: '2023-08-10', price: 1000000 },
  { date: '2023-08-23', price: 3000000 },
  { date: '2023-09-04', price: 4000000 },
  { date: '2023-09-10', price: 1000000 },
  { date: '2023-09-23', price: 2000000 },
];

const CalendarLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedDateContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const SelectedDateText = styled.div`
  color: ${COLOR.black};
`;

const SelectedDatePriceText = styled.div`
  color: ${COLOR.black};
`;

// const SelectedDateForm = styled.form`
//   color: ${COLOR.gray};
//   margin-top: 4rem;
// `;

// const PriceInput = styled.input``;

// const SubmitBtn = styled.button``;

const DotBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
  margin-top: 2px;
`;

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDatePrice, setSelectedDatePrice] = useState(0);
  // const [price, onChangePrice] = useInput('');

  const onChangeDate = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    const selected = DATES.find((dateObj) => dateObj.date === moment(date).format('YYYY-MM-DD'));

    if (selected === undefined) setSelectedDatePrice('가격 정보 없음');
    else setSelectedDatePrice(selected.price);
  };

  // const onSubmitPrice = (e) => {
  //   e.preventDefault();

  //   setDates((state) => {
  //     return { ...state, state };
  //   });
  // };

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date }) => {
    // console.log(date);
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (DATES.find((dayObj) => dayObj.date === moment(date).format('YYYY-MM-DD'))) {
      contents.push(
        <DotBox>
          <Dot />
        </DotBox>,
      );
    }

    return <div>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  return (
    <CalendarLayout>
      <Calendar
        onChange={onChangeDate}
        value={selectedDate}
        formatDay={(locale, date) => moment(date).format('D')}
        tileContent={addContent}
        showNeighboringMonth={false}
      />
      <SelectedDateContainer>
        <SelectedDateText>{moment(selectedDate).format('YYYY-MM-DD')}</SelectedDateText>
        <SelectedDatePriceText>{selectedDatePrice}</SelectedDatePriceText>
      </SelectedDateContainer>
      {/* <SelectedDateForm onSubmit={onSubmitPrice}>
          <SelectedDateText>{moment(selectedDate).format('YYYY-MM-DD')}</SelectedDateText>
          <PriceInput name="price" value={price} onChange={onChangePrice} />
          <SubmitBtn type="submit">입력</SubmitBtn>
        </SelectedDateForm> */}
    </CalendarLayout>
  );
};

export default CalendarComponent;
