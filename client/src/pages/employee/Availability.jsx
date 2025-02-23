import React, { useEffect, useState } from "react";
import TimePickerComponent from "../../components/TimePickerComponent";
import DatePickerComponent from "../../components/DatePickerComponent";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Grid, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import moment from "moment-timezone";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Set Your Availability
      </Typography>

      <Grid container spacing={3}>
        {availability.map((entry, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ border: "1px solid #ccc", padding: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Availability {index + 1}
              </Typography>

              <div>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Date
                </Typography>
                <DatePickerComponent
                  value={entry.date}
                  setValue={(newDate) => handleChange(index, "date", newDate)}
                />
              </div>

              <div>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Start Time
                </Typography>
                <TimePickerComponent
                  value={entry.startTime}
                  setValue={(newTime) =>
                    handleChange(index, "startTime", newTime)
                  }
                />
              </div>

              <div>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  End Time
                </Typography>
                <TimePickerComponent
                  value={entry.endTime}
                  setValue={(newTime) =>
                    handleChange(index, "endTime", newTime)
                  }
                />
              </div>

              <Typography variant="body2" sx={{ marginTop: 2 }}>
                <strong>Day:</strong> {entry.day}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <FormControl fullWidth sx={{ marginTop: 3 }}>
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

      <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
        <Button variant="contained" onClick={handleAddAvailability}>
          Add Availability
        </Button>

        <Button variant="contained" onClick={createAvailability}>
          Create Availability
        </Button>
      </Box>

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
