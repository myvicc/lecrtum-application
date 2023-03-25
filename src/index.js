import * as dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import schema from './graphql';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { extractUserFromToken } from './utilities';

async function bootstrap() {
    const app = express();

    const httpServer = http.createServer(app);

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphqli'
    });

    const serverCleanUp = useServer(
        {
            schema,
            context: (ctx) => {
                const user = extractUserFromToken(ctx.connectionParams.Authorization);

                return { user };
            }
        },
        wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanUp.dispose();
                        }
                    }
                }
            }
        ],
    });

    await server.start();

    await mongoose.connect(process.env.MONGODB_URL);

    app.use(
        '/',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const user = extractUserFromToken(req.headers.authorization);

                return { user };
            },
        }),
    );

    await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));

    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);
}

bootstrap().catch(error => console.error(error));
