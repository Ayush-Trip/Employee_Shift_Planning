import React, { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";

const AvailableEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [availableData, setAvailableData] = useState([]);

  const getAllEmployees = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/admin/getAllEmployees",
      {
        headers: { Authorization: `${token}` },
      }
    );
    if (response.data.employees.length > 0) {
      setEmployee(response.data.employees);
    }
    console.log(employee);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  //   console.log(selectedEmployee);

  const getEmployeeAvailability = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/admin/availability",
      {
        params: { employeeId: selectedEmployee },
        headers: { Authorization: `${token}` },
      }
    );
    if (response.data.availabilities.length > 0) {
      setAvailableData(response.data.availabilities);
    } else {
      setAvailableData([]); 
    }
  };

  useEffect(() => {
    getEmployeeAvailability();
  }, [selectedEmployee]); 

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Employee Availability for Admin
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedEmployee}
          label="Employee"
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          {employee.map((emp) => (
            <MenuItem key={emp._id} value={emp._id}>
              {emp.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {availableData.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availableData.map((data, index) => (
                <React.Fragment key={index}>
                  {Array.isArray(data.availability) &&
                    data.availability.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.day}</TableCell>
                        <TableCell>
                          {dayjs(item.date).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>{item.startTime}</TableCell>
                        <TableCell>{item.endTime}</TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ marginTop: 2 }} variant="body1">
          No availability data found.
        </Typography>
      )}
    </Box>
  );
};

export default AvailableEmployee;
