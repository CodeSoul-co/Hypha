import type {
  CommandExecutionRequest,
  ExecutionCancelRequest,
  RemoteArtifactChunk,
  RemoteArtifactDownloadRequest,
  RemoteArtifactUploadRequest,
  RemoteExecutionReconciliationRequest,
  RemoteOutputStreamRequest,
  SandboxCleanupRequest,
  SandboxCreateRequest,
  SandboxStartRequest,
  SandboxStatusRequest,
  SandboxTerminateRequest,
} from '@codesoul-co/hypha-core';
import {
  RemoteSandboxTransportError,
  type RemoteSandboxTransport,
  type RemoteSandboxTransportFailureKind,
} from './remote-sandbox-provider-adapter';

const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;
const DEFAULT_MAX_CREDENTIAL_TTL_MS = 15 * 60_000;
const DEFAULT_MIN_CREDENTIAL_REMAINING_MS = 5_000;
const DEFAULT_MAX_NDJSON_LINE_CHARACTERS = 1_048_576;
const BEARER_TOKEN = /^[A-Za-z0-9\-._~+/]+=*$/u;

const endpoints = {
  capabilities: 'v1/capabilities',
  create: 'v1/sandboxes:create',
  start: 'v1/sandboxes:start',
  execute: 'v1/executions:execute',
  reconcileExecution: 'v1/executions:reconcile',
  cancel: 'v1/executions:cancel',
  terminate: 'v1/sandboxes:terminate',
  status: 'v1/sandboxes:status',
  cleanup: 'v1/sandboxes:cleanup',
  health: 'v1/health',
  streamOutput: 'v1/executions:stream-output',
  uploadArtifact: 'v1/artifacts:upload',
  downloadArtifact: 'v1/artifacts:download',
} as const;

export interface RemoteSandboxHttpCredential {
  accessToken: string;
  expiresAt: string;
}

export type RemoteSandboxHttpCredentialProvider = () => Promise<RemoteSandboxHttpCredential>;

export interface RemoteSandboxHttpResponse {
  ok: boolean;
  status: number;
  headers: {
    get(name: string): string | null;
  };
  json(): Promise<unknown>;
  body: AsyncIterable<Uint8Array> | null;
}

export interface RemoteSandboxHttpRequest {
  method: 'GET' | 'POST';
  headers: Readonly<Record<string, string>>;
  body?: string | AsyncIterable<Uint8Array>;
  signal: AbortSignal;
}

export type RemoteSandboxHttpFetch = (
  url: string,
  request: RemoteSandboxHttpRequest
) => Promise<RemoteSandboxHttpResponse>;

export interface RemoteSandboxHttpTransportOptions {
  baseUrl: string;
  credentialProvider: RemoteSandboxHttpCredentialProvider;
  requestTimeoutMs?: number;
  maxCredentialTtlMs?: number;
  minCredentialRemainingMs?: number;
  maxNdjsonLineCharacters?: number;
  now?: () => number;
  fetch?: RemoteSandboxHttpFetch;
}

interface RequestMetadata {
  operationId?: string;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
}

interface RequestDescriptor extends RequestMetadata {
  endpoint: (typeof endpoints)[keyof typeof endpoints];
  method: 'GET' | 'POST';
  sideEffectRisk: boolean;
  body?: string | AsyncIterable<Uint8Array>;
  accept?: 'application/json' | 'application/x-ndjson';
  contentType?: 'application/json' | 'application/x-ndjson';
}

interface ActiveResponse {
  response: RemoteSandboxHttpResponse;
  bodyFailure(message: string, cause: unknown): RemoteSandboxTransportError;
  finish(): void;
}

/**
 * Provider-neutral HTTPS transport. It is intentionally not registered in a
 * Factory until a concrete remote service passes live, zero-skipped acceptance.
 */
export class RemoteSandboxHttpTransport implements RemoteSandboxTransport {
  private readonly baseUrl: URL;
  private readonly credentialProvider: RemoteSandboxHttpCredentialProvider;
  private readonly requestTimeoutMs: number;
  private readonly maxCredentialTtlMs: number;
  private readonly minCredentialRemainingMs: number;
  private readonly maxNdjsonLineCharacters: number;
  private readonly now: () => number;
  private readonly fetch: RemoteSandboxHttpFetch;
  private readonly activeRequests = new Set<AbortController>();
  private closed = false;

  constructor(options: RemoteSandboxHttpTransportOptions) {
    this.baseUrl = validateBaseUrl(options.baseUrl);
    this.credentialProvider = options.credentialProvider;
    this.requestTimeoutMs = positiveInteger(
      options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS,
      'requestTimeoutMs'
    );
    this.maxCredentialTtlMs = positiveInteger(
      options.maxCredentialTtlMs ?? DEFAULT_MAX_CREDENTIAL_TTL_MS,
      'maxCredentialTtlMs'
    );
    this.minCredentialRemainingMs = nonNegativeInteger(
      options.minCredentialRemainingMs ?? DEFAULT_MIN_CREDENTIAL_REMAINING_MS,
      'minCredentialRemainingMs'
    );
    if (this.minCredentialRemainingMs >= this.maxCredentialTtlMs) {
      throw new TypeError('minCredentialRemainingMs must be less than maxCredentialTtlMs.');
    }
    this.maxNdjsonLineCharacters = positiveInteger(
      options.maxNdjsonLineCharacters ?? DEFAULT_MAX_NDJSON_LINE_CHARACTERS,
      'maxNdjsonLineCharacters'
    );
    this.now = options.now ?? Date.now;
    this.fetch = options.fetch ?? defaultHttpFetch;
  }

  capabilities(): Promise<unknown> {
    return this.requestJson({
      endpoint: endpoints.capabilities,
      method: 'GET',
      sideEffectRisk: false,
    });
  }

  create(request: SandboxCreateRequest): Promise<unknown> {
    return this.mutationJson(endpoints.create, request);
  }

  start(request: SandboxStartRequest): Promise<unknown> {
    return this.mutationJson(endpoints.start, request);
  }

  execute(request: CommandExecutionRequest): Promise<unknown> {
    return this.mutationJson(endpoints.execute, request);
  }

  reconcileExecution(request: RemoteExecutionReconciliationRequest): Promise<unknown> {
    return this.requestJson(jsonDescriptor(endpoints.reconcileExecution, request, false));
  }

  async cancel(request: ExecutionCancelRequest): Promise<void> {
    await this.mutationVoid(endpoints.cancel, request);
  }

  async terminate(request: SandboxTerminateRequest): Promise<void> {
    await this.mutationVoid(endpoints.terminate, request);
  }

  status(request: SandboxStatusRequest): Promise<unknown> {
    return this.requestJson(jsonDescriptor(endpoints.status, request, false));
  }

  async cleanup(request: SandboxCleanupRequest): Promise<void> {
    await this.mutationVoid(endpoints.cleanup, request);
  }

  health(): Promise<unknown> {
    return this.requestJson({
      endpoint: endpoints.health,
      method: 'GET',
      sideEffectRisk: false,
    });
  }

  streamOutput(request: RemoteOutputStreamRequest): AsyncIterable<unknown> {
    return this.requestNdjson(jsonDescriptor(endpoints.streamOutput, request, false));
  }

  uploadArtifact(
    request: RemoteArtifactUploadRequest,
    chunks: AsyncIterable<RemoteArtifactChunk>
  ): Promise<unknown> {
    return this.requestJson({
      ...metadata(request),
      endpoint: endpoints.uploadArtifact,
      method: 'POST',
      sideEffectRisk: true,
      idempotencyKey: request.idempotencyKey,
      body: encodeUpload(request, chunks),
      accept: 'application/json',
      contentType: 'application/x-ndjson',
    });
  }

  downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable<unknown> {
    return this.requestNdjson(jsonDescriptor(endpoints.downloadArtifact, request, false));
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    for (const controller of this.activeRequests) {
      controller.abort(new Error('Remote Sandbox HTTP transport closed.'));
    }
    this.activeRequests.clear();
  }

  private mutationJson(
    endpoint: RequestDescriptor['endpoint'],
    request: object
  ): Promise<unknown> {
    return this.requestJson(jsonDescriptor(endpoint, request, true));
  }

  private async mutationVoid(
    endpoint: RequestDescriptor['endpoint'],
    request: object
  ): Promise<void> {
    const active = await this.begin(jsonDescriptor(endpoint, request, true));
    active.finish();
  }

  private async requestJson(descriptor: RequestDescriptor): Promise<unknown> {
    const active = await this.begin(descriptor);
    try {
      return await active.response.json();
    } catch (error) {
      throw active.bodyFailure('Remote Provider returned invalid JSON.', error);
    } finally {
      active.finish();
    }
  }

  private async *requestNdjson(descriptor: RequestDescriptor): AsyncIterable<unknown> {
    const active = await this.begin({
      ...descriptor,
      accept: 'application/x-ndjson',
    });
    try {
      const contentType = active.response.headers.get('content-type')?.toLowerCase();
      if (!contentType?.startsWith('application/x-ndjson')) {
        throw protocolFailure(
          descriptor,
          'Remote Provider did not return application/x-ndjson.'
        );
      }
      if (!active.response.body) {
        throw protocolFailure(descriptor, 'Remote Provider returned an empty stream.');
      }
      yield* decodeNdjson(active.response.body, this.maxNdjsonLineCharacters);
    } catch (error) {
      if (error instanceof RemoteSandboxTransportError) throw error;
      throw active.bodyFailure('Remote Provider returned invalid NDJSON.', error);
    } finally {
      active.finish();
    }
  }

  private async begin(descriptor: RequestDescriptor): Promise<ActiveResponse> {
    this.assertOpen();
    const credential = await this.resolveCredential();
    const controller = new AbortController();
    this.activeRequests.add(controller);
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort(new Error('Remote Sandbox HTTP request timed out.'));
    }, this.requestTimeoutMs);
    const finish = once(() => {
      clearTimeout(timeout);
      this.activeRequests.delete(controller);
    });

    try {
      const response = await this.fetch(new URL(descriptor.endpoint, this.baseUrl).toString(), {
        method: descriptor.method,
        headers: requestHeaders(descriptor, credential.accessToken),
        ...(descriptor.body !== undefined ? { body: descriptor.body } : {}),
        signal: controller.signal,
      });
      if (!response.ok) {
        throw responseFailure(descriptor, response, this.now());
      }
      return {
        response,
        bodyFailure: (message, cause) => {
          if (timedOut) {
            return new RemoteSandboxTransportError('Remote Sandbox HTTP response timed out.', {
              kind: 'timeout',
              sideEffectState: descriptor.sideEffectRisk ? 'unknown' : 'not_started',
              cause,
            });
          }
          if (this.closed) {
            return new RemoteSandboxTransportError(
              'Remote Sandbox HTTP transport was closed.',
              {
                kind: 'cancelled',
                sideEffectState: descriptor.sideEffectRisk ? 'unknown' : 'not_started',
                cause,
              }
            );
          }
          return protocolFailure(descriptor, message, cause);
        },
        finish,
      };
    } catch (error) {
      finish();
      if (error instanceof RemoteSandboxTransportError) throw error;
      throw new RemoteSandboxTransportError(
        timedOut
          ? 'Remote Sandbox HTTP request timed out.'
          : this.closed
            ? 'Remote Sandbox HTTP transport was closed.'
            : 'Remote Sandbox HTTP request failed.',
        {
          kind: timedOut ? 'timeout' : this.closed ? 'cancelled' : 'unavailable',
          sideEffectState: descriptor.sideEffectRisk ? 'unknown' : 'not_started',
          cause: error,
        }
      );
    }
  }

  private async resolveCredential(): Promise<RemoteSandboxHttpCredential> {
    let credential: RemoteSandboxHttpCredential;
    try {
      credential = await this.credentialProvider();
    } catch (error) {
      throw new RemoteSandboxTransportError('Remote Sandbox credential acquisition failed.', {
        kind: 'permission_denied',
        sideEffectState: 'not_started',
        providerCode: 'CREDENTIAL_ACQUISITION_FAILED',
        cause: error,
      });
    }
    const token = credential.accessToken;
    const expiry = Date.parse(credential.expiresAt);
    const remainingMs = expiry - this.now();
    if (
      !token ||
      !BEARER_TOKEN.test(token) ||
      !Number.isFinite(expiry) ||
      remainingMs < this.minCredentialRemainingMs ||
      remainingMs > this.maxCredentialTtlMs
    ) {
      throw new RemoteSandboxTransportError(
        'Remote Sandbox credential is invalid, expired, or not short-lived.',
        {
          kind: 'permission_denied',
          sideEffectState: 'not_started',
          providerCode: 'CREDENTIAL_INVALID',
        }
      );
    }
    return credential;
  }

  private assertOpen(): void {
    if (this.closed) {
      throw new RemoteSandboxTransportError('Remote Sandbox HTTP transport is closed.', {
        kind: 'unavailable',
        sideEffectState: 'not_started',
        providerCode: 'TRANSPORT_CLOSED',
      });
    }
  }
}

function jsonDescriptor(
  endpoint: RequestDescriptor['endpoint'],
  request: object,
  sideEffectRisk: boolean
): RequestDescriptor {
  return {
    ...metadata(request),
    endpoint,
    method: 'POST',
    sideEffectRisk,
    body: JSON.stringify(request),
    accept: 'application/json',
    contentType: 'application/json',
  };
}

function metadata(request: object): RequestMetadata {
  const values = request as Readonly<Record<string, unknown>>;
  return {
    ...(typeof values.operationId === 'string' ? { operationId: values.operationId } : {}),
    ...(typeof values.idempotencyKey === 'string'
      ? { idempotencyKey: values.idempotencyKey }
      : {}),
    ...(typeof values.correlationId === 'string' ? { correlationId: values.correlationId } : {}),
    ...(typeof values.causationId === 'string' ? { causationId: values.causationId } : {}),
  };
}

function requestHeaders(
  descriptor: RequestDescriptor,
  accessToken: string
): Readonly<Record<string, string>> {
  const idempotencyKey = descriptor.sideEffectRisk
    ? descriptor.idempotencyKey ?? descriptor.operationId
    : descriptor.idempotencyKey;
  if (descriptor.sideEffectRisk && !idempotencyKey) {
    throw new RemoteSandboxTransportError(
      'Remote mutating request requires an idempotency key or operation ID.',
      {
        kind: 'invalid_request',
        sideEffectState: 'not_started',
        providerCode: 'IDEMPOTENCY_KEY_REQUIRED',
      }
    );
  }
  return {
    authorization: `Bearer ${accessToken}`,
    accept: descriptor.accept ?? 'application/json',
    ...(descriptor.contentType ? { 'content-type': descriptor.contentType } : {}),
    ...(descriptor.operationId ? { 'x-hypha-operation-id': descriptor.operationId } : {}),
    ...(idempotencyKey ? { 'idempotency-key': idempotencyKey } : {}),
    ...(descriptor.correlationId ? { 'x-hypha-correlation-id': descriptor.correlationId } : {}),
    ...(descriptor.causationId ? { 'x-hypha-causation-id': descriptor.causationId } : {}),
  };
}

function responseFailure(
  descriptor: RequestDescriptor,
  response: RemoteSandboxHttpResponse,
  now: number
): RemoteSandboxTransportError {
  const kind = httpFailureKind(response.status);
  const definitivelyRejected =
    response.status === 400 ||
    response.status === 401 ||
    response.status === 403 ||
    response.status === 409 ||
    response.status === 422 ||
    response.status === 429;
  return new RemoteSandboxTransportError('Remote Sandbox HTTP request was rejected.', {
    kind,
    sideEffectState:
      descriptor.sideEffectRisk && !definitivelyRejected ? 'unknown' : 'not_started',
    providerCode: response.status,
    retryAfterMs: retryAfterMs(response.headers.get('retry-after'), now),
    providerOperationRef:
      response.headers.get('x-hypha-job-id') ??
      response.headers.get('x-provider-operation-id') ??
      undefined,
  });
}

function httpFailureKind(status: number): RemoteSandboxTransportFailureKind {
  if (status === 400 || status === 422) return 'invalid_request';
  if (status === 401 || status === 403) return 'permission_denied';
  if (status === 409) return 'revision_conflict';
  if (status === 408 || status === 504) return 'timeout';
  if (status === 429) return 'quota_exceeded';
  if (status >= 500) return 'unavailable';
  return 'unknown';
}

function retryAfterMs(value: string | null, now: number): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return Math.round(seconds * 1_000);
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return undefined;
  return Math.max(0, timestamp - now);
}

function protocolFailure(
  descriptor: RequestDescriptor,
  message: string,
  cause?: unknown
): RemoteSandboxTransportError {
  return new RemoteSandboxTransportError(message, {
    kind: 'unknown',
    sideEffectState: descriptor.sideEffectRisk ? 'unknown' : 'not_started',
    providerCode: 'REMOTE_PROTOCOL_INVALID',
    cause,
  });
}

async function* encodeUpload(
  request: RemoteArtifactUploadRequest,
  chunks: AsyncIterable<RemoteArtifactChunk>
): AsyncIterable<Uint8Array> {
  const encoder = new TextEncoder();
  yield encoder.encode(`${JSON.stringify({ request })}\n`);
  for await (const chunk of chunks) {
    yield encoder.encode(`${JSON.stringify({ chunk })}\n`);
  }
}

async function* decodeNdjson(
  source: AsyncIterable<Uint8Array>,
  maxLineCharacters: number
): AsyncIterable<unknown> {
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let pending = '';
  for await (const bytes of source) {
    pending += decoder.decode(bytes, { stream: true });
    while (true) {
      const newline = pending.indexOf('\n');
      if (newline < 0) break;
      const line = pending.slice(0, newline).replace(/\r$/u, '');
      pending = pending.slice(newline + 1);
      if (!line.trim()) continue;
      assertLineBound(line, maxLineCharacters);
      yield JSON.parse(line) as unknown;
    }
    assertLineBound(pending, maxLineCharacters);
  }
  pending += decoder.decode();
  if (pending.trim()) {
    assertLineBound(pending, maxLineCharacters);
    yield JSON.parse(pending) as unknown;
  }
}

function assertLineBound(value: string, maxLineCharacters: number): void {
  if (value.length > maxLineCharacters) {
    throw new RangeError('Remote NDJSON line exceeds the configured limit.');
  }
}

function validateBaseUrl(input: string): URL {
  let url: URL;
  try {
    url = new URL(input);
  } catch (error) {
    throw new TypeError('Remote Sandbox baseUrl must be an absolute HTTPS URL.', {
      cause: error,
    });
  }
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new TypeError(
      'Remote Sandbox baseUrl must use HTTPS without credentials, query, or fragment.'
    );
  }
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  return url;
}

function positiveInteger(value: number, field: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${field} must be a positive safe integer.`);
  }
  return value;
}

function nonNegativeInteger(value: number, field: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${field} must be a non-negative safe integer.`);
  }
  return value;
}

function once(action: () => void): () => void {
  let called = false;
  return () => {
    if (called) return;
    called = true;
    action();
  };
}

const defaultHttpFetch: RemoteSandboxHttpFetch = async (url, request) => {
  const init = {
    method: request.method,
    headers: request.headers,
    ...(request.body !== undefined
      ? {
          body: request.body as unknown as RequestInit['body'],
          ...(typeof request.body === 'string' ? {} : { duplex: 'half' as const }),
        }
      : {}),
    signal: request.signal,
  } satisfies RequestInit & { duplex?: 'half' };
  const response = await fetch(url, init);
  return {
    ok: response.ok,
    status: response.status,
    headers: response.headers,
    json: () => response.json(),
    body: response.body ? webResponseBody(response.body) : null,
  };
};

async function* webResponseBody(
  source: ReadableStream<Uint8Array>
): AsyncIterable<Uint8Array> {
  const reader = source.getReader();
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) return;
      yield next.value;
    }
  } finally {
    reader.releaseLock();
  }
}
