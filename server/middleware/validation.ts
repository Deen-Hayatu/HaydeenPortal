/**
 * Request validation middleware
 */
import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { sendError } from '../utils/response';
import { slugSchema } from '../utils/validation';

/**
 * Validates request parameters using Zod schema
 */
export function validateParams<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        sendError(res, 'Invalid request parameters', 400, error.errors[0]?.message);
      } else {
        sendError(res, 'Validation error', 400);
      }
    }
  };
}

/**
 * Validates request body using Zod schema
 */
export function validateBody<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        sendError(res, 'Invalid request body', 400, error.errors[0]?.message);
      } else {
        sendError(res, 'Validation error', 400);
      }
    }
  };
}

/**
 * Validates slug parameter
 */
export function validateSlug(req: Request, res: Response, next: NextFunction): void {
  try {
    const slug = slugSchema.parse(req.params.slug);
    req.params.slug = slug;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      sendError(res, 'Invalid slug format', 400);
    } else {
      sendError(res, 'Validation error', 400);
    }
  }
}

