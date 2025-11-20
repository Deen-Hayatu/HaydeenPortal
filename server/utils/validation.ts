/**
 * Validation utilities for request parameters
 */
import { z } from 'zod';

/**
 * Validates slug parameters to prevent injection
 */
export const slugSchema = z.string()
  .regex(/^[a-z0-9-]+$/, { message: "Invalid slug format" })
  .min(1)
  .max(100);

/**
 * Validates email addresses
 */
export const emailSchema = z.string()
  .email({ message: "Invalid email address" })
  .max(254, { message: "Email address too long" })
  .toLowerCase()
  .trim();

/**
 * Validates pagination parameters
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

