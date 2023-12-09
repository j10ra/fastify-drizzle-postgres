import fastify from 'fastify';
import { errorHandler } from './middleware/errorHandler';
import { getLoggerOptions, registerServiceLogger } from './config/logger.config';
import registerSwagger from './config/swagger.config';
import registerRoutes from './routes';
import registerAuthDecorator from './config/auth.config';

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

registerAuthDecorator(server);
registerSwagger(server);
registerRoutes(server);
registerServiceLogger(server);

server.setErrorHandler(errorHandler);

export default server;
