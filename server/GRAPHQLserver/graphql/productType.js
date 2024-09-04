const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLID } = require('graphql');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    manufacturer: { type: GraphQLID },
    amountInStock: { type: GraphQLInt }
  })
});

module.exports = ProductType;
