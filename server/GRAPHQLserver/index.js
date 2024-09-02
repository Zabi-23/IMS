const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const bodyParser = require('body-parser');
const connectDB = require('./db/connect'); // Ensure this path is correct
const graphqlRoute = require('./routes/graphql');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.use(express.json());

// Connect to MongoDB
connectDB(); // Call the function to connect to MongoDB

// GraphQL Route
app.use('/graphql', graphqlRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
