import { Resolver, Resolvers, User } from "../../generated/graphql";
import api from "../api";

export const resolvers: Resolvers = {
  Query: {
    users: async () => {
      const { data } = await api.get("/users");
      return data;
    },
    user: async (_: any, args) => {
      try {
        const { data } = await api.get(`/users/${args.id}`).catch((e) => {
          console.log(e);

          throw Error(e.message);
        });
        return data;
      } catch (e) {
        return e;
      }
    },
  },
};
