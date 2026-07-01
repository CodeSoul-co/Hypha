/**
 * Helpers shared by command files. Keeping these tiny + side-effect free.
 */
import { ApiResponse } from '../http';

export function unwrap<T>(body: ApiResponse<T>): T {
  if (body.success) return body.data;
  const msg = body.error?.message || 'unknown error';
  const code = body.error?.code || 'ERR';
  const err = new Error(`${code}: ${msg}`) as Error & { code?: string };
  err.code = code;
  throw err;
}

/**
 * Like `apiGet` but returns the raw `{success, data, error}` envelope
 * instead of throwing on `success: false`. Useful when the command wants
 * to inspect error codes (e.g. SKILL_NOT_FOUND) rather than always exit 1.
 */
export async function apiGetRaw<T>(path: string): Promise<ApiResponse<T>> {
  // Reuse the shared axios client from ../http. We import lazily to keep
  // the cold-start path of this util file trivial.
  const axios = (await import('axios')).default;
  const { getBaseUrl, getToken } = await import('../config');
  const r = await axios.get<ApiResponse<T>>(getBaseUrl() + path, {
    headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
    timeout: 30_000,
  });
  return r.data;
}

/** Format a unix timestamp as "YYYY-MM-DD HH:mm:ss" in local time. */
export function fmtDate(input: Date | string | number | undefined): string {
  if (input === undefined) return '—';
  const d = new Date(input);
  if (isNaN(d.getTime())) return '—';
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
         `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
