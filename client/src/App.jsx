import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Availability from "./pages/employee/Availability";
import Welcome from "./pages/Welcome";
import Shift from "./pages/admin/Shift";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin/shifts" element={<Shift />}></Route>
          <Route
            path="/employee/availability"
            element={<Availability />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
