//GRAFQLserver/seed.js

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Ladda miljövariabler från .env-filen
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Kontrollera att DATABASE är definierad
const DB = process.env.DATABASE;
if (!DB) {
    console.error("DATABASE URI is not defined.");
    process.exit(1);
}

mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
