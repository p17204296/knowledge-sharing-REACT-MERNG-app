const { gql } = require('apollo-server');

module.exports = gql`
    input RegisterInput {
        email: String!
        username: String!
        password: String!
        confirmPassword: String!
    }
    type User{
        id: ID
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        category: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
    }
`;
