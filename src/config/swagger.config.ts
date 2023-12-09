import { FastifyInstance } from 'fastify';
import { HttpBadRequestError } from '@/factory/ServerError';
import ResponseData from '@/factory/ResponseData';

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
}
