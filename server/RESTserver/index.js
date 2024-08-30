const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRouter = require("./routes/products");

dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// MongoDB-connection
const DB = process.env.DATABASE.replace(
  "<db_PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<db_NAME>", process.env.DB_NAME);

mongoose
  .connect(DB)
  .then(() =>
    console.log(`MongoDB connected successfully to ${process.env.DB_NAME}`)
  )
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
