const { GraphQLObjectType, GraphQLFloat } = require("graphql");

// Total Stock Value Type
const TotalStockValueType = new GraphQLObjectType({
  name: "TotalStockValue",
  fields: {
    totalValue: { type: GraphQLFloat },
  },
});

module.exports = TotalStockValueType;
