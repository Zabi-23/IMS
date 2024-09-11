const { GraphQLObjectType, GraphQLString, GraphQLFloat } = require("graphql");

// Manufacturer Stock Value Type
const ManufacturerStockType = new GraphQLObjectType({
  name: "ManufacturerStockValue",
  fields: {
    manufacturer: { type: GraphQLString },
    totalStockValue: { type: GraphQLFloat },
  },
});

module.exports = ManufacturerStockType;
