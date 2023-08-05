import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/DatePicker.css';

import COLOR from '../../constants/color';

const BoxFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledDatePickerstart = styled(DatePicker)`
  border-radius: 30px 0 0 30px;
  background: #${COLOR.white};
  width: 150px;
  height: 33px;
  padding: 6px;
  color: ${COLOR.black};
  padding-left: 14px;
`;

const StyledDatePickerend = styled(DatePicker)`
  border-radius: 0 30px 30px 0;
  background: #${COLOR.white};
  width: 150px;
  height: 33px;
  padding: 6px;
  color: ${COLOR.black};
  padding-left: 14px;
  &:: placeholder {
	    color: {COLOR.lightGray};
  }
`;

const DateRangePicker = () => {
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);

  return (
    <BoxFlex>
      <div>
        <div>
          <StyledDatePickerstart
            id="departureDate"
            locale={ko}
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            selectsStart
            startDate={departureDate}
            endDate={arrivalDate}
            placeholderText="출발일"
            placeholderTextColor={COLOR.lightGray}
          />
        </div>
      </div>
      <div>
        <div>
          <StyledDatePickerend
            id="arrivalDate"
            locale={ko}
            selected={arrivalDate}
            onChange={(date) => setArrivalDate(date)}
            selectsEnd
            startDate={departureDate}
            endDate={arrivalDate}
            minDate={departureDate}
            placeholderText="도착일"
            placeholderTextColor={COLOR.lightGray}
          />
        </div>
      </div>
    </BoxFlex>
  );
};

export default DateRangePicker;
