import { FastifyRequest, FastifyReply, RouteHandlerMethod, RouteGenericInterface } from 'fastify';

export function Controller<T extends RouteGenericInterface>(
  handler: (req: FastifyRequest<T>, reply: FastifyReply) => Promise<any>
): RouteHandlerMethod {
  return async (req, reply) => {
    return handler(req as FastifyRequest<T>, reply);
  };
}
