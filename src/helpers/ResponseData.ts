import { FastifyReply } from 'fastify';
import Logger from './Logger';

class ResponseData {
  constructor(reply: FastifyReply, payload: any = {}, statusCode: number = 200) {
    const responseBody = {
      error: false,
      statusCode,
      payload,
    };

    return reply.status(statusCode).send(responseBody);
  }
}

export default ResponseData;
