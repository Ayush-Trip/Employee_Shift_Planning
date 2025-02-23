import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Container } from "@mui/material";

const WelcomeEmployee = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Employee
        </Typography>
        <Button
          variant="contained"
          sx={{ marginBottom: 2 }}
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
      </Box>
    </Container>
  );
};

export default WelcomeEmployee;
