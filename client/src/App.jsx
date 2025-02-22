import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Availability from "./pages/employee/Availability";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
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
