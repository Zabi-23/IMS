const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const ManufacturerType = new GraphQLObjectType({
  name: 'Manufacturer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    contact: { type: GraphQLID }
  })
});

module.exports = ManufacturerType;
