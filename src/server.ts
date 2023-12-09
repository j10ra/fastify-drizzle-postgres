import fastify, { FastifyRequest } from 'fastify';
import { errorHandler } from './middleware/errorHandler';
import { getLoggerOptions, registerServiceLogger } from './config/logger.config';
import { HttpBadRequestError, HttpUnauthorizedError } from './factory/ServerError';
import registerSwagger from './config/swagger.config';
import registerRoutes from './routes';
import ResponseData from './factory/ResponseData';

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

server.get('/', (_request, reply) => {
  return new ResponseData(reply, { name: 'fastify-api' });
});

server.get('/health-check', async (_request, reply) => {
  try {
    // TODO: add db health check
    // await utils.healthCheck();

    return new ResponseData(reply, 'ok');
  } catch (e) {
    throw new HttpBadRequestError(e);
  }
});

registerSwagger(server);
registerRoutes(server);
registerServiceLogger(server);

server.setErrorHandler(errorHandler);

export default server;
