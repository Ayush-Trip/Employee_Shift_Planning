const Availability = require("../../models/Availability");
const createAvailability = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { availability, timezone } = req.body;
    const duration = 4 * 60 * 60 * 1000;
    for(const day of availability){
      const {startTime, endTime} = day
      const startDate = new Date(`${day.date}T${startTime}`)
      const endDate = new Date(`${day.date}T${endTime}`)
      const minDuration = endDate - startDate
      if(minDuration < duration){
        return res.status(400).json({message: "Availability Must Be atleast for 4 Hours Daily."})
      } 
    }

    let existingAvailability = await Availability.findOne({ userId });

    if (existingAvailability) {
      existingAvailability.availability = availability;
      existingAvailability.timezone = timezone;
      await existingAvailability.save();
      return res.status(200).json({ message: "Availability Updated" });
    }

    const newAvailability = new Availability({
      userId,
      availability,
      timezone,
    });

    await newAvailability.save();
    return res.status(200).json({ message: "Availability Created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error" });
  }
};

const getEmployeeAvailability = async (req, res) => {
  const userId = req.user.userId;
  try {
    let availability = await Availability.findOne({ userId });
    if (!availability) {
      return res
        .status(404)
        .json({ message: "Availability Not Found for this User" });
    }
    res.status(200).json(availability);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await User({
      role: "employee",
    });
    return res.status(200).json({
      employees,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error" });
  }
};

const getEmployeeAvailabilityById = async (req, res) => {
  try {
    const { employeeId } = req.query;
    const availabilities = await Availability.find({ userId: employeeId });
    return res.status(200).json({
      availabilities,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error" });
  }
};

module.exports = {
  createAvailability,
  getEmployeeAvailability,
  getAllEmployees,
  getEmployeeAvailabilityById,
};
