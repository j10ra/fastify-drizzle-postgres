import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginInput } from './user.schema';
import { BadRequestError, ServerError, UnauthorizedError } from '../../helpers/ServerError';
import { traceLog } from '../../middleware/logger';

export const login = async (request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => {
  try {
    const { email, password } = request.body;
    traceLog(request, { message: 'Check user email and password' });

    throw new UnauthorizedError('User not found');

    return reply.code(200).send({
      ok: 'ok',
    });
  } catch (err) {
    throw err;
  }
};
