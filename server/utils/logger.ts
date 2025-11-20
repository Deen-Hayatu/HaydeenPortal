/**
 * Centralized logging utility
 * Provides structured logging with different log levels
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    const formattedMessage = this.formatMessage(level, message, context);
    
    if (error) {
      const errorContext = {
        ...context,
        error: {
          name: error.name,
          message: error.message,
          stack: this.isDevelopment ? error.stack : undefined,
        },
      };
      const errorMessage = this.formatMessage(level, message, errorContext);
      
      switch (level) {
        case 'error':
          console.error(errorMessage);
          break;
        case 'warn':
          console.warn(errorMessage);
          break;
        default:
          console.log(errorMessage);
      }
    } else {
      switch (level) {
        case 'error':
          console.error(formattedMessage);
          break;
        case 'warn':
          console.warn(formattedMessage);
          break;
        case 'debug':
          if (this.isDevelopment) {
            console.log(formattedMessage);
          }
          break;
        default:
          console.log(formattedMessage);
      }
    }
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: LogContext): void {
    this.log('error', message, context, error);
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }
}

export const logger = new Logger();

