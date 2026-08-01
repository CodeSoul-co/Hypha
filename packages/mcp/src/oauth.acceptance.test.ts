import { createHash } from 'node:crypto';
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  MCPOAuth21Client,
  mcpProtectedResourceMetadataUrlFromChallenge,
  redactMCPOAuthSecrets,
} from './oauth';

interface IssuedCode {
  challenge: string;
  resource: string;
}

let server: Server;
let origin: string;
let resource: string;
let now = Date.parse('2026-07-27T00:00:00.000Z');
let tokenRevision = 0;
const codes = new Map<string, IssuedCode>();
const accessTokens = new Map<string, string>();
const refreshTokens = new Map<string, string>();

beforeAll(async () => {
  server = createServer((request, response) => {
    void route(request, response);
  });
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve());
  });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('OAuth server did not bind.');
  origin = `http://127.0.0.1:${address.port}`;
  resource = `${origin}/mcp`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
  codes.clear();
  accessTokens.clear();
  refreshTokens.clear();
});

describe('remote MCP OAuth 2.1 real service acceptance', () => {
  it('discovers metadata, enforces PKCE/resource, refreshes, and calls the resource server', async () => {
    const client = createClient();
    const discovered = await client.discover();
    expect(discovered.protectedResource.resource).toBe(resource);
    expect(discovered.authorizationServer.issuer).toBe(origin);

    const authorization = await client.createAuthorizationRequest('state-1');
    const authorizationResponse = await fetch(authorization.url, { redirect: 'manual' });
    expect(authorizationResponse.status).toBe(302);
    const callback = new URL(authorizationResponse.headers.get('location')!);
    const token = await client.exchangeAuthorizationCode({
      code: callback.searchParams.get('code')!,
      state: callback.searchParams.get('state')!,
      expectedState: authorization.state,
      codeVerifier: authorization.codeVerifier,
    });
    expect(token.resource).toBe(resource);

    const first = await fetch(resource, {
      headers: { authorization: await client.authorizationHeader(0) },
    });
    expect(await first.json()).toEqual({ ok: true, revision: 1 });

    now += 3_000;
    const second = await fetch(resource, {
      headers: { authorization: await client.authorizationHeader() },
    });
    expect(await second.json()).toEqual({ ok: true, revision: 2 });
  });

  it('rejects plaintext production endpoints, state mismatch, bad PKCE, and wrong audience', async () => {
    expect(
      () =>
        new MCPOAuth21Client({
          resource,
          clientId: 'mcp-client',
          redirectUri: 'https://client.example.test/callback',
        })
    ).toThrow(/HTTPS/u);

    const client = createClient();
    const authorization = await client.createAuthorizationRequest('state-2');
    const authorizationResponse = await fetch(authorization.url, { redirect: 'manual' });
    const callback = new URL(authorizationResponse.headers.get('location')!);
    await expect(
      client.exchangeAuthorizationCode({
        code: callback.searchParams.get('code')!,
        state: 'attacker-state',
        expectedState: authorization.state,
        codeVerifier: authorization.codeVerifier,
      })
    ).rejects.toMatchObject({ code: 'MCP_OAUTH_STATE_MISMATCH' });
    await expect(
      client.exchangeAuthorizationCode({
        code: callback.searchParams.get('code')!,
        state: authorization.state,
        expectedState: authorization.state,
        codeVerifier: 'wrong-verifier',
      })
    ).rejects.toMatchObject({ code: 'MCP_OAUTH_TOKEN_FAILED', retryable: false });

    const wrongAudience = createClient(
      `${origin}/wrong-resource`,
      `${origin}/metadata-wrong-audience`
    );
    const wrongAuthorization = await wrongAudience.createAuthorizationRequest('state-3');
    const wrongResponse = await fetch(wrongAuthorization.url, { redirect: 'manual' });
    const wrongCallback = new URL(wrongResponse.headers.get('location')!);
    await expect(
      wrongAudience.exchangeAuthorizationCode({
        code: wrongCallback.searchParams.get('code')!,
        state: wrongAuthorization.state,
        expectedState: wrongAuthorization.state,
        codeVerifier: wrongAuthorization.codeVerifier,
      })
    ).rejects.toMatchObject({ code: 'MCP_OAUTH_AUDIENCE_MISMATCH' });
  });

  it('normalizes timeout/server failures and redacts all OAuth credentials', async () => {
    const unavailable = createClient(resource, `${origin}/metadata-503`);
    await expect(unavailable.discover()).rejects.toMatchObject({
      code: 'MCP_OAUTH_METADATA_FAILED',
      retryable: true,
    });

    const redacted = redactMCPOAuthSecrets({
      authorization: 'Bearer access.secret.value',
      cookie: 'session=secret',
      nested: JSON.stringify({
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        code: 'authorization-code',
        client_secret: 'client-secret',
      }),
    });
    expect(JSON.stringify(redacted)).not.toMatch(
      /access\.secret|session=secret|access-token|refresh-token|authorization-code|client-secret/u
    );
  });

  it('supports RFC 9728 multiple issuers and issuer-path OAuth/OIDC discovery', async () => {
    const requests: string[] = [];
    const target = 'https://mcp.example.test/public/mcp';
    const selectedIssuer = 'https://identity.example.test/tenant-a';
    const client = new MCPOAuth21Client({
      resource: target,
      clientId: 'mcp-client',
      redirectUri: 'https://client.example.test/callback',
      authorizationServer: selectedIssuer,
      fetch: async (input) => {
        const url = new URL(String(input));
        requests.push(url.toString());
        if (url.pathname === '/.well-known/oauth-protected-resource/public/mcp') {
          return Response.json({
            resource: target,
            authorization_servers: ['https://identity.example.test/tenant-b', selectedIssuer],
          });
        }
        if (url.pathname === '/.well-known/oauth-authorization-server/tenant-a') {
          return Response.json({ error: 'not_found' }, { status: 404 });
        }
        if (url.pathname === '/.well-known/openid-configuration/tenant-a') {
          return Response.json({
            issuer: selectedIssuer,
            authorization_endpoint: `${selectedIssuer}/authorize`,
            token_endpoint: `${selectedIssuer}/token`,
            code_challenge_methods_supported: ['S256'],
          });
        }
        return Response.json({ error: 'unexpected' }, { status: 404 });
      },
    });

    await expect(client.discover()).resolves.toMatchObject({
      authorizationServer: { issuer: selectedIssuer },
    });
    expect(requests).toEqual([
      'https://mcp.example.test/.well-known/oauth-protected-resource/public/mcp',
      'https://identity.example.test/.well-known/oauth-authorization-server/tenant-a',
      'https://identity.example.test/.well-known/openid-configuration/tenant-a',
    ]);
  });

  it('accepts opaque tokens without an echoed resource and parses RFC 9728 challenges', async () => {
    const target = 'https://mcp.example.test/mcp';
    const issuer = 'https://identity.example.test';
    const client = new MCPOAuth21Client({
      resource: target,
      clientId: 'mcp-client',
      redirectUri: 'https://client.example.test/callback',
      metadataUrl: 'https://mcp.example.test/metadata',
      now: () => now,
      fetch: async (input, init) => {
        const url = new URL(String(input));
        if (url.pathname === '/metadata') {
          return Response.json({ resource: target, authorization_servers: [issuer] });
        }
        if (url.pathname === '/.well-known/oauth-authorization-server') {
          return Response.json({
            issuer,
            authorization_endpoint: `${issuer}/authorize`,
            token_endpoint: `${issuer}/token`,
            code_challenge_methods_supported: ['S256'],
          });
        }
        if (url.pathname === '/token' && init?.method === 'POST') {
          return Response.json({
            access_token: 'opaque-token',
            token_type: 'Bearer',
            expires_in: 300,
          });
        }
        return Response.json({ error: 'unexpected' }, { status: 404 });
      },
    });

    const request = await client.createAuthorizationRequest('state-opaque');
    await expect(
      client.exchangeAuthorizationCode({
        code: 'opaque-code',
        codeVerifier: request.codeVerifier,
        state: request.state,
        expectedState: request.state,
      })
    ).resolves.toMatchObject({ accessToken: 'opaque-token', resource: target });
    expect(
      mcpProtectedResourceMetadataUrlFromChallenge(
        'Bearer resource_metadata="https://mcp.example.test/metadata", scope="tools:read"'
      )
    ).toBe('https://mcp.example.test/metadata');
  });
});

function createClient(
  targetResource = resource,
  metadataUrl = `${origin}/.well-known/oauth-protected-resource`
): MCPOAuth21Client {
  return new MCPOAuth21Client({
    resource: targetResource,
    clientId: 'mcp-client',
    redirectUri: 'https://client.example.test/callback',
    metadataUrl,
    now: () => now,
    timeoutMs: 1_000,
    allowInsecureLoopbackForAcceptance: true,
  });
}

async function route(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const url = new URL(request.url ?? '/', origin);
  if (url.pathname === '/metadata-503') {
    respondJson(response, 503, { error: 'temporarily_unavailable' });
    return;
  }
  if (url.pathname === '/metadata-wrong-audience') {
    respondJson(response, 200, {
      resource: `${origin}/wrong-resource`,
      authorization_servers: [origin],
      bearer_methods_supported: ['header'],
    });
    return;
  }
  if (url.pathname === '/.well-known/oauth-protected-resource') {
    respondJson(response, 200, {
      resource,
      authorization_servers: [origin],
      bearer_methods_supported: ['header'],
    });
    return;
  }
  if (url.pathname === '/.well-known/oauth-authorization-server') {
    respondJson(response, 200, {
      issuer: origin,
      authorization_endpoint: `${origin}/authorize`,
      token_endpoint: `${origin}/token`,
      code_challenge_methods_supported: ['S256'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
    });
    return;
  }
  if (url.pathname === '/authorize') {
    const code = `code-${codes.size + 1}`;
    codes.set(code, {
      challenge: url.searchParams.get('code_challenge') ?? '',
      resource: url.searchParams.get('resource') ?? '',
    });
    const callback = new URL(url.searchParams.get('redirect_uri') ?? '');
    callback.searchParams.set('code', code);
    callback.searchParams.set('state', url.searchParams.get('state') ?? '');
    response.writeHead(302, { location: callback.toString() });
    response.end();
    return;
  }
  if (url.pathname === '/token') {
    const body = new URLSearchParams(await readBody(request));
    const target = body.get('resource') ?? '';
    if (body.get('grant_type') === 'authorization_code') {
      const code = body.get('code') ?? '';
      const issued = codes.get(code);
      const verifier = body.get('code_verifier') ?? '';
      const challenge = createHash('sha256').update(verifier).digest('base64url');
      if (!issued || challenge !== issued.challenge || target !== issued.resource) {
        respondJson(response, 400, { error: 'invalid_grant' });
        return;
      }
      codes.delete(code);
      issueTokens(response, target);
      return;
    }
    if (body.get('grant_type') === 'refresh_token') {
      const refreshToken = body.get('refresh_token') ?? '';
      if (refreshTokens.get(refreshToken) !== target) {
        respondJson(response, 400, { error: 'invalid_grant' });
        return;
      }
      issueTokens(response, target);
      return;
    }
    respondJson(response, 400, { error: 'unsupported_grant_type' });
    return;
  }
  if (url.pathname === '/mcp') {
    const authorization = request.headers.authorization ?? '';
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
    if (accessTokens.get(token) !== resource) {
      respondJson(response, 401, { error: 'invalid_token' });
      return;
    }
    respondJson(response, 200, { ok: true, revision: Number(token.split('-').at(-1)) });
    return;
  }
  respondJson(response, 404, { error: 'not_found' });
}

function issueTokens(response: ServerResponse, target: string): void {
  tokenRevision += 1;
  const accessToken = `access-${tokenRevision}`;
  const refreshToken = `refresh-${tokenRevision}`;
  accessTokens.set(accessToken, target);
  refreshTokens.set(refreshToken, target);
  respondJson(response, 200, {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: 'Bearer',
    expires_in: 2,
    resource: target === resource ? target : resource,
  });
}

function respondJson(response: ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.end(JSON.stringify(body));
}

async function readBody(request: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}
