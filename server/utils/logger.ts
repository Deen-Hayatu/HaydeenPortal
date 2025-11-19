/**
 * Structured logging utility
 * Replaces console.log/error with proper logging
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  source?: string;
  error?: {
    message: string;
    stack?: string;
    name?: string;
  };
  metadata?: Record<string, any>;
}

class Logger {
  private formatTime(): string {
    return new Date().toISOString();
  }

  private formatLog(level: LogLevel, message: string, source?: string, error?: Error, metadata?: Record<string, any>): string {
    const entry: LogEntry = {
      timestamp: this.formatTime(),
      level,
      message,
      ...(source && { source }),
      ...(error && { error: { message: error.message, stack: error.stack } }),
      ...(metadata && { metadata }),
    };

    return JSON.stringify(entry);
  }

  info(message: string, source?: string, metadata?: Record<string, any>): void {
    if (process.env.NODE_ENV !== 'test') {
      console.log(this.formatLog('info', message, source, undefined, metadata));
    }
  }

  warn(message: string, source?: string, metadata?: Record<string, any>): void {
    if (process.env.NODE_ENV !== 'test') {
      console.warn(this.formatLog('warn', message, source, undefined, metadata));
    }
  }

  error(message: string, source?: string, error?: Error, metadata?: Record<string, any>): void {
    // Always log errors, even in test mode
    const errorData = error ? {
      message: error.message,
      stack: error.stack,
      name: error.name,
    } : undefined;
    console.error(this.formatLog('error', message, source, errorData, metadata));
  }

  debug(message: string, source?: string, metadata?: Record<string, any>): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatLog('debug', message, source, undefined, metadata));
    }
  }
}

export const logger = new Logger();

