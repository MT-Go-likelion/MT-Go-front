import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import '../../styles/Calendar.css';
import moment from 'moment';
import COLOR from '../../constants/color';

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

const DetailCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDatePrice, setSelectedDatePrice] = useState(0);

  const onChangeDate = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    onChangePrice(date);
  };

  const onChangePrice = (date) => {
    const selected = DATES.find((dateObj) => dateObj.date === moment(date).format('YYYY-MM-DD'));

    if (selected === undefined) setSelectedDatePrice('가격 정보 없음');
    else setSelectedDatePrice(selected.price);
  };

  const addContent = ({ date }) => {
    const contents = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠 추가
    if (DATES.find((dayObj) => dayObj.date === moment(date).format('YYYY-MM-DD'))) {
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
    onChangePrice(curDate);
  }, []);

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
    </CalendarLayout>
  );
};

export default DetailCalendar;
