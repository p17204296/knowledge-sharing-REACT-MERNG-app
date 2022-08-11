
const userResolvers = require('./user_resolver')
const postsResolvers = require('./posts_resolver')
const commentsResolvers = require('./comments');

module.exports = {
    Post: {
      likeCount: (parent) => parent.likes.length,
      commentCount: (parent) => parent.comments.length
    },
    Query: {
      ...postsResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
      ...postsResolvers.Subscription
    }
  };

