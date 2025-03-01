import React from "react";
import { Box, Button, Container, Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top,rgba(30, 30, 30, 0.95),rgba(36, 35, 35, 0.89))",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          textAlign: "center",
          width: "100%",
          maxWidth: 450,
          borderRadius: 3,
          background: "rgba(32, 33, 33, 0.93)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#f0f0f0", letterSpacing: 1 }} gutterBottom>
          ShiftSync
        </Typography>

        <Typography variant="h6" sx={{ color: "#b0b0b0", fontWeight: 400, mb: 3 }}>
          Employee Shift Planning System
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate("/login")}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "rgba(80, 80, 80, 0.4)",
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(5px)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(100, 100, 100, 0.5)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => navigate("/register")}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#d0d0d0",
                borderColor: "rgba(200, 200, 200, 0.3)",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(90, 90, 90, 0.4)",
                  borderColor: "rgba(200, 200, 200, 0.5)",
                },
              }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Welcome;
