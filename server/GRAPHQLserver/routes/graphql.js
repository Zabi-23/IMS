// routes/graphql.js
const { graphqlHTTP } = require('express-graphql');
const schema = require('../graphql/schema');
const resolvers = require('../graphql/resolver');

module.exports = graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
});
