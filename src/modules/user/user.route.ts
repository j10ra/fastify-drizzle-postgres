import { FastifyInstance } from 'fastify';
import { createUserSchema, loginSchema } from './user.schema';
import { createUser, login } from './user.controller';

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
    handler: login,
  });
}

export default userRouter;
