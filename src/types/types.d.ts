import { JWT } from '@fastify/jwt';
import { FastifyInstance } from 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: any;
        jwt: JWT
    }
}
