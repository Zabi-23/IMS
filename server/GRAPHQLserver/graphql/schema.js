const { GraphQLSchema } = require("graphql");
const RootQuery = require("../graphql/queries/RootQuery");
const Mutation = require("../graphql/mutations/Mutation");

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
