import React, { useState, useEffect } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import "./CustomCalender.scss";

import calenderIcon from "./../../assests/images/calender.svg";

function CustomCalender({ day, range, onChange }) {
  const [selectedDay, setSelectedDay] = useState({
    year: day?.year,
    month: day?.month,
    day: day?.day,
  });
  const [selectedRange, setSelectedRange] = useState({
    from: {
      year: range?.from?.year,
      month: range?.from?.month + 1,
      day: range?.from?.day,
    },
    to: {
      year: range?.to?.year,
      month: range?.to?.month + 1,
      day: range?.to?.day,
    },
  });
  // const [calRange, setCalRange] = useState({from: range?.from, to: range?.to});

  // useEffect(()=>{
  //     setSelectedRange({
  //         from: {
  //             year: range?.from?.year,
  //             month: range?.from?.month + 1,
  //             day: range?.from?.day
  //         },
  //         to: {
  //             year: range?.to?.year,
  //             month: range?.to?.month + 1,
  //             day: range?.to?.day
  //         }
  //     })
  // },[range])

  useEffect(() => {
    if (selectedRange.from && selectedRange.to) {
      onChange({
        from: {
          year: selectedRange?.from?.year,
          month: selectedRange?.from?.month - 1,
          day: selectedRange?.from?.day,
        },
        to: {
          year: selectedRange?.to?.year,
          month: selectedRange?.to?.month - 1,
          day: selectedRange?.to?.day,
        },
      });
    }
  }, [selectedRange]);

  const display = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="I'm a custom input"
      value={selectedDay ? `${formatDate(selectedDay)}` : ""}
      className="customCalender" // a styling class
    />
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // convert date to string with month from months array
  const formatDate = (date) => {
    return `${date?.day || ""}, ${months[date?.month - 1] || ""} ${
      date?.year || ""
    }`;
  };

  const displayRange = ({ ref }) => {
    if (
      range &&
      isNaN(selectedRange.from.year) &&
      isNaN(selectedRange.from.day) &&
      !selectedRange.from.month
    ) {
      // debugger;
      setSelectedRange({
        from: {
          year: range?.from?.year,
          month: range?.from?.month + 1,
          day: range?.from?.day,
        },
        to: {
          year: range?.to?.year,
          month: range?.to?.month + 1,
          day: range?.to?.day,
        },
      });
    }
    return (
      <div className="customCalender_inputWrapper">
        <img
          src={calenderIcon}
          alt="calendar"
          className="customCalender_icon"
        />
        <input
          readOnly
          ref={ref} // necessary
          placeholder="I'm a custom input"
          value={
            selectedRange
              ? `${formatDate(selectedRange.from)}  to  ${formatDate(
                  selectedRange.to
                )}`
              : ""
          }
          className="customCalender" // a styling class
        />
      </div>
    );
  };
  // console.log(selectedDay,selectedRange,day,range)
  return (
    <div>
      <DatePicker
        value={range ? selectedRange : selectedDay}
        onChange={range ? setSelectedRange : setSelectedDay}
        inputPlaceholder="Select a day"
        renderInput={range ? displayRange : display}
        shouldHighlightWeekends
        colorPrimary="#5564D1" // added this
        colorPrimaryLight="#F6F6F6"
      />
    </div>
  );
}

export default CustomCalender;
