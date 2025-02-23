import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";


const WelcomeAdmin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Welcome Admin</h2>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/admin/shifts");
        }}
      >
        Create Shifts
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/admin/availability");
        }}
      >
        View Employees
      </Button>
    </div>
  );
};

export default WelcomeAdmin;
