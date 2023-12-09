import { FastifyInstance } from 'fastify';
import { createUserSchema, getallUserSchema } from './user.schema';
import { createUser, getAllUsers, } from './user.controller';
import server from '@/server';

async function userRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/create',
    schema: createUserSchema,
    handler: createUser,
  });

  fastify.route({
    method: 'GET',
    url: '/all',
    schema: getallUserSchema,
    preHandler: [server.authenticate],
    handler: getAllUsers,
  });
}

export default userRouter;
