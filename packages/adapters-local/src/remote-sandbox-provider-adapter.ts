import {
  RemoteArtifactChunkSequenceValidator,
  validateCommandExecutionRequest,
  validateCommandExecutionResult,
  validateCommandOutputChunk,
  validateExecutionCancelRequest,
  validateRemoteArtifactChunk,
  validateRemoteArtifactDownloadRequest,
  validateRemoteArtifactTransferReceipt,
  validateRemoteArtifactUploadRequest,
  validateRemoteOutputStreamRequest,
  validateRemoteSandboxProviderCapabilities,
  validateSandboxCleanupRequest,
  validateSandboxCreateRequest,
  validateSandboxRecord,
  validateSandboxStartRequest,
  validateSandboxStatusRequest,
  validateSandboxTerminateRequest,
  type CommandExecutionRequest,
  type CommandExecutionResult,
  type ExecutionCancelRequest,
  type ProviderHealth,
  type RemoteArtifactChunk,
  type RemoteArtifactDownloadRequest,
  type RemoteArtifactTransferReceipt,
  type RemoteArtifactUploadRequest,
  type RemoteOutputStreamRequest,
  type RemoteSandboxProvider,
  type RemoteSandboxProviderCapabilities,
  type SandboxCleanupRequest,
  type SandboxCreateRequest,
  type SandboxRecord,
  type SandboxStartRequest,
  type SandboxStatusRequest,
  type SandboxTerminateRequest,
} from '@hypha/core';
import { z, type ZodType } from 'zod';
import { executionProviderError } from './execution-provider-error';

/**
 * Provider-specific SDKs stay behind this adapter-owned port. Implementations
 * may use HTTP, gRPC, or a vendor SDK without leaking those types into Core.
 */
export interface RemoteSandboxTransport {
  capabilities(): Promise<unknown>;
  create(request: SandboxCreateRequest): Promise<unknown>;
  start(request: SandboxStartRequest): Promise<unknown>;
  execute(request: CommandExecutionRequest): Promise<unknown>;
  cancel(request: ExecutionCancelRequest): Promise<void>;
  terminate(request: SandboxTerminateRequest): Promise<void>;
  status(request: SandboxStatusRequest): Promise<unknown>;
  cleanup(request: SandboxCleanupRequest): Promise<void>;
  health(): Promise<unknown>;
  streamOutput(request: RemoteOutputStreamRequest): AsyncIterable<unknown>;
  uploadArtifact(
    request: RemoteArtifactUploadRequest,
    chunks: AsyncIterable<RemoteArtifactChunk>
  ): Promise<unknown>;
  downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable<unknown>;
  close?(): Promise<void>;
}

export interface RemoteSandboxProviderAdapterOptions {
  id: string;
  transport: RemoteSandboxTransport;
}

const providerHealthSchema = z
  .object({
    status: z.enum(['healthy', 'degraded', 'unhealthy', 'unknown']),
    checkedAt: z.string().datetime({ offset: true }),
    latencyMs: z.number().nonnegative().optional(),
    message: z.string().min(1).optional(),
    details: z.record(z.unknown()).optional(),
  })
  .strict() satisfies ZodType<ProviderHealth>;

/**
 * Validates every remote boundary without claiming that a concrete backend is
 * available. Factory publication remains blocked until live acceptance exists.
 */
export class RemoteSandboxProviderAdapter implements RemoteSandboxProvider {
  readonly id: string;
  private readonly transport: RemoteSandboxTransport;
  private closed = false;

  constructor(options: RemoteSandboxProviderAdapterOptions) {
    if (!options.id || options.id.trim() !== options.id) {
      throw new TypeError('Remote Sandbox Provider id must be a non-empty, trimmed string.');
    }
    this.id = options.id;
    this.transport = options.transport;
  }

  async capabilities(): Promise<RemoteSandboxProviderCapabilities> {
    this.assertOpen();
    return this.parseResponse('capabilities', async () =>
      validateRemoteSandboxProviderCapabilities(await this.transport.capabilities())
    );
  }

  async create(input: SandboxCreateRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxCreateRequest(input);
    const record = await this.parseResponse('create', async () =>
      validateSandboxRecord(await this.transport.create(request))
    );
    this.assertRecordIdentity('create', record, {
      userId: request.userId,
      tenantId: request.tenantId,
      workspaceId: request.workspaceId,
      runId: request.runId,
    });
    return record;
  }

  async start(input: SandboxStartRequest): Promise<SandboxRecord> {
    this.assertOpen();
    const request = validateSandboxStartRequest(input);
    const record = await this.parseResponse('start', async () =>
      validateSandboxRecord(await this.transport.start(request))
    );
    this.assertRecordIdentity('start', record, { sandboxId: request.sandboxId });
    return record;
  }

  async execute(input: CommandExecutionRequest): Promise<CommandExecutionResult> {
    this.assertOpen();
    const request = validateCommandExecutionRequest(input);
    const result = await this.parseResponse('execute', async () =>
      validateCommandExecutionResult(await this.transport.execute(request))
    );
    if (request.executionId !== undefined && result.executionId !== request.executionId) {
      throw this.invalidResponse('execute', 'executionId does not match the request.');
    }
    if (request.sandboxId !== undefined && result.sandboxId !== request.sandboxId) {
      throw this.invalidResponse('execute', 'sandboxId does not match the request.');
    }
    return result;
  }

  async cancel(input: ExecutionCancelRequest): Promise<void> {
    this.assertOpen();
    await this.transport.cancel(validateExecutionCancelRequest(input));
  }

  async terminate(input: SandboxTerminateRequest): Promise<void> {
    this.assertOpen();
    await this.transport.terminate(validateSandboxTerminateRequest(input));
  }

  async status(input: SandboxStatusRequest): Promise<SandboxRecord | null> {
    this.assertOpen();
    const request = validateSandboxStatusRequest(input);
    const raw = await this.transport.status(request);
    if (raw === null) return null;
    const record = await this.parseResponse('status', () => validateSandboxRecord(raw));
    this.assertRecordIdentity('status', record, { sandboxId: request.sandboxId });
    return record;
  }

  async cleanup(input: SandboxCleanupRequest): Promise<void> {
    this.assertOpen();
    await this.transport.cleanup(validateSandboxCleanupRequest(input));
  }

  async health(): Promise<ProviderHealth> {
    if (this.closed) {
      return {
        status: 'unhealthy',
        checkedAt: new Date().toISOString(),
        message: 'Provider is closed.',
      };
    }
    return this.parseResponse('health', async () =>
      providerHealthSchema.parse(await this.transport.health())
    );
  }

  async *streamOutput(input: RemoteOutputStreamRequest) {
    this.assertOpen();
    const request = validateRemoteOutputStreamRequest(input);
    let nextSequence = request.fromSequence ?? 0;
    let emitted = 0;
    for await (const raw of this.transport.streamOutput(request)) {
      const chunk = await this.parseResponse('streamOutput', () =>
        validateCommandOutputChunk(raw)
      );
      if (chunk.executionId !== request.executionId) {
        throw this.invalidResponse('streamOutput', 'executionId does not match the request.');
      }
      if (chunk.sequence !== nextSequence) {
        throw this.invalidResponse('streamOutput', 'chunk sequence is not contiguous.');
      }
      emitted += 1;
      if (request.maxChunks !== undefined && emitted > request.maxChunks) {
        throw this.invalidResponse('streamOutput', 'transport exceeded maxChunks.');
      }
      nextSequence += 1;
      yield chunk;
    }
  }

  async uploadArtifact(
    input: RemoteArtifactUploadRequest,
    chunks: AsyncIterable<RemoteArtifactChunk>
  ): Promise<RemoteArtifactTransferReceipt> {
    this.assertOpen();
    const request = validateRemoteArtifactUploadRequest(input);
    let validator: RemoteArtifactChunkSequenceValidator | undefined;
    const validatedChunks = async function* () {
      for await (const raw of chunks) {
        const chunk = validateRemoteArtifactChunk(raw);
        validator ??= new RemoteArtifactChunkSequenceValidator({
          transferId: chunk.transferId,
          artifactRef: request.artifactRef,
          sizeBytes: request.sizeBytes,
        });
        yield validator.push(chunk);
      }
      validator?.finish();
    };
    const receipt = await this.parseResponse('uploadArtifact', async () =>
      validateRemoteArtifactTransferReceipt(
        await this.transport.uploadArtifact(request, validatedChunks())
      )
    );
    if (!validator?.progress().completed) {
      throw this.invalidResponse('uploadArtifact', 'transport did not consume a complete upload.');
    }
    this.assertTransferReceipt('uploadArtifact', receipt, request, 'upload');
    if (receipt.status === 'completed' && receipt.contentHash !== request.contentHash) {
      throw this.invalidResponse('uploadArtifact', 'completed receipt contentHash is invalid.');
    }
    return receipt;
  }

  async *downloadArtifact(input: RemoteArtifactDownloadRequest) {
    this.assertOpen();
    const request = validateRemoteArtifactDownloadRequest(input);
    let transferId: string | undefined;
    let nextSequence = 0;
    let nextOffsetBytes = 0;
    let completed = false;
    for await (const raw of this.transport.downloadArtifact(request)) {
      if (completed) {
        throw this.invalidResponse('downloadArtifact', 'received chunks after the final chunk.');
      }
      const chunk = await this.parseResponse('downloadArtifact', () =>
        validateRemoteArtifactChunk(raw)
      );
      transferId ??= chunk.transferId;
      if (
        chunk.transferId !== transferId ||
        chunk.artifactRef !== request.artifactRef ||
        chunk.sequence !== nextSequence ||
        chunk.offsetBytes !== nextOffsetBytes
      ) {
        throw this.invalidResponse('downloadArtifact', 'chunk identity or ordering is invalid.');
      }
      nextOffsetBytes += chunk.byteLength;
      if (nextOffsetBytes > request.maxBytes) {
        throw this.invalidResponse('downloadArtifact', 'download exceeded maxBytes.');
      }
      nextSequence += 1;
      completed = chunk.final;
      yield chunk;
    }
    if (!completed) {
      throw this.invalidResponse('downloadArtifact', 'stream ended without a final chunk.');
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    await this.transport.close?.();
  }

  private assertOpen(): void {
    if (this.closed) {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        'Remote Sandbox Provider is closed.',
        false
      );
    }
  }

  private assertRecordIdentity(
    phase: string,
    record: SandboxRecord,
    expected: {
      sandboxId?: string;
      userId?: string;
      tenantId?: string;
      workspaceId?: string;
      runId?: string;
    }
  ): void {
    if (
      record.providerId !== this.id ||
      (expected.sandboxId !== undefined && record.id !== expected.sandboxId) ||
      (expected.userId !== undefined && record.userId !== expected.userId) ||
      ('tenantId' in expected && record.tenantId !== expected.tenantId) ||
      (expected.workspaceId !== undefined && record.workspaceId !== expected.workspaceId) ||
      (expected.runId !== undefined && record.runId !== expected.runId)
    ) {
      throw this.invalidResponse(phase, 'Sandbox identity or scope does not match the request.');
    }
  }

  private assertTransferReceipt(
    phase: string,
    receipt: RemoteArtifactTransferReceipt,
    request: RemoteArtifactUploadRequest,
    direction: RemoteArtifactTransferReceipt['direction']
  ): void {
    if (
      receipt.providerId !== this.id ||
      receipt.sandboxId !== request.sandboxId ||
      receipt.artifactRef !== request.artifactRef ||
      receipt.direction !== direction ||
      receipt.sizeBytes !== request.sizeBytes
    ) {
      throw this.invalidResponse(phase, 'Artifact receipt identity does not match the request.');
    }
  }

  private async parseResponse<T>(phase: string, parse: () => T | Promise<T>): Promise<T> {
    try {
      return await parse();
    } catch (error) {
      if (error instanceof Error && error.name === 'ExecutionProviderError') throw error;
      throw this.invalidResponse(phase, 'Remote Provider returned an invalid response.', error);
    }
  }

  private invalidResponse(phase: string, message: string, cause?: unknown): Error {
    return executionProviderError('EXECUTION_INTERNAL_ERROR', message, false, {
      phase,
      evidenceCode: 'REMOTE_PROVIDER_RESPONSE_INVALID',
      ...(cause instanceof Error ? { causeName: cause.name } : {}),
    });
  }
}
