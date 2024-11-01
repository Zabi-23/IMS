
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

const connectDB = async () => {
  try {
    
    const DB = process.env.MONGODB_URI;

    if (!DB) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected successfully to GRAPHQLserver `);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
