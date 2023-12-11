import { FastifyReply } from 'fastify';

function respond(reply: FastifyReply, payload: any = {}, statusCode: number = 200) {
  const responseBody = {
    error: false,
    statusCode,
    payload,
  };

  console.log(reply);

  reply.status(statusCode).send(responseBody);
}

export default respond;
