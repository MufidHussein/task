"use clinet";
import React, { FC, useState } from "react";
import { TextField } from "@mui/material";
import { addDays, endOfDay, format, parseISO } from "date-fns";

interface CustomDateFieldProps {
  id: string;
  label: string;
  name: string;
  selectedDates?: string[];
  onChange?: (servingTimes: string[]) => void;
}

const CustomDateField: FC<CustomDateFieldProps> = ({
  id,
  label,
  name,
  selectedDates = [],
  onChange,
}) => {
  const today = new Date();
  const todayISOString = format(today, "yyyy-MM-dd");
  const maxDate = format(addDays(today, 1), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(todayISOString);
  const handleDateChange = (event: any) => {
    const selectedValue = event.target.value;
    if (selectedValue >= maxDate) {
      return;
    }
    setSelectedDate(selectedValue);
    if (onChange) {
      onChange([...selectedDates, selectedValue]);
    }
  };

  return (
    <TextField
      margin="normal"
      fullWidth={true}
      id={id}
      label={label}
      name={name}
      type="datetime-local"
      value={selectedDate}
      onChange={handleDateChange}
      inputProps={{
        max: format(endOfDay(parseISO(maxDate)), "yyyy-MM-dd'T'HH:mm"),
      }}
      required
    />
  );
};

export default CustomDateField;
