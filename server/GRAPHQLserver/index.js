const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const dotenv = require("dotenv");
dotenv.config(); 
const bodyParser = require('body-parser');
const connectDB = require('./db/connect'); 
const graphqlRoute = require('./routes/graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolver');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true, 
}))
// Connect to MongoDB
connectDB(); 

// GraphQL Route
app.use('/graphql', graphqlRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
