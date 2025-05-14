'use client';

import DatePicker from "react-multi-date-picker";

const DateSearch = ({ dates, setDates }) => {
  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={setDates}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="MMMM DD YYYY"
      />
    </div>
  );
};

export default DateSearch;
