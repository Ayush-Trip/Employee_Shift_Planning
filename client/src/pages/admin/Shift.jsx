import moment from "moment-timezone";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import DatePickerComponent from "../../components/DatePickerComponent";
import TimePickerComponent from "../../components/TimePickerComponent";
import { Box, Grid, Typography } from "@mui/material";

const Shift = () => {
  const [shiftDate, setShiftDate] = useState(dayjs());
  const [shiftStartTime, setShiftStartTime] = useState(dayjs(`${dayjs()}`));
  const [shiftEndTime, setShiftEndTime] = useState(dayjs(`${dayjs()}`));
  const [timezone, setTimezone] = useState("");
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const allTimezones = moment.tz.names();

  const rows = availableEmployees.map((employee, index) => {
    return {
      id: employee.user._id,
      employeeName: employee.user.name,
      employeeID: employee.user._id,
      startTime: employee.convertedAvailability.startTime,
      endTime: employee.convertedAvailability.endTime,
    };
  });
  const columns = [
    { field: "employeeName", headerName: "Employee Name", width: 130 },
    { field: "startTime", headerName: "Start Time", width: 100 },
    { field: "endTime", headerName: "End Time", width: 100 },
  ];

  const handleSelectionChange = (selectionModel) => {
    if (selectionModel.length > 0) {
      const selectedId = selectionModel[0];
      const selectedEmployee = availableEmployees.find(
        (emp) => emp.user._id === selectedId
      );
      setSelectedEmployeeId(
        selectedEmployee ? selectedEmployee.user._id : null
      );
      console.log(
        "Selected Employee ID:",
        selectedEmployee ? selectedEmployee.user._id : null
      );
    } else {
      setSelectedEmployeeId(null);
    }
  };

  const checkEmployees = async () => {
    const data = {
      date: dayjs(shiftDate).format("YYYY-MM-DD"),
      startTime: dayjs(shiftStartTime).format("HH:mm"),
      endTime: dayjs(shiftEndTime).format("HH:mm"),
      timezone,
    };
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/admin/availableEmployees",
      {
        params: data,
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.data.length > 0) {
      setAvailableEmployees(response.data);
    }
  };

  const saveShift = async () => {
    const data = {
      date: dayjs(shiftDate).format("YYYY-MM-DD"),
      startTime: dayjs(shiftStartTime).format("HH:mm"),
      endTime: dayjs(shiftEndTime).format("HH:mm"),
      timezone,
      employeeId: selectedEmployeeId,
    };
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/admin/shifts", data, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log("created");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Shift Scheduling
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Date</Typography>
          <DatePickerComponent
            value={shiftDate}
            setValue={(newDate) => setShiftDate(newDate)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Start Time</Typography>
          <TimePickerComponent
            value={shiftStartTime}
            setValue={(newTime) => setShiftStartTime(newTime)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1">End Time</Typography>
          <TimePickerComponent
            value={shiftEndTime}
            setValue={(newTime) => setShiftEndTime(newTime)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="timezone-dropdown">Timezone</InputLabel>
            <Select
              labelId="timezone-dropdown-label"
              id="timezone-dropdown-label"
              value={timezone}
              label="Timezone"
              onChange={(e) => setTimezone(e.target.value)}
            >
              {allTimezones.map((timezone, index) => (
                <MenuItem value={timezone} key={index}>
                  {timezone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={checkEmployees}>
            Check Employees
          </Button>
        </Grid>
      </Grid>

      <Paper sx={{ height: 400, width: "100%", marginTop: 3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowSelectionModelChange={(newId) => {
            handleSelectionChange(newId);
          }}
          rowSelectionModel={selectedEmployeeId ? [selectedEmployeeId] : []}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={saveShift}>
          Save Shift
        </Button>
      </Box>
    </Box>
  );
};

export default Shift;
