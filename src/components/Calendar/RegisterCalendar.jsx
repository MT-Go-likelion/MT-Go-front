import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import '../../styles/Calendar.css';
import moment from 'moment';
import COLOR from '../../constants/color';
import useInput from '../../hooks/useInput';

const DATES = [
  { date: '2023-08-04', price: 2000000 },
  { date: '2023-08-10', price: 1000000 },
  { date: '2023-08-23', price: 3000000 },
  { date: '2023-09-04', price: 4000000 },
  { date: '2023-09-10', price: 1000000 },
  { date: '2023-09-23', price: 2000000 },
];

const CalenderBox = styled.div`
  width: 26.25rem;
  max-width: 100%;
  height: 25rem;
`;

const CalendarLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedDateText = styled.div`
  color: ${COLOR.black};
`;

const SelectedDateForm = styled.form`
  color: ${COLOR.gray};
  margin-top: 4rem;
`;

const PriceInput = styled.input``;

const SubmitBtn = styled.button``;

const DotBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: ${COLOR.red};
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
  margin-top: 2px;
`;

const RegisterCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState(DATES);
  const [price, onChangePrice, setPrice] = useInput(0);

  const onChangeDate = (date) => {
    updateDateAndPrice(date);
  };

  const updateDateAndPrice = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));

    const selected = dates.find((dateObj) => dateObj.date === moment(date).format('YYYY-MM-DD'));
    if (selected === undefined) setPrice(0);
    else setPrice(selected.price);
  };

  const onSubmitPrice = (e) => {
    e.preventDefault();

    setDates((state) => {
      return [...state, { date: selectedDate, price: Number(price) }];
    });
  };

  const addContent = ({ date }) => {
    const contents = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dates.find((dayObj) => dayObj.date === moment(date).format('YYYY-MM-DD'))) {
      contents.push(
        <DotBox>
          <Dot />
        </DotBox>,
      );
    }

    return <div>{contents}</div>;
  };

  useEffect(() => {
    const curDate = new Date();
    updateDateAndPrice(curDate);
  }, []);

  return (
    <CalenderBox>
      <CalendarLayout>
        <Calendar
          onChange={onChangeDate}
          value={selectedDate}
          formatDay={(locale, date) => moment(date).format('D')}
          tileContent={addContent}
          showNeighboringMonth={false}
        />
        <SelectedDateForm onSubmit={onSubmitPrice}>
          <SelectedDateText>{moment(selectedDate).format('YYYY-MM-DD')}</SelectedDateText>
          <PriceInput name="price" value={price} onChange={onChangePrice} />
          <SubmitBtn type="submit">입력</SubmitBtn>
        </SelectedDateForm>
      </CalendarLayout>
    </CalenderBox>
  );
};

export default RegisterCalendar;
