const { gql } = require('apollo-server');

module.exports = gql`

    type Post {
        id: ID!
        body: String!
        createdAt: String!
        userName: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type Comment {
        id: ID!
        body: String!
        userName: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        createdAt: String!
        userName: String!
    }

    type User {
        id: ID!
        token: String!
        email: String!
        userName: String!
        createdAt: String!
    }

    input RegisterInput {
        userName: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post!
    }

    type Mutation {
        registerUser(registerInput: RegisterInput): User!
        login(userName: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!, ): Post!
        deleteComment(postId: ID!, commentId: ID! ): Post!
        likePost(postId: ID!): Post!
    }
`