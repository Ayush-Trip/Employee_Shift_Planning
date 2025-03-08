import React from "react";
import { Box, Button, Grid, Typography, Paper } from "@mui/material";
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('../../images/welcome_bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(3px)", 
          zIndex: -1, 
        }}
      />

      <Paper
        elevation={10}
        sx={{
          p: 5,
          textAlign: "center",
          width: "100%",
          maxWidth: 460,
          borderRadius: 4,
          background: "rgba(25, 25, 25, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#e0e0e0", letterSpacing: 1, textTransform: "uppercase" }}
          gutterBottom
        >
          ShiftSync
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "#b0b0b0", fontWeight: 400, mb: 4 }}
        >
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
                py: 1.6,
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: 1,
                backgroundColor: "#ffb400",
                color: "rgb(0, 0, 0)",
                borderRadius: "10px",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#ffb400",
                  boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.6)",
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
                py: 1.6,
                fontSize: "1rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: 1,
                color: "#d0d0d0",
                borderColor: "rgba(200, 200, 200, 0.3)",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(100, 100, 100, 0.5)",
                  borderColor: "rgba(220, 220, 220, 0.5)",
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
