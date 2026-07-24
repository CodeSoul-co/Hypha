import { z, type ZodType } from 'zod';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  retryPolicySpecSchema,
  type JsonSchema,
  type RetryPolicySpec,
} from '@hypha/core';

export type MCPTransportSpec =
  | {
      type: 'stdio';
      command: string;
      args?: string[];
      envAllowList?: string[];
      stderrMode?: 'inherit' | 'capture' | 'artifact';
    }
  | {
      type: 'streamable_http';
      endpoint: string;
      headersRef?: string;
      authorizationRef?: string;
      sessionMode?: 'protocol_default' | 'stateless';
    }
  | {
      type: 'custom';
      adapterRef: string;
      config?: Record<string, unknown>;
    };

export interface MCPServerProfile {
  id: string;
  version?: string;
  displayName?: string;
  mode: 'fixture' | 'local' | 'remote';
  transport: MCPTransportSpec;
  authRef?: string;
  environmentRefs?: string[];
  workingDirectoryRef?: string;
  autoConnect?: boolean;
  lazyConnect?: boolean;
  singleStart?: boolean;
  initializationTimeoutMs?: number;
  requestTimeoutMs?: number;
  shutdownTimeoutMs?: number;
  reconnectPolicy?: RetryPolicySpec;
  healthCheckPolicy?: {
    intervalMs?: number;
    timeoutMs?: number;
    unhealthyThreshold?: number;
  };
  expectedServerInfo?: Record<string, unknown>;
  protocolVersionPolicy?: {
    allowedVersions?: string[];
    preferLatest?: boolean;
    rejectUnknown?: boolean;
  };
  egressPolicy?: {
    allowedHosts?: string[];
    denyPrivateNetworks?: boolean;
    requireTls?: boolean;
    maxRedirects?: number;
    allowCrossOriginRedirects?: boolean;
  };
  requestGuardPolicy?: {
    maxConcurrentRequests?: number;
    rateLimit?: { maxRequests: number; windowMs: number };
    circuitBreaker?: { failureThreshold: number; resetAfterMs: number };
  };
  contentPolicy?: {
    maxResourceBytes?: number;
    maxPromptBytes?: number;
    maxPromptTokens?: number;
    oversizeAction?: 'reject' | 'artifact';
  };
  metadata?: Record<string, unknown>;
}

export interface MCPTrustPolicySpec {
  defaultTrustLevel: 'untrusted' | 'restricted' | 'trusted';
  trustedSourceRefs?: string[];
  requireAdminApprovalForNewServer?: boolean;
  requireApprovalForNewCapability?: boolean;
  requireApprovalForSchemaChange?: boolean;
  allowServerDeclaredSideEffectHints?: boolean;
  pinServerIdentity?: boolean;
  pinProtocolVersion?: boolean;
  pinCapabilityHashes?: boolean;
}

export interface MCPCapabilityTrustRecord {
  level: 'untrusted' | 'restricted' | 'trusted';
  source: 'admin' | 'domain_pack' | 'runtime_discovery' | 'signed_manifest' | 'import';
  sourceRef?: string;
  approvedBy?: string;
  approvedAt?: string;
  restrictions?: string[];
  metadata?: Record<string, unknown>;
}

export interface MCPCapabilityDriftPolicySpec {
  onDescriptionChange: 'accept' | 'snapshot_next_run' | 'quarantine';
  onSchemaChange: 'snapshot_next_run' | 'quarantine' | 'require_approval';
  onRemoval: 'mark_unavailable' | 'allow_existing_run' | 'fail_existing_run';
  onServerIdentityChange: 'disconnect' | 'quarantine';
  notifyRuntime?: boolean;
  invalidateSchemaCache?: boolean;
}

export interface MCPContractSnapshotPolicySpec {
  mode: 'run' | 'state';
  preserveRemovedForExistingRuns?: boolean;
  requireApprovedRevision?: boolean;
}

export interface MCPImportPolicySpec {
  kinds: Array<'tool' | 'resource' | 'prompt'>;
  lazyLoad?: boolean;
  maxLoadedCapabilities?: number;
  schemaTokenBudget?: number;
}

export interface MCPAllowDenyRule {
  serverId?: string;
  capabilityId?: string;
  kind?: 'tool' | 'resource' | 'prompt';
  tags?: string[];
}

export interface GovernedMCPIntegrationSpec {
  id: string;
  version: string;
  revision?: string;
  name?: string;
  description?: string;
  servers: MCPServerProfile[];
  allowCapabilities?: MCPAllowDenyRule[];
  denyCapabilities?: MCPAllowDenyRule[];
  trustPolicy: MCPTrustPolicySpec;
  importPolicy: MCPImportPolicySpec;
  driftPolicy: MCPCapabilityDriftPolicySpec;
  snapshotPolicy: MCPContractSnapshotPolicySpec;
  toolPolicyRefs?: Array<{ id: string; version?: string; revision?: string }>;
  resourcePolicyRefs?: Array<{ id: string; version?: string; revision?: string }>;
  promptPolicyRefs?: Array<{ id: string; version?: string; revision?: string }>;
  metadata?: Record<string, unknown>;
}

export const NORMALIZED_MCP_ERROR_CODES = [
  'MCP_SERVER_NOT_FOUND',
  'MCP_CONNECTION_FAILED',
  'MCP_INITIALIZATION_FAILED',
  'MCP_PROTOCOL_MISMATCH',
  'MCP_REQUEST_TIMEOUT',
  'MCP_REQUEST_CANCELLED',
  'MCP_CAPABILITY_NOT_FOUND',
  'MCP_CAPABILITY_QUARANTINED',
  'MCP_CAPABILITY_DRIFT',
  'MCP_SCHEMA_INVALID',
  'MCP_AUTH_FAILED',
  'MCP_BULKHEAD_REJECTED',
  'MCP_RATE_LIMITED',
  'MCP_CIRCUIT_OPEN',
  'MCP_EGRESS_DENIED',
  'MCP_CONTENT_TOO_LARGE',
  'MCP_REMOTE_ERROR',
  'MCP_TRANSPORT_CLOSED',
  'MCP_INTERNAL_ERROR',
] as const;

export type NormalizedMCPErrorCode = (typeof NORMALIZED_MCP_ERROR_CODES)[number];

export interface NormalizedMCPError {
  code: NormalizedMCPErrorCode;
  message: string;
  retryable: boolean;
  serverId?: string;
  capabilityId?: string;
  remoteCode?: string | number;
  details?: Record<string, unknown>;
}

export const normalizedMCPErrorSchema = z
  .object({
    code: z.enum(NORMALIZED_MCP_ERROR_CODES),
    message: z.string().min(1),
    retryable: z.boolean(),
    serverId: z.string().optional(),
    capabilityId: z.string().optional(),
    remoteCode: z.union([z.string(), z.number()]).optional(),
    details: z.record(z.unknown()).optional(),
  })
  .strict() satisfies ZodType<NormalizedMCPError>;

export const mcpTransportSpecSchema: ZodType<MCPTransportSpec> = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('stdio'),
    command: z.string().min(1),
    args: z.array(z.string()).optional(),
    envAllowList: z.array(z.string()).optional(),
    stderrMode: z.enum(['inherit', 'capture', 'artifact']).optional(),
  }),
  z.object({
    type: z.literal('streamable_http'),
    endpoint: z.string().url(),
    headersRef: z.string().optional(),
    authorizationRef: z.string().optional(),
    sessionMode: z.enum(['protocol_default', 'stateless']).optional(),
  }),
  z.object({
    type: z.literal('custom'),
    adapterRef: z.string().min(1),
    config: z.record(z.unknown()).optional(),
  }),
]);

export const mcpServerProfileSchema = z.object({
  id: z.string().min(1),
  version: z.string().optional(),
  displayName: z.string().optional(),
  mode: z.enum(['fixture', 'local', 'remote']),
  transport: mcpTransportSpecSchema,
  authRef: z.string().optional(),
  environmentRefs: z.array(z.string()).optional(),
  workingDirectoryRef: z.string().optional(),
  autoConnect: z.boolean().optional(),
  lazyConnect: z.boolean().optional(),
  singleStart: z.boolean().optional(),
  initializationTimeoutMs: z.number().int().positive().optional(),
  requestTimeoutMs: z.number().int().positive().optional(),
  shutdownTimeoutMs: z.number().int().positive().optional(),
  reconnectPolicy: retryPolicySpecSchema.optional(),
  healthCheckPolicy: z
    .object({
      intervalMs: z.number().int().positive().optional(),
      timeoutMs: z.number().int().positive().optional(),
      unhealthyThreshold: z.number().int().positive().optional(),
    })
    .optional(),
  expectedServerInfo: z.record(z.unknown()).optional(),
  protocolVersionPolicy: z
    .object({
      allowedVersions: z.array(z.string()).optional(),
      preferLatest: z.boolean().optional(),
      rejectUnknown: z.boolean().optional(),
    })
    .optional(),
  egressPolicy: z
    .object({
      allowedHosts: z.array(z.string().min(1)).optional(),
      denyPrivateNetworks: z.boolean().optional(),
      requireTls: z.boolean().optional(),
      maxRedirects: z.number().int().min(0).max(10).optional(),
      allowCrossOriginRedirects: z.boolean().optional(),
    })
    .optional(),
  requestGuardPolicy: z
    .object({
      maxConcurrentRequests: z.number().int().positive().optional(),
      rateLimit: z
        .object({
          maxRequests: z.number().int().positive(),
          windowMs: z.number().int().positive(),
        })
        .optional(),
      circuitBreaker: z
        .object({
          failureThreshold: z.number().int().positive(),
          resetAfterMs: z.number().int().positive(),
        })
        .optional(),
    })
    .optional(),
  contentPolicy: z
    .object({
      maxResourceBytes: z.number().int().positive().optional(),
      maxPromptBytes: z.number().int().positive().optional(),
      maxPromptTokens: z.number().int().positive().optional(),
      oversizeAction: z.enum(['reject', 'artifact']).optional(),
    })
    .optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<MCPServerProfile>;

export const mcpTrustPolicySpecSchema = z.object({
  defaultTrustLevel: z.enum(['untrusted', 'restricted', 'trusted']),
  trustedSourceRefs: z.array(z.string()).optional(),
  requireAdminApprovalForNewServer: z.boolean().optional(),
  requireApprovalForNewCapability: z.boolean().optional(),
  requireApprovalForSchemaChange: z.boolean().optional(),
  allowServerDeclaredSideEffectHints: z.boolean().optional(),
  pinServerIdentity: z.boolean().optional(),
  pinProtocolVersion: z.boolean().optional(),
  pinCapabilityHashes: z.boolean().optional(),
}) satisfies ZodType<MCPTrustPolicySpec>;

export const mcpCapabilityDriftPolicySpecSchema = z.object({
  onDescriptionChange: z.enum(['accept', 'snapshot_next_run', 'quarantine']),
  onSchemaChange: z.enum(['snapshot_next_run', 'quarantine', 'require_approval']),
  onRemoval: z.enum(['mark_unavailable', 'allow_existing_run', 'fail_existing_run']),
  onServerIdentityChange: z.enum(['disconnect', 'quarantine']),
  notifyRuntime: z.boolean().optional(),
  invalidateSchemaCache: z.boolean().optional(),
}) satisfies ZodType<MCPCapabilityDriftPolicySpec>;

export const governedMCPIntegrationSpecSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  revision: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  servers: z.array(mcpServerProfileSchema).min(1),
  allowCapabilities: z
    .array(
      z.object({
        serverId: z.string().optional(),
        capabilityId: z.string().optional(),
        kind: z.enum(['tool', 'resource', 'prompt']).optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .optional(),
  denyCapabilities: z
    .array(
      z.object({
        serverId: z.string().optional(),
        capabilityId: z.string().optional(),
        kind: z.enum(['tool', 'resource', 'prompt']).optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .optional(),
  trustPolicy: mcpTrustPolicySpecSchema,
  importPolicy: z.object({
    kinds: z.array(z.enum(['tool', 'resource', 'prompt'])),
    lazyLoad: z.boolean().optional(),
    maxLoadedCapabilities: z.number().int().positive().optional(),
    schemaTokenBudget: z.number().int().positive().optional(),
  }),
  driftPolicy: mcpCapabilityDriftPolicySpecSchema,
  snapshotPolicy: z.object({
    mode: z.enum(['run', 'state']),
    preserveRemovedForExistingRuns: z.boolean().optional(),
    requireApprovedRevision: z.boolean().optional(),
  }),
  toolPolicyRefs: z
    .array(
      z.object({ id: z.string(), version: z.string().optional(), revision: z.string().optional() })
    )
    .optional(),
  resourcePolicyRefs: z
    .array(
      z.object({ id: z.string(), version: z.string().optional(), revision: z.string().optional() })
    )
    .optional(),
  promptPolicyRefs: z
    .array(
      z.object({ id: z.string(), version: z.string().optional(), revision: z.string().optional() })
    )
    .optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<GovernedMCPIntegrationSpec>;

export const governedMCPIntegrationExample: GovernedMCPIntegrationSpec = {
  id: 'mcp.default',
  version: '1.0.0',
  servers: [
    {
      id: 'filesystem',
      mode: 'local',
      transport: {
        type: 'stdio',
        command: 'mcp-server-filesystem',
        args: ['./data/mcp'],
        envAllowList: ['PATH'],
        stderrMode: 'capture',
      },
      lazyConnect: true,
      singleStart: true,
      initializationTimeoutMs: 10_000,
      requestTimeoutMs: 30_000,
      shutdownTimeoutMs: 5_000,
      reconnectPolicy: { maxAttempts: 3, backoffMs: 250 },
    },
  ],
  trustPolicy: {
    defaultTrustLevel: 'untrusted',
    requireApprovalForNewCapability: true,
    requireApprovalForSchemaChange: true,
    allowServerDeclaredSideEffectHints: false,
    pinServerIdentity: true,
    pinProtocolVersion: true,
    pinCapabilityHashes: true,
  },
  importPolicy: { kinds: ['tool'], lazyLoad: true, maxLoadedCapabilities: 20 },
  driftPolicy: {
    onDescriptionChange: 'snapshot_next_run',
    onSchemaChange: 'require_approval',
    onRemoval: 'allow_existing_run',
    onServerIdentityChange: 'disconnect',
    notifyRuntime: true,
    invalidateSchemaCache: true,
  },
  snapshotPolicy: {
    mode: 'run',
    preserveRemovedForExistingRuns: true,
    requireApprovedRevision: true,
  },
};

export const governedMCPIntegrationJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'servers',
    'trustPolicy',
    'importPolicy',
    'driftPolicy',
    'snapshotPolicy',
  ],
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    revision: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    servers: { type: 'array', items: { type: 'object' } },
    allowCapabilities: { type: 'array', items: { type: 'object' } },
    denyCapabilities: { type: 'array', items: { type: 'object' } },
    trustPolicy: { type: 'object' },
    importPolicy: { type: 'object' },
    driftPolicy: { type: 'object' },
    snapshotPolicy: { type: 'object' },
    toolPolicyRefs: { type: 'array', items: { type: 'object' } },
    resourcePolicyRefs: { type: 'array', items: { type: 'object' } },
    promptPolicyRefs: { type: 'array', items: { type: 'object' } },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const normalizedMCPErrorExample: NormalizedMCPError = {
  code: 'MCP_REQUEST_TIMEOUT',
  message: 'MCP request exceeded its deadline.',
  retryable: true,
  serverId: 'filesystem',
  capabilityId: 'read_file',
};

export const normalizedMCPErrorJsonSchema: JsonSchema = {
  type: 'object',
  required: ['code', 'message', 'retryable'],
  properties: {
    code: {
      enum: [...NORMALIZED_MCP_ERROR_CODES],
    },
    message: { type: 'string', minLength: 1 },
    retryable: { type: 'boolean' },
    serverId: { type: 'string' },
    capabilityId: { type: 'string' },
    remoteCode: { oneOf: [{ type: 'string' }, { type: 'number' }] },
    details: { type: 'object' },
  },
  additionalProperties: false,
};

export const governedMCPIntegrationDefinition = defineSpecSchema<GovernedMCPIntegrationSpec>({
  id: 'GovernedMCPIntegrationSpec',
  zod: governedMCPIntegrationSpecSchema,
  jsonSchema: governedMCPIntegrationJsonSchema,
  example: governedMCPIntegrationExample,
});

export const normalizedMCPErrorDefinition = defineSpecSchema<NormalizedMCPError>({
  id: 'NormalizedMCPError',
  zod: normalizedMCPErrorSchema,
  jsonSchema: normalizedMCPErrorJsonSchema,
  example: normalizedMCPErrorExample,
});

export const governedMCPIntegrationJsonSchemas = exportSpecJsonSchemas([
  governedMCPIntegrationDefinition,
  normalizedMCPErrorDefinition,
]);
