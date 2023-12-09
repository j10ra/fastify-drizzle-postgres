// errorHandler.ts
import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import httpStatus from 'http-status';
import errorAdapter from './errorAdapter';

function logError(error: FastifyError, request: FastifyRequest) {
  request.log.error(error);
}

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Convert the error
  const serverError = errorAdapter(error);

  // Update error details for production
  if (isProduction() && !serverError.isOperational) {
    serverError.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    serverError.message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  // Log error in development environment
  if (!isProduction()) {
    logError(error, request);
  }

  // Construct error response
  const errorResponse: { error: boolean; statusCode: number; message: string; stack?: string } = {
    error: true,
    statusCode: serverError.statusCode,
    message: serverError.message,
  };

  // Include stack trace in development environment
  if (!isProduction()) {
    errorResponse.stack = serverError.stack;
  }

  // Send the response
  return reply.status(serverError.statusCode).send(errorResponse);
}
