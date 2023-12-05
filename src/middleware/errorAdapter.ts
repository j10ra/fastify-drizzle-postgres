import httpStatus from 'http-status';
import { ServerError } from '@/helpers/ServerError';

// Middleware to convert errors to ServerError
export default function errorAdapter(error: Error): ServerError {
  if (error instanceof ServerError) {
    return error;
  }

  const statusCode = (error as any).statusCode || 500;
  const message = error.message || httpStatus[500]; // internal server error

  return new ServerError(statusCode, message, true, error.stack);
}
