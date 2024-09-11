const { GraphQLObjectType, GraphQLString } = require("graphql");

// Contact type
const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
});

module.exports = ContactType;
