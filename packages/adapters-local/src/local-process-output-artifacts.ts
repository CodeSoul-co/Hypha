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
}

export interface ArtifactManagerLocalProcessOutputPortOptions {
  manager: Pick<ArtifactManager, 'create'>;
  profileRef: SpecRef;
}

/**
 * Persists bounded Local Process output through the governed ArtifactManager.
 * The Artifact metadata explicitly records whether this evidence was truncated;
 * it must not be represented as the complete process stream when a limit fired.
 */
export class ArtifactManagerLocalProcessOutputPort implements LocalProcessOutputArtifactPort {
  private readonly manager: Pick<ArtifactManager, 'create'>;
  private readonly profileRef: SpecRef;

  constructor(options: ArtifactManagerLocalProcessOutputPortOptions) {
    this.manager = options.manager;
    this.profileRef = options.profileRef;
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
}

function outputName(executionId: string, stream: LocalProcessArtifactStream): string {
  const safeExecutionId = executionId.replace(/[^a-z0-9._-]+/giu, '_').slice(0, 128);
  return `${safeExecutionId}.${stream}.log`;
}

function artifactReference(record: ArtifactRecord): string {
  return record.id;
}
