import LogStreamGenerator from '../helpers/LogStreamGenerator';
import pino from 'pino';

export function serviceLogger(message = 'Server Error', err = null) {
  const logger = LogStreamGenerator.getLogStream('api');

  if (err) {
    console.error(err);
  }

  if (process.env.NODE_ENV === 'production') {
    logger.write(`[${new Date().toISOString()}] ${message}: ${err}\n`);
    logger.end();
  }
}

export default function getLoggerOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  const level = process.env.LOG_LEVEL || 'info';

  return isProduction ? { level, stream: LogStreamGenerator.getLogStream('api') } : pino({ level });
}
