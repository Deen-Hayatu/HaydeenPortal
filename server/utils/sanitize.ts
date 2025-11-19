/**
 * Sanitization utilities to prevent injection attacks
 */

/**
 * Sanitizes text for safe use in email content
 * Removes or escapes characters that could be used for email header injection
 */
export function sanitizeEmailContent(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  // Remove or escape newlines and carriage returns (prevents header injection)
  return text
    .replace(/\r\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/:/g, '') // Remove colons that could be used in headers
    .trim();
}

/**
 * Sanitizes text for safe display in HTML
 */
export function sanitizeHtml(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes file names to prevent path traversal
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName || typeof fileName !== 'string') {
    return 'file';
  }
  
  // Remove path separators and dangerous characters
  return fileName
    .replace(/[\/\\]/g, '_')
    .replace(/\.\./g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .substring(0, 255); // Limit length
}

