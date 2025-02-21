const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  day: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  timezone: { type: String },
});

module.exports = mongoose.model("Availability", AvailabilitySchema);
