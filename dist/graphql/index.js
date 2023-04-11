"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const path_1 = require("path");
const graphql_tools_1 = require("graphql-tools");
const allTypes = (0, graphql_tools_1.loadFilesSync)((0, path_1.join)(__dirname, "**", "*.gql"));
const allResolvers = (0, graphql_tools_1.loadFilesSync)((0, path_1.join)(__dirname, "**", "resolvers.ts"));
exports.typeDefs = (0, graphql_tools_1.mergeTypeDefs)(allTypes);
exports.resolvers = (0, graphql_tools_1.mergeResolvers)(allResolvers);
