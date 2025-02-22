import React, { useEffect, useState } from "react";
import TimePickerComponent from "../../components/TimePickerComponent";
import DatePickerComponent from "../../components/DatePickerComponent";
import dayjs, { Dayjs } from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import moment from "moment-timezone";

const Availability = () => {
  const [timezone, setTimezone] = useState("");
  const [availabilityData, setAvailabilityData] = useState([]);
  const allTimezones = moment.tz.names();

  const [availability, setAvailability] = useState([
    {
      date: dayjs(),
      day: dayjs().format("dddd"),
      startTime: dayjs(`${dayjs()}`),
      endTime: dayjs(`${dayjs().add(4, "hours")}`),
    },
  ]);

  const handleAddAvailability = () => {
    setAvailability([
      ...availability,
      {
        date: dayjs(),
        day: dayjs().format("dddd"),
        startTime: dayjs("08:00", "HH:mm"),
        endTime: dayjs("17:00", "HH:mm"),
      },
    ]);
    setAvailabilityData([...availabilityData, newAvailability]);
  };
  const handleChange = (index, field, value) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;

    if (field === "date") {
      const day = dayjs(value).format("dddd");
      newAvailability[index].day = day;
    }

    setAvailability(newAvailability);
  };

  const createAvailability = async () => {
    const token = localStorage.getItem("token");
    const data = {
      availability: availability.map((entry) => ({
        date: entry.date.format("YYYY-MM-DD"),
        day: entry.day,
        startTime: entry.startTime.format("HH:mm"),
        endTime: entry.endTime.format("HH:mm"),
      })),
      timezone,
    };

    if (token) {
      await axios.post("http://localhost:5000/employee/availability", data, {
        headers: {
          Authorization: `${token}`,
        },
      });
    } else {
      console.log("No token found, please login");
    }
    console.log("Availability Created");
  };

  const getEmployeeAvailability = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(
        "http://localhost:5000/employee/availability",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setAvailabilityData(response.data.availability);
      console.log("res", response);
    } else {
      console.log("No token found, please login");
    }
  };

  useEffect(() => {
    getEmployeeAvailability();
  }, []);
  useEffect(() => {
    // setAvailability(availabilityData)
    console.log("avai", availability);
  }, []);

  return (
    <>
      {/* Form */}
      <Typography variant="h6">Set Your Availability</Typography>
      <Grid container spacing={2}>
        {availability.map((entry, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 2 }}>
              <Typography variant="body1" gutterBottom>
                Availability {index + 1}
              </Typography>

              <div>
                <p>Date</p>
                <DatePickerComponent
                  value={entry.date}
                  setValue={(newDate) => handleChange(index, "date", newDate)}
                />
              </div>

              <div>
                <p>Start Time</p>
                <TimePickerComponent
                  value={entry.startTime}
                  setValue={(newTime) =>
                    handleChange(index, "startTime", newTime)
                  }
                />
              </div>

              <div>
                <p>End Time</p>
                <TimePickerComponent
                  value={entry.endTime}
                  setValue={(newTime) =>
                    handleChange(index, "endTime", newTime)
                  }
                />
              </div>

              <p>
                <strong>Day:</strong> {entry.day}
              </p>
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* Timezone Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="timezone-dropdown">Timezone</InputLabel>
        <Select
          labelId="timezone-dropdown-label"
          id="timezone-dropdown-label"
          value={timezone}
          label="Timezone"
          onChange={(e) => setTimezone(e.target.value)}
        >
          {allTimezones.map((timezone, index) => {
            return (
              <MenuItem value={timezone} key={index}>
                {timezone}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {/* Add Availability for multiple days*/}
      <Button variant="contained" onClick={handleAddAvailability}>
        Add Availability
      </Button>

      {/* Create Availability */}
      <Button variant="contained" onClick={createAvailability} type="submit">
        Create
      </Button>

      {/* Table */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => (
                <TableCell key={index} align="center">
                  {day} ({dayjs().day(index).format("MM/DD/YYYY")})
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => {
                const availabilityForDay = availabilityData.find(
                  (item) => dayjs(item.date).day() === index
                );

                return (
                  <TableCell key={index} align="center">
                    {availabilityForDay
                      ? `${availabilityForDay.startTime} - ${availabilityForDay.endTime}`
                      : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Availability;
