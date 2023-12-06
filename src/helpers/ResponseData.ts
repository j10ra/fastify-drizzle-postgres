import { FastifyReply } from 'fastify';

class ResponseData {
    constructor(reply: FastifyReply, payload: any = {}, statusCode: number = 200) {
        const responseBody = {
            code: statusCode,
            payload
        };
        reply.status(statusCode).send(responseBody);
    }
}

export default ResponseData;