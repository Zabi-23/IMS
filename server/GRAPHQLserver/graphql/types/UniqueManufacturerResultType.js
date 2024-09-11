const { GraphQLObjectType, GraphQLInt, GraphQLList } = require("graphql");
const ManufacturerType = require("./ManufacturerType");

// Unique Manufacturer Result Type
const UniqueManufacturerResultType = new GraphQLObjectType({
  name: "ManufacturerResult",
  fields: {
    manufacturers: { type: new GraphQLList(ManufacturerType) },
    totalManufacturersCount: { type: GraphQLInt },
  },
});

module.exports = UniqueManufacturerResultType;
