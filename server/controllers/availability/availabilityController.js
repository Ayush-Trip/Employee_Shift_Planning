const Availability = require("../../models/Availability");
const createAvailability = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { availability, timezone } = req.body;

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
        .json({ message: "Availability Not Found for this User"});
    } 
    res.status(200).json(availability);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error" });
  }
};
module.exports = {createAvailability, getEmployeeAvailability}