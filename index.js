// Dependancy Imports
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// Relative Imports
const typeDefs = require("./graphql/typeDefs");
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// MongoDB and Server Connection
mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB is Connected');
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });