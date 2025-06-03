'use client';

import React, { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

const DateSearch = () => {
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);

  useEffect(() => {
    if (dates.length === 2) {
      const checkIn = dates[0]?.format("YYYY-MM-DD");
      const checkOut = dates[1]?.format("YYYY-MM-DD");
      if (checkIn && checkOut) {
        localStorage.setItem("check_in", checkIn);
        localStorage.setItem("check_out", checkOut);
      }
    }
  }, [dates]);

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
        format="MMMM DD"
      />
    </div>
  );
};

export default DateSearch;
