const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Construct the MongoDB connection string
    const DB = process.env.DATABASE
      .replace("<password>", process.env.DATABASE_PASSWORD)
      .replace("<dbname>", process.env.DB_NAME);

    // Connect to MongoDB
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected successfully to ${process.env.DB_NAME}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
