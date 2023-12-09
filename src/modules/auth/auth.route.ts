import { FastifyInstance } from 'fastify';
import server from '@/server';
import { loginHandler, logoutHandler, refreshTokenHandler } from './auth.controller';
import { loginSchema, logoutInputSchema, refreshTokenSchema } from './auth.schema';

async function authRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/login-local',
        schema: loginSchema,
        handler: loginHandler,
    });

    fastify.route({
        method: 'POST',
        url: '/refresh-token',
        schema: refreshTokenSchema,
        handler: refreshTokenHandler,
    });

    fastify.route({
        method: 'POST',
        url: '/logout',
        preHandler: [server.authenticate],
        schema: logoutInputSchema,
        handler: logoutHandler,
    });
}

export default authRouter;
