import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Container, Grid } from '@mui/material';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to the Employee Shift Planning System
        </Typography>

        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                size="large" 
                fullWidth 
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Welcome;
