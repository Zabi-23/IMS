const { GraphQLObjectType, GraphQLString } = require("graphql");
const ContactType = require("./ContactType");

// Manufacturer type
const ManufacturerType = new GraphQLObjectType({
  name: "Manufacturer",
  fields: {
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: ContactType },
  },
});

module.exports = ManufacturerType;
