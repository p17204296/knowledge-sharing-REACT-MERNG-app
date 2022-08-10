
const userResolvers = require('./user_resolver')
const postsResolvers = require('./posts_resolver')


module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation
    }
}


