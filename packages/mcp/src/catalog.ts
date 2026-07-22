import { randomUUID } from 'crypto';
import { z, type ZodType } from 'zod';
import {
  FrameworkError,
  defineSpecSchema,
  type JsonSchema,
  type TelemetryRecorder,
} from '@hypha/core';
import {
  MCPToolAdapter,
  ToolRegistry,
  createToolSchemaSpec,
  hashToolContract,
  type ToolCallContext,
  type ToolContractSnapshot,
  type ToolContractSnapshotStore,
  type ToolSpec,
} from '@hypha/tools';
import type { MCPCapabilityDescriptor, MCPGateway, MCPIntegrationSpec } from './index';
import { attestCapability, capabilityKey, governedSideEffectLevel } from './governance';
import type {
  MCPCapabilityDriftPolicySpec,
  MCPCapabilityTrustRecord,
  MCPTrustPolicySpec,
} from './contracts';
import type { MCPConnectionManager } from './connection-manager';

export type MCPCapabilityKind = 'tool' | 'resource' | 'prompt';
export type MCPCapabilityDriftType =
  | 'description_changed'
  | 'input_schema_changed'
  | 'output_schema_changed'
  | 'annotations_changed'
  | 'capability_added'
  | 'capability_removed'
  | 'server_identity_changed'
  | 'protocol_version_changed';

export interface MCPCapabilityRef {
  serverId: string;
  capabilityId: string;
  kind?: MCPCapabilityKind;
  capabilityHash?: string;
}

export interface MCPCapabilityRecord {
  id: string;
  serverId: string;
  kind: MCPCapabilityKind;
  remoteName: string;
  stableToolId?: string;
  protocolVersion?: string;
  capabilityVersion?: string;
  capabilityHash: string;
  schemaHash?: string;
  descriptorHash: string;
  descriptor: Record<string, unknown>;
  normalizedToolSpec?: ToolSpec;
  trust: MCPCapabilityTrustRecord;
  driftState: 'stable' | 'new' | 'changed' | 'removed' | 'quarantined' | 'approved';
  driftTypes?: MCPCapabilityDriftType[];
  firstSeenAt: string;
  lastSeenAt: string;
  approvedAt?: string;
  approvalExpiresAt?: string;
  removedAt?: string;
  metadata?: Record<string, unknown>;
}

export const mcpCapabilityRecordSchema = z.object({
  id: z.string().min(1),
  serverId: z.string().min(1),
  kind: z.enum(['tool', 'resource', 'prompt']),
  remoteName: z.string().min(1),
  stableToolId: z.string().optional(),
  protocolVersion: z.string().optional(),
  capabilityVersion: z.string().optional(),
  capabilityHash: z.string().min(1),
  schemaHash: z.string().optional(),
  descriptorHash: z.string().min(1),
  descriptor: z.record(z.unknown()),
  normalizedToolSpec: z.unknown().optional(),
  trust: z.object({
    level: z.enum(['untrusted', 'restricted', 'trusted']),
    source: z.enum(['admin', 'domain_pack', 'runtime_discovery', 'signed_manifest', 'import']),
    sourceRef: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedAt: z.string().optional(),
    restrictions: z.array(z.string()).optional(),
    metadata: z.record(z.unknown()).optional(),
  }),
  driftState: z.enum(['stable', 'new', 'changed', 'removed', 'quarantined', 'approved']),
  driftTypes: z
    .array(
      z.enum([
        'description_changed',
        'input_schema_changed',
        'output_schema_changed',
        'annotations_changed',
        'capability_added',
        'capability_removed',
        'server_identity_changed',
        'protocol_version_changed',
      ])
    )
    .optional(),
  firstSeenAt: z.string().min(1),
  lastSeenAt: z.string().min(1),
  approvedAt: z.string().optional(),
  approvalExpiresAt: z.string().optional(),
  removedAt: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
}) as ZodType<MCPCapabilityRecord>;

export const mcpCapabilityRecordExample: MCPCapabilityRecord = {
  id: 'mcp-capability:filesystem:tool:read_file:sha256-example',
  serverId: 'filesystem',
  kind: 'tool',
  remoteName: 'read_file',
  stableToolId: 'mcp.filesystem.read_file',
  protocolVersion: '2025-11-25',
  capabilityVersion: '1.0.0',
  capabilityHash: 'sha256:capability-example',
  schemaHash: 'sha256:schema-example',
  descriptorHash: 'sha256:descriptor-example',
  descriptor: {
    name: 'read_file',
    inputSchema: { type: 'object', required: ['path'] },
  },
  trust: { level: 'restricted', source: 'runtime_discovery' },
  driftState: 'stable',
  firstSeenAt: '2026-07-16T00:00:00.000Z',
  lastSeenAt: '2026-07-16T00:00:00.000Z',
};

export const mcpCapabilityRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'serverId',
    'kind',
    'remoteName',
    'capabilityHash',
    'descriptorHash',
    'descriptor',
    'trust',
    'driftState',
    'firstSeenAt',
    'lastSeenAt',
  ],
  properties: {
    id: { type: 'string' },
    serverId: { type: 'string' },
    kind: { enum: ['tool', 'resource', 'prompt'] },
    remoteName: { type: 'string' },
    stableToolId: { type: 'string' },
    protocolVersion: { type: 'string' },
    capabilityVersion: { type: 'string' },
    capabilityHash: { type: 'string' },
    schemaHash: { type: 'string' },
    descriptorHash: { type: 'string' },
    descriptor: { type: 'object' },
    normalizedToolSpec: { type: 'object' },
    trust: { type: 'object' },
    driftState: { enum: ['stable', 'new', 'changed', 'removed', 'quarantined', 'approved'] },
    driftTypes: { type: 'array', items: { type: 'string' } },
    firstSeenAt: { type: 'string' },
    lastSeenAt: { type: 'string' },
    approvedAt: { type: 'string' },
    approvalExpiresAt: { type: 'string' },
    removedAt: { type: 'string' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const mcpCapabilityRecordDefinition = defineSpecSchema<MCPCapabilityRecord>({
  id: 'MCPCapabilityRecord',
  zod: mcpCapabilityRecordSchema,
  jsonSchema: mcpCapabilityRecordJsonSchema,
  example: mcpCapabilityRecordExample,
});

export interface MCPCatalogSnapshot {
  id: string;
  serverId: string;
  revision: string;
  createdAt: string;
  reason?: string;
  capabilities: MCPCapabilityRecord[];
  drift: Array<{
    capabilityId: string;
    previousHash?: string;
    currentHash?: string;
    types: MCPCapabilityDriftType[];
  }>;
}

export interface MCPCapabilityListRequest {
  serverId?: string;
  kind?: MCPCapabilityKind;
  states?: MCPCapabilityRecord['driftState'][];
  permissionScopes?: string[];
  tags?: string[];
  query?: string;
  loadDescriptors?: boolean;
  schemaTokenBudget?: number;
  limit?: number;
}

export interface MCPCapabilityQuarantineRequest extends MCPCapabilityRef {
  reason: string;
}

export interface MCPCapabilityApprovalRequest extends MCPCapabilityRef {
  approvedBy: string;
  expiresAt?: string;
  restrictions?: string[];
}

export interface MCPCapabilityCatalogStore {
  list(serverId?: string): Promise<MCPCapabilityRecord[]>;
  save(record: MCPCapabilityRecord): Promise<void>;
}

export class InMemoryMCPCapabilityCatalogStore implements MCPCapabilityCatalogStore {
  private readonly records = new Map<string, MCPCapabilityRecord>();

  async list(serverId?: string): Promise<MCPCapabilityRecord[]> {
    return clone(
      Array.from(this.records.values()).filter(
        (record) => !serverId || record.serverId === serverId
      )
    );
  }

  async save(record: MCPCapabilityRecord): Promise<void> {
    this.records.set(record.id, clone(record));
  }
}

export interface RedisLikeMCPStoreClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<unknown>;
  sadd(key: string, ...members: string[]): Promise<number>;
  smembers(key: string): Promise<string[]>;
}

/** Multi-worker catalog store. Redis key operations are idempotent per capability id. */
export class RedisMCPCapabilityCatalogStore implements MCPCapabilityCatalogStore {
  private readonly namespace: string;

  constructor(
    private readonly client: RedisLikeMCPStoreClient,
    namespace = 'hypha:mcp:catalog:v1'
  ) {
    this.namespace = namespace.replace(/:+$/, '');
  }

  async list(serverId?: string): Promise<MCPCapabilityRecord[]> {
    const ids = await this.client.smembers(this.indexKey(serverId));
    const records = await Promise.all(ids.map((id) => this.client.get(this.recordKey(id))));
    return records
      .filter((raw): raw is string => raw !== null)
      .map((raw) => JSON.parse(raw) as MCPCapabilityRecord)
      .filter((record) => !serverId || record.serverId === serverId);
  }

  async save(record: MCPCapabilityRecord): Promise<void> {
    await this.client.set(this.recordKey(record.id), JSON.stringify(record));
    await Promise.all([
      this.client.sadd(this.indexKey(), record.id),
      this.client.sadd(this.indexKey(record.serverId), record.id),
    ]);
  }

  private indexKey(serverId?: string): string {
    return `${this.namespace}:index:${serverId ?? 'all'}`;
  }

  private recordKey(id: string): string {
    return `${this.namespace}:record:${id}`;
  }
}

export interface MCPSchemaCacheEntry {
  key: string;
  serverId: string;
  capabilityId: string;
  capabilityHash: string;
  protocolVersion?: string;
  schema?: JsonSchema;
  cachedAt: string;
}

export interface MCPSchemaCacheOptions {
  maxEntries?: number;
  now?: () => string;
}

export class MCPSchemaCache {
  private readonly entries = new Map<string, MCPSchemaCacheEntry>();
  private readonly maxEntries: number;
  private readonly now: () => string;

  constructor(options: MCPSchemaCacheOptions = {}) {
    this.maxEntries = Math.max(1, options.maxEntries ?? 10_000);
    this.now = options.now ?? (() => new Date().toISOString());
  }

  get(ref: MCPCapabilityRef & { protocolVersion?: string }): MCPSchemaCacheEntry | null {
    if (!ref.capabilityHash) return null;
    const key = schemaCacheKey({ ...ref, capabilityHash: ref.capabilityHash });
    const entry = this.entries.get(key);
    if (!entry) return null;
    this.entries.delete(key);
    this.entries.set(key, entry);
    return clone(entry);
  }

  set(record: MCPCapabilityRecord): MCPSchemaCacheEntry {
    const entry: MCPSchemaCacheEntry = {
      key: schemaCacheKey(record),
      serverId: record.serverId,
      capabilityId: record.remoteName,
      capabilityHash: record.capabilityHash,
      protocolVersion: record.protocolVersion,
      schema: record.normalizedToolSpec?.inputSchema,
      cachedAt: this.now(),
    };
    this.entries.delete(entry.key);
    this.entries.set(entry.key, entry);
    while (this.entries.size > this.maxEntries) {
      const oldestKey = this.entries.keys().next().value as string | undefined;
      if (!oldestKey) break;
      this.entries.delete(oldestKey);
    }
    return clone(entry);
  }

  invalidate(serverId: string, capabilityId?: string): number {
    let removed = 0;
    for (const [key, entry] of this.entries) {
      if (entry.serverId === serverId && (!capabilityId || entry.capabilityId === capabilityId)) {
        this.entries.delete(key);
        removed += 1;
      }
    }
    return removed;
  }

  size(): number {
    return this.entries.size;
  }
}

export interface MCPCapabilityCatalogOptions {
  integration: MCPIntegrationSpec;
  gateway: MCPGateway;
  trustPolicy: MCPTrustPolicySpec;
  driftPolicy: MCPCapabilityDriftPolicySpec;
  store?: MCPCapabilityCatalogStore;
  schemaCache?: MCPSchemaCache;
  snapshotStore?: ToolContractSnapshotStore;
  now?: () => string;
  onEvent?: (type: string, payload: Record<string, unknown>) => Promise<void> | void;
  telemetry?: TelemetryRecorder;
}

export class MCPCapabilityCatalog {
  private readonly store: MCPCapabilityCatalogStore;
  private readonly schemaCache: MCPSchemaCache;
  readonly snapshotStore: ToolContractSnapshotStore;
  private readonly now: () => string;
  private catalogRevision = 0;

  constructor(private readonly options: MCPCapabilityCatalogOptions) {
    this.store = options.store ?? new InMemoryMCPCapabilityCatalogStore();
    this.schemaCache = options.schemaCache ?? new MCPSchemaCache();
    this.snapshotStore = options.snapshotStore ?? new InMemoryToolContractSnapshotStore();
    this.now = options.now ?? (() => new Date().toISOString());
  }

  bindConnectionManager(manager: MCPConnectionManager): () => void {
    return manager.onListChanged((serverId) =>
      this.refresh(serverId, 'listChanged').then(() => undefined)
    );
  }

  async refresh(serverId: string, reason = 'requested'): Promise<MCPCatalogSnapshot> {
    const previous = await this.store.list(serverId);
    const previousActive = activeRevisions(previous);
    const integration: MCPIntegrationSpec = {
      ...this.options.integration,
      servers: this.options.integration.servers.filter((server) => server.id === serverId),
    };
    if (integration.servers.length === 0)
      throw new Error(`MCP server is not configured: ${serverId}`);
    const discovered = (await this.options.gateway.discover(integration)).map(attestCapability);
    const seenKeys = new Set<string>();
    const drift: MCPCatalogSnapshot['drift'] = [];
    const current: MCPCapabilityRecord[] = [];

    for (const descriptor of discovered) {
      const key = capabilityKey(descriptor);
      seenKeys.add(key);
      const prior = previousActive.get(key);
      const driftTypes = compareDescriptors(prior?.descriptor, descriptor);
      if (!prior) driftTypes.push('capability_added');
      const record = this.createRecord(descriptor, prior, driftTypes);
      await this.store.save(record);
      current.push(record);
      if (driftTypes.length > 0) {
        drift.push({
          capabilityId: descriptor.capabilityId,
          previousHash: prior?.capabilityHash,
          currentHash: record.capabilityHash,
          types: driftTypes,
        });
        if (this.options.driftPolicy.invalidateSchemaCache && prior) {
          this.schemaCache.invalidate(serverId, descriptor.capabilityId);
        }
        await this.emit('mcp.capability.drift.detected', drift[drift.length - 1]);
        await this.metric('mcp_capability_drift_total', 1, {
          server_id: serverId,
          drift_type: driftTypes.join(','),
        });
      }
      if (record.driftState === 'quarantined') {
        await this.emit('mcp.capability.quarantined', {
          serverId,
          capabilityId: descriptor.capabilityId,
          capabilityHash: record.capabilityHash,
          driftTypes,
        });
        await this.metric('mcp_capability_quarantined_total', 1, {
          server_id: serverId,
        });
      }
    }

    for (const [key, prior] of previousActive) {
      if (seenKeys.has(key)) continue;
      const removed: MCPCapabilityRecord = {
        ...prior,
        id: recordId(prior.serverId, prior.kind, prior.remoteName, prior.capabilityHash, 'removed'),
        driftState: 'removed',
        driftTypes: ['capability_removed'],
        lastSeenAt: this.now(),
        removedAt: this.now(),
      };
      await this.store.save(removed);
      current.push(removed);
      drift.push({
        capabilityId: prior.remoteName,
        previousHash: prior.capabilityHash,
        types: ['capability_removed'],
      });
      await this.emit('mcp.capability.removed', {
        serverId,
        capabilityId: prior.remoteName,
        capabilityHash: prior.capabilityHash,
      });
    }

    this.catalogRevision += 1;
    const snapshot: MCPCatalogSnapshot = {
      id: `mcp-catalog:${serverId}:${this.catalogRevision}`,
      serverId,
      revision: String(this.catalogRevision),
      createdAt: this.now(),
      reason,
      capabilities: clone(current),
      drift,
    };
    await this.emit('mcp.catalog.refreshed', {
      serverId,
      catalogRevision: snapshot.revision,
      capabilityCount: current.length,
      reason,
    });
    return snapshot;
  }

  async getCapability(ref: MCPCapabilityRef): Promise<MCPCapabilityRecord | null> {
    const matches = (await this.store.list(ref.serverId)).filter(
      (record) =>
        record.remoteName === ref.capabilityId &&
        (!ref.kind || record.kind === ref.kind) &&
        (!ref.capabilityHash || record.capabilityHash === ref.capabilityHash)
    );
    return clone(selectRevision(matches, ref.capabilityHash) ?? null);
  }

  async list(request: MCPCapabilityListRequest = {}): Promise<MCPCapabilityRecord[]> {
    const query = request.query?.toLowerCase();
    const tags = new Set(request.tags ?? []);
    const scopes = new Set(request.permissionScopes ?? []);
    let remainingBudget = request.schemaTokenBudget ?? Number.POSITIVE_INFINITY;
    const result: MCPCapabilityRecord[] = [];
    for (const record of activeRevisions(await this.store.list(request.serverId)).values()) {
      const descriptor = record.descriptor as Record<string, unknown>;
      const recordTags = new Set<string>(
        Array.isArray(descriptor.tags) ? descriptor.tags.map(String) : []
      );
      const requiredScopes = record.normalizedToolSpec?.permissionScope ?? [];
      if (request.kind && record.kind !== request.kind) continue;
      if (request.states && !request.states.includes(record.driftState)) continue;
      if (
        query &&
        !`${record.remoteName} ${String(descriptor.description ?? '')}`
          .toLowerCase()
          .includes(query)
      )
        continue;
      if (tags.size > 0 && !Array.from(tags).every((tag) => recordTags.has(tag))) continue;
      if (scopes.size > 0 && !requiredScopes.every((scope) => scopes.has('*') || scopes.has(scope)))
        continue;
      const copy = clone(record);
      if (!request.loadDescriptors) copy.descriptor = {};
      if (request.loadDescriptors) {
        const cost = Math.ceil(JSON.stringify(copy.descriptor).length / 4);
        if (cost > remainingBudget) continue;
        remainingBudget -= cost;
        this.schemaCache.set(record);
      }
      result.push(copy);
      if (result.length >= (request.limit ?? Number.POSITIVE_INFINITY)) break;
    }
    return result;
  }

  async quarantine(request: MCPCapabilityQuarantineRequest): Promise<void> {
    const record = await this.requireCapability(request);
    await this.store.save({
      ...record,
      driftState: 'quarantined',
      trust: {
        ...record.trust,
        restrictions: [...(record.trust.restrictions ?? []), request.reason],
      },
    });
  }

  async approveRevision(request: MCPCapabilityApprovalRequest): Promise<void> {
    const record = await this.requireCapability(request);
    const approvedAt = this.now();
    if (request.expiresAt && Date.parse(request.expiresAt) <= Date.parse(approvedAt)) {
      throw catalogError(
        'MCP_APPROVAL_EXPIRED',
        'MCP capability approval expiry must be later than the approval time.',
        { serverId: record.serverId, capabilityId: record.remoteName }
      );
    }
    await this.store.save({
      ...record,
      driftState: 'approved',
      approvedAt,
      approvalExpiresAt: request.expiresAt,
      trust: {
        ...record.trust,
        level: record.trust.level === 'untrusted' ? 'restricted' : record.trust.level,
        approvedBy: request.approvedBy,
        approvedAt,
        restrictions: request.restrictions ?? record.trust.restrictions,
      },
    });
    await this.emit('mcp.capability.approved', {
      serverId: record.serverId,
      capabilityId: record.remoteName,
      capabilityHash: record.capabilityHash,
      approvedBy: request.approvedBy,
      expiresAt: request.expiresAt,
    });
  }

  async importTools(
    registry: ToolRegistry,
    refs: MCPCapabilityRef[],
    context?: Partial<ToolCallContext>
  ): Promise<ToolSpec[]> {
    const imported: ToolSpec[] = [];
    for (const ref of refs) {
      const record = await this.requirePinnedApprovedCapability(ref, 'tool');
      const spec = record.normalizedToolSpec!;
      registry.registerAdapter(
        spec,
        new MCPToolAdapter(`mcp:${record.serverId}`, record.serverId, record.remoteName, {
          invoke: async (request) => {
            await this.assertInvocationAuthorized(record, request.context);
            return this.options.gateway.call({
              ...request,
              context: { ...context, ...request.context },
            });
          },
          health: async () => ({ status: 'unknown', checkedAt: this.now() }),
        }),
        { replace: true }
      );
      imported.push(spec);
      await this.emit('mcp.capability.imported', {
        serverId: record.serverId,
        capabilityId: record.remoteName,
        capabilityHash: record.capabilityHash,
        stableToolId: spec.id,
      });
    }
    return imported;
  }

  async snapshot(runId: string, refs: MCPCapabilityRef[]): Promise<ToolContractSnapshot> {
    const records = await Promise.all(
      refs.map((ref) => this.requirePinnedApprovedCapability(ref, 'tool'))
    );
    const toolContracts = records.map((record) => {
      if (!record.normalizedToolSpec) throw new Error(`Capability is not a Tool: ${record.id}`);
      const spec = record.normalizedToolSpec;
      return {
        toolId: spec.id,
        toolVersion: spec.version,
        toolRevision: spec.revision ?? hashToolContract(spec),
        inputSchemaHash: spec.input?.schemaHash ?? hashToolContract(spec.inputSchema),
        outputSchemaHash: spec.output?.schemaHash,
        sourceCapabilityHash: record.capabilityHash,
        sideEffectLevel: spec.sideEffectLevel,
        adapterRef: `mcp:${record.serverId}`,
      };
    });
    const createdAt = this.now();
    const body = { runId, createdAt, toolContracts, catalogRevision: String(this.catalogRevision) };
    const snapshot: ToolContractSnapshot = {
      id: `tool-snapshot:${runId}:${randomUUID()}`,
      ...body,
      snapshotHash: hashToolContract(body),
    };
    await this.snapshotStore.save(snapshot);
    await this.emit('tool.contract.snapshot.created', {
      snapshotId: snapshot.id,
      runId,
      snapshotHash: snapshot.snapshotHash,
      catalogRevision: snapshot.catalogRevision,
      toolCount: snapshot.toolContracts.length,
    });
    return snapshot;
  }

  private createRecord(
    descriptor: MCPCapabilityDescriptor,
    prior: MCPCapabilityRecord | undefined,
    driftTypes: MCPCapabilityDriftType[]
  ): MCPCapabilityRecord {
    const now = this.now();
    const capabilityHash = descriptor.capabilityHash!;
    const normalizedToolSpec = descriptor.type === 'tool' ? catalogToolSpec(descriptor) : undefined;
    const quarantined = shouldQuarantine(
      driftTypes,
      this.options.trustPolicy,
      this.options.driftPolicy
    );
    const trust: MCPCapabilityTrustRecord = prior?.trust ?? {
      level: this.options.trustPolicy.defaultTrustLevel,
      source: 'runtime_discovery',
    };
    return {
      id: recordId(descriptor.serverId, descriptor.type, descriptor.capabilityId, capabilityHash),
      serverId: descriptor.serverId,
      kind: descriptor.type,
      remoteName: descriptor.capabilityId,
      stableToolId: normalizedToolSpec?.id,
      protocolVersion: descriptor.protocolVersion,
      capabilityVersion: descriptor.version,
      capabilityHash,
      schemaHash: normalizedToolSpec?.input?.schemaHash,
      descriptorHash: hashToolContract(descriptor),
      descriptor: clone(descriptor) as unknown as Record<string, unknown>,
      normalizedToolSpec,
      trust,
      driftState:
        !quarantined &&
        driftTypes.length === 0 &&
        prior?.driftState === 'approved' &&
        prior.capabilityHash === capabilityHash
          ? 'approved'
          : quarantined
            ? 'quarantined'
            : driftTypes.length === 0
              ? 'stable'
              : prior
                ? 'changed'
                : 'new',
      driftTypes,
      firstSeenAt: prior?.firstSeenAt ?? now,
      lastSeenAt: now,
      approvedAt:
        driftTypes.length === 0 && prior?.capabilityHash === capabilityHash
          ? prior.approvedAt
          : undefined,
      approvalExpiresAt:
        driftTypes.length === 0 && prior?.capabilityHash === capabilityHash
          ? prior.approvalExpiresAt
          : undefined,
    };
  }

  private async requirePinnedApprovedCapability(
    ref: MCPCapabilityRef,
    kind?: MCPCapabilityKind
  ): Promise<MCPCapabilityRecord> {
    if (!ref.capabilityHash) {
      throw catalogError(
        'MCP_CAPABILITY_HASH_REQUIRED',
        'MCP capability operations require an explicitly pinned capability hash.',
        { serverId: ref.serverId, capabilityId: ref.capabilityId }
      );
    }
    const record = await this.requireCapability(ref);
    this.assertApproved(record, kind);
    return record;
  }

  private assertApproved(record: MCPCapabilityRecord, kind?: MCPCapabilityKind): void {
    const expired =
      record.approvalExpiresAt !== undefined &&
      Date.parse(record.approvalExpiresAt) <= Date.parse(this.now());
    if (
      (kind && record.kind !== kind) ||
      record.driftState !== 'approved' ||
      !record.approvedAt ||
      !record.trust.approvedBy ||
      !record.trust.approvedAt ||
      record.trust.level === 'untrusted' ||
      expired
    ) {
      throw catalogError(
        expired ? 'MCP_APPROVAL_EXPIRED' : 'MCP_CAPABILITY_NOT_APPROVED',
        `MCP capability is not an active approved revision: ${record.serverId}/${record.remoteName}`,
        {
          serverId: record.serverId,
          capabilityId: record.remoteName,
          capabilityHash: record.capabilityHash,
          driftState: record.driftState,
          approvalExpiresAt: record.approvalExpiresAt,
        }
      );
    }
  }

  private async assertInvocationAuthorized(
    record: MCPCapabilityRecord,
    context: ToolCallContext
  ): Promise<void> {
    const signal = context.abortSignal ?? context.signal;
    if (signal?.aborted) {
      throw catalogError('MCP_REQUEST_CANCELLED', 'MCP invocation was cancelled before dispatch.');
    }
    if (context.deadlineAt && Date.parse(context.deadlineAt) <= Date.parse(this.now())) {
      throw catalogError('MCP_REQUEST_TIMEOUT', 'MCP invocation deadline expired before dispatch.');
    }
    const approved = await this.requirePinnedApprovedCapability(
      {
        serverId: record.serverId,
        capabilityId: record.remoteName,
        kind: record.kind,
        capabilityHash: record.capabilityHash,
      },
      'tool'
    );
    const snapshotRef = context.contractSnapshotRef;
    const snapshot = snapshotRef ? await this.snapshotStore.get(snapshotRef) : null;
    const contract = snapshot?.toolContracts.find(
      (candidate) =>
        candidate.toolId === approved.normalizedToolSpec?.id &&
        candidate.sourceCapabilityHash === approved.capabilityHash &&
        candidate.toolRevision === approved.normalizedToolSpec?.revision
    );
    if (!snapshot || snapshot.runId !== context.runId || !contract) {
      throw catalogError(
        'MCP_CAPABILITY_SNAPSHOT_MISMATCH',
        'MCP invocation is not pinned by the active Run Tool contract snapshot.',
        {
          serverId: record.serverId,
          capabilityId: record.remoteName,
          capabilityHash: record.capabilityHash,
          snapshotRef,
          runId: context.runId,
        }
      );
    }
    const active = await this.getCapability({
      serverId: record.serverId,
      capabilityId: record.remoteName,
      kind: record.kind,
    });
    if (
      active &&
      !same(
        (active.descriptor as { serverIdentity?: unknown }).serverIdentity,
        (approved.descriptor as { serverIdentity?: unknown }).serverIdentity
      )
    ) {
      throw catalogError(
        'MCP_SERVER_IDENTITY_DRIFT',
        'MCP server identity changed after the capability revision was approved.',
        { serverId: record.serverId, capabilityId: record.remoteName }
      );
    }
  }

  private async requireCapability(ref: MCPCapabilityRef): Promise<MCPCapabilityRecord> {
    const record = await this.getCapability(ref);
    if (!record) throw new Error(`MCP capability not found: ${ref.serverId}/${ref.capabilityId}`);
    return record;
  }

  private async emit(type: string, payload: Record<string, unknown>): Promise<void> {
    await this.options.onEvent?.(type, payload);
  }

  private async metric(
    name: string,
    value: number,
    attributes?: Record<string, string | number | boolean>
  ): Promise<void> {
    await this.options.telemetry?.recordMetric({
      name,
      kind: 'counter',
      value,
      recordedAt: this.now(),
      attributes,
    });
  }
}

export class InMemoryToolContractSnapshotStore implements ToolContractSnapshotStore {
  private readonly snapshots = new Map<string, ToolContractSnapshot>();

  async get(snapshotId: string): Promise<ToolContractSnapshot | null> {
    return clone(this.snapshots.get(snapshotId) ?? null);
  }

  async save(snapshot: ToolContractSnapshot): Promise<void> {
    this.snapshots.set(snapshot.id, clone(snapshot));
  }
}

export class RedisToolContractSnapshotStore implements ToolContractSnapshotStore {
  private readonly namespace: string;

  constructor(
    private readonly client: Pick<RedisLikeMCPStoreClient, 'get' | 'set'>,
    namespace = 'hypha:tool:snapshot:v1'
  ) {
    this.namespace = namespace.replace(/:+$/, '');
  }

  async get(snapshotId: string): Promise<ToolContractSnapshot | null> {
    const raw = await this.client.get(this.key(snapshotId));
    return raw === null ? null : (JSON.parse(raw) as ToolContractSnapshot);
  }

  async save(snapshot: ToolContractSnapshot): Promise<void> {
    await this.client.set(this.key(snapshot.id), JSON.stringify(snapshot));
  }

  private key(snapshotId: string): string {
    return `${this.namespace}:${snapshotId}`;
  }
}

function catalogToolSpec(capability: MCPCapabilityDescriptor): ToolSpec {
  const inputSchema = capability.inputSchema ?? { type: 'object' };
  const outputSchema = capability.outputSchema;
  const sideEffectLevel = governedSideEffectLevel(capability);
  const spec: ToolSpec = {
    id: `mcp.${capability.serverId}.${capability.capabilityId}`,
    version: capability.version,
    revision: capability.capabilityHash,
    name: capability.name ?? capability.capabilityId,
    description: capability.description ?? `MCP capability ${capability.capabilityId}`,
    inputSchema,
    outputSchema,
    input: createToolSchemaSpec(inputSchema),
    output: outputSchema ? createToolSchemaSpec(outputSchema) : undefined,
    sideEffectLevel,
    permissionScope: capability.permissionScope,
    source: 'mcp',
    sourceRef: {
      adapterId: 'mcp.gateway',
      mcpServerId: capability.serverId,
      mcpCapabilityId: capability.capabilityId,
      mcpCapabilityHash: capability.capabilityHash,
      trustLevel: capability.trustLevel,
      declarationSource: capability.declarationSource,
    },
    enabled: true,
    metadata: {
      remoteName: capability.name ?? capability.capabilityId,
      protocolVersion: capability.protocolVersion,
      serverIdentity: capability.serverIdentity,
    },
  };
  return spec;
}

function shouldQuarantine(
  driftTypes: MCPCapabilityDriftType[],
  trust: MCPTrustPolicySpec,
  policy: MCPCapabilityDriftPolicySpec
): boolean {
  if (driftTypes.includes('capability_added') && trust.requireApprovalForNewCapability) return true;
  if (
    (driftTypes.includes('input_schema_changed') || driftTypes.includes('output_schema_changed')) &&
    (trust.requireApprovalForSchemaChange || policy.onSchemaChange !== 'snapshot_next_run')
  )
    return true;
  if (driftTypes.includes('server_identity_changed')) return true;
  if (driftTypes.includes('description_changed') && policy.onDescriptionChange === 'quarantine')
    return true;
  return false;
}

function compareDescriptors(
  previous: Record<string, unknown> | undefined,
  current: MCPCapabilityDescriptor
): MCPCapabilityDriftType[] {
  if (!previous) return [];
  const result: MCPCapabilityDriftType[] = [];
  if (!same(previous.description, current.description)) result.push('description_changed');
  if (!same(previous.inputSchema, current.inputSchema)) result.push('input_schema_changed');
  if (!same(previous.outputSchema, current.outputSchema)) result.push('output_schema_changed');
  if (!same(previous.annotations, current.annotations)) result.push('annotations_changed');
  if (!same(previous.serverIdentity, current.serverIdentity))
    result.push('server_identity_changed');
  if (!same(previous.protocolVersion, current.protocolVersion))
    result.push('protocol_version_changed');
  return result;
}

function activeRevisions(records: MCPCapabilityRecord[]): Map<string, MCPCapabilityRecord> {
  const active = new Map<string, MCPCapabilityRecord>();
  for (const record of records) {
    const key = `${record.serverId}/${record.remoteName}`;
    const current = active.get(key);
    if (!current || current.lastSeenAt <= record.lastSeenAt) active.set(key, record);
  }
  return active;
}

function selectRevision(
  records: MCPCapabilityRecord[],
  capabilityHash?: string
): MCPCapabilityRecord | undefined {
  if (capabilityHash) return records.find((record) => record.capabilityHash === capabilityHash);
  return records.sort((left, right) => right.lastSeenAt.localeCompare(left.lastSeenAt))[0];
}

function recordId(
  serverId: string,
  kind: string,
  capabilityId: string,
  hash: string,
  suffix?: string
): string {
  return `${serverId}:${kind}:${capabilityId}:${hash}${suffix ? `:${suffix}` : ''}`;
}

function schemaCacheKey(ref: {
  serverId: string;
  capabilityId?: string;
  remoteName?: string;
  capabilityHash: string;
  protocolVersion?: string;
}): string {
  return [
    ref.serverId,
    ref.capabilityId ?? ref.remoteName,
    ref.capabilityHash,
    ref.protocolVersion ?? 'unknown',
  ].join(':');
}

function same(left: unknown, right: unknown): boolean {
  return hashToolContract(left) === hashToolContract(right);
}

function clone<T>(value: T): T {
  if (value === undefined) return value;
  return JSON.parse(JSON.stringify(value)) as T;
}

function catalogError(
  code: string,
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, context });
}
