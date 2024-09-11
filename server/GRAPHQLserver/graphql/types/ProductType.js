const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");
const ManufacturerType = require("./ManufacturerType");

// Product Type
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLInt },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    manufacturer: { type: ManufacturerType },
    amountInStock: { type: GraphQLInt },
  },
});

module.exports = ProductType;
