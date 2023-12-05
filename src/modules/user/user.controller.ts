import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginInput } from './user.schema';
import { BadRequestError, ServerError, UnauthorizedError } from '@/helpers/ServerError';
import Logger from '@/helpers/Logger';

export const login = async (request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => {
  try {
    const { email, password } = request.body;
    // traceLog(request, { message: 'Check user email and password' });

    Logger.log(request, { message: 'Check user email and password', other: 'test' });

    throw new UnauthorizedError('User not found');

    return reply.code(200).send({
      ok: 'ok',
    });
  } catch (err) {
    throw err;
  }
};
