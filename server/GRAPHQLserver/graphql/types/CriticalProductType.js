const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

// Critical Products Type
const CriticalProductType = new GraphQLObjectType({
  name: "CriticalProduct",
  fields: {
    name: { type: GraphQLString },
    manufacturerName: { type: GraphQLString },
    contactName: { type: GraphQLString },
    contactPhone: { type: GraphQLString },
    contactEmail: { type: GraphQLString },
    amountInStock: { type: GraphQLInt },
  },
});

module.exports = CriticalProductType;
