import { ApolloServer, gql } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import typeDefs from './typeDefs.js';
import connectToMongo from './db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 4000

const app = express();
const httpServer = http.createServer(app);

dotenv.config()

if (process.env.CYCLIC_URL == 'dev') {

  connectToMongo()
}

import resolvers from './resolvers.js';

const context = ({ req }) => {
  const { authorization } = req.headers
  if (authorization) {
    const { userID } = jwt.verify(authorization, process.env.JWT_SECRET)
    return { userID }
  }
}




const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.CYCLIC_URL == 'dev' ?
      ApolloServerPluginLandingPageGraphQLPlayground() :
      ApolloServerPluginLandingPageDisabled()
  ]
});

if(process.env.CYCLIC_URL !== "dev"){
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
}

await server.start();
server.applyMiddleware({ app, path: '/graphql' });
httpServer.listen({ port }, () => {
  console.log(`Server is running on ${port} ${server.graphqlPath}`);
})