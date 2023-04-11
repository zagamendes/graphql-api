import { GraphQLError } from 'graphql';
import { Resolver, Resolvers, User } from '../../generated/graphql';
import jwt from 'jsonwebtoken';
import api from '../api';
import { Request, Response } from 'express';
export interface MyContext {
  req: Request;
  res: Response;
}
export const resolvers: Resolvers = {
  Query: {
    users: async (_, __, { req }: MyContext) => {
      const { accessToken } = req.cookies;

      try {
        await jwt.verify(accessToken, 'teste');
        const { data } = await api.get('/users');
        return data;
      } catch (e) {
        throw new GraphQLError('unauthenticated', {
          extensions: {
            http: {
              status: 404,
            },
          },
        });
      }
    },
    user: async (_: any, args, { req }: MyContext) => {
      const { accessToken } = req.cookies;

      try {
        await jwt.verify(accessToken, 'teste');
        const { data } = await api.get(`/users/${args.id}`).catch((e) => {
          console.log(e);

          throw Error(e.message);
        });
        return data;
      } catch (e) {
        throw new GraphQLError('unauthenticated', {
          extensions: {
            http: {
              status: 401,
            },
          },
        });
      }
    },
  },
  Mutation: {
    login: async (_, __, { res }: MyContext) => {
      res
        .cookie(
          'accessToken',
          jwt.sign({}, 'teste', {
            expiresIn: '10s',
          })
        )
        .cookie(
          'refreshToken',
          jwt.sign({}, 'teste', {
            expiresIn: '1m',
          }),
          {
            httpOnly: true,
          }
        );

      return jwt.sign({}, 'teste', {
        expiresIn: '10s',
      });
    },
  },
};
