import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from './graphql';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { sign, verify } from 'jsonwebtoken';
(async () => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
  app.post('/refreshToken', async (req, res) => {
    const { refreshToken } = req.cookies;
    try {
      await verify(refreshToken, 'teste');
      const newAccessToken = sign({}, 'teste', { expiresIn: '10s' });
      const newRefreshToken = sign({}, 'teste', { expiresIn: '30s' });
      res
        .cookie('accessToken', newAccessToken)
        .cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
        })
        .send();
    } catch (e) {
      res.status(401).send();
    }
  });
  app.use(
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res };
      },
    })
  );

  app.listen(4000, () => {
    console.log('running');
  });
})();
