import { FastifyInstance } from 'fastify';

const swaggerOptions = {
  swagger: {
    info: {
      title: 'My Title',
      description: 'My Description.',
      version: '1.0.0',
    },
    host: 'localhost:8000',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
};

const swaggerUiOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
};

export default function registerSwagger(server: FastifyInstance) {
  server.register(require('@fastify/swagger'), swaggerOptions);
  server.register(require('@fastify/swagger-ui'), swaggerUiOptions);
}
