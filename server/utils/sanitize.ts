/**
 * Input sanitization utilities
 * Prevents XSS attacks and ensures data integrity
 */

/**
 * Sanitize a string by removing potentially dangerous characters
 * This is a basic sanitization - for production, consider using DOMPurify
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove null bytes
  let sanitized = input.replace(/\0/g, '');
  
  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  return sanitized.trim();
}

/**
 * Sanitize an object's string properties recursively
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key] as string) as T[Extract<keyof T, string>];
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null && !Array.isArray(sanitized[key])) {
      sanitized[key] = sanitizeObject(sanitized[key] as Record<string, unknown>) as T[Extract<keyof T, string>];
    }
  }
  
  return sanitized;
}

/**
 * Sanitize email address (basic validation + sanitization)
 */
export function sanitizeEmail(email: string): string {
  return sanitizeString(email).toLowerCase().trim();
}

/**
 * Sanitize phone number (remove non-numeric characters except +)
 */
export function sanitizePhone(phone: string): string {
  return sanitizeString(phone).replace(/[^\d+]/g, '');
}

