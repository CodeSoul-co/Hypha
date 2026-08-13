import {
  commandExecutionRequestExample,
  commandOutputChunkExample,
  remoteArtifactChunkExample,
  remoteArtifactDownloadRequestExample,
  remoteArtifactTransferReceiptExample,
  remoteArtifactUploadRequestExample,
  remoteExecutionReconciliationRequestExample,
  remoteExecutionReconciliationResultExample,
  remoteOutputStreamRequestExample,
  sandboxCreateRequestExample,
  sandboxRecordExample,
} from '@codesoul-co/hypha-core';
import { describe, expect, it, vi } from 'vitest';
import { RemoteSandboxProviderAdapter } from './remote-sandbox-provider-adapter';
import {
  RemoteSandboxHttpTransport,
  type RemoteSandboxHttpFetch,
  type RemoteSandboxHttpRequest,
  type RemoteSandboxHttpResponse,
} from './remote-sandbox-http-transport';

const now = Date.parse('2026-07-29T00:00:00.000Z');

describe('RemoteSandboxHttpTransport', () => {
  it('requires a credential-free HTTPS base URL and bounded short-lived credentials', async () => {
    expect(
      () =>
        new RemoteSandboxHttpTransport({
          baseUrl: 'http://remote.example.test',
          credentialProvider: credentialProvider(),
        })
    ).toThrow(/HTTPS/u);
    expect(
      () =>
        new RemoteSandboxHttpTransport({
          baseUrl: 'https://user:secret@remote.example.test',
          credentialProvider: credentialProvider(),
        })
    ).toThrow(/without credentials/u);

    const fetch = vi.fn<RemoteSandboxHttpFetch>();
    const transport = createTransport(fetch, {
      credentialProvider: credentialProvider('token.expired', now - 1),
    });
    await expect(transport.health()).rejects.toMatchObject({
      kind: 'permission_denied',
      sideEffectState: 'not_started',
      providerCode: 'CREDENTIAL_INVALID',
    });
    expect(fetch).not.toHaveBeenCalled();

    const unsafeTransport = createTransport(fetch, {
      credentialProvider: credentialProvider('token\r\nx-injected: true'),
    });
    await expect(unsafeTransport.health()).rejects.toMatchObject({
      kind: 'permission_denied',
      providerCode: 'CREDENTIAL_INVALID',
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rotates credentials per request and sends operation and idempotency evidence', async () => {
    const fetch = vi
      .fn<RemoteSandboxHttpFetch>()
      .mockResolvedValueOnce(jsonResponse(sandboxRecordExample))
      .mockResolvedValueOnce(jsonResponse(remoteExecutionReconciliationResultExample));
    const credentials = vi
      .fn()
      .mockResolvedValueOnce(credential('token.create'))
      .mockResolvedValueOnce(credential('token.reconcile'));
    const transport = createTransport(fetch, { credentialProvider: credentials });

    await transport.create(sandboxCreateRequestExample);
    await transport.reconcileExecution(remoteExecutionReconciliationRequestExample);

    const [createUrl, createRequest] = requireCall(fetch, 0);
    expect(createUrl).toBe('https://remote.example.test/api/v1/sandboxes:create');
    expect(createRequest.headers).toMatchObject({
      authorization: 'Bearer token.create',
      'x-hypha-operation-id': sandboxCreateRequestExample.operationId,
      'idempotency-key': sandboxCreateRequestExample.idempotencyKey,
      'content-type': 'application/json',
    });
    expect(JSON.parse(requireStringBody(createRequest))).toEqual(sandboxCreateRequestExample);

    const [reconcileUrl, reconcileRequest] = requireCall(fetch, 1);
    expect(reconcileUrl).toBe('https://remote.example.test/api/v1/executions:reconcile');
    expect(reconcileRequest.headers).toMatchObject({
      authorization: 'Bearer token.reconcile',
      'x-hypha-operation-id': remoteExecutionReconciliationRequestExample.operationId,
    });
    expect(credentials).toHaveBeenCalledTimes(2);
  });

  it('composes with the Provider adapter and preserves validated Sandbox identity', async () => {
    const providerId = 'provider.remote.http.test';
    const request = {
      ...sandboxCreateRequestExample,
      environment: {
        ...sandboxCreateRequestExample.environment,
        provider: 'remote_sandbox' as const,
        providerRef: providerId,
      },
    };
    const record = {
      ...sandboxRecordExample,
      providerId,
      environmentRef: {
        id: request.environment.id,
        version: request.environment.version,
      },
      environmentRevision: request.environmentRevision,
      userId: request.userId,
      workspaceId: request.workspaceId,
      runId: request.runId,
    };
    const fetch = vi.fn<RemoteSandboxHttpFetch>().mockResolvedValue(jsonResponse(record));
    const provider = new RemoteSandboxProviderAdapter({
      id: providerId,
      transport: createTransport(fetch),
    });

    await expect(provider.create(request)).resolves.toEqual(record);
    expect(JSON.parse(requireStringBody(requireCall(fetch, 0)[1]))).toEqual(request);
  });

  it('distinguishes explicit rejection from an ambiguous remote write failure', async () => {
    const fetch = vi
      .fn<RemoteSandboxHttpFetch>()
      .mockResolvedValueOnce(
        errorResponse(429, {
          'retry-after': '2',
        })
      )
      .mockResolvedValueOnce(
        errorResponse(503, {
          'x-hypha-job-id': 'remote-job.ambiguous',
        })
      )
      .mockResolvedValueOnce(errorResponse(503));
    const transport = createTransport(fetch);

    await expect(transport.create(sandboxCreateRequestExample)).rejects.toMatchObject({
      kind: 'quota_exceeded',
      sideEffectState: 'not_started',
      providerCode: 429,
      retryAfterMs: 2_000,
    });
    await expect(transport.execute(commandExecutionRequestExample)).rejects.toMatchObject({
      kind: 'unavailable',
      sideEffectState: 'unknown',
      providerCode: 503,
      providerOperationRef: 'remote-job.ambiguous',
    });
    await expect(
      transport.reconcileExecution(remoteExecutionReconciliationRequestExample)
    ).rejects.toMatchObject({
      kind: 'unavailable',
      sideEffectState: 'not_started',
      providerCode: 503,
    });
  });

  it('marks a timed-out mutating request unknown and aborts it', async () => {
    const fetch = vi.fn<RemoteSandboxHttpFetch>(
      async (_url, request) =>
        await new Promise<RemoteSandboxHttpResponse>((_resolve, reject) => {
          request.signal.addEventListener('abort', () => reject(request.signal.reason), {
            once: true,
          });
        })
    );
    const transport = createTransport(fetch, { requestTimeoutMs: 5 });

    await expect(transport.create(sandboxCreateRequestExample)).rejects.toMatchObject({
      kind: 'timeout',
      sideEffectState: 'unknown',
    });
    expect(requireCall(fetch, 0)[1].signal.aborted).toBe(true);
  });

  it('preserves timeout semantics while reading a successful response body', async () => {
    const fetch = vi.fn<RemoteSandboxHttpFetch>(async (_url, request) => ({
      ...jsonResponse({}),
      json: async () =>
        await new Promise<unknown>((_resolve, reject) => {
          request.signal.addEventListener('abort', () => reject(request.signal.reason), {
            once: true,
          });
        }),
    }));
    const transport = createTransport(fetch, { requestTimeoutMs: 5 });

    await expect(transport.create(sandboxCreateRequestExample)).rejects.toMatchObject({
      kind: 'timeout',
      sideEffectState: 'unknown',
    });
    expect(requireCall(fetch, 0)[1].signal.aborted).toBe(true);
  });

  it('decodes bounded output NDJSON without buffering the complete response', async () => {
    const first = {
      ...commandOutputChunkExample,
      executionId: remoteOutputStreamRequestExample.executionId,
      sequence: 0,
    };
    const second = { ...first, sequence: 1, final: true };
    const content = `${JSON.stringify(first)}\n${JSON.stringify(second)}\n`;
    const split = Math.floor(content.length / 2);
    const fetch = vi
      .fn<RemoteSandboxHttpFetch>()
      .mockResolvedValueOnce(
        ndjsonResponse([content.slice(0, split), content.slice(split)])
      )
      .mockResolvedValueOnce(jsonResponse({}, 200, { 'content-type': 'application/json' }));
    const transport = createTransport(fetch);

    await expect(collect(transport.streamOutput(remoteOutputStreamRequestExample))).resolves.toEqual([
      first,
      second,
    ]);
    await expect(
      collect(transport.streamOutput(remoteOutputStreamRequestExample))
    ).rejects.toMatchObject({
      kind: 'unknown',
      sideEffectState: 'not_started',
      providerCode: 'REMOTE_PROTOCOL_INVALID',
    });
  });

  it('streams Artifact upload envelopes and download chunks as NDJSON', async () => {
    let uploadedLines: unknown[] = [];
    const downloadChunk = {
      ...remoteArtifactChunkExample,
      artifactRef: remoteArtifactDownloadRequestExample.artifactRef,
    };
    const fetch = vi.fn<RemoteSandboxHttpFetch>(async (url, request) => {
      if (url.endsWith('/v1/artifacts:upload')) {
        uploadedLines = await readNdjsonRequest(request);
        return jsonResponse(remoteArtifactTransferReceiptExample);
      }
      return ndjsonResponse([`${JSON.stringify(downloadChunk)}\n`]);
    });
    const transport = createTransport(fetch);

    await transport.uploadArtifact(
      remoteArtifactUploadRequestExample,
      iterable([remoteArtifactChunkExample])
    );
    expect(uploadedLines).toEqual([
      { request: remoteArtifactUploadRequestExample },
      { chunk: remoteArtifactChunkExample },
    ]);
    const uploadRequest = requireCall(fetch, 0)[1];
    expect(uploadRequest.headers).toMatchObject({
      'content-type': 'application/x-ndjson',
      'idempotency-key': remoteArtifactUploadRequestExample.idempotencyKey,
    });

    await expect(
      collect(transport.downloadArtifact(remoteArtifactDownloadRequestExample))
    ).resolves.toEqual([downloadChunk]);
  });

  it('aborts active requests on an idempotent close and rejects future work', async () => {
    const fetch = vi.fn<RemoteSandboxHttpFetch>(
      async (_url, request) =>
        await new Promise<RemoteSandboxHttpResponse>((_resolve, reject) => {
          request.signal.addEventListener('abort', () => reject(request.signal.reason), {
            once: true,
          });
        })
    );
    const transport = createTransport(fetch, { requestTimeoutMs: 10_000 });
    const health = transport.health();
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    await transport.close();
    await transport.close();

    await expect(health).rejects.toMatchObject({
      kind: 'cancelled',
      sideEffectState: 'not_started',
    });
    await expect(transport.health()).rejects.toMatchObject({
      kind: 'unavailable',
      providerCode: 'TRANSPORT_CLOSED',
    });
  });
});

function createTransport(
  fetch: RemoteSandboxHttpFetch,
  overrides: Partial<ConstructorParameters<typeof RemoteSandboxHttpTransport>[0]> = {}
): RemoteSandboxHttpTransport {
  return new RemoteSandboxHttpTransport({
    baseUrl: 'https://remote.example.test/api',
    credentialProvider: credentialProvider(),
    requestTimeoutMs: 1_000,
    now: () => now,
    fetch,
    ...overrides,
  });
}

function credentialProvider(token = 'token.test', expiresAt = now + 60_000) {
  return vi.fn().mockResolvedValue(credential(token, expiresAt));
}

function credential(token: string, expiresAt = now + 60_000) {
  return {
    accessToken: token,
    expiresAt: new Date(expiresAt).toISOString(),
  };
}

function jsonResponse(
  value: unknown,
  status = 200,
  headers: Record<string, string> = {}
): RemoteSandboxHttpResponse {
  return response(status, headers, async () => value, null);
}

function errorResponse(
  status: number,
  headers: Record<string, string> = {}
): RemoteSandboxHttpResponse {
  return response(status, headers, async () => ({}), null);
}

function ndjsonResponse(chunks: readonly string[]): RemoteSandboxHttpResponse {
  const encoder = new TextEncoder();
  return response(
    200,
    { 'content-type': 'application/x-ndjson; charset=utf-8' },
    async () => {
      throw new Error('NDJSON response does not expose JSON.');
    },
    iterable(chunks.map((chunk) => encoder.encode(chunk)))
  );
}

function response(
  status: number,
  headers: Record<string, string>,
  json: () => Promise<unknown>,
  body: AsyncIterable<Uint8Array> | null
): RemoteSandboxHttpResponse {
  const normalizedHeaders = Object.fromEntries(
    Object.entries(headers).map(([name, value]) => [name.toLowerCase(), value])
  );
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: (name) => normalizedHeaders[name.toLowerCase()] ?? null,
    },
    json,
    body,
  };
}

function requireCall(
  fetch: ReturnType<typeof vi.fn<RemoteSandboxHttpFetch>>,
  index: number
): [string, RemoteSandboxHttpRequest] {
  const call = fetch.mock.calls[index];
  if (!call) throw new Error(`Missing fetch call ${index}.`);
  return call;
}

function requireStringBody(request: RemoteSandboxHttpRequest): string {
  if (typeof request.body !== 'string') throw new TypeError('Expected a string request body.');
  return request.body;
}

async function readNdjsonRequest(request: RemoteSandboxHttpRequest): Promise<unknown[]> {
  if (!request.body || typeof request.body === 'string') {
    throw new TypeError('Expected a streaming request body.');
  }
  const decoder = new TextDecoder();
  let content = '';
  for await (const chunk of request.body) content += decoder.decode(chunk, { stream: true });
  content += decoder.decode();
  return content
    .split(/\r?\n/u)
    .filter(Boolean)
    .map((line) => JSON.parse(line) as unknown);
}

async function* iterable<T>(values: readonly T[]): AsyncIterable<T> {
  for (const value of values) yield value;
}

async function collect<T>(values: AsyncIterable<T>): Promise<T[]> {
  const collected: T[] = [];
  for await (const value of values) collected.push(value);
  return collected;
}
