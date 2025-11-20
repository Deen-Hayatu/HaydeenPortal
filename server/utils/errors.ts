/**
 * Standardized error handling utilities
 * Provides consistent error response formats across the API
 */

import { Response } from 'express';
import { ZodError } from 'zod';
import { logger } from './logger';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(public errors: ZodError['errors']) {
    super(400, 'Validation failed');
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, message);
    this.name = 'ForbiddenError';
  }
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export function handleError(error: unknown, res: Response): void {
  // Don't send response if headers already sent
  if (res.headersSent) {
    logger.error('Response already sent, cannot send error response', error as Error);
    return;
  }

  // Handle known error types
  if (error instanceof ValidationError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: 'VALIDATION_ERROR',
        details: error.errors,
      },
    } as ErrorResponse);
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
        code: error.name,
      },
    } as ErrorResponse);
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.errors,
      },
    } as ErrorResponse);
    return;
  }

  // Handle unknown errors
  const isDevelopment = process.env.NODE_ENV === 'development';
  const errorMessage = error instanceof Error ? error.message : 'Internal server error';
  const errorStack = error instanceof Error && isDevelopment ? error.stack : undefined;

  logger.error('Unhandled error', error as Error, {
    path: res.req.path,
    method: res.req.method,
  });

  res.status(500).json({
    success: false,
    error: {
      message: isDevelopment ? errorMessage : 'Internal server error',
      code: 'INTERNAL_ERROR',
      ...(isDevelopment && errorStack ? { details: errorStack } : {}),
    },
  } as ErrorResponse);
}

