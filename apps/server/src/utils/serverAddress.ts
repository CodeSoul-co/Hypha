export function formatLocalHealthBaseUrl(host: string, port: number): string {
  const normalizedHost =
    host === '0.0.0.0' ? '127.0.0.1' : host === '::' || host === '[::]' ? '::1' : host;
  const authority = normalizedHost.includes(':')
    ? `[${normalizedHost.replace(/^\[|\]$/gu, '')}]`
    : normalizedHost;
  return new URL(`http://${authority}:${port}`).origin;
}
