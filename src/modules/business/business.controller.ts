import { FastifyReply, FastifyRequest } from 'fastify';
import ResponseData from '@/factory/ResponseData';
import { GetBussinessProfileSchema } from './business.schema';

export async function getBusinessProfileHandler(
  req: FastifyRequest<{ Params: GetBussinessProfileSchema }>,
  reply: FastifyReply
) {
  console.log(req.params);

  return new ResponseData(reply, 'ok');
}
