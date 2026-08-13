import { isIP } from 'node:net';

const DEFAULT_REGION = 'us-east-1';
const MAX_REGION_LENGTH = 128;
const MAX_CREDENTIAL_FIELD_LENGTH = 4096;

export interface S3ArtifactCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  expiration?: Date;
}

export type S3ArtifactCredentialProvider = () => unknown | Promise<unknown>;

export interface S3ArtifactClientConfigInput {
  region?: string;
  endpoint?: string;
  forcePathStyle?: boolean;
  allowedEndpointHosts?: readonly string[];
  allowInsecureHttp?: boolean;
  allowPrivateNetwork?: boolean;
  credentialProvider?: S3ArtifactCredentialProvider;
}

export interface NormalizedS3ArtifactClientConfig {
  region: string;
  endpoint?: string;
  forcePathStyle: boolean;
  credentialProvider?: () => Promise<S3ArtifactCredentials>;
}

export class S3ArtifactConfigurationError extends Error {
  readonly code = 'S3_ARTIFACT_CONFIGURATION_INVALID';

  constructor(message: string) {
    super(message);
    this.name = 'S3ArtifactConfigurationError';
  }
}

export class S3ArtifactCredentialError extends Error {
  readonly code = 'S3_ARTIFACT_CREDENTIAL_INVALID';

  constructor(message: string) {
    super(message);
    this.name = 'S3ArtifactCredentialError';
  }
}

/**
 * Normalizes the client-only S3 configuration before an SDK client is created.
 * Custom endpoints are an explicit trust boundary: the exact host must be
 * allow-listed, while plaintext HTTP and private networks require independent
 * opt-ins for local MinIO and similarly controlled deployments.
 */
export function normalizeS3ArtifactClientConfig(
  input: S3ArtifactClientConfigInput
): NormalizedS3ArtifactClientConfig {
  const region = normalizeRegion(input.region);
  const endpoint = input.endpoint
    ? normalizeS3Endpoint(input.endpoint, {
        allowedEndpointHosts: input.allowedEndpointHosts ?? [],
        allowInsecureHttp: input.allowInsecureHttp ?? false,
        allowPrivateNetwork: input.allowPrivateNetwork ?? false,
      })
    : undefined;

  if (!endpoint && (input.allowInsecureHttp || input.allowPrivateNetwork)) {
    throw new S3ArtifactConfigurationError(
      'Endpoint network exceptions require an explicit custom endpoint.'
    );
  }
  if (!endpoint && (input.allowedEndpointHosts?.length ?? 0) > 0) {
    throw new S3ArtifactConfigurationError(
      'Endpoint host allow-list requires an explicit custom endpoint.'
    );
  }

  return {
    region,
    ...(endpoint ? { endpoint } : {}),
    forcePathStyle: input.forcePathStyle ?? false,
    ...(input.credentialProvider
      ? { credentialProvider: validatedCredentialProvider(input.credentialProvider) }
      : {}),
  };
}

function normalizeRegion(value: string | undefined): string {
  const region = value?.trim() || DEFAULT_REGION;
  if (region.length > MAX_REGION_LENGTH || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/iu.test(region)) {
    throw new S3ArtifactConfigurationError('S3 region is invalid.');
  }
  return region;
}

function normalizeS3Endpoint(
  value: string,
  policy: {
    allowedEndpointHosts: readonly string[];
    allowInsecureHttp: boolean;
    allowPrivateNetwork: boolean;
  }
): string {
  let endpoint: URL;
  try {
    endpoint = new URL(value);
  } catch {
    throw new S3ArtifactConfigurationError('S3 endpoint must be an absolute HTTP(S) URL.');
  }

  if (endpoint.protocol !== 'https:' && endpoint.protocol !== 'http:') {
    throw new S3ArtifactConfigurationError('S3 endpoint must use HTTP or HTTPS.');
  }
  if (endpoint.protocol === 'http:' && !policy.allowInsecureHttp) {
    throw new S3ArtifactConfigurationError('Plaintext S3 endpoints are disabled.');
  }
  if (endpoint.username || endpoint.password) {
    throw new S3ArtifactConfigurationError('S3 endpoint must not contain credentials.');
  }
  if (endpoint.pathname !== '/' || endpoint.search || endpoint.hash) {
    throw new S3ArtifactConfigurationError(
      'S3 endpoint must not contain a path, query, or fragment.'
    );
  }

  const hostname = normalizeHostname(endpoint.hostname);
  const allowedHosts = new Set(policy.allowedEndpointHosts.map(normalizeAllowedHostname));
  if (!allowedHosts.has(hostname)) {
    throw new S3ArtifactConfigurationError('S3 endpoint host is not explicitly allowed.');
  }
  if (isPrivateOrLocalHostname(hostname) && !policy.allowPrivateNetwork) {
    throw new S3ArtifactConfigurationError('Private-network S3 endpoints are disabled.');
  }

  return endpoint.origin;
}

function normalizeAllowedHostname(value: string): string {
  const hostname = normalizeHostname(value);
  if (!hostname || hostname.includes('*') || hostname.includes('/')) {
    throw new S3ArtifactConfigurationError('S3 endpoint host allow-list is invalid.');
  }
  return hostname;
}

function normalizeHostname(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/\.$/u, '');
  return normalized.startsWith('[') && normalized.endsWith(']')
    ? normalized.slice(1, -1)
    : normalized;
}

function isPrivateOrLocalHostname(hostname: string): boolean {
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal') ||
    hostname.endsWith('.home.arpa')
  ) {
    return true;
  }

  const ipVersion = isIP(hostname);
  if (ipVersion === 4) return isNonPublicIpv4(hostname);
  if (ipVersion === 6) return isNonPublicIpv6(hostname);
  return false;
}

function isNonPublicIpv4(hostname: string): boolean {
  const octets = hostname.split('.').map(Number);
  const [first = -1, second = -1] = octets;
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && (second === 0 || second === 168)) ||
    (first === 198 && (second === 18 || second === 19)) ||
    first >= 224
  );
}

function isNonPublicIpv6(hostname: string): boolean {
  const value = hostname.toLowerCase();
  return (
    value === '::' ||
    value === '::1' ||
    value.startsWith('fc') ||
    value.startsWith('fd') ||
    /^fe[89ab]/u.test(value) ||
    value.startsWith('ff') ||
    value.startsWith('2001:db8:') ||
    value.startsWith('::ffff:')
  );
}

function validatedCredentialProvider(
  provider: S3ArtifactCredentialProvider
): () => Promise<S3ArtifactCredentials> {
  return async () => {
    let value: unknown;
    try {
      value = await provider();
    } catch {
      throw new S3ArtifactCredentialError('S3 credential provider failed.');
    }
    return validateCredentials(value);
  };
}

function validateCredentials(value: unknown): S3ArtifactCredentials {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new S3ArtifactCredentialError('S3 credential provider returned invalid credentials.');
  }
  const record = value as Record<string, unknown>;
  const accessKeyId = requireCredentialString(record.accessKeyId);
  const secretAccessKey = requireCredentialString(record.secretAccessKey);
  const sessionToken = optionalCredentialString(record.sessionToken);
  const expiration = optionalCredentialExpiration(record.expiration);

  if (expiration && expiration.getTime() <= Date.now()) {
    throw new S3ArtifactCredentialError('S3 credential provider returned expired credentials.');
  }

  return Object.freeze({
    accessKeyId,
    secretAccessKey,
    ...(sessionToken ? { sessionToken } : {}),
    ...(expiration ? { expiration } : {}),
  });
}

function requireCredentialString(value: unknown): string {
  if (
    typeof value !== 'string' ||
    value.length === 0 ||
    value.length > MAX_CREDENTIAL_FIELD_LENGTH
  ) {
    throw new S3ArtifactCredentialError('S3 credential provider returned invalid credentials.');
  }
  return value;
}

function optionalCredentialString(value: unknown): string | undefined {
  return value === undefined ? undefined : requireCredentialString(value);
}

function optionalCredentialExpiration(value: unknown): Date | undefined {
  if (value === undefined) return undefined;
  if (!(value instanceof Date) || !Number.isFinite(value.getTime())) {
    throw new S3ArtifactCredentialError('S3 credential provider returned invalid credentials.');
  }
  return new Date(value.getTime());
}
