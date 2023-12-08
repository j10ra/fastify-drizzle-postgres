import { FastifyInstance } from 'fastify';
import { createUserSchema, loginSchema } from './user.schema';
import { createUser, getAllUsers, loginLocal } from './user.controller';
import server from '@/server';

async function userRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/create',
    schema: createUserSchema,
    handler: createUser,
  });

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: loginSchema,
    handler: loginLocal,
  });

  fastify.route({
    method: 'GET',
    url: '/all',
    preHandler: [server.authenticate],
    handler: getAllUsers,
  });
}

export default userRouter;
