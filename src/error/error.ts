import { Request, Response } from 'express';

export class AppError extends Error {
  status?: number;
}

export const errorHandler = (err: AppError, _req: Request, res: Response) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

export function notAllowedError() {
  const error = new AppError('Method Not Allowed');
  error.status = 405; // Method Not Allowed
  return error;
}

export function notFoundError() {
  const error = new AppError('Not Found');
  error.status = 404; // Not Found
  return error;
}
