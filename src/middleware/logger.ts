import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { RawServerBase } from 'fastify/types/utils';
import LogStreamGenerator from '../helpers/LogStreamGenerator';

export function traceLog(request, message) {
  const reqId = request.id;

  if (process.env.NODE_ENV === 'development') {
    request.log.info({ reqId, ...message });
  }

  if (process.env.WRITE_TRACE_LOGGER === 'enabled') {
    const logger = LogStreamGenerator.getLogStream('service');

    logger.write(
      `[${new Date().toISOString()}] LOG: ${reqId}: ${
        typeof message === 'object' ? JSON.stringify(message) : message
      }\n`
    );

    logger.end();
  }
}

export function registerServiceLogger(server: FastifyInstance<RawServerBase>) {
  server.addHook(
    'preValidation',
    (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const { body, params, query } = request;

      server.log.info({ body, params, query }, 'Request details');
      done();
    }
  );

  server.addHook(
    'onSend',
    (
      request: FastifyRequest,
      reply: FastifyReply,
      payload: string,
      done: (err?: Error) => void
    ) => {
      server.log.info({ response: payload }, 'Response details');
      done();
    }
  );
}
