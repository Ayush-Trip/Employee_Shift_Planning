const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDb = require("./database/db");
const {
  register,
  login,
} = require("./controllers/authentication/authentication");
const authenticationMiddileware = require("./middileware/authenticationMiddileware");
const {
  createAvailability,
  getEmployeeAvailability,
} = require("./controllers/availability/availabilityController");
const {
  getAvailableEmployees,
  saveShift,
  getShiftsForEmployee,
} = require("./controllers/shifts/shifts");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectToDb();

const router = express.Router();

//Login SignIp Routes
router.post("/register", register);
router.post("/login", login);

//Employees Routes
router.post(
  "/employee/availability",
  authenticationMiddileware,
  createAvailability
);
router.get(
  "/employee/availability",
  authenticationMiddileware,
  getEmployeeAvailability
);
router.get("/employee/shifts", authenticationMiddileware, getShiftsForEmployee);

//admin routes
router.get(
  "/admin/availableEmployees",
  authenticationMiddileware,
  getAvailableEmployees
);
router.post("/admin/shifts", authenticationMiddileware, saveShift);

app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
