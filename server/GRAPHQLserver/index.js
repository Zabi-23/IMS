const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./db/connect");
const schema = require("./graphql/schema");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Running a GraphQL server on port ${PORT}`);
});
