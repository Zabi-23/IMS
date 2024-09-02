const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
const bodyParser = require('body-parser');
const connectDB = require('./db/connect'); // Ensure this path is correct
const graphqlRoute = require('./routes/graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolver');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true, // Enable GraphiQL interface
}))
// Connect to MongoDB
connectDB(); // Call the function to connect to MongoDB

// GraphQL Route
app.use('/graphql', graphqlRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
