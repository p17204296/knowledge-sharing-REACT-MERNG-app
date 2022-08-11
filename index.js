// Dependancy Imports
const { ApolloServer } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');

// Relative Imports
const typeDefs = require("./graphql/typeDefs");
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

// MongoDB and Server Connection
mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB is Connected');
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });