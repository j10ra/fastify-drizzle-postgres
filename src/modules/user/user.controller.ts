import { FastifyReply, FastifyRequest } from 'fastify';

export const login = async (
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) => {
  try {
    console.log('here?');
    const { email, password } = request.body;

    return reply.code(200).send({
      ok: 'ok',
    });
  } catch (err) {
    return reply.status(500).send({ statusCode: 500, message: 'TRY_AGAIN' });
  }
};
