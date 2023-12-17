import React, { useState } from "react";
import { InputDate } from "../elements/Form";

const AnotherComponent = () => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
    duration: null,
  });

  const handleDatePickerChange = (selectedDates) => {
    // Add one day to both startDate and endDate
    const startDateWithOneDay =
      selectedDates.startDate && new Date(selectedDates.startDate);
    const endDateWithOneDay =
      selectedDates.endDate && new Date(selectedDates.endDate);

    if (startDateWithOneDay) {
      startDateWithOneDay.setDate(startDateWithOneDay.getDate() + 1);
    }

    if (endDateWithOneDay) {
      endDateWithOneDay.setDate(endDateWithOneDay.getDate() + 1);
    }

    // Calculate the duration in days
    const duration =
      startDateWithOneDay && endDateWithOneDay
        ? Math.ceil(
            (endDateWithOneDay - startDateWithOneDay) / (1000 * 60 * 60 * 24)
          )
        : null;

    // Set the selected dates and duration in the component state
    setSelectedDate({
      startDate: startDateWithOneDay,
      endDate: endDateWithOneDay,
      duration: duration + 1,
    });
  };

  return (
    <div>
      <h2>Another Component</h2>
      <InputDate onDateChange={handleDatePickerChange} />
      {/* Log the selected dates and duration */}
      <p>Selected Dates: {JSON.stringify(selectedDate)}</p>
      <p>Duration: {selectedDate.duration} days</p>
      {/* Other content */}
    </div>
  );
};

export default AnotherComponent;
