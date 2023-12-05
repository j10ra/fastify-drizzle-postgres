import { FastifyRequest } from 'fastify';
import LogStream from './LogStream';

const Logger = {
  log: (request: FastifyRequest, message: Record<string, unknown>) => {
    const reqId = request.id;

    if (process.env.NODE_ENV === 'development') {
      request.log.info({ reqId, ...message });
    }

    const log = LogStream.prefix('service');
    const logMessage = `[${new Date().toISOString()}] LOG: ${reqId}: ${
      typeof message === 'object' ? JSON.stringify(message) : message
    }\n`;

    log.write(logMessage);
  },
};

export default Logger;
