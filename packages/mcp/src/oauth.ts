import { createHash, randomBytes } from 'node:crypto';
import { isIP } from 'node:net';

export interface MCPProtectedResourceMetadata {
  resource: string;
  authorization_servers: string[];
  bearer_methods_supported?: string[];
}

export interface MCPAuthorizationServerMetadata {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  code_challenge_methods_supported: string[];
  grant_types_supported?: string[];
}

export interface MCPOAuthTokenSet {
  accessToken: string;
  refreshToken?: string;
  tokenType: 'Bearer';
  expiresAt: number;
  scope?: string;
  resource: string;
}

export interface MCPOAuthAuthorizationRequest {
  url: string;
  state: string;
  codeVerifier: string;
}

export interface MCPOAuth21ClientOptions {
  resource: string;
  clientId: string;
  redirectUri: string;
  fetch?: typeof fetch;
  metadataUrl?: string;
  /** Selects one server advertised by RFC 9728 metadata; defaults to the first. */
  authorizationServer?: string;
  timeoutMs?: number;
  now?: () => number;
  randomBytes?: (size: number) => Uint8Array;
  /**
   * Intended only for an in-process acceptance server. Production callers
   * must leave this disabled so OAuth metadata and token traffic require TLS.
   */
  allowInsecureLoopbackForAcceptance?: boolean;
}

interface OAuthTokenResponse {
  access_token?: unknown;
  refresh_token?: unknown;
  token_type?: unknown;
  expires_in?: unknown;
  scope?: unknown;
  resource?: unknown;
}

const SENSITIVE_FIELD =
  /^(authorization|cookie|set-cookie|client_secret|access_token|refresh_token|code|code_verifier)$/i;
const SECRET_VALUE =
  /\b(Bearer\s+)[A-Za-z0-9._~+/=-]+|("(?:access_token|refresh_token|client_secret|code|code_verifier)"\s*:\s*")[^"]+/gi;

export class MCPOAuth21Client {
  private readonly request: typeof fetch;
  private readonly now: () => number;
  private readonly entropy: (size: number) => Uint8Array;
  private protectedResource?: MCPProtectedResourceMetadata;
  private authorizationServer?: MCPAuthorizationServerMetadata;
  private tokenSet?: MCPOAuthTokenSet;

  constructor(private readonly options: MCPOAuth21ClientOptions) {
    this.request = options.fetch ?? globalThis.fetch.bind(globalThis);
    this.now = options.now ?? Date.now;
    this.entropy = options.randomBytes ?? randomBytes;
    assertSecureOAuthUrl(options.resource, options.allowInsecureLoopbackForAcceptance);
    assertSecureOAuthUrl(options.redirectUri, true);
  }

  async discover(): Promise<{
    protectedResource: MCPProtectedResourceMetadata;
    authorizationServer: MCPAuthorizationServerMetadata;
  }> {
    const resourceUrl = new URL(this.options.resource);
    const metadataUrls = this.options.metadataUrl
      ? [this.options.metadataUrl]
      : protectedResourceMetadataUrls(resourceUrl);
    for (const metadataUrl of metadataUrls) {
      assertSecureOAuthUrl(metadataUrl, this.options.allowInsecureLoopbackForAcceptance);
    }
    const protectedResource = parseProtectedResourceMetadata(
      await this.fetchJsonCandidates(metadataUrls, 'protected resource metadata')
    );
    if (canonicalUrl(protectedResource.resource) !== canonicalUrl(this.options.resource)) {
      throw oauthError('MCP_OAUTH_RESOURCE_MISMATCH', 'Protected resource metadata mismatch.');
    }
    if (protectedResource.authorization_servers.length === 0) {
      throw oauthError(
        'MCP_OAUTH_METADATA_INVALID',
        'At least one authorization server is required.'
      );
    }

    const issuer = this.options.authorizationServer ?? protectedResource.authorization_servers[0];
    if (
      !protectedResource.authorization_servers.some(
        (candidate) => canonicalUrl(candidate) === canonicalUrl(issuer)
      )
    ) {
      throw oauthError(
        'MCP_OAUTH_AUTHORIZATION_SERVER_DENIED',
        'Configured authorization server was not advertised by the protected resource.'
      );
    }
    assertSecureOAuthUrl(issuer, this.options.allowInsecureLoopbackForAcceptance);
    const issuerUrl = new URL(issuer);
    const authorizationServer = parseAuthorizationServerMetadata(
      await this.fetchJsonCandidates(
        authorizationServerMetadataUrls(issuerUrl),
        'authorization server metadata'
      )
    );
    if (canonicalUrl(authorizationServer.issuer) !== canonicalUrl(issuer)) {
      throw oauthError('MCP_OAUTH_ISSUER_MISMATCH', 'Authorization server issuer mismatch.');
    }
    if (!authorizationServer.code_challenge_methods_supported.includes('S256')) {
      throw oauthError('MCP_OAUTH_PKCE_REQUIRED', 'Authorization server must support PKCE S256.');
    }
    assertSecureOAuthUrl(
      authorizationServer.authorization_endpoint,
      this.options.allowInsecureLoopbackForAcceptance
    );
    assertSecureOAuthUrl(
      authorizationServer.token_endpoint,
      this.options.allowInsecureLoopbackForAcceptance
    );
    this.protectedResource = protectedResource;
    this.authorizationServer = authorizationServer;
    return { protectedResource, authorizationServer };
  }

  async createAuthorizationRequest(state?: string): Promise<MCPOAuthAuthorizationRequest> {
    const metadata = this.authorizationServer ?? (await this.discover()).authorizationServer;
    const codeVerifier = base64Url(this.entropy(48));
    const effectiveState = state ?? base64Url(this.entropy(24));
    const codeChallenge = createHash('sha256').update(codeVerifier).digest('base64url');
    const url = new URL(metadata.authorization_endpoint);
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: this.options.clientId,
      redirect_uri: this.options.redirectUri,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      resource: this.options.resource,
      state: effectiveState,
    }).toString();
    return { url: url.toString(), state: effectiveState, codeVerifier };
  }

  async exchangeAuthorizationCode(input: {
    code: string;
    codeVerifier: string;
    state: string;
    expectedState: string;
  }): Promise<MCPOAuthTokenSet> {
    if (!input.state || input.state !== input.expectedState) {
      throw oauthError('MCP_OAUTH_STATE_MISMATCH', 'OAuth state validation failed.');
    }
    const metadata = this.authorizationServer ?? (await this.discover()).authorizationServer;
    const response = await this.tokenRequest(metadata.token_endpoint, {
      grant_type: 'authorization_code',
      client_id: this.options.clientId,
      redirect_uri: this.options.redirectUri,
      code: input.code,
      code_verifier: input.codeVerifier,
      resource: this.options.resource,
    });
    this.tokenSet = this.parseTokenResponse(response);
    return { ...this.tokenSet };
  }

  async refresh(): Promise<MCPOAuthTokenSet> {
    if (!this.tokenSet?.refreshToken) {
      throw oauthError('MCP_OAUTH_REFRESH_UNAVAILABLE', 'No refresh token is available.');
    }
    const metadata = this.authorizationServer ?? (await this.discover()).authorizationServer;
    const response = await this.tokenRequest(metadata.token_endpoint, {
      grant_type: 'refresh_token',
      client_id: this.options.clientId,
      refresh_token: this.tokenSet.refreshToken,
      resource: this.options.resource,
    });
    const refreshed = this.parseTokenResponse(response);
    this.tokenSet = {
      ...refreshed,
      refreshToken: refreshed.refreshToken ?? this.tokenSet.refreshToken,
    };
    return { ...this.tokenSet };
  }

  async authorizationHeader(minimumValidityMs = 30_000): Promise<string> {
    if (!this.tokenSet) {
      throw oauthError('MCP_OAUTH_AUTHORIZATION_REQUIRED', 'OAuth authorization is required.');
    }
    if (this.tokenSet.expiresAt - this.now() <= minimumValidityMs) await this.refresh();
    return `Bearer ${this.tokenSet.accessToken}`;
  }

  clear(): void {
    this.tokenSet = undefined;
  }

  private async tokenRequest(endpoint: string, values: Record<string, string>): Promise<unknown> {
    const response = await this.fetchWithTimeout(endpoint, {
      method: 'POST',
      redirect: 'manual',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(values).toString(),
    });
    if (isRedirect(response.status)) {
      throw oauthError('MCP_OAUTH_REDIRECT_REJECTED', 'OAuth token endpoint redirected.');
    }
    if (!response.ok) {
      throw oauthError(
        'MCP_OAUTH_TOKEN_FAILED',
        `OAuth token endpoint failed with status ${response.status}.`,
        response.status === 429 || response.status >= 500
      );
    }
    return response.json();
  }

  private parseTokenResponse(input: unknown): MCPOAuthTokenSet {
    const response = asRecord(input) as OAuthTokenResponse;
    if (typeof response.access_token !== 'string' || response.access_token.length === 0) {
      throw oauthError('MCP_OAUTH_TOKEN_INVALID', 'OAuth access token is missing.');
    }
    if (String(response.token_type).toLowerCase() !== 'bearer') {
      throw oauthError('MCP_OAUTH_TOKEN_INVALID', 'OAuth token type must be Bearer.');
    }
    const expiresIn = Number(response.expires_in);
    if (!Number.isFinite(expiresIn) || expiresIn <= 0) {
      throw oauthError('MCP_OAUTH_TOKEN_INVALID', 'OAuth token expiry is invalid.');
    }
    const assertedResource =
      typeof response.resource === 'string'
        ? response.resource
        : audienceFromJwt(response.access_token);
    if (
      assertedResource &&
      canonicalUrl(assertedResource) !== canonicalUrl(this.options.resource)
    ) {
      throw oauthError('MCP_OAUTH_AUDIENCE_MISMATCH', 'OAuth token audience mismatch.');
    }
    return {
      accessToken: response.access_token,
      refreshToken: typeof response.refresh_token === 'string' ? response.refresh_token : undefined,
      tokenType: 'Bearer',
      expiresAt: this.now() + expiresIn * 1000,
      scope: typeof response.scope === 'string' ? response.scope : undefined,
      // OAuth token responses are not required to echo RFC 8707 `resource`, and
      // opaque tokens cannot be decoded by a public client. The resource server
      // remains responsible for validating token audience. Preserve the resource
      // that was bound into both authorization and token requests.
      resource: this.options.resource,
    };
  }

  private async fetchJsonCandidates(urls: string[], label: string): Promise<unknown> {
    let lastError: unknown;
    for (const url of [...new Set(urls)]) {
      assertSecureOAuthUrl(url, this.options.allowInsecureLoopbackForAcceptance);
      try {
        return await this.fetchJson(url, label);
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError ?? oauthError('MCP_OAUTH_METADATA_FAILED', `${label} discovery failed.`);
  }

  private async fetchJson(url: string, label: string): Promise<unknown> {
    const response = await this.fetchWithTimeout(url, {
      method: 'GET',
      redirect: 'manual',
      headers: { accept: 'application/json' },
    });
    if (isRedirect(response.status)) {
      throw oauthError('MCP_OAUTH_REDIRECT_REJECTED', `${label} redirected.`);
    }
    if (!response.ok) {
      throw oauthError(
        'MCP_OAUTH_METADATA_FAILED',
        `${label} failed with status ${response.status}.`,
        response.status === 429 || response.status >= 500
      );
    }
    return response.json();
  }

  private async fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(
      () => controller.abort(new Error('OAuth request timed out.')),
      this.options.timeoutMs ?? 10_000
    );
    try {
      return await this.request(url, { ...init, signal: controller.signal });
    } catch (error) {
      const message = controller.signal.aborted
        ? 'OAuth request timed out.'
        : 'OAuth network request failed.';
      throw oauthError(
        controller.signal.aborted ? 'MCP_OAUTH_TIMEOUT' : 'MCP_OAUTH_NETWORK_FAILED',
        message,
        true,
        error
      );
    } finally {
      clearTimeout(timer);
    }
  }
}

export function redactMCPOAuthSecrets<T>(value: T): T {
  if (typeof value === 'string') {
    return value.replace(SECRET_VALUE, (_match, bearerPrefix: string, jsonPrefix: string) =>
      bearerPrefix ? `${bearerPrefix}[REDACTED]` : `${jsonPrefix}[REDACTED]`
    ) as T;
  }
  if (Array.isArray(value)) return value.map(redactMCPOAuthSecrets) as T;
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
      key,
      SENSITIVE_FIELD.test(key) ? '[REDACTED]' : redactMCPOAuthSecrets(entry),
    ])
  ) as T;
}

/** Extracts RFC 9728 metadata discovery from an MCP Bearer challenge. */
export function mcpProtectedResourceMetadataUrlFromChallenge(
  wwwAuthenticate: string | null | undefined
): string | undefined {
  if (!wwwAuthenticate || !/\bBearer\b/iu.test(wwwAuthenticate)) return undefined;
  const match = /\bresource_metadata\s*=\s*"([^"\\]*(?:\\.[^"\\]*)*)"/iu.exec(wwwAuthenticate);
  if (!match) return undefined;
  const value = match[1].replace(/\\([\\"])/gu, '$1');
  try {
    return new URL(value).toString();
  } catch {
    return undefined;
  }
}

function parseProtectedResourceMetadata(input: unknown): MCPProtectedResourceMetadata {
  const value = asRecord(input);
  if (
    typeof value.resource !== 'string' ||
    !Array.isArray(value.authorization_servers) ||
    value.authorization_servers.length === 0 ||
    value.authorization_servers.some((entry) => typeof entry !== 'string')
  ) {
    throw oauthError('MCP_OAUTH_METADATA_INVALID', 'Protected resource metadata is invalid.');
  }
  return {
    resource: value.resource,
    authorization_servers: value.authorization_servers as string[],
    bearer_methods_supported: stringArray(value.bearer_methods_supported),
  };
}

function protectedResourceMetadataUrls(resource: URL): string[] {
  const path = resource.pathname.replace(/^\/+|\/+$/gu, '');
  return [
    ...(path
      ? [new URL(`/.well-known/oauth-protected-resource/${path}`, resource.origin).toString()]
      : []),
    new URL('/.well-known/oauth-protected-resource', resource.origin).toString(),
  ];
}

function authorizationServerMetadataUrls(issuer: URL): string[] {
  const path = issuer.pathname.replace(/^\/+|\/+$/gu, '');
  if (!path) {
    return [
      new URL('/.well-known/oauth-authorization-server', issuer.origin).toString(),
      new URL('/.well-known/openid-configuration', issuer.origin).toString(),
    ];
  }
  return [
    new URL(`/.well-known/oauth-authorization-server/${path}`, issuer.origin).toString(),
    new URL(`/.well-known/openid-configuration/${path}`, issuer.origin).toString(),
    new URL(
      `${issuer.pathname.replace(/\/+$/u, '')}/.well-known/openid-configuration`,
      issuer.origin
    ).toString(),
  ];
}

function parseAuthorizationServerMetadata(input: unknown): MCPAuthorizationServerMetadata {
  const value = asRecord(input);
  if (
    typeof value.issuer !== 'string' ||
    typeof value.authorization_endpoint !== 'string' ||
    typeof value.token_endpoint !== 'string'
  ) {
    throw oauthError('MCP_OAUTH_METADATA_INVALID', 'Authorization server metadata is invalid.');
  }
  return {
    issuer: value.issuer,
    authorization_endpoint: value.authorization_endpoint,
    token_endpoint: value.token_endpoint,
    code_challenge_methods_supported: stringArray(value.code_challenge_methods_supported) ?? [],
    grant_types_supported: stringArray(value.grant_types_supported),
  };
}

function assertSecureOAuthUrl(value: string, allowInsecureLoopback = false): void {
  const url = new URL(value);
  const loopback =
    url.hostname === 'localhost' ||
    url.hostname === '::1' ||
    (isIP(url.hostname) === 4 && url.hostname.startsWith('127.'));
  if (url.protocol !== 'https:' && !(allowInsecureLoopback && loopback)) {
    throw oauthError('MCP_OAUTH_TLS_REQUIRED', 'OAuth endpoints must use HTTPS.');
  }
  if (url.username || url.password) {
    throw oauthError('MCP_OAUTH_URL_INVALID', 'OAuth endpoints must not contain userinfo.');
  }
}

function oauthError(code: string, message: string, retryable = false, cause?: unknown): Error {
  return Object.assign(new Error(message, { cause }), { code, retryable });
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function stringArray(value: unknown): string[] | undefined {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string')
    ? value
    : undefined;
}

function canonicalUrl(value: string): string {
  const url = new URL(value);
  url.hash = '';
  return url.toString().replace(/\/$/u, '');
}

function base64Url(value: Uint8Array): string {
  return Buffer.from(value).toString('base64url');
}

function audienceFromJwt(token: string): string | undefined {
  const payload = token.split('.')[1];
  if (!payload) return undefined;
  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      aud?: unknown;
    };
    return typeof decoded.aud === 'string' ? decoded.aud : undefined;
  } catch {
    return undefined;
  }
}

function isRedirect(status: number): boolean {
  return [301, 302, 303, 307, 308].includes(status);
}
