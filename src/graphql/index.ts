import { join } from "path";
import { loadFilesSync, mergeTypeDefs, mergeResolvers } from "graphql-tools";

const allTypes = loadFilesSync(join(__dirname, "**", "*.gql"));

const allResolvers = loadFilesSync(join(__dirname, "**", "resolvers.ts"));

export const typeDefs = mergeTypeDefs(allTypes);
export const resolvers = mergeResolvers(allResolvers);
