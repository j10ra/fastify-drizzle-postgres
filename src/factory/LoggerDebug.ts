import { FastifyRequest } from 'fastify';
import LogStream from './LogStream';
import Logger from './Logger';

const Debug = {
  log: (request: FastifyRequest, message: Record<string, unknown>) => {
    const reqId = request.id;

    if (process.env.NODE_ENV === 'development') {
      Logger.log(`\x1b[33m[DEBUG]:\x1b[0m ${reqId}`, { ...message });
    }

    const log = LogStream.prefix('service');
    const logMessage = `[${new Date().toISOString()}] LOG: ${reqId}: ${
      typeof message === 'object' ? JSON.stringify(message) : message
    }\n`;

    log.write(logMessage);
  },
};

export default Debug;
