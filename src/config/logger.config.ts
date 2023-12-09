import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { RawServerBase } from 'fastify/types/utils';
import pino from 'pino';
import LogStream from '@/factory/LogStream';

// this hook work only on development
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

export function getLoggerOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  const level = process.env.LOG_LEVEL || 'info';

  return isProduction
    ? {
        level,
        stream: LogStream.prefix('api'),
        formatters: {
          bindings: (bindings) => {
            return { pid: bindings.pid, host: bindings.hostname };
          },
          level: (label) => {
            return { level: label.toUpperCase() };
          },
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      }
    : pino({ level });
}
