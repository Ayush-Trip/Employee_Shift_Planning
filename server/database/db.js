const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectToDb = async () => {
  const mongoUri = process.env.db_url;
  await mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
module.exports = connectToDb;
