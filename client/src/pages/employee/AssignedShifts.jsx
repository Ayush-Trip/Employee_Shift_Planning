import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Container,
} from "@mui/material";

const AssignedShifts = () => {
  const [shifts, setShifts] = useState([]);

  const displayShifts = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/employee/shifts", {
      headers: { Authorization: `${token}` },
    });
    if (response.data.shifts.length > 0) {
      setShifts(response.data.shifts);
    }
    console.log(shifts);
  };

  useEffect(() => {
    displayShifts();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, marginBottom: 2 }}>
        <Typography variant="h4" component="h2" align="center">
          Assigned Shifts
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts.length > 0 ? (
              shifts.map((shift, index) => (
                <TableRow key={index}>
                  <TableCell>{shift.date}</TableCell>
                  <TableCell>{shift.startTime}</TableCell>
                  <TableCell>{shift.endTime}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No shifts assigned.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AssignedShifts;
