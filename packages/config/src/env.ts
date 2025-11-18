/**
 * GhostTip - Environment Configuration
 * Validates and exports typed environment variables using Zod
 */

import { z } from 'zod';

/**
 * Backend environment schema
 */
export const backendEnvSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),

  // Database
  DATABASE_URL: z.string().url(),

  // Security
  MASTER_KEY: z.string().min(32, 'MASTER_KEY must be at least 32 characters'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  // Rate limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().default(60000), // 1 minute
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().default(100),

  // Application
  APP_NAME: z.string().default('GhostTip'),
  APP_URL: z.string().url().default('http://localhost:3000'),
  API_URL: z.string().url().default('http://localhost:3001'),
});

/**
 * Web app environment schema
 */
export const webEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3001'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('GhostTip'),
});

/**
 * Mobile app environment schema
 */
export const mobileEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url().default('http://localhost:3001'),
  EXPO_PUBLIC_APP_NAME: z.string().default('GhostTip'),
});

export type BackendEnv = z.infer<typeof backendEnvSchema>;
export type WebEnv = z.infer<typeof webEnvSchema>;
export type MobileEnv = z.infer<typeof mobileEnvSchema>;

/**
 * Parse and validate environment variables
 */
export function parseEnv<T extends z.ZodSchema>(
  schema: T,
  env: Record<string, string | undefined> = process.env
): z.infer<T> {
  const result = schema.safeParse(env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error('Invalid environment variables');
  }

  return result.data;
}
