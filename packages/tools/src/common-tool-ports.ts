import type { JsonSchema } from '@hypha/core';
import {
  LocalFunctionToolAdapter,
  type ToolAdapter,
  type ToolCallContext,
  type ToolSpec,
} from './index';

export interface CommonToolPortRequest {
  operation: string;
  input: Record<string, unknown>;
  context: ToolCallContext;
}

export interface CommonToolPort {
  execute(request: CommonToolPortRequest): Promise<unknown>;
}

export interface CommonToolPorts {
  files: CommonToolPort;
  artifacts: CommonToolPort;
  httpFetch: CommonToolPort;
  search: CommonToolPort;
  memory: CommonToolPort;
  command: CommonToolPort;
  mcpResource: CommonToolPort;
  hashReference: CommonToolPort;
}

export interface CommonToolBinding {
  spec: ToolSpec;
  adapter: ToolAdapter;
}

const strictObject = (
  properties: Record<string, JsonSchema>,
  required: string[] = []
): JsonSchema => ({
  type: 'object',
  properties,
  required,
  additionalProperties: false,
});

const audited = {
  version: '1.0.0',
  source: 'local' as const,
  auditPolicy: { enabled: true, includeInput: true, includeOutput: true },
  timeoutPolicy: { timeoutMs: 30_000, onTimeout: 'fail' as const },
};

export const fileUtilityToolSpec: ToolSpec = {
  ...audited,
  id: 'common.files',
  name: 'common.files',
  description:
    'Perform workspace-confined file operations through a Workspace port with hash/CAS support.',
  inputSchema: strictObject(
    {
      operation: { enum: ['list', 'read', 'write', 'patch', 'delete'] },
      path: { type: 'string', minLength: 1, maxLength: 4096 },
      content: { type: 'string', maxLength: 10_000_000 },
      patch: { type: 'string', maxLength: 2_000_000 },
      expectedHash: { type: 'string', maxLength: 128 },
    },
    ['operation', 'path']
  ),
  outputSchema: { type: 'object' },
  sideEffectLevel: 'write',
  permissionScope: ['workspace.files'],
  humanApprovalPolicy: { required: true, reason: 'Workspace file mutation requires approval.' },
  idempotencyPolicy: { mode: 'required' },
};

export const artifactUtilityToolSpec: ToolSpec = {
  ...audited,
  id: 'common.artifact',
  name: 'common.artifact',
  description: 'Put, get, list, or version principal-scoped content-addressed artifacts.',
  inputSchema: strictObject(
    {
      operation: { enum: ['put', 'get', 'list', 'version', 'download_ref'] },
      artifactRef: { type: 'string', maxLength: 4096 },
      contentBase64: { type: 'string', maxLength: 14_000_000 },
      mimeType: { type: 'string', maxLength: 256 },
      retention: { type: 'string', maxLength: 128 },
    },
    ['operation']
  ),
  outputSchema: { type: 'object' },
  sideEffectLevel: 'write',
  permissionScope: ['artifact.read', 'artifact.write'],
  humanApprovalPolicy: {
    required: true,
    reason: 'Artifact writes and retention changes require approval.',
  },
  idempotencyPolicy: { mode: 'required' },
};

export const httpFetchUtilityToolSpec: ToolSpec = {
  ...audited,
  id: 'common.http_fetch',
  name: 'common.http_fetch',
  description: 'Fetch an HTTPS resource through an SSRF-safe, bounded HTTP provider.',
  inputSchema: strictObject(
    {
      url: { type: 'string', minLength: 1, maxLength: 8192 },
      method: { enum: ['GET', 'HEAD', 'POST'] },
      headersRef: { type: 'string', maxLength: 512 },
      body: { type: 'string', maxLength: 2_000_000 },
      maxBytes: { type: 'integer', minimum: 1, maximum: 10_000_000 },
      acceptedMimeTypes: { type: 'array', items: { type: 'string' }, maxItems: 32 },
    },
    ['url']
  ),
  outputSchema: { type: 'object' },
  sideEffectLevel: 'external_effect',
  permissionScope: ['network.fetch'],
  humanApprovalPolicy: {
    required: true,
    reason: 'External network access requires policy approval.',
  },
  idempotencyPolicy: { mode: 'optional' },
};

export const searchUtilityToolSpec: ToolSpec = {
  ...audited,
  id: 'common.search',
  name: 'common.search',
  description:
    'Run a provider-neutral bounded search with citations, provenance, and fallback markers.',
  inputSchema: strictObject(
    {
      query: { type: 'string', minLength: 1, maxLength: 4096 },
      limit: { type: 'integer', minimum: 1, maximum: 100 },
      providerHint: { type: 'string', maxLength: 128 },
    },
    ['query']
  ),
  outputSchema: { type: 'object' },
  sideEffectLevel: 'external_effect',
  permissionScope: ['search.query'],
  idempotencyPolicy: { mode: 'optional' },
};

export const memoryUtilityToolSpec: ToolSpec = {
  ...audited,
  id: 'common.memory',
  name: 'common.memory',
  description: 'Search or mutate memory exclusively through the governed Memory Activity port.',
  inputSchema: strictObject(
    {
      operation: { enum: ['search', 'add', 'update', 'delete'] },
      memoryRef: { type: 'string', maxLength: 512 },
      query: { type: 'string', maxLength: 4096 },
      value: {},
      expectedRevision: { type: 'string', maxLength: 128 },
    },
    ['operation']
  ),
  outputSchema: { type: 'object' },
  sideEffectLevel: 'write',
  permissionScope: ['memory.activity'],
  humanApprovalPolicy: { required: true, reason: 'Long-lived memory mutation requires approval.' },
  idempotencyPolicy: { mode: 'required' },
};

export const commandUtilityToolSpec: ToolSpec = {
  ...audited,
  id: 'common.command',
  name: 'common.command',
  description: 'Execute, cancel, or inspect commands only through GovernedExecutionPort.',
  inputSchema: strictObject(
    {
      operation: { enum: ['execute', 'cancel', 'status'] },
      commandRef: { type: 'string', maxLength: 512 },
      args: { type: 'array', items: { type: 'string', maxLength: 8192 }, maxItems: 256 },
      executionRef: { type: 'string', maxLength: 512 },
      timeoutMs: { type: 'integer', minimum: 1, maximum: 600_000 },
    },
    ['operation']
  ),
  outputSchema: { type: 'object' },
  sideEffectLevel: 'irreversible',
  permissionScope: ['execution.command'],
  humanApprovalPolicy: { required: true, reason: 'Command execution requires approval.' },
  idempotencyPolicy: { mode: 'required' },
};

export const mcpResourceUtilityToolSpec: ToolSpec = {
  ...audited,
  id: 'common.mcp_resource',
  name: 'common.mcp_resource',
  description:
    'List, read, or subscribe to approved MCP Resources without treating writes as tools.',
  inputSchema: strictObject(
    {
      operation: { enum: ['list', 'read', 'subscribe'] },
      serverId: { type: 'string', minLength: 1, maxLength: 256 },
      uri: { type: 'string', maxLength: 8192 },
      capabilityHash: { type: 'string', maxLength: 128 },
      maxBytes: { type: 'integer', minimum: 1, maximum: 10_000_000 },
    },
    ['operation', 'serverId']
  ),
  outputSchema: { type: 'object' },
  sideEffectLevel: 'read',
  permissionScope: ['mcp.resource.read'],
  idempotencyPolicy: { mode: 'optional' },
};

export const hashReferenceUtilityToolSpec: ToolSpec = {
  ...audited,
  id: 'common.hash_reference',
  name: 'common.hash_reference',
  description:
    'Hash bytes from an authorized artifact or workspace reference without accepting raw paths.',
  inputSchema: strictObject(
    {
      referenceType: { enum: ['artifact', 'workspace'] },
      reference: { type: 'string', minLength: 1, maxLength: 4096 },
      expectedRevision: { type: 'string', maxLength: 128 },
    },
    ['referenceType', 'reference']
  ),
  outputSchema: strictObject(
    {
      algorithm: { enum: ['sha256'] },
      digest: { type: 'string', minLength: 64, maxLength: 64 },
      inputBytes: { type: 'integer', minimum: 0 },
    },
    ['algorithm', 'digest', 'inputBytes']
  ),
  sideEffectLevel: 'read',
  permissionScope: ['workspace.files.read', 'artifact.read'],
};

export const commonPortToolSpecs = [
  fileUtilityToolSpec,
  artifactUtilityToolSpec,
  httpFetchUtilityToolSpec,
  searchUtilityToolSpec,
  memoryUtilityToolSpec,
  commandUtilityToolSpec,
  mcpResourceUtilityToolSpec,
  hashReferenceUtilityToolSpec,
] as const;

export function createPortBackedCommonToolBindings(ports: CommonToolPorts): CommonToolBinding[] {
  const portByToolId: Record<string, CommonToolPort> = {
    [fileUtilityToolSpec.id]: ports.files,
    [artifactUtilityToolSpec.id]: ports.artifacts,
    [httpFetchUtilityToolSpec.id]: ports.httpFetch,
    [searchUtilityToolSpec.id]: ports.search,
    [memoryUtilityToolSpec.id]: ports.memory,
    [commandUtilityToolSpec.id]: ports.command,
    [mcpResourceUtilityToolSpec.id]: ports.mcpResource,
    [hashReferenceUtilityToolSpec.id]: ports.hashReference,
  };
  return commonPortToolSpecs.map((spec) => ({
    spec,
    adapter: new LocalFunctionToolAdapter(`common-port:${spec.id}`, async (input, context) => {
      const record = input as Record<string, unknown>;
      return portByToolId[spec.id].execute({
        operation: String(record.operation ?? 'hash'),
        input: record,
        context,
      });
    }),
  }));
}
