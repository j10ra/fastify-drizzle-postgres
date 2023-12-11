import { FastifyInstance, FastifyRequest } from 'fastify';
import { HttpUnauthorizedError } from '@/factory/ServerError';

export default function registerAuthDecorator(server: FastifyInstance) {
  server.register(require('@fastify/jwt'), {
    secret: process.env.ACCESS_TOKEN_SECRET,
  });

  server.decorate('authenticate', async (request: FastifyRequest) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      throw new HttpUnauthorizedError();
    }
  });
}
