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
    <div>
      <h2> Assigned Shifts</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts.map((shift, index) => (
              <TableRow key={index}>
                <TableCell>{shift.date}</TableCell>
                <TableCell>{shift.startTime}</TableCell>
                <TableCell>{shift.endTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AssignedShifts;
