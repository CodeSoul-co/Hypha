/**
 * Thin HTTP client wrapping the hypha REST API. Every command in
 * apps/cli/commands/* funnels through here so auth, baseUrl, and error
 * handling stay consistent. The CLI stays a pure presentation client.
 */
import axios, { AxiosError, AxiosInstance } from 'axios';
import { getBaseUrl, getToken, clearToken } from './config';

let client: AxiosInstance | null = null;

function getClient(): AxiosInstance {
  if (client) return client;
  const token = getToken();
  client = axios.create({
    baseURL: getBaseUrl(),
    timeout: 60_000,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  // Auto-clear stale token on 401 so the next command can re-login cleanly.
  client.interceptors.response.use(
    (r) => r,
    (err: AxiosError) => {
      if (err.response?.status === 401 && token) {
        clearToken();
        process.stderr.write(
          `\n[!] Token rejected (401). Run \`hypha login\` or \`hypha login --dev\`.\n`
        );
      }
      return Promise.reject(err);
    }
  );
  return client;
}

/** Reset the cached client — call after `hypha config` changes baseUrl. */
export function resetClient(): void {
  client = null;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}
export interface ApiError {
  success: false;
  error: { code: string; message: string; details?: any };
}
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export async function apiGet<T>(path: string, params?: Record<string, unknown>): Promise<T> {
  const r = await getClient().get<ApiResponse<T>>(path, { params });
  return unwrap(r.data);
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const r = await getClient().post<ApiResponse<T>>(path, body);
  return unwrap(r.data);
}

export async function apiDelete<T>(path: string): Promise<T> {
  const r = await getClient().delete<ApiResponse<T>>(path);
  return unwrap(r.data);
}

function unwrap<T>(body: ApiResponse<T>): T {
  if (body.success) return body.data;
  const msg = body.error?.message || 'unknown error';
  const code = body.error?.code || 'ERR';
  const err = new Error(`${code}: ${msg}`) as Error & { code?: string; details?: any };
  err.code = code;
  err.details = body.error?.details;
  throw err;
}
