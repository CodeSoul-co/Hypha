import type { ArtifactManager, ArtifactRecord, ExecutionPrincipal, SpecRef } from '@hypha/core';
import type { ToolArtifactPort } from '@hypha/tools';
import { hashArtifactBytes } from './artifact-content-io';

export interface ToolArtifactManagerContext {
  principal: ExecutionPrincipal;
  profileRef: SpecRef;
  userId: string;
  workspaceId: string;
  tenantId?: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
}

export interface ArtifactManagerToolPortOptions {
  manager: Pick<ArtifactManager, 'create'>;
  resolveContext(request: {
    invocationId: string;
    toolId: string;
  }): ToolArtifactManagerContext | Promise<ToolArtifactManagerContext>;
}

/** Routes governed Tool result bytes through the Core ArtifactManager. */
export class ArtifactManagerToolPort implements ToolArtifactPort {
  private readonly manager: Pick<ArtifactManager, 'create'>;
  private readonly resolveContext: ArtifactManagerToolPortOptions['resolveContext'];

  constructor(options: ArtifactManagerToolPortOptions) {
    this.manager = options.manager;
    this.resolveContext = options.resolveContext;
  }

  async store(request: {
    invocationId: string;
    toolId: string;
    value: unknown;
    mimeType?: string;
    metadata?: Record<string, unknown>;
  }): Promise<string> {
    const context = await this.resolveContext({
      invocationId: request.invocationId,
      toolId: request.toolId,
    });
    const serialized = serializeToolOutput(request.value, request.mimeType);
    const record = await this.manager.create({
      operationId: `tool-output:${request.toolId}:${request.invocationId}`,
      principal: context.principal,
      profileRef: context.profileRef,
      userId: context.userId,
      tenantId: context.tenantId,
      workspaceId: context.workspaceId,
      sessionId: context.sessionId,
      runId: context.runId,
      agentId: context.agentId,
      name: toolOutputName(request.toolId, request.invocationId),
      description: `Governed output from Tool ${request.toolId}.`,
      kind: 'tool_output',
      mimeType: serialized.mimeType,
      content: serialized.content,
      expectedContentHash: hashArtifactBytes(serialized.content),
      expectedSizeBytes: serialized.content.byteLength,
      provenance: {
        sourceType: 'tool_generated',
        createdBy: context.principal.principalId,
        toolInvocationId: request.invocationId,
        metadata: { toolId: request.toolId },
      },
      tags: ['tool-output'],
      idempotencyKey: `tool-output:${request.toolId}:${request.invocationId}`,
      metadata: {
        ...request.metadata,
        invocationId: request.invocationId,
        toolId: request.toolId,
      },
    });
    return artifactReference(record);
  }
}

function serializeToolOutput(
  value: unknown,
  requestedMimeType?: string
): { content: Uint8Array; mimeType: string } {
  if (value instanceof Uint8Array) {
    return {
      content: new Uint8Array(value),
      mimeType: requestedMimeType ?? 'application/octet-stream',
    };
  }
  if (typeof value === 'string') {
    return {
      content: new TextEncoder().encode(value),
      mimeType: requestedMimeType ?? 'text/plain',
    };
  }
  const json = JSON.stringify(value) ?? 'null';
  return {
    content: new TextEncoder().encode(json),
    mimeType: requestedMimeType ?? 'application/json',
  };
}

function toolOutputName(toolId: string, invocationId: string): string {
  const safe = (value: string): string => value.replace(/[^a-z0-9._-]+/giu, '_').slice(0, 96);
  return `${safe(toolId)}-${safe(invocationId)}.tool-output`;
}

function artifactReference(record: ArtifactRecord): string {
  return record.id;
}
