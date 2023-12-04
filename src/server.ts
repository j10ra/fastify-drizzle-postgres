import fastify from 'fastify';
import envConfig from './config/env.config';
import registerSwagger from './config/swagger.config';
import registerRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { registerServiceLogger } from './middleware/logger';
import getLoggerOptions from './config/logger.config';

envConfig();

const server = fastify({
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true,
    },
  },
  logger: getLoggerOptions(),
});

server.register(require('@fastify/formbody'));
server.register(require('@fastify/helmet'));
server.register(require('@fastify/cors'));

server.get('/', (_request, reply) => {
  reply.send({ name: 'fastify-api' });
});

server.get('/health-check', async (_request, reply) => {
  try {
    // TODO: add db health check
    // await utils.healthCheck();
    reply.status(200).send();
  } catch (e) {
    reply.status(500).send();
  }
});

registerServiceLogger(server);
registerSwagger(server);
registerRoutes(server);

server.setErrorHandler(errorHandler);

export default server;
