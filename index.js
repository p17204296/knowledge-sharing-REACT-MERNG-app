const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`;

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!'
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// MongoDB and Server Connection
mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB is Connected');
        return server.listen({});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });