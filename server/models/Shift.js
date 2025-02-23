const mongoose = require("mongoose");

const ShiftSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employeeId: { type: String, required: true },
  date: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  timezone: { type: String },
});

module.exports = mongoose.model("Shift", ShiftSchema);
