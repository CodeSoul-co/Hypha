import type { ArtifactStorageRef } from '../../contracts/artifact';
import type { ArtifactStoreProvider } from '../../contracts/artifact-store';
import { FrameworkError } from '../../errors';
import { canonicalizeJson, hashCanonicalJson } from './canonical-json';

const PAYLOAD_REF_PREFIX = 'artifact-ref:';

export interface SessionCommandPayloadReference {
  payloadRef: string;
  payloadHash: string;
}

export interface PutSessionCommandPayloadRequest {
  commandId: string;
  payload: unknown;
}

export interface GetSessionCommandPayloadRequest extends SessionCommandPayloadReference {}

export interface ArtifactSessionCommandPayloadStoreOptions {
  artifacts: ArtifactStoreProvider;
  maxPayloadBytes?: number;
}

/** Stores canonical command JSON outside the Queue while retaining a verified durable reference. */
export class ArtifactSessionCommandPayloadStore {
  private readonly maxPayloadBytes: number;

  constructor(private readonly options: ArtifactSessionCommandPayloadStoreOptions) {
    this.maxPayloadBytes = options.maxPayloadBytes ?? 1024 * 1024;
    if (!Number.isSafeInteger(this.maxPayloadBytes) || this.maxPayloadBytes < 1) {
      invalid('maxPayloadBytes must be a positive safe integer');
    }
  }

  async put(request: PutSessionCommandPayloadRequest): Promise<SessionCommandPayloadReference> {
    nonEmpty(request.commandId, 'commandId');
    const canonical = canonicalizeJson(request.payload);
    const content = new TextEncoder().encode(canonical);
    this.assertSize(content.byteLength);
    const payloadHash = hashCanonicalJson(request.payload);
    const commandDigest = hashCanonicalJson(request.commandId).slice('sha256:'.length);
    const payloadDigest = payloadHash.slice('sha256:'.length);
    const ref = await this.options.artifacts.put({
      operationId: `session-command-payload:${commandDigest}`,
      objectKey: `runtime/session-commands/${commandDigest}/${payloadDigest}.json`,
      content,
      expectedContentHash: payloadHash,
      sizeBytes: content.byteLength,
      mimeType: 'application/json',
      metadata: { commandIdHash: `sha256:${commandDigest}`, payloadHash },
    });
    return { payloadRef: encodeArtifactRef(ref), payloadHash };
  }

  async get(request: GetSessionCommandPayloadRequest): Promise<unknown> {
    nonEmpty(request.payloadRef, 'payloadRef');
    if (!/^sha256:[a-f0-9]{64}$/u.test(request.payloadHash)) invalid('payloadHash is invalid');
    const ref = decodeArtifactRef(request.payloadRef);
    if (ref.storeId !== this.options.artifacts.id) {
      corrupt(
        `Session Command payload belongs to Artifact Store ${ref.storeId}, not ${this.options.artifacts.id}`
      );
    }
    const artifact = await this.options.artifacts.get({
      ref,
      expectedContentHash: request.payloadHash,
    });
    if (artifact.contentHash !== request.payloadHash) {
      corrupt('Session Command payload content hash does not match its Queue record');
    }
    this.assertSize(artifact.sizeBytes);
    const bytes = await collect(artifact.stream, this.maxPayloadBytes);
    if (bytes.byteLength !== artifact.sizeBytes) {
      corrupt('Session Command payload size does not match Artifact metadata');
    }

    let payload: unknown;
    try {
      payload = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    } catch (error) {
      throw new FrameworkError({
        code: 'RUNTIME_EVENT_STREAM_CORRUPT',
        message: 'Session Command payload is not valid UTF-8 JSON',
        cause: error,
      });
    }
    if (hashCanonicalJson(payload) !== request.payloadHash) {
      corrupt('Session Command payload canonical hash does not match its Queue record');
    }
    return payload;
  }

  private assertSize(sizeBytes: number): void {
    if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 0) {
      corrupt('Session Command payload size is invalid');
    }
    if (sizeBytes > this.maxPayloadBytes) {
      throw new FrameworkError({
        code: 'RUNTIME_RESOURCE_EXHAUSTED',
        message: `Session Command payload exceeds ${this.maxPayloadBytes} bytes`,
        context: { maxPayloadBytes: this.maxPayloadBytes, observedBytes: sizeBytes },
      });
    }
  }
}

function encodeArtifactRef(ref: ArtifactStorageRef): string {
  return `${PAYLOAD_REF_PREFIX}${encodeURIComponent(ref.storeId)}:${encodeURIComponent(ref.objectKey)}`;
}

function decodeArtifactRef(payloadRef: string): ArtifactStorageRef {
  if (!payloadRef.startsWith(PAYLOAD_REF_PREFIX)) corrupt('Session Command payloadRef is invalid');
  const encoded = payloadRef.slice(PAYLOAD_REF_PREFIX.length);
  const separator = encoded.indexOf(':');
  if (separator < 1 || separator === encoded.length - 1) {
    corrupt('Session Command payloadRef is incomplete');
  }
  try {
    const storeId = decodeURIComponent(encoded.slice(0, separator));
    const objectKey = decodeURIComponent(encoded.slice(separator + 1));
    nonEmpty(storeId, 'payloadRef.storeId');
    nonEmpty(objectKey, 'payloadRef.objectKey');
    return { storeId, objectKey };
  } catch (error) {
    throw new FrameworkError({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
      message: 'Session Command payloadRef cannot be decoded',
      cause: error,
    });
  }
}

async function collect(stream: AsyncIterable<Uint8Array>, maxBytes: number): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  let sizeBytes = 0;
  for await (const chunk of stream) {
    if (!(chunk instanceof Uint8Array)) corrupt('Session Command payload yielded invalid bytes');
    sizeBytes += chunk.byteLength;
    if (sizeBytes > maxBytes) {
      throw new FrameworkError({
        code: 'RUNTIME_RESOURCE_EXHAUSTED',
        message: `Session Command payload stream exceeds ${maxBytes} bytes`,
        context: { maxPayloadBytes: maxBytes, observedBytes: sizeBytes },
      });
    }
    chunks.push(chunk);
  }
  const result = new Uint8Array(sizeBytes);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

function nonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function corrupt(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_EVENT_STREAM_CORRUPT', message });
}
