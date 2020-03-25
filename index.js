const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');


const typeDefs = require('./graphql/typeDefs');
const { MONGODB } = require('./config');
const resolvers = require('./graphql/resolvers/index');




const server = new ApolloServer({
    typeDefs,
    resolvers
});
const port = 2000;

mongoose.connect( MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen(port);
    })
    .then((res) => {
        console.log(`server started at ${res.url}`)
    }
);

