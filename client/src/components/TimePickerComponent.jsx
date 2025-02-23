import React from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const TimePickerComponent = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker", "TimePicker"]}>
        <TimePicker
          label="Time"
          value={props.value}
          onChange={(newValue) => props.setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimePickerComponent;
