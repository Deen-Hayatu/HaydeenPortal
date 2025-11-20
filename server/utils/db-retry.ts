/**
 * Database retry utility
 * Provides retry logic for database operations with exponential backoff
 */

import { logger } from './logger';

export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number; // in milliseconds
  maxDelay?: number; // in milliseconds
  backoffMultiplier?: number;
  retryableErrors?: string[];
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffMultiplier: 2,
  retryableErrors: [
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ENOTFOUND',
    'ECONNRESET',
    'Connection terminated unexpectedly',
    'Connection closed',
  ],
};

/**
 * Check if an error is retryable
 */
function isRetryableError(error: unknown, retryableErrors: string[]): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const errorMessage = error.message.toLowerCase();
  const errorName = error.name.toLowerCase();

  return retryableErrors.some((retryableError) => {
    const lowerRetryable = retryableError.toLowerCase();
    return errorMessage.includes(lowerRetryable) || errorName.includes(lowerRetryable);
  });
}

/**
 * Calculate delay for retry with exponential backoff
 */
function calculateDelay(attempt: number, options: Required<RetryOptions>): number {
  const delay = options.initialDelay * Math.pow(options.backoffMultiplier, attempt);
  return Math.min(delay, options.maxDelay);
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Execute a function with retry logic
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: unknown;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry if it's the last attempt
      if (attempt === opts.maxRetries) {
        break;
      }

      // Don't retry if error is not retryable
      if (!isRetryableError(error, opts.retryableErrors)) {
        logger.debug('Error is not retryable', { error: error instanceof Error ? error.message : String(error) });
        throw error;
      }

      const delay = calculateDelay(attempt, opts);
      logger.warn(`Database operation failed, retrying in ${delay}ms (attempt ${attempt + 1}/${opts.maxRetries})`, {
        error: error instanceof Error ? error.message : String(error),
        attempt: attempt + 1,
      });

      await sleep(delay);
    }
  }

  // If we get here, all retries failed
  logger.error('Database operation failed after all retries', lastError as Error, {
    maxRetries: opts.maxRetries,
  });
  throw lastError;
}

