import httpStatus from 'http-status';

export class ServerError extends Error {
  statusCode: number;
  isOperational: boolean;

  /**
   * Creates a Server Error object.
   * @param {number} statusCode - HTTP status code of the error.
   * @param {string} message - Error message.
   * @param {boolean} [isOperational=true] - Flag to indicate if it's an operational error.
   * @param {string} [stack=''] - Stack trace of the error.
   */
  constructor(
    statusCode: number = 500,
    message: string,
    isOperational: boolean = true,
    stack: string = ''
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class BadRequestError extends ServerError {
  constructor(message = httpStatus[400], stack = '') {
    super(httpStatus.BAD_REQUEST, message, true, stack);
  }
}

export class UnauthorizedError extends ServerError {
  constructor(message = httpStatus[401], stack = '') {
    super(httpStatus.UNAUTHORIZED, message, true, stack);
  }
}

export class ForbiddenError extends ServerError {
  constructor(message = httpStatus[403], stack = '') {
    super(httpStatus.FORBIDDEN, message, true, stack);
  }
}

export class NotFoundError extends ServerError {
  constructor(message = httpStatus[404], stack = '') {
    super(httpStatus.NOT_FOUND, message, true, stack);
  }
}

export class TryAgainError extends ServerError {
  constructor(message = httpStatus[503], stack = '') {
    super(httpStatus.SERVICE_UNAVAILABLE, message, true, stack);
  }
}
