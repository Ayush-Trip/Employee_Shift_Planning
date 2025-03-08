import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    const data = { email, password };
    const response = await axios.post("http://localhost:5000/login", data);
    const token = response.data.token;
    localStorage.setItem("token", `Bearer ${token}`);
    const role = response.data.role;
    if (role === "admin") {
      navigate("/admin/welcome");
    } else {
      navigate("/employee/welcome");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
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
          backgroundImage: `url('../../images/login_bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(10px)", 
          zIndex: -1,
        }}
      />

      <Paper
        elevation={10}
        sx={{
          display: "flex",
          width: "850px",
          borderRadius: "20px",
          overflow: "hidden",
          background: "rgba(110, 110, 110, 0.6)",
          backdropFilter: "blur(10px)", 
        }}
      >
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url('../../images/login_form.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            justifyContent: "flex-end",
            padding: "40px",
            color: "white",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Welcome Back To{" "}
            <span style={{ color: "#ffb400" }}>
              <br />
              ShiftSync
            </span>
          </Typography>
        </Box>

        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            background: "#121212",
            color: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Login
          </Typography>
          <Typography sx={{ color: "#b0b0b0", marginBottom: "20px" }}>
            Enter your credentials to access your account
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="filled"
            InputProps={{
              sx: {
                background: "rgba(110, 110, 110, 0.6)",
                color: "#fff",
              },
            }}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="filled"
            InputProps={{
              sx: {
                background: "rgba(110, 110, 110, 0.6)",
                color: "#fff",
              },
            }}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={loginUser}
            sx={{
              backgroundColor: "#ffb400",
              color: "#000",
              fontWeight: "bold",
              padding: "12px",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#e09e00",
              },
            }}
          >
            Login
          </Button>

          <Typography sx={{ marginTop: "10px", color: "#b0b0b0" }}>
            Not a member?{" "}
            <span style={{ color: "#ffb400", cursor: "pointer" }}>
              Create an account
            </span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
