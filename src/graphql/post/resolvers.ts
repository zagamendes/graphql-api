import { Post, Resolvers } from "../../generated/graphql";
import api from "../api";

export const resolvers: Resolvers = {
  Query: {
    posts: async () => {
      const { data } = await api.get<Post[]>("/posts").catch((e: Error) => {
        throw new Error(e.message);
      });
      return data;
    },
    post: async (_, { id }) => {
      const { data } = await api.get<Post>(`/post/${id}`).catch((e: Error) => {
        throw new Error(e.message);
      });
      return data;
    },
  },
  Mutation: {
    post: async (_, { post }) => {
      const { data } = await api
        .post<Post>(`/posts`, { ...post })
        .catch((e: Error) => {
          throw new Error(e.message);
        });
      return data;
    },
  },
};
