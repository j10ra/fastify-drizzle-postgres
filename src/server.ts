import fastify from 'fastify';
import pino from 'pino';
import loadConfig from './config';
import userRouter from './modules/user/user.route';
import { loginSchema } from './modules/user/user.schema';

loadConfig();

const server = fastify({
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true,
    },
  },
  logger: pino({ level: process.env.LOG_LEVEL || 'info' }),
});

server.register(require('@fastify/formbody'));
server.register(require('@fastify/cors'));
server.register(require('@fastify/helmet'));
// server.addSchema(loginSchema);

server.register(userRouter, { prefix: '/api/user' });
// server.register(postRouter, { prefix: '/api/post' });

server.setErrorHandler((error, request, reply) => {
  server.log.error(error);
  //   reply.status(500).send();
});

// server.get('/', (_request, reply) => {
//   reply.send({ name: 'fastify-api' });
// });

server.get('/health-check', async (_request, reply) => {
  try {
    // TODO: add db health check
    // await utils.healthCheck();
    reply.status(200).send();
  } catch (e) {
    reply.status(500).send();
  }
});

export default server;
