import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    if (role == "admin") {
      navigate("/admin/welcome");
    } else {
      navigate("/employee/welcome");
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button type="submit" variant="contained" onClick={loginUser}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
