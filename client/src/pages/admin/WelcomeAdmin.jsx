import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";

const WelcomeAdmin = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Welcome Admin
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button variant="contained" onClick={() => navigate("/admin/shifts")}>
            Create Shifts
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/availability")}
          >
            View Employees
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default WelcomeAdmin;
