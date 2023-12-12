import { FastifyInstance } from 'fastify';
import server from '@/server';
import { getBusinessProfileHandler } from './business.controller';
import { getBussinessProfileSchema } from './business.schema';

async function businessRouter(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/:businessId',
    preHandler: [server.authenticate],
    schema: getBussinessProfileSchema,
    handler: getBusinessProfileHandler,
  });
}

export default businessRouter;
