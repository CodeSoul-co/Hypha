/**
 * CLI state on disk. Two files in $ORBIT_HOME (default ~/.orbit):
 *   - config.json — baseUrl + optional model preferences
 *   - token.json  — JWT for Authorization header
 *
 * The token file is chmod 600 because it grants full account access.
 */
import fs from 'fs';
import path from 'path';
import os from 'os';

const HOME = process.env.ORBIT_HOME || path.join(os.homedir(), '.orbit');
const CONFIG_PATH = path.join(HOME, 'config.json');
const TOKEN_PATH = path.join(HOME, 'token.json');

export interface OrbitConfig {
  baseUrl: string;
  /** Optional default model; commands fall back to server's `defaults/current`. */
  defaultModel?: string;
  defaultProvider?: string;
}

export interface StoredToken {
  token: string;
  userId: string;
  email: string;
  isAdmin?: boolean;
  savedAt: string;
}

function ensureHome(): void {
  if (!fs.existsSync(HOME)) fs.mkdirSync(HOME, { recursive: true, mode: 0o700 });
}

export function getHome(): string { return HOME; }

export function getBaseUrl(): string {
  // Override precedence: env var > config file > default
  if (process.env.ORBIT_BASE_URL) return process.env.ORBIT_BASE_URL;
  const cfg = readConfig();
  return cfg?.baseUrl || 'http://127.0.0.1:3000/api/v1';
}

export function getDefaultModel(): string | undefined {
  return process.env.ORBIT_MODEL || readConfig()?.defaultModel;
}

export function getDefaultProvider(): string | undefined {
  return process.env.ORBIT_PROVIDER || readConfig()?.defaultProvider;
}

export function readConfig(): OrbitConfig | null {
  if (!fs.existsSync(CONFIG_PATH)) return null;
  try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8')); }
  catch { return null; }
}

export function writeConfig(patch: Partial<OrbitConfig>): OrbitConfig {
  ensureHome();
  const current = readConfig() || { baseUrl: 'http://127.0.0.1:3000/api/v1' };
  const next = { ...current, ...patch };
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(next, null, 2), 'utf-8');
  return next;
}

export function getToken(): string | null {
  if (!fs.existsSync(TOKEN_PATH)) return null;
  try { return (JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8')) as StoredToken).token; }
  catch { return null; }
}

export function readToken(): StoredToken | null {
  if (!fs.existsSync(TOKEN_PATH)) return null;
  try { return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8')); }
  catch { return null; }
}

export function writeToken(t: Omit<StoredToken, 'savedAt'>): StoredToken {
  ensureHome();
  const full: StoredToken = { ...t, savedAt: new Date().toISOString() };
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(full, null, 2), { mode: 0o600 });
  // Best-effort chmod — some FS (Windows) ignore the mode arg.
  try { fs.chmodSync(TOKEN_PATH, 0o600); } catch { /* noop */ }
  return full;
}

export function clearToken(): void {
  if (fs.existsSync(TOKEN_PATH)) fs.unlinkSync(TOKEN_PATH);
}
