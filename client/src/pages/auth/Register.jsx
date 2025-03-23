import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const createUser = async () => {
    const data = { name, email, password, role };
    await axios.post("http://localhost:5000/register", data);
    console.log("User Created");
    navigate("/login");
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
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            background: "#121212",
            color: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Register
          </Typography>
          <Typography sx={{ color: "#b0b0b0", marginBottom: "20px" }}>
            Create your account to get started
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="filled"
            InputLabelProps={{ sx: { color: "#b0b0b0" } }}
            InputProps={{
              sx: {
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
                "&:hover": { background: "rgba(255, 255, 255, 0.2)" },
              },
            }}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />

          <TextField
            fullWidth
            label="Email"
            variant="filled"
            InputLabelProps={{ sx: { color: "#b0b0b0" } }}
            InputProps={{
              sx: {
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
                "&:hover": { background: "rgba(255, 255, 255, 0.2)" },
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
            InputLabelProps={{ sx: { color: "#b0b0b0" } }}
            InputProps={{
              sx: {
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
                "&:hover": { background: "rgba(255, 255, 255, 0.2)" },
              },
            }}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />

          <FormControl fullWidth variant="filled">
            <InputLabel sx={{ color: "#b0b0b0" }}>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
                "&:hover": { background: "rgba(255, 255, 255, 0.2)" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#333",
                    color: "#ffb400",
                  },
                },
              }}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"employee"}>Employee</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            onClick={createUser}
            sx={{
              backgroundColor: "#ffb400",
              color: "#000",
              fontWeight: "bold",
              padding: "12px",
              marginTop: "20px",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#e09e00",
                transform: "scale(1.05)",
              },
            }}
          >
            Register
          </Button>

          <Typography sx={{ marginTop: "10px", color: "#b0b0b0" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "#ffb400", cursor: "pointer" }}
            >
              Login here
            </span>
          </Typography>
        </Box>

        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url('../../images/register_image.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            padding: "40px",
            color: "white",
            textAlign: "right",
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              background: "rgba(0, 0, 0, 0.6)",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
          >
            Join{" "}
            <span style={{ color: "#ffb400" }}>
              <br />
              ShiftSync
            </span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
