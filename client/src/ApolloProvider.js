import React from 'react';
import App from './App';
import { ApolloClient, HttpLink } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

//Create
const httpLink = new HttpLink({
    uri: 'http://localhost:5000'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);