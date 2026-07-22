import {
  FrameworkError,
  type ArtifactManager,
  type ExecutionDispatchRequest,
  type ExecutionPort,
  type ExecutionPrincipal,
  type SpecRef,
} from '@hypha/core';
import type { ToolCallContext, WorkspaceRuntimePort } from '@hypha/tools';

/** Structural mirror of the tools-owned CommonToolPort boundary. */
export interface CommonToolProviderRequest {
  operation: string;
  input: Record<string, unknown>;
  context: ToolCallContext;
}

export interface CommonToolProviderPort {
  execute(request: CommonToolProviderRequest): Promise<unknown>;
}

export type GovernedCommandDispatchFactory = (
  request: CommonToolProviderRequest
) => Promise<ExecutionDispatchRequest> | ExecutionDispatchRequest;

/** Binds common.command to the authorization-verifying ExecutionPort boundary. */
export class GovernedCommandCommonToolPort implements CommonToolProviderPort {
  constructor(
    private readonly execution: ExecutionPort,
    private readonly createDispatch: GovernedCommandDispatchFactory
  ) {}

  async execute(request: CommonToolProviderRequest): Promise<unknown> {
    if (request.operation !== 'execute') {
      throw denied(
        'Command cancel/status require a governed execution-control port and cannot call a provider directly.'
      );
    }
    const dispatch = await this.createDispatch(request);
    assertDispatchScope(request.context, dispatch);
    return this.execution.execute(dispatch, signalFor(request.context));
  }
}

/** Exposes only file operations; WorkspaceRuntime.execute is never reachable through this binding. */
export class WorkspaceCommonToolPort implements CommonToolProviderPort {
  constructor(private readonly workspace: WorkspaceRuntimePort) {}

  async execute(request: CommonToolProviderRequest): Promise<unknown> {
    if (!['list', 'read', 'write'].includes(request.operation)) {
      throw denied(`Workspace operation is not available through this provider: ${request.operation}`);
    }
    const relativePath = requiredString(request.input.path, 'path');
    return this.workspace.execute({
      operation: request.operation as 'list' | 'read' | 'write',
      path: relativePath,
      ...(typeof request.input.content === 'string' ? { content: request.input.content } : {}),
      signal: signalFor(request.context),
    });
  }
}

export interface ArtifactManagerCommonToolPortOptions {
  profileRef: SpecRef;
  maxReadBytes?: number;
}

/** Principal/workspace-scoped ArtifactManager binding; raw storage or host paths are never exposed. */
export class ArtifactManagerCommonToolPort implements CommonToolProviderPort {
  private readonly maxReadBytes: number;

  constructor(
    private readonly artifacts: ArtifactManager,
    private readonly options: ArtifactManagerCommonToolPortOptions
  ) {
    this.maxReadBytes = options.maxReadBytes ?? 10_000_000;
  }

  async execute(request: CommonToolProviderRequest): Promise<unknown> {
    const context = request.context;
    const principal = executionPrincipal(context);
    const workspaceId = context.workspaceId ?? context.principal?.workspaceId;
    if (!workspaceId) throw denied('Artifact operations require an owned workspaceId.');
    const operationId = context.operationId ?? context.invocationId;
    if (!operationId) throw denied('Artifact mutations require a governed operationId.');
    const artifactRef = optionalString(request.input.artifactRef);

    switch (request.operation) {
      case 'put': {
        const encoded = requiredString(request.input.contentBase64, 'contentBase64');
        const content = Uint8Array.from(Buffer.from(encoded, 'base64'));
        if (content.byteLength > this.maxReadBytes) throw denied('Artifact content exceeds limit.');
        return this.artifacts.create({
          operationId,
          principal,
          profileRef: this.options.profileRef,
          userId: context.userId ?? principal.userId ?? principal.principalId,
          tenantId: context.tenantId,
          workspaceId,
          sessionId: context.sessionId,
          runId: context.runId,
          agentId: context.agentId,
          name: artifactRef ?? `tool-output-${operationId}`,
          kind: 'tool_output',
          mimeType: optionalString(request.input.mimeType),
          content,
          logicalArtifactId: artifactRef,
          provenance: {
            sourceType: 'tool_generated',
            createdBy: principal.principalId,
            toolInvocationId: context.invocationId,
          },
          idempotencyKey: context.idempotencyKey,
        });
      }
      case 'get': {
        const result = await this.artifacts.read({
          principal,
          artifactId: requiredString(artifactRef, 'artifactRef'),
        });
        const bytes = await boundedBytes(result.content.stream, this.maxReadBytes);
        return {
          record: result.record,
          contentBase64: Buffer.from(bytes).toString('base64'),
          contentHash: result.content.contentHash,
        };
      }
      case 'list':
        return this.artifacts.list({ principal, workspaceId, limit: 100 });
      case 'version': {
        const artifactId = requiredString(artifactRef, 'artifactRef');
        const current = await this.artifacts.get({ principal, artifactId });
        if (!current) throw denied('Artifact version target was not found.');
        const content = Uint8Array.from(
          Buffer.from(requiredString(request.input.contentBase64, 'contentBase64'), 'base64')
        );
        return this.artifacts.createVersion({
          operationId,
          principal,
          artifactId,
          expectedRevision: current.revision,
          content,
          provenance: {
            sourceType: 'tool_generated',
            createdBy: principal.principalId,
            toolInvocationId: context.invocationId,
          },
          idempotencyKey: context.idempotencyKey,
        });
      }
      case 'download_ref':
        return this.artifacts.createDownloadAccess({
          operationId,
          principal,
          artifactId: requiredString(artifactRef, 'artifactRef'),
        });
      default:
        throw denied(`Unsupported Artifact operation: ${request.operation}`);
    }
  }
}

function assertDispatchScope(
  context: ToolCallContext,
  dispatch: ExecutionDispatchRequest
): void {
  const principalId = context.principal?.principalId ?? context.principal?.id;
  const mismatches = [
    dispatch.activity.runId !== context.runId && 'activity.runId',
    dispatch.authorization.runId !== context.runId && 'authorization.runId',
    context.invocationId &&
      dispatch.authorization.invocationId !== context.invocationId &&
      'authorization.invocationId',
    principalId && dispatch.authorization.principalId !== principalId && 'principalId',
  ].filter(Boolean);
  if (mismatches.length) {
    throw denied('Execution dispatch does not match the governed Tool scope.', { mismatches });
  }
}

function executionPrincipal(context: ToolCallContext): ExecutionPrincipal {
  const principal = context.principal;
  const principalId = principal?.principalId ?? principal?.id;
  if (!principal || !principalId) throw denied('Artifact operations require a principal.');
  return {
    principalId,
    type: principal.type,
    tenantId: context.tenantId ?? principal.tenantId,
    userId: context.userId ?? principal.userId,
    agentId: context.agentId,
    permissionScopes: [...principal.permissionScopes],
  };
}

function signalFor(context: ToolCallContext): AbortSignal {
  return context.signal ?? context.abortSignal ?? new AbortController().signal;
}

function requiredString(value: unknown, field: string): string {
  const result = optionalString(value);
  if (!result) throw denied(`${field} is required.`);
  return result;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

async function boundedBytes(
  stream: AsyncIterable<Uint8Array>,
  maxBytes: number
): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  let size = 0;
  for await (const chunk of stream) {
    size += chunk.byteLength;
    if (size > maxBytes) throw denied('Artifact response exceeds limit.');
    chunks.push(chunk);
  }
  return Uint8Array.from(Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))));
}

function denied(message: string, context?: Record<string, unknown>): FrameworkError {
  return new FrameworkError({ code: 'EXECUTION_POLICY_DENIED', message, context });
}
