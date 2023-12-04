import { FastifyInstance } from 'fastify';
import { loginSchema } from './user.schema';
import { login } from './user.controller';

async function userRouter(fastify: FastifyInstance) {
  //   fastify.decorateRequest('authUser', '');

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: loginSchema,
    handler: login,
  });
}

export default userRouter;
