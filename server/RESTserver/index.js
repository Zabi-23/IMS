

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require("./routes/products");

// Ladda miljövariabler från .env-filen
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

// Kontrollera att DATABASE är definierad
const DB = process.env.DATABASE;
if (!DB) {
    console.error("DATABASE URI is not defined.");
    process.exit(1);
}

mongoose
  .connect(DB)
  .then(() => console.log(`MongoDB connected successfully to the RESTserver`))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log(`Running a RESTful server on port ${PORT}`);
});
