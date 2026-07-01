import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

export { uuidv4 as generateId };

export function generateSessionId(): string {
  return `sess_${uuidv4()}`;
}

export function generateMessageId(): string {
  return `msg_${uuidv4()}`;
}

export function generateApiKey(): string {
  const prefix = 'oa_';
  const randomPart = uuidv4().replace(/-/g, '');
  return `${prefix}${randomPart}`;
}

export function timestamp(): number {
  return Date.now();
}

export function now(): Date {
  return new Date();
}

export function formatDate(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await sleep(delay * Math.pow(2, i)); // Exponential backoff
      }
    }
  }
  throw lastError;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function maskString(str: string, visibleChars: number = 4): string {
  if (str.length <= visibleChars) {
    return '*'.repeat(str.length);
  }
  const masked = '*'.repeat(str.length - visibleChars);
  return masked + str.slice(-visibleChars);
}

export function parseBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  return Boolean(value);
}

export function parseNumber(value: any, defaultValue: number = 0): number {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}

export function safeJsonParse<T = any>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}

export function buildMongoUri(config: {
  host: string;
  port: number;
  database: string;
  username?: string;
  password?: string;
}): string {
  const { host, port, database, username, password } = config;
  if (username && password) {
    return `mongodb://${username}:${password}@${host}:${port}/${database}`;
  }
  return `mongodb://${host}:${port}/${database}`;
}
