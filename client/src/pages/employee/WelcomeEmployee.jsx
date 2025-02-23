import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";


const WelcomeEmployee = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Welcome Employee</h2>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/employee/availability");
        }}
      >
        Create Availability
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/employee/shifts");
        }}
      >
        Check Assigned Shifts
      </Button>
    </div>
  );
};

export default WelcomeEmployee;
