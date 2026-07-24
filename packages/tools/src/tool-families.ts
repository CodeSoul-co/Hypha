import type { JsonSchema } from '@hypha/core';
import { LocalFunctionToolAdapter, type ToolAdapter, type ToolCallContext, type ToolSpec } from './index';

export interface GovernedToolFamilyPort {
  execute(input: {
    toolId: string;
    input: Record<string, unknown>;
    context: ToolCallContext;
  }): Promise<unknown>;
}

export interface GovernedToolFamilyBinding {
  spec: ToolSpec;
  adapter: ToolAdapter;
}

const objectSchema = (
  properties: Record<string, JsonSchema>,
  required: string[] = []
): JsonSchema => ({
  type: 'object',
  properties,
  required,
  additionalProperties: false,
});

const base = {
  version: '1.0.0',
  source: 'local' as const,
  timeoutPolicy: { timeoutMs: 60_000, onTimeout: 'fail' as const },
  auditPolicy: { enabled: true, includeInput: true, includeOutput: true },
};

function readSpec(
  id: string,
  description: string,
  permissionScope: string,
  inputSchema: JsonSchema
): ToolSpec {
  return {
    ...base,
    id,
    name: id,
    description,
    inputSchema,
    outputSchema: { type: 'object' },
    sideEffectLevel: 'read',
    permissionScope: [permissionScope],
    idempotencyPolicy: { mode: 'optional' },
  };
}

function writeSpec(
  id: string,
  description: string,
  permissionScope: string,
  inputSchema: JsonSchema,
  sideEffectLevel: 'write' | 'external_effect' | 'irreversible' = 'write'
): ToolSpec {
  return {
    ...base,
    id,
    name: id,
    description,
    inputSchema,
    outputSchema: { type: 'object' },
    sideEffectLevel,
    permissionScope: [permissionScope],
    humanApprovalPolicy: {
      required: true,
      reason: `${id} performs a governed ${sideEffectLevel} operation.`,
    },
    idempotencyPolicy: { mode: 'required' },
  };
}

const reference = { type: 'string', minLength: 1, maxLength: 4096 } satisfies JsonSchema;

export const governedToolFamilySpecs: readonly ToolSpec[] = Object.freeze([
  readSpec(
    'family.files.read',
    'List, read, or search files within a Workspace boundary.',
    'workspace.files.read',
    objectSchema(
      {
        operation: { enum: ['list', 'read', 'search'] },
        path: reference,
        query: { type: 'string', maxLength: 4096 },
        maxBytes: { type: 'integer', minimum: 1, maximum: 10_000_000 },
      },
      ['operation', 'path']
    )
  ),
  writeSpec(
    'family.files.write',
    'Write or patch a Workspace file with revision/hash preconditions.',
    'workspace.files.write',
    objectSchema(
      {
        operation: { enum: ['write', 'patch'] },
        path: reference,
        content: { type: 'string', maxLength: 10_000_000 },
        patch: { type: 'string', maxLength: 2_000_000 },
        expectedHash: { type: 'string', minLength: 64, maxLength: 64 },
      },
      ['operation', 'path', 'expectedHash']
    )
  ),
  writeSpec(
    'family.files.delete',
    'Delete a Workspace file through a recoverable, separately approved operation.',
    'workspace.files.delete',
    objectSchema({ path: reference, expectedHash: reference }, ['path', 'expectedHash']),
    'irreversible'
  ),
  readSpec(
    'family.data.query',
    'Query JSON, CSV, or SQL data through a bounded provider-neutral read port.',
    'data.query',
    objectSchema(
      {
        sourceRef: reference,
        language: { enum: ['jsonpath', 'sql', 'csv-filter'] },
        query: { type: 'string', minLength: 1, maxLength: 100_000 },
        maxRows: { type: 'integer', minimum: 1, maximum: 100_000 },
      },
      ['sourceRef', 'language', 'query']
    )
  ),
  writeSpec(
    'family.data.mutate',
    'Apply a revision-bound data mutation and return a durable receipt.',
    'data.mutate',
    objectSchema(
      {
        sourceRef: reference,
        operation: { enum: ['insert', 'update', 'delete'] },
        value: {},
        expectedRevision: reference,
      },
      ['sourceRef', 'operation', 'expectedRevision']
    )
  ),
  readSpec(
    'family.document.parse',
    'Parse a document into bounded text and structural metadata.',
    'document.parse',
    objectSchema(
      {
        artifactRef: reference,
        formatHint: { type: 'string', maxLength: 64 },
        maxPages: { type: 'integer', minimum: 1, maximum: 10_000 },
      },
      ['artifactRef']
    )
  ),
  writeSpec(
    'family.document.convert',
    'Render or convert a document into a new Artifact with lineage.',
    'document.convert',
    objectSchema(
      {
        artifactRef: reference,
        targetFormat: { type: 'string', minLength: 1, maxLength: 64 },
        outputArtifactRef: reference,
      },
      ['artifactRef', 'targetFormat']
    )
  ),
  readSpec(
    'family.code.check',
    'Run lint, typecheck, or tests through a pinned Execution profile.',
    'code.check',
    objectSchema(
      {
        operation: { enum: ['lint', 'typecheck', 'test'] },
        workspaceRef: reference,
        executionProfileRef: reference,
        target: { type: 'string', maxLength: 4096 },
      },
      ['operation', 'workspaceRef', 'executionProfileRef']
    )
  ),
  writeSpec(
    'family.code.build',
    'Build code through Execution and externalize outputs as Artifacts.',
    'code.build',
    objectSchema(
      {
        workspaceRef: reference,
        executionProfileRef: reference,
        target: { type: 'string', maxLength: 4096 },
      },
      ['workspaceRef', 'executionProfileRef']
    )
  ),
  readSpec(
    'family.git.inspect',
    'Read Git status, diff, or log from a Workspace-scoped repository.',
    'git.read',
    objectSchema(
      {
        operation: { enum: ['status', 'diff', 'log'] },
        repositoryRef: reference,
        revision: reference,
      },
      ['operation', 'repositoryRef']
    )
  ),
  writeSpec(
    'family.git.mutate',
    'Commit, push, or merge through a separately approved Git provider.',
    'git.write',
    objectSchema(
      {
        operation: { enum: ['commit', 'push', 'merge'] },
        repositoryRef: reference,
        expectedHead: reference,
        message: { type: 'string', maxLength: 10_000 },
        target: reference,
      },
      ['operation', 'repositoryRef', 'expectedHead']
    ),
    'irreversible'
  ),
  readSpec(
    'family.messaging.read',
    'Read messages through a tenant-scoped provider with pagination.',
    'messaging.read',
    objectSchema(
      {
        channelRef: reference,
        cursor: reference,
        limit: { type: 'integer', minimum: 1, maximum: 100 },
      },
      ['channelRef']
    )
  ),
  writeSpec(
    'family.messaging.send',
    'Send one external message and persist the provider receipt.',
    'messaging.send',
    objectSchema(
      {
        channelRef: reference,
        content: { type: 'string', minLength: 1, maxLength: 100_000 },
        idempotencyKey: reference,
      },
      ['channelRef', 'content', 'idempotencyKey']
    ),
    'external_effect'
  ),
  readSpec(
    'family.schedule.status',
    'Read durable schedule command status.',
    'schedule.read',
    objectSchema({ scheduleRef: reference }, ['scheduleRef'])
  ),
  writeSpec(
    'family.schedule.mutate',
    'Create or cancel a durable scheduling command without running work inline.',
    'schedule.write',
    objectSchema(
      {
        operation: { enum: ['create', 'cancel'] },
        scheduleRef: reference,
        expression: { type: 'string', maxLength: 1024 },
        commandRef: reference,
        expectedRevision: reference,
      },
      ['operation', 'scheduleRef', 'expectedRevision']
    ),
    'external_effect'
  ),
]);

export function createGovernedToolFamilyBindings(
  ports: Readonly<Record<string, GovernedToolFamilyPort>>
): GovernedToolFamilyBinding[] {
  return governedToolFamilySpecs.map((spec) => {
    const port = ports[spec.id];
    if (!port) throw new Error(`Governed Tool Family port is missing: ${spec.id}`);
    return {
      spec,
      adapter: new LocalFunctionToolAdapter(`tool-family:${spec.id}`, (input, context) =>
        port.execute({ toolId: spec.id, input: input as Record<string, unknown>, context })
      ),
    };
  });
}
