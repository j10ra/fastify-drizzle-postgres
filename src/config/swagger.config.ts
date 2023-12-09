import { FastifyInstance } from 'fastify';

const swaggerOptions = {
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'Fastify Api swagger documentation',
      version: '1.0.0',
    },
    host: 'localhost:8000',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description:
          'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
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
