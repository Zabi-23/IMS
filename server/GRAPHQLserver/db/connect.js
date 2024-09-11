const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const connectDB = async () => {
  try {
    // Construct the MongoDB connection string
    const DB = process.env.DATABASE.replace(
      "<db_PASSWORD>",
      process.env.DATABASE_PASSWORD
    ).replace("<db_NAME>", process.env.DB_NAME);

    // Connect to MongoDB
    await mongoose.connect(DB);

    console.log(`MongoDB connected successfully to ${process.env.DB_NAME}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
