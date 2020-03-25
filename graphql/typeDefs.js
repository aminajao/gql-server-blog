const { gql } = require('apollo-server');

module.exports = gql`

    type Post {
        id: ID!
        body: String!
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
    }

    type Mutation {
        registerUser(registerInput: RegisterInput): User!
    }
`