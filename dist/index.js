"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_1 = require("./graphql");
const server = new server_1.ApolloServer({
    typeDefs: graphql_1.typeDefs,
    resolvers: graphql_1.resolvers,
});
(0, standalone_1.startStandaloneServer)(server, {
    context: async (operation) => {
        console.log(operation.req.headers.accept);
        return { token: operation.req.headers.accept };
    },
}).then(({ url }) => {
    console.log(url);
});
