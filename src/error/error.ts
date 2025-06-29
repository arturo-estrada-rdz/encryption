import { Request, Response } from 'express';

/**
 * Custom application error class that extends the built-in Error.
 * Optionally includes an HTTP status code.
 */
export class AppError extends Error {
  status?: number;
}

/**
 * Express error-handling middleware.
 * Logs the error and sends a JSON response with the error message and status code.
 *
 * @param err - The error object (should be an AppError).
 * @param _req - The Express request object (unused).
 * @param res - The Express response object.
 */
export const errorHandler = (err: AppError, _req: Request, res: Response) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

/**
 * Creates a 405 Method Not Allowed error.
 * @param message Optional custom error message.
 */
export function notAllowedError(message?: string) {
  const error = new AppError(message ?? 'Method Not Allowed');
  error.status = 405;
  return error;
}

/**
 * Creates a 401 Unauthorized error.
 * @param message Optional custom error message.
 */
export function unauthorizedError(message?: string) {
  const error = new AppError(message ?? 'Unauthorized');
  error.status = 401;
  return error;
}

/**
 * Creates a 403 Forbidden error.
 * @param message Optional custom error message.
 */
export function forbiddenError(message?: string) {
  const error = new AppError(message ?? 'Forbidden');
  error.status = 403;
  return error;
}

/**
 * Creates a 404 Not Found error.
 * @param message Optional custom error message.
 */
export function notFoundError(message?: string) {
  const error = new AppError(message ?? 'Not Found');
  error.status = 404;
  return error;
}

/**
 * Creates a 400 Bad Request error.
 * @param message Optional custom error message.
 */
export function badRequestError(message?: string) {
  const error = new AppError(message ?? 'Bad Request');
  error.status = 400;
  return error;
}

/**
 * Creates a 500 Internal Server Error.
 * @param message Optional custom error message.
 */
export function internalServerError(message?: string) {
  const error = new AppError(message ?? 'Internal Server Error');
  error.status = 500;
  return error;
}

/**
 * Creates a 409 Conflict error.
 * @param message Optional custom error message.
 */
export function conflictError(message?: string) {
  const error = new AppError(message ?? 'Conflict');
  error.status = 409;
  return error;
}
