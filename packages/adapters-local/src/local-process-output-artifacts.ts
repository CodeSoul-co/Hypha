import type {
  ArtifactManager,
  ArtifactRecord,
  CommandExecutionRequest,
  SpecRef,
} from '@hypha/core';

export type LocalProcessArtifactStream = 'stdout' | 'stderr';

export interface LocalProcessOutputArtifactRequest {
  executionId: string;
  request: CommandExecutionRequest;
  stream: LocalProcessArtifactStream;
  content: Uint8Array;
  contentHash: string;
  observedBytes: number;
  truncated: boolean;
}

export interface LocalProcessOutputArtifactPort {
  store(request: LocalProcessOutputArtifactRequest): Promise<string>;
  openStream?(
    request: LocalProcessOutputArtifactStreamRequest
  ): LocalProcessOutputArtifactStream;
}

export interface LocalProcessOutputArtifactStreamRequest {
  executionId: string;
  request: CommandExecutionRequest;
  stream: LocalProcessArtifactStream;
}

export interface LocalProcessOutputArtifactStream {
  append(chunk: Uint8Array): Promise<void>;
  complete(): Promise<string>;
  abort(error: unknown): Promise<void>;
}

export interface ArtifactManagerLocalProcessOutputPortOptions {
  manager: Pick<ArtifactManager, 'create'>;
  profileRef: SpecRef;
  maxBufferedStreamBytes?: number;
}

/**
 * Persists Local Process output through the governed ArtifactManager.
 * `store` retains the bounded compatibility path; `openStream` forwards raw
 * process bytes with bounded producer backpressure.
 */
export class ArtifactManagerLocalProcessOutputPort implements LocalProcessOutputArtifactPort {
  private readonly manager: Pick<ArtifactManager, 'create'>;
  private readonly profileRef: SpecRef;
  private readonly maxBufferedStreamBytes: number;

  constructor(options: ArtifactManagerLocalProcessOutputPortOptions) {
    this.manager = options.manager;
    this.profileRef = options.profileRef;
    this.maxBufferedStreamBytes = positiveInteger(
      options.maxBufferedStreamBytes ?? 256 * 1024,
      'maxBufferedStreamBytes'
    );
  }

  async store(request: LocalProcessOutputArtifactRequest): Promise<string> {
    const record = await this.manager.create({
      operationId: `execution-output:${request.executionId}:${request.stream}`,
      principal: request.request.principal,
      profileRef: this.profileRef,
      userId: request.request.userId,
      tenantId: request.request.tenantId,
      workspaceId: request.request.workspaceId,
      sessionId: request.request.sessionId,
      runId: request.request.runId,
      agentId: request.request.agentId,
      name: outputName(request.executionId, request.stream),
      description: `Bounded ${request.stream} output from Execution ${request.executionId}.`,
      kind: 'log',
      mimeType: 'text/plain',
      encoding: 'utf-8',
      content: request.content,
      expectedContentHash: request.contentHash,
      expectedSizeBytes: request.content.byteLength,
      provenance: {
        sourceType: 'command_generated',
        createdBy: request.request.principal.principalId,
        executionId: request.executionId,
        metadata: {
          stream: request.stream,
          observedBytes: request.observedBytes,
          truncated: request.truncated,
        },
      },
      tags: ['execution-output', request.stream],
      idempotencyKey: `execution-output:${request.executionId}:${request.stream}`,
      metadata: {
        executionId: request.executionId,
        stream: request.stream,
        observedBytes: request.observedBytes,
        capturedBytes: request.content.byteLength,
        truncated: request.truncated,
      },
    });
    return artifactReference(record);
  }

  openStream(
    request: LocalProcessOutputArtifactStreamRequest
  ): LocalProcessOutputArtifactStream {
    const content = new BoundedArtifactByteStream(this.maxBufferedStreamBytes);
    const creation = this.manager.create({
      operationId: `execution-output:${request.executionId}:${request.stream}`,
      principal: request.request.principal,
      profileRef: this.profileRef,
      userId: request.request.userId,
      tenantId: request.request.tenantId,
      workspaceId: request.request.workspaceId,
      sessionId: request.request.sessionId,
      runId: request.request.runId,
      agentId: request.request.agentId,
      name: outputName(request.executionId, request.stream),
      description: `Streamed ${request.stream} output from Execution ${request.executionId}.`,
      kind: 'log',
      mimeType: 'application/octet-stream',
      content,
      provenance: {
        sourceType: 'command_generated',
        createdBy: request.request.principal.principalId,
        executionId: request.executionId,
        metadata: { stream: request.stream, captureMode: 'streaming' },
      },
      tags: ['execution-output', request.stream],
      idempotencyKey: `execution-output:${request.executionId}:${request.stream}`,
      metadata: {
        executionId: request.executionId,
        stream: request.stream,
        captureMode: 'streaming',
      },
    });
    void creation.catch((error: unknown) => content.fail(error));
    return new ArtifactManagerOutputStream(content, creation);
  }
}

class ArtifactManagerOutputStream implements LocalProcessOutputArtifactStream {
  private completion?: Promise<string>;
  private aborted = false;

  constructor(
    private readonly content: BoundedArtifactByteStream,
    private readonly creation: Promise<ArtifactRecord>
  ) {
    void creation.then(
      () => {
        if (!this.completion && !this.aborted) {
          this.content.fail(
            new Error('Artifact Manager completed before the output stream was closed.')
          );
        }
      },
      () => undefined
    );
  }

  async append(chunk: Uint8Array): Promise<void> {
    if (this.completion || this.aborted) {
      throw new Error('Execution output Artifact stream is already closed.');
    }
    await this.content.append(chunk);
  }

  complete(): Promise<string> {
    if (!this.completion) {
      this.content.complete();
      this.completion = this.creation.then(artifactReference);
    }
    return this.completion;
  }

  async abort(error: unknown): Promise<void> {
    if (this.completion || this.aborted) return;
    this.aborted = true;
    this.content.fail(error);
    await this.creation.catch(() => undefined);
  }
}

class BoundedArtifactByteStream implements AsyncIterable<Uint8Array> {
  private readonly chunks: Uint8Array[] = [];
  private readonly waiters = new Set<() => void>();
  private bufferedBytes = 0;
  private version = 0;
  private completed = false;
  private failure: unknown;
  private iterating = false;

  constructor(private readonly maxBufferedBytes: number) {}

  async append(input: Uint8Array): Promise<void> {
    if (!(input instanceof Uint8Array)) {
      throw new TypeError('Execution output Artifact chunks must be Uint8Array values.');
    }
    let offset = 0;
    while (offset < input.byteLength) {
      const end = Math.min(input.byteLength, offset + this.maxBufferedBytes);
      const chunk = Uint8Array.from(input.subarray(offset, end));
      await this.waitForCapacity(chunk.byteLength);
      this.assertWritable();
      this.chunks.push(chunk);
      this.bufferedBytes += chunk.byteLength;
      offset = end;
      this.signal();
    }
  }

  complete(): void {
    if (this.completed || this.failure !== undefined) return;
    this.completed = true;
    this.signal();
  }

  fail(error: unknown): void {
    if (this.failure !== undefined || this.completed) return;
    this.failure = error instanceof Error ? error : new Error('Artifact stream failed.');
    this.chunks.length = 0;
    this.bufferedBytes = 0;
    this.signal();
  }

  async *[Symbol.asyncIterator](): AsyncIterator<Uint8Array> {
    if (this.iterating) {
      throw new Error('Execution output Artifact streams support one consumer.');
    }
    this.iterating = true;
    while (true) {
      if (this.failure !== undefined) throw this.failure;
      const chunk = this.chunks.shift();
      if (chunk) {
        this.bufferedBytes -= chunk.byteLength;
        this.signal();
        yield chunk;
        continue;
      }
      if (this.completed) return;
      const observedVersion = this.version;
      await this.waitForChange(observedVersion);
    }
  }

  private async waitForCapacity(chunkBytes: number): Promise<void> {
    while (this.bufferedBytes + chunkBytes > this.maxBufferedBytes) {
      this.assertWritable();
      const observedVersion = this.version;
      await this.waitForChange(observedVersion);
    }
  }

  private waitForChange(observedVersion: number): Promise<void> {
    if (this.version !== observedVersion) return Promise.resolve();
    return new Promise((resolve) => this.waiters.add(resolve));
  }

  private assertWritable(): void {
    if (this.failure !== undefined) throw this.failure;
    if (this.completed) throw new Error('Execution output Artifact stream is complete.');
  }

  private signal(): void {
    this.version += 1;
    const waiters = [...this.waiters];
    this.waiters.clear();
    for (const resolve of waiters) resolve();
  }
}

function outputName(executionId: string, stream: LocalProcessArtifactStream): string {
  const safeExecutionId = executionId.replace(/[^a-z0-9._-]+/giu, '_').slice(0, 128);
  return `${safeExecutionId}.${stream}.log`;
}

function artifactReference(record: ArtifactRecord): string {
  return record.id;
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer.`);
  }
  return value;
}
