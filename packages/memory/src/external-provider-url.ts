import { memoryError } from './memory-utils';

export interface ExternalProviderBaseUrlOptions {
  providerName: string;
  allowLoopbackHttp?: boolean;
  allowInsecureForTests?: boolean;
}

/**
 * Normalizes an external Memory Provider base URL and fails closed before a
 * credential can be attached to an unsafe or ambiguous destination.
 */
export function normalizeExternalProviderBaseUrl(
  value: string,
  options: ExternalProviderBaseUrlOptions
): string {
  const raw = value.trim();
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      `${options.providerName} base URL must be an absolute HTTP(S) URL.`
    );
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      `${options.providerName} base URL must use HTTP or HTTPS.`
    );
  }
  if (url.username || url.password || url.search || url.hash) {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      `${options.providerName} base URL must not contain credentials, a query, or a fragment.`
    );
  }
  if (
    url.protocol === 'http:' &&
    !options.allowInsecureForTests &&
    !(options.allowLoopbackHttp && isLoopbackHostname(url.hostname))
  ) {
    throw memoryError(
      'MEMORY_INVALID_INPUT',
      `${options.providerName} requires HTTPS outside loopback development.`
    );
  }
  url.pathname = url.pathname.replace(/\/+$/u, '');
  return url.toString().replace(/\/$/u, '');
}

export function isLoopbackHostname(hostname: string): boolean {
  const normalized = hostname.replace(/^\[|\]$/gu, '').toLowerCase();
  if (normalized === 'localhost' || normalized.endsWith('.localhost') || normalized === '::1') {
    return true;
  }
  const octets = normalized.split('.');
  return (
    octets.length === 4 &&
    octets[0] === '127' &&
    octets.every((octet) => /^\d{1,3}$/u.test(octet) && Number(octet) <= 255)
  );
}
