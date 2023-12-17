// DatePickerComponent.js
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IconCalender } from "../../../assets";
import "./index.scss";

const CustomDatePicker = ({ onDateChange }) => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate >= today || endDate >= today) {
      setSelectedDateRange({
        startDate,
        endDate,
      });

      if (onDateChange) {
        onDateChange({
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        });
      }
    } else {
      alert("Rentang tanggal harus dimulai dari hari ini atau setelahnya");
    }
  };

  const formatDate = (date) => {
    return date ? date.toISOString().slice(0, 10) : "";
  };

  useEffect(() => {}, [selectedDateRange]);

  return (
    <div>
      <div
        className="input-group p-1 d-flex align-items-center justify-content-start border border-sm"
        style={{ borderRadius: 10 }}>
        <div className="">
          <span className="ml-2">
            <img src={IconCalender} alt="icon calendar" />
          </span>
        </div>
        <div className="date-range-wrapper" style={{ border: "none" }}>
          <DatePicker
            selected={selectedDateRange.startDate}
            onChange={handleDateChange}
            startDate={selectedDateRange.startDate}
            endDate={selectedDateRange.endDate}
            selectsRange={true}
            placeholderText="Pilih tanggal"
            minDate={new Date()}
            id="form-tanggal"
            dateFormat="dd-MMM"
            className="form-control no-border"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomDatePicker;
