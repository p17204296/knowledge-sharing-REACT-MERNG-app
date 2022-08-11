const { gql } = require('apollo-server');

module.exports = gql`
    input RegisterInput {
        email: String!
        username: String!
        password: String!
        confirmPassword: String!
    }
    type User{
        id: ID!
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
        tags: String!
        rating: Float!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!  
    }
        type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        username: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(tags: String!, body: String!, rating: Float!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: String!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
    type Subscription {
        newPost: Post!        
    }
`;
