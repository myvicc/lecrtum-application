import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import schema from './graphql';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

async function bootstrap() {
    const app = express();

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    await mongoose.connect(process.env.MONGODB_URL);

    app.use(
        '/',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const context = {};
                const { authorization } = req.headers;

                if (authorization) {
                    const token = authorization.split(' ')[1];

                    if (token) {
                        const data = jwt.verify(token, process.env.JWT_SECRET);
                        context.user = data;
                    }
                }

                return context;
            },
        })
    );

    await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));

    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);
}

bootstrap().catch(error => console.error(error));

