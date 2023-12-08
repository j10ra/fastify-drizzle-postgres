import { JWT } from '@fastify/jwt';
import { FastifyRequest, FastifyInstance } from 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        jwt: JWT;
    }

    interface FastifyInstance {
        authenticate: any;
        jwt: JWT
    }
}
