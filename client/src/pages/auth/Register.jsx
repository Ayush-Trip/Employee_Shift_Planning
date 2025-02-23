import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const createUser = async () => {
    const data = {
      name,
      email,
      password,
      role,
    };
    await axios.post("http://localhost:5000/register", data);
    console.log("User Created");
    navigate("/login")
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Role dropdown */}
      <FormControl fullWidth>
        <InputLabel id="role-dropdown">Role</InputLabel>
        <Select
          labelId="role-dropdown-label"
          id="role-dropdown-label"
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"employee"}>Employee</MenuItem>
        </Select>
      </FormControl>

      {/* button to submit */}
      <Button variant="contained" onClick={createUser} type="submit">
        Register
      </Button>
    </Box>
  );
};

export default Register;
