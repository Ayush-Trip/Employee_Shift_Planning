import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Availability from "./pages/employee/Availability";
import Welcome from "./pages/Welcome";
import Shift from "./pages/admin/Shift";
import AssignedShifts from "./pages/employee/AssignedShifts";
import AvailableEmployee from "./pages/admin/AvailableEmployee";
import Button from "@mui/material/Button";
import PrivateRoute from "./PrivateRoute";
import WelcomeEmployee from "./pages/employee/WelcomeEmployee";
import WelcomeAdmin from "./pages/admin/WelcomeAdmin";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          
          <Route
            path="/admin/shifts"
            element={<PrivateRoute element={<Shift />} />}
          />
          <Route
            path="/employee/shifts"
            element={<PrivateRoute element={<AssignedShifts />} />}
          />
          <Route
            path="/admin/availability"
            element={<PrivateRoute element={<AvailableEmployee />} />}
          />
          <Route
            path="/employee/availability"
            element={<PrivateRoute element={<Availability />} />}
          />
          <Route
            path="/employee/welcome"
            element={<PrivateRoute element={<WelcomeEmployee />} />}
          />
          <Route
            path="/admin/welcome"
            element={<PrivateRoute element={<WelcomeAdmin />} />}
          />
        </Routes>
        {token && (
          <Button
            variant="contained"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = '/login';
            }}
          >
            Logout
          </Button>
        )}
      </Router>
    </>
  );
}
export default App;
