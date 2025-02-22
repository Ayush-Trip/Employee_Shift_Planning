const mongoose = require("mongoose");

const DayAvailabilitySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const AvailabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  availability: { type: [DayAvailabilitySchema], required: true },
  timezone: { type: String },
});

module.exports = mongoose.model("Availability", AvailabilitySchema);
