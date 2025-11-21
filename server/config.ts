/**
 * Environment variable validation and configuration
 * Ensures all required environment variables are present at startup
 */

interface Config {
  database: {
    url: string;
  };
  email: {
    sendgridApiKey: string | null;
    from: string;
  };
  session: {
    secret: string;
  };
  analytics: {
    gaMeasurementId: string | null;
  };
  app: {
    nodeEnv: 'development' | 'production' | 'test';
    port: number;
  };
}

function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
      `Please check your .env file or environment configuration.`
    );
  }
  return value || '';
}

function getEnvVarOptional(name: string, defaultValue: string | null = null): string | null {
  return process.env[name] || defaultValue;
}

function validateConfig(): Config {
  const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test';
  const isProduction = nodeEnv === 'production';

  // Database URL is always required
  const databaseUrl = getEnvVar('DATABASE_URL');

  // Session secret is required in production
  const sessionSecret = getEnvVar('SESSION_SECRET', isProduction);
  if (isProduction && sessionSecret.length < 32) {
    throw new Error(
      'SESSION_SECRET must be at least 32 characters long in production. ' +
      'Generate a secure random string for security.'
    );
  }

  // Email configuration (optional but recommended)
  const sendgridApiKey = getEnvVarOptional('SENDGRID_API_KEY');
  const emailFrom = getEnvVarOptional('EMAIL_FROM', 'noreply@haydeentech.com');

  // Analytics (optional)
  const gaMeasurementId = getEnvVarOptional('VITE_GA_MEASUREMENT_ID');

  return {
    database: {
      url: databaseUrl,
    },
    email: {
      sendgridApiKey,
      from: emailFrom!,
    },
    session: {
      secret: sessionSecret || 'dev-secret-change-in-production-' + Date.now(),
    },
    analytics: {
      gaMeasurementId,
    },
    app: {
      nodeEnv,
      port: parseInt(process.env.PORT || '5000', 10),
    },
  };
}

let config: Config | null = null;

export function getConfig(): Config {
  if (!config) {
    config = validateConfig();
  }
  return config;
}

// Validate on module load (but don't exit in serverless environments)
// In Vercel, static files should still be served even if API config is missing
try {
  getConfig();
} catch (error) {
  console.error('❌ Configuration Error:', error instanceof Error ? error.message : String(error));
  console.error('\n💡 Tip: Copy .env.example to .env and fill in the required values.');
  // Don't exit in serverless environments - let Vercel serve static files
  // Only exit in traditional server environments
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    process.exit(1);
  }
}

