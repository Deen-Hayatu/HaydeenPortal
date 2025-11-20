import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { getConfig } from "./config";
import { logger } from "./utils/logger";
import { withRetry } from "./utils/db-retry";

neonConfig.webSocketConstructor = ws;

// Get database URL from config (validated on startup)
const config = getConfig();

export const pool = new Pool({ 
  connectionString: config.database.url,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be established
});

// Test database connection on startup with retry logic
withRetry(
  async () => {
    await pool.query('SELECT 1');
    logger.info('Database connection established successfully');
  },
  {
    maxRetries: 3,
    initialDelay: 1000,
  }
).catch((error) => {
  logger.error('Failed to connect to database after retries', error);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

export const db = drizzle({ client: pool, schema });
