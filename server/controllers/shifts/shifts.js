const Availability = require("../../models/Availability");
const Shift = require("../../models/Shift");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const isBetween = require("dayjs/plugin/isBetween");
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const getAvailableEmployees = async (req, res) => {
  try {
    const { timezone, date, startTime, endTime } = req.query;
    const targetDate = dayjs.tz(date, timezone).utc().startOf("day");
    const targetStartTime = dayjs.tz(`${date} ${startTime}`, timezone);
    const targetEndTime = dayjs.tz(`${date} ${endTime}`, timezone);

    const availabilities = await Availability.find({
      "availability.date": targetDate.toDate(),
    }).populate("userId");
    const results = [];

    for (const availabilityDoc of availabilities) {
      const originalTimezone = availabilityDoc.timezone;

      for (const availabilitySlot of availabilityDoc.availability) {
        const slotDate = dayjs
          .tz(availabilitySlot.date, originalTimezone)
          .startOf("day");
        if (slotDate.isSame(targetDate, "day")) {
          const slotStartTime = dayjs.tz(
            `${dayjs(availabilitySlot.date).format("YYYY-MM-DD")} ${
              availabilitySlot.startTime
            }`,
            originalTimezone
          );
          const slotEndTime = dayjs.tz(
            `${dayjs(availabilitySlot.date).format("YYYY-MM-DD")} ${
              availabilitySlot.endTime
            }`,
            originalTimezone
          );

          const convertedStartTime = slotStartTime.tz(timezone);
          const convertedEndTime = slotEndTime.tz(timezone);

          if (
            convertedStartTime.isSameOrAfter(targetStartTime, "minute") &&
            convertedEndTime.isSameOrBefore(targetEndTime, "minute")
          ) {
            results.push({
              user: availabilityDoc.userId,
              originalAvailability: {
                date: availabilitySlot.date,
                startTime: availabilitySlot.startTime,
                endTime: availabilitySlot.endTime,
                timezone: originalTimezone,
              },
              convertedAvailability: {
                date: convertedStartTime.startOf("day").toDate(),
                startTime: convertedStartTime.format("HH:mm"),
                endTime: convertedEndTime.format("HH:mm"),
                timezone: timezone,
              },
            });
          }
        }
      }
    }
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error.",
    });
  }
};

const saveShift = async (req, res) => {
  try {
    const { date, startTime, endTime, timezone, employeeId } = req.body;
    const adminId = req.user.userId;
    const newShift = new Shift({
      adminId,
      employeeId,
      date,
      startTime,
      endTime,
      timezone,
    });
    await newShift.save();
    res.status(201).json({
      message: "Shift Created Succesfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error.",
    });
  }
};

const getShiftsForEmployee = async (req, res) => {
  try {
    const employeeId = req.user.userId;
    const shifts = await Shift.find({
      employeeId: employeeId,
    });

    res.json({
      shifts: shifts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error.",
    });
  }
};

module.exports = { getAvailableEmployees, saveShift, getShiftsForEmployee };
