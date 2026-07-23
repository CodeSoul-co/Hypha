import { createHash, randomUUID } from 'crypto';
import { lookup } from 'dns/promises';
import { isIP } from 'net';
import { z, type ZodType } from 'zod';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  createFrameworkEvent,
  defineSpecSchema,
  type JsonSchema,
  type FrameworkEventType,
  type TraceRecorder,
  type TelemetryMetricKind,
  type TelemetryRecorder,
} from '@hypha/core';
import type {
  MCPIntegrationSpec,
  MCPGateway,
  MCPCapabilityDescriptor,
  MCPPromptRequest,
  MCPPromptResult,
  MCPResourceReadRequest,
  MCPResourceResult,
  MCPToolCallRequest,
  NormalizedMCPCapability,
} from './index';
import type { ProviderHealth, ToolCallContext } from '@hypha/tools';
import {
  normalizedMCPErrorSchema,
  type MCPServerProfile,
  type MCPTransportSpec,
  type NormalizedMCPError,
} from './contracts';
import { capabilityKey } from './governance';

export type MCPConnectionState =
  | 'disconnected'
  | 'starting'
  | 'initializing'
  | 'ready'
  | 'degraded'
  | 'reconnecting'
  | 'closing'
  | 'closed'
  | 'failed';

export interface MCPConnectionRecord {
  id: string;
  serverId: string;
  revision: number;
  state: MCPConnectionState;
  transportType: MCPTransportSpec['type'];
  negotiatedProtocolVersion?: string;
  clientInfo?: Record<string, unknown>;
  serverInfo?: Record<string, unknown>;
  serverCapabilities?: Record<string, unknown>;
  startedAt?: string;
  readyAt?: string;
  lastActivityAt?: string;
  lastHealthCheckAt?: string;
  closedAt?: string;
  activeRequestCount: number;
  reconnectAttempts: number;
  error?: NormalizedMCPError;
  metadata?: Record<string, unknown>;
}

export interface MCPConnectionStatus {
  record: MCPConnectionRecord | null;
  health: ProviderHealth;
}

export const mcpConnectionRecordSchema = z.object({
  id: z.string().min(1),
  serverId: z.string().min(1),
  revision: z.number().int().nonnegative(),
  state: z.enum([
    'disconnected',
    'starting',
    'initializing',
    'ready',
    'degraded',
    'reconnecting',
    'closing',
    'closed',
    'failed',
  ]),
  transportType: z.enum(['stdio', 'streamable_http', 'custom']),
  negotiatedProtocolVersion: z.string().optional(),
  clientInfo: z.record(z.unknown()).optional(),
  serverInfo: z.record(z.unknown()).optional(),
  serverCapabilities: z.record(z.unknown()).optional(),
  startedAt: z.string().optional(),
  readyAt: z.string().optional(),
  lastActivityAt: z.string().optional(),
  lastHealthCheckAt: z.string().optional(),
  closedAt: z.string().optional(),
  activeRequestCount: z.number().int().nonnegative(),
  reconnectAttempts: z.number().int().nonnegative(),
  error: normalizedMCPErrorSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<MCPConnectionRecord>;

export const mcpConnectionRecordExample: MCPConnectionRecord = {
  id: 'mcp-connection:filesystem',
  serverId: 'filesystem',
  revision: 1,
  state: 'ready',
  transportType: 'stdio',
  negotiatedProtocolVersion: '2025-11-25',
  serverInfo: { name: 'filesystem-fixture', version: '1.0.0' },
  serverCapabilities: { tools: { listChanged: true } },
  startedAt: '2026-07-16T00:00:00.000Z',
  readyAt: '2026-07-16T00:00:01.000Z',
  lastActivityAt: '2026-07-16T00:00:01.000Z',
  activeRequestCount: 0,
  reconnectAttempts: 0,
};

export const mcpConnectionRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'serverId',
    'revision',
    'state',
    'transportType',
    'activeRequestCount',
    'reconnectAttempts',
  ],
  properties: {
    id: { type: 'string' },
    serverId: { type: 'string' },
    revision: { type: 'integer', minimum: 0 },
    state: {
      enum: [
        'disconnected',
        'starting',
        'initializing',
        'ready',
        'degraded',
        'reconnecting',
        'closing',
        'closed',
        'failed',
      ],
    },
    transportType: { enum: ['stdio', 'streamable_http', 'custom'] },
    negotiatedProtocolVersion: { type: 'string' },
    clientInfo: { type: 'object' },
    serverInfo: { type: 'object' },
    serverCapabilities: { type: 'object' },
    startedAt: { type: 'string' },
    readyAt: { type: 'string' },
    lastActivityAt: { type: 'string' },
    lastHealthCheckAt: { type: 'string' },
    closedAt: { type: 'string' },
    activeRequestCount: { type: 'integer', minimum: 0 },
    reconnectAttempts: { type: 'integer', minimum: 0 },
    error: { type: 'object' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const mcpConnectionRecordDefinition = defineSpecSchema<MCPConnectionRecord>({
  id: 'MCPConnectionRecord',
  zod: mcpConnectionRecordSchema,
  jsonSchema: mcpConnectionRecordJsonSchema,
  example: mcpConnectionRecordExample,
});

export interface MCPConnectionSession {
  connect(signal?: AbortSignal): Promise<{
    negotiatedProtocolVersion?: string;
    serverInfo?: Record<string, unknown>;
    serverCapabilities?: Record<string, unknown>;
  }>;
  listCapabilities(signal?: AbortSignal): Promise<MCPCapabilityDescriptor[]>;
  callTool(
    capabilityId: string,
    input: unknown,
    options?: {
      signal?: AbortSignal;
      timeoutMs?: number;
      onProgress?: (progress: unknown) => void;
    }
  ): Promise<unknown>;
  readResource?(
    uri: string,
    options?: { signal?: AbortSignal; timeoutMs?: number }
  ): Promise<MCPResourceResult>;
  getPrompt?(
    name: string,
    args?: Record<string, string>,
    options?: { signal?: AbortSignal; timeoutMs?: number }
  ): Promise<MCPPromptResult>;
  ping(signal?: AbortSignal): Promise<void>;
  close(): Promise<void>;
  onClose?: (error?: Error) => void;
  onListChanged?: () => void;
}

export interface MCPConnectionSessionFactory {
  create(profile: MCPServerProfile): MCPConnectionSession;
}

export interface MCPConnectionManagerOptions {
  sessionFactory: MCPConnectionSessionFactory;
  trace?: TraceRecorder;
  traceContext?: { runId: string; stepId?: string; sessionId?: string };
  now?: () => string;
  monotonicNow?: () => number;
  sleep?: (ms: number) => Promise<void>;
  random?: () => number;
  onListChanged?: (serverId: string) => Promise<void> | void;
  telemetry?: TelemetryRecorder;
}

interface ManagedConnection {
  profile: MCPServerProfile;
  record: MCPConnectionRecord;
  session?: MCPConnectionSession;
  requestTimestamps: number[];
  consecutiveFailures: number;
  circuitOpenUntil?: number;
}

export class MCPConnectionManager implements MCPGateway {
  private readonly connections = new Map<string, ManagedConnection>();
  private readonly connectPromises = new Map<string, Promise<MCPConnectionRecord>>();
  private readonly requests = new Map<string, AbortController>();
  private readonly now: () => string;
  private readonly monotonicNow: () => number;
  private readonly sleep: (ms: number) => Promise<void>;
  private readonly random: () => number;
  private readonly listChangedListeners = new Set<(serverId: string) => Promise<void> | void>();

  constructor(private readonly options: MCPConnectionManagerOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    this.monotonicNow = options.monotonicNow ?? (() => Date.now());
    this.sleep = options.sleep ?? delay;
    this.random = options.random ?? Math.random;
    if (options.onListChanged) this.listChangedListeners.add(options.onListChanged);
  }

  onListChanged(listener: (serverId: string) => Promise<void> | void): () => void {
    this.listChangedListeners.add(listener);
    return () => this.listChangedListeners.delete(listener);
  }

  register(profile: MCPServerProfile): MCPConnectionRecord {
    const existing = this.connections.get(profile.id);
    if (existing) {
      existing.profile = profile;
      return clone(existing.record);
    }
    const record: MCPConnectionRecord = {
      id: `mcp-connection:${profile.id}`,
      serverId: profile.id,
      revision: 0,
      state: 'disconnected',
      transportType: profile.transport.type,
      activeRequestCount: 0,
      reconnectAttempts: 0,
    };
    this.connections.set(profile.id, {
      profile,
      record,
      requestTimestamps: [],
      consecutiveFailures: 0,
    });
    return clone(record);
  }

  async connect(serverId: string): Promise<MCPConnectionRecord> {
    const managed = this.requireConnection(serverId);
    if (managed.record.state === 'ready') return clone(managed.record);
    const existing = this.connectPromises.get(serverId);
    if (existing) return existing;
    const connecting = this.connectOnce(managed).finally(() => {
      this.connectPromises.delete(serverId);
    });
    this.connectPromises.set(serverId, connecting);
    return connecting;
  }

  async get(serverId: string): Promise<MCPConnectionRecord | null> {
    return clone(this.connections.get(serverId)?.record ?? null);
  }

  async status(serverId: string): Promise<MCPConnectionStatus> {
    const managed = this.connections.get(serverId);
    if (!managed) {
      return {
        record: null,
        health: {
          status: 'unknown',
          checkedAt: this.now(),
          message: 'MCP server is not registered.',
        },
      };
    }
    const checkedAt = this.now();
    const startedAt = Date.now();
    try {
      if (!managed.session || managed.record.state !== 'ready') {
        throw new Error('MCP connection is not ready.');
      }
      await withTimeout(
        managed.session.ping(),
        managed.profile.healthCheckPolicy?.timeoutMs ?? 5000,
        'MCP health check timed out.'
      );
      this.patchRecord(managed, { lastHealthCheckAt: checkedAt });
      return {
        record: clone(managed.record),
        health: {
          status: 'healthy',
          checkedAt,
          latencyMs: Date.now() - startedAt,
        },
      };
    } catch (error) {
      await this.transition(managed, 'degraded', normalizeMCPError(error, serverId));
      return {
        record: clone(managed.record),
        health: {
          status: 'degraded',
          checkedAt,
          latencyMs: Date.now() - startedAt,
          message: errorMessage(error),
        },
      };
    }
  }

  async health(serverId?: string): Promise<Record<string, ProviderHealth>> {
    const serverIds = serverId ? [serverId] : Array.from(this.connections.keys());
    const statuses = await Promise.all(
      serverIds.map(async (id) => [id, (await this.status(id)).health] as const)
    );
    return Object.fromEntries(statuses);
  }

  async reconnect(serverId: string): Promise<MCPConnectionRecord> {
    const managed = this.requireConnection(serverId);
    await this.metric('mcp_reconnect_total', 'counter', 1, { server_id: serverId });
    await this.transition(managed, 'reconnecting');
    await this.disconnect(serverId, 'reconnect');
    const policy = managed.profile.reconnectPolicy ?? { maxAttempts: 3, backoffMs: 250 };
    const startedAt = this.monotonicNow();
    let lastError: unknown;
    for (let attempt = 1; attempt <= policy.maxAttempts; attempt += 1) {
      if (
        attempt > 1 &&
        policy.maxElapsedMs !== undefined &&
        this.monotonicNow() - startedAt >= policy.maxElapsedMs
      ) {
        break;
      }
      this.patchRecord(managed, { reconnectAttempts: attempt });
      try {
        return await this.connect(serverId);
      } catch (error) {
        lastError = error;
        if (attempt < policy.maxAttempts) {
          const exponentialDelay = (policy.backoffMs ?? 250) * 2 ** (attempt - 1);
          const jitterRatio = policy.jitterRatio ?? 0;
          const jitteredDelay = exponentialDelay * (1 + (this.random() * 2 - 1) * jitterRatio);
          const reconnectDelay = Math.max(
            0,
            Math.round(Math.min(jitteredDelay, policy.maxBackoffMs ?? Number.POSITIVE_INFINITY))
          );
          if (policy.maxElapsedMs !== undefined) {
            const remaining = policy.maxElapsedMs - (this.monotonicNow() - startedAt);
            if (reconnectDelay > remaining) break;
          }
          await this.sleep(reconnectDelay);
        }
      }
    }
    throw (
      lastError ??
      Object.assign(new Error('MCP reconnect budget exhausted.'), {
        code: 'MCP_CONNECTION_FAILED',
        serverId,
      })
    );
  }

  async cancelRequest(requestId: string): Promise<void> {
    const controller = this.requests.get(requestId);
    if (!controller) return;
    controller.abort('MCP request cancelled.');
    this.requests.delete(requestId);
    await this.record('mcp.request.cancelled', { requestId });
  }

  async disconnect(serverId: string, reason = 'requested'): Promise<void> {
    const managed = this.requireConnection(serverId);
    if (managed.record.state === 'closed' || managed.record.state === 'disconnected') return;
    await this.transition(managed, 'closing', undefined, { metadata: { reason } });
    const active = Array.from(this.requests.entries()).filter(([requestId]) =>
      requestId.startsWith(`${serverId}:`)
    );
    for (const [, controller] of active) controller.abort('MCP connection closing.');
    if (managed.session) {
      await withTimeout(
        managed.session.close(),
        managed.profile.shutdownTimeoutMs ?? 5000,
        'MCP shutdown timed out.'
      );
    }
    managed.session = undefined;
    await this.transition(managed, 'closed', undefined, {
      metadata: { reason },
      closedAt: this.now(),
      activeRequestCount: 0,
    });
  }

  async closeAll(): Promise<void> {
    await Promise.all(
      Array.from(this.connections.keys()).map((serverId) =>
        this.disconnect(serverId, 'manager-close').catch(() => undefined)
      )
    );
  }

  async discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]> {
    const startedAt = Date.now();
    await this.record('mcp.capability.discovery.started', { integrationId: integration.id });
    const capabilities: MCPCapabilityDescriptor[] = [];
    for (const server of integration.servers) {
      if (!this.connections.has(server.id)) this.register(legacyServerProfile(server));
      await this.connect(server.id);
      const managed = this.requireConnection(server.id);
      const listed = await managed.session!.listCapabilities();
      capabilities.push(...listed);
    }
    const allowed = new Set(integration.allowedCapabilities ?? []);
    const denied = new Set(integration.deniedCapabilities ?? []);
    const filtered = capabilities.filter((capability) => {
      const scoped = capabilityKey(capability);
      if (denied.has(capability.capabilityId) || denied.has(scoped)) return false;
      return allowed.size === 0 || allowed.has(capability.capabilityId) || allowed.has(scoped);
    });
    await this.metric('mcp_discovery_latency_ms', 'histogram', Date.now() - startedAt, {
      integration_id: integration.id,
    });
    await this.metric('mcp_capability_count', 'gauge', filtered.length, {
      integration_id: integration.id,
    });
    return filtered;
  }

  async normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability> {
    return {
      serverId: capability.serverId,
      capabilityId: capability.capabilityId,
      type: capability.type,
      normalizedSpecId: `${capability.serverId}:${capability.type}:${capability.capabilityId}`,
      capabilityHash: capability.capabilityHash,
      sideEffectLevel: capability.sideEffectLevel,
    };
  }

  async call(request: MCPToolCallRequest): Promise<unknown> {
    const managed = this.requireConnection(request.serverId);
    await this.connect(request.serverId);
    this.enterRequestGuard(managed);
    const requestId = `${request.serverId}:${request.context.invocationId ?? randomUUID()}`;
    const controller = new AbortController();
    const sourceSignal = request.context.signal ?? request.context.abortSignal;
    if (sourceSignal?.aborted) controller.abort(sourceSignal.reason);
    sourceSignal?.addEventListener('abort', () => controller.abort(sourceSignal.reason), {
      once: true,
    });
    this.requests.set(requestId, controller);
    this.patchRecord(managed, {
      activeRequestCount: managed.record.activeRequestCount + 1,
      lastActivityAt: this.now(),
    });
    await this.metric('mcp_active_requests', 'gauge', managed.record.activeRequestCount, {
      server_id: request.serverId,
    });
    await this.record('mcp.request.started', {
      requestId,
      serverId: request.serverId,
      capabilityId: request.capabilityId,
    });
    try {
      this.assertRequestActive(controller.signal, request.context.deadlineAt, 'dispatch');
      const timeoutMs = this.requestTimeoutMs(managed, request.context.deadlineAt);
      const output = await managed.session!.callTool(request.capabilityId, request.input, {
        signal: controller.signal,
        timeoutMs,
        onProgress: (progress) => {
          void request.context.reportProgress?.({
            stage: 'mcp',
            metadata: { progress },
          });
        },
      });
      this.assertRequestActive(controller.signal, request.context.deadlineAt, 'completion');
      await this.record('mcp.request.completed', {
        requestId,
        serverId: request.serverId,
        capabilityId: request.capabilityId,
      });
      this.recordRequestSuccess(managed);
      return output;
    } catch (error) {
      this.recordRequestFailure(managed);
      const normalized = normalizeMCPError(error, request.serverId, request.capabilityId);
      await this.record('mcp.request.failed', {
        requestId,
        serverId: request.serverId,
        capabilityId: request.capabilityId,
        error: normalized,
      });
      throw Object.assign(new Error(normalized.message), normalized);
    } finally {
      this.requests.delete(requestId);
      this.patchRecord(managed, {
        activeRequestCount: Math.max(0, managed.record.activeRequestCount - 1),
        lastActivityAt: this.now(),
      });
      await this.metric('mcp_active_requests', 'gauge', managed.record.activeRequestCount, {
        server_id: request.serverId,
      });
    }
  }

  async readResource(request: MCPResourceReadRequest): Promise<MCPResourceResult> {
    return this.executeCapabilityRequest(
      request.serverId,
      request.uri,
      'resource',
      request.context,
      async (session, signal, timeoutMs) => {
        if (!session.readResource) {
          throw Object.assign(new Error('MCP session does not support Resources.'), {
            code: 'MCP_CAPABILITY_NOT_FOUND',
          });
        }
        return session.readResource(request.uri, { signal, timeoutMs });
      }
    );
  }

  async getPrompt(request: MCPPromptRequest): Promise<MCPPromptResult> {
    return this.executeCapabilityRequest(
      request.serverId,
      request.name,
      'prompt',
      request.context,
      async (session, signal, timeoutMs) => {
        if (!session.getPrompt) {
          throw Object.assign(new Error('MCP session does not support Prompts.'), {
            code: 'MCP_CAPABILITY_NOT_FOUND',
          });
        }
        return session.getPrompt(request.name, request.arguments, { signal, timeoutMs });
      }
    );
  }

  private async executeCapabilityRequest<T>(
    serverId: string,
    capabilityId: string,
    kind: 'resource' | 'prompt',
    context: Partial<ToolCallContext> | undefined,
    execute: (session: MCPConnectionSession, signal: AbortSignal, timeoutMs: number) => Promise<T>
  ): Promise<T> {
    const managed = this.requireConnection(serverId);
    await this.connect(serverId);
    this.enterRequestGuard(managed);
    const requestId = `${serverId}:${context?.invocationId ?? `${kind}:${randomUUID()}`}`;
    const controller = new AbortController();
    const sourceSignal = context?.signal ?? context?.abortSignal;
    if (sourceSignal?.aborted) controller.abort(sourceSignal.reason);
    sourceSignal?.addEventListener('abort', () => controller.abort(sourceSignal.reason), {
      once: true,
    });
    this.requests.set(requestId, controller);
    this.patchRecord(managed, {
      activeRequestCount: managed.record.activeRequestCount + 1,
      lastActivityAt: this.now(),
    });
    await this.metric('mcp_active_requests', 'gauge', managed.record.activeRequestCount, {
      server_id: serverId,
    });
    await this.record('mcp.request.started', { requestId, serverId, capabilityId, kind });
    try {
      this.assertRequestActive(controller.signal, context?.deadlineAt, 'dispatch');
      const timeoutMs = this.requestTimeoutMs(managed, context?.deadlineAt);
      const result = await execute(managed.session!, controller.signal, timeoutMs);
      this.assertRequestActive(controller.signal, context?.deadlineAt, 'completion');
      this.recordRequestSuccess(managed);
      await this.record('mcp.request.completed', { requestId, serverId, capabilityId, kind });
      return result;
    } catch (error) {
      this.recordRequestFailure(managed);
      const normalized = normalizeMCPError(error, serverId, capabilityId);
      await this.record('mcp.request.failed', {
        requestId,
        serverId,
        capabilityId,
        kind,
        error: normalized,
      });
      throw Object.assign(new Error(normalized.message), normalized);
    } finally {
      this.requests.delete(requestId);
      this.patchRecord(managed, {
        activeRequestCount: Math.max(0, managed.record.activeRequestCount - 1),
        lastActivityAt: this.now(),
      });
      await this.metric('mcp_active_requests', 'gauge', managed.record.activeRequestCount, {
        server_id: serverId,
      });
    }
  }

  private assertRequestActive(
    signal: AbortSignal,
    deadlineAt: string | undefined,
    phase: 'dispatch' | 'completion'
  ): void {
    if (signal.aborted) {
      throw guardedRequestError(
        'MCP_REQUEST_CANCELLED',
        `MCP request was cancelled before ${phase}.`,
        false
      );
    }
    if (deadlineAt !== undefined) {
      const deadline = Date.parse(deadlineAt);
      if (!Number.isFinite(deadline) || deadline <= Date.parse(this.now())) {
        throw guardedRequestError(
          'MCP_REQUEST_TIMEOUT',
          `MCP request deadline expired before ${phase}.`,
          true
        );
      }
    }
  }

  private requestTimeoutMs(managed: ManagedConnection, deadlineAt: string | undefined): number {
    const configured = managed.profile.requestTimeoutMs ?? 30_000;
    if (deadlineAt === undefined) return configured;
    const remaining = Date.parse(deadlineAt) - Date.parse(this.now());
    return Math.max(1, Math.min(configured, remaining));
  }

  private enterRequestGuard(managed: ManagedConnection): void {
    const policy = managed.profile.requestGuardPolicy;
    if (!policy) return;
    const now = Date.now();
    if (managed.circuitOpenUntil !== undefined) {
      if (managed.circuitOpenUntil > now) {
        throw guardedRequestError(
          'MCP_CIRCUIT_OPEN',
          'MCP server circuit breaker is open.',
          false,
          {
            retryAfterMs: managed.circuitOpenUntil - now,
          }
        );
      }
      managed.circuitOpenUntil = undefined;
      managed.consecutiveFailures = 0;
    }
    if (
      policy.maxConcurrentRequests !== undefined &&
      managed.record.activeRequestCount >= policy.maxConcurrentRequests
    ) {
      throw guardedRequestError(
        'MCP_BULKHEAD_REJECTED',
        'MCP server concurrency bulkhead is full.',
        true,
        { maxConcurrentRequests: policy.maxConcurrentRequests }
      );
    }
    if (policy.rateLimit) {
      const threshold = now - policy.rateLimit.windowMs;
      managed.requestTimestamps = managed.requestTimestamps.filter(
        (timestamp) => timestamp > threshold
      );
      if (managed.requestTimestamps.length >= policy.rateLimit.maxRequests) {
        throw guardedRequestError(
          'MCP_RATE_LIMITED',
          'MCP server request rate limit exceeded.',
          true,
          {
            maxRequests: policy.rateLimit.maxRequests,
            windowMs: policy.rateLimit.windowMs,
          }
        );
      }
      managed.requestTimestamps.push(now);
    }
  }

  private recordRequestSuccess(managed: ManagedConnection): void {
    managed.consecutiveFailures = 0;
  }

  private recordRequestFailure(managed: ManagedConnection): void {
    const policy = managed.profile.requestGuardPolicy?.circuitBreaker;
    if (!policy) return;
    managed.consecutiveFailures += 1;
    if (managed.consecutiveFailures >= policy.failureThreshold) {
      managed.circuitOpenUntil = Date.now() + policy.resetAfterMs;
    }
  }

  private async connectOnce(managed: ManagedConnection): Promise<MCPConnectionRecord> {
    await this.metric('mcp_connection_total', 'counter', 1, {
      server_id: managed.profile.id,
      transport: managed.profile.transport.type,
    });
    await this.transition(managed, 'starting', undefined, { startedAt: this.now() });
    try {
      const session = this.options.sessionFactory.create(managed.profile);
      managed.session = session;
      session.onClose = (error) => {
        const explicitClose =
          managed.record.state === 'closing' ||
          managed.record.state === 'closed' ||
          managed.record.state === 'disconnected';
        void this.transition(
          managed,
          error ? 'failed' : 'closed',
          error ? normalizeMCPError(error, managed.profile.id) : undefined
        ).then(async () => {
          if (explicitClose || (managed.profile.reconnectPolicy?.maxAttempts ?? 0) <= 0) return;
          try {
            await this.reconnect(managed.profile.id);
          } catch {
            // reconnect() records the terminal connection state and normalized error.
          }
        });
      };
      session.onListChanged = () => {
        for (const listener of this.listChangedListeners) {
          void listener(managed.profile.id);
        }
      };
      await this.transition(managed, 'initializing');
      const initialized = await withTimeout(
        session.connect(),
        managed.profile.initializationTimeoutMs ?? 10_000,
        'MCP initialization timed out.'
      );
      const allowedVersions = managed.profile.protocolVersionPolicy?.allowedVersions;
      if (
        initialized.negotiatedProtocolVersion &&
        allowedVersions?.length &&
        !allowedVersions.includes(initialized.negotiatedProtocolVersion)
      ) {
        throw Object.assign(new Error('MCP protocol version is not allowed.'), {
          code: 'MCP_PROTOCOL_MISMATCH',
        });
      }
      await this.record('mcp.connection.initialized', {
        serverId: managed.profile.id,
        ...initialized,
      });
      await this.transition(managed, 'ready', undefined, {
        ...initialized,
        readyAt: this.now(),
        lastActivityAt: this.now(),
        reconnectAttempts: 0,
      });
      return clone(managed.record);
    } catch (error) {
      await this.metric('mcp_connection_failure_total', 'counter', 1, {
        server_id: managed.profile.id,
      });
      const normalized = normalizeMCPError(error, managed.profile.id);
      await this.transition(managed, 'failed', normalized);
      try {
        await managed.session?.close();
      } catch {
        // The original initialization error is authoritative.
      }
      managed.session = undefined;
      throw Object.assign(new Error(normalized.message), normalized);
    }
  }

  private requireConnection(serverId: string): ManagedConnection {
    const managed = this.connections.get(serverId);
    if (!managed) {
      throw Object.assign(new Error('MCP server is not registered: ' + serverId), {
        code: 'MCP_SERVER_NOT_FOUND',
      });
    }
    return managed;
  }

  private patchRecord(managed: ManagedConnection, patch: Partial<MCPConnectionRecord>): void {
    managed.record = {
      ...managed.record,
      ...patch,
      revision: managed.record.revision + 1,
    };
  }

  private async transition(
    managed: ManagedConnection,
    state: MCPConnectionState,
    error?: NormalizedMCPError,
    patch: Partial<MCPConnectionRecord> = {}
  ): Promise<void> {
    const previous = managed.record.state;
    this.patchRecord(managed, { ...patch, state, error });
    await this.record(connectionEvent(state), {
      serverId: managed.profile.id,
      from: previous,
      to: state,
      revision: managed.record.revision,
      error,
    });
    await this.record('mcp.server.state.changed', {
      serverId: managed.profile.id,
      from: previous,
      to: state,
      revision: managed.record.revision,
      error,
    });
  }

  private async record(type: FrameworkEventType, payload: Record<string, unknown>): Promise<void> {
    if (!this.options.trace || !this.options.traceContext) return;
    const context = this.options.traceContext;
    await this.options.trace.record(
      createFrameworkEvent({
        id: `${context.runId}:${type}:${String(payload.serverId ?? 'manager')}:${randomUUID()}`,
        type,
        runId: context.runId,
        stepId: context.stepId,
        sessionId: context.sessionId,
        payload,
      })
    );
  }

  private async metric(
    name: string,
    kind: TelemetryMetricKind,
    value: number,
    attributes?: Record<string, string | number | boolean>
  ): Promise<void> {
    if (!this.options.telemetry) return;
    await this.options.telemetry.recordMetric({
      name,
      kind,
      value,
      recordedAt: this.now(),
      attributes,
    });
  }
}

export interface SDKMCPConnectionSessionFactoryOptions {
  clientInfo?: { name: string; version: string };
  resolveHeadersRef?: (ref: string) => Promise<Record<string, string>> | Record<string, string>;
  resolveAuthorizationRef?: (ref: string) => Promise<string> | string;
  resolveWorkingDirectoryRef?: (ref: string) => Promise<string> | string;
  resolveEnvironmentRefs?: (
    refs: string[]
  ) => Promise<Record<string, string>> | Record<string, string>;
}

export class SDKMCPConnectionSessionFactory implements MCPConnectionSessionFactory {
  constructor(private readonly options: SDKMCPConnectionSessionFactoryOptions = {}) {}

  create(profile: MCPServerProfile): MCPConnectionSession {
    return new SDKMCPConnectionSession(profile, this.options);
  }
}

class SDKMCPConnectionSession implements MCPConnectionSession {
  onClose?: (error?: Error) => void;
  onListChanged?: () => void;
  private client?: Client;
  private transport?: StdioClientTransport | StreamableHTTPClientTransport;

  constructor(
    private readonly profile: MCPServerProfile,
    private readonly options: SDKMCPConnectionSessionFactoryOptions
  ) {}

  async connect(): Promise<{
    negotiatedProtocolVersion?: string;
    serverInfo?: Record<string, unknown>;
    serverCapabilities?: Record<string, unknown>;
  }> {
    this.transport = await this.createTransport();
    this.client = new Client(this.options.clientInfo ?? { name: 'hypha', version: '1.0.0' }, {
      capabilities: {},
      enforceStrictCapabilities: true,
      listChanged: {
        tools: { onChanged: () => this.onListChanged?.() },
        resources: { onChanged: () => this.onListChanged?.() },
        prompts: { onChanged: () => this.onListChanged?.() },
      },
    });
    this.client.onclose = () => this.onClose?.();
    this.client.onerror = (error) => this.onClose?.(error);
    await this.client.connect(this.transport);
    return {
      negotiatedProtocolVersion:
        this.transport instanceof StreamableHTTPClientTransport
          ? this.transport.protocolVersion
          : undefined,
      serverInfo: this.client.getServerVersion() as Record<string, unknown> | undefined,
      serverCapabilities: this.client.getServerCapabilities() as
        Record<string, unknown> | undefined,
    };
  }

  async listCapabilities(signal?: AbortSignal): Promise<MCPCapabilityDescriptor[]> {
    const client = this.requireClient();
    const capabilities: MCPCapabilityDescriptor[] = [];
    const serverInfo = client.getServerVersion();
    const serverCapabilities = client.getServerCapabilities();
    const protocolVersion =
      this.transport instanceof StreamableHTTPClientTransport
        ? this.transport.protocolVersion
        : undefined;
    const common = {
      version: serverInfo?.version ?? this.profile.version ?? '0.0.0',
      serverId: this.profile.id,
      trustLevel: 'untrusted' as const,
      declarationSource: 'server' as const,
      protocolVersion,
      serverIdentity: serverInfo as Record<string, unknown> | undefined,
    };
    if (serverCapabilities?.tools) {
      let cursor: string | undefined;
      do {
        const response = await client.listTools({ cursor }, { signal });
        for (const tool of response.tools) {
          capabilities.push({
            ...common,
            id: `mcp.${this.profile.id}.tool.${tool.name}`,
            name: String(tool.name),
            description: tool.description,
            capabilityId: String(tool.name),
            type: 'tool',
            inputSchema: (tool.inputSchema ?? { type: 'object' }) as Record<string, unknown>,
            outputSchema: tool.outputSchema as Record<string, unknown> | undefined,
            annotations: tool.annotations as Record<string, unknown> | undefined,
          });
        }
        cursor = response.nextCursor;
      } while (cursor);
    }
    if (serverCapabilities?.resources) {
      let cursor: string | undefined;
      do {
        const response = await client.listResources({ cursor }, { signal });
        for (const resource of response.resources) {
          capabilities.push({
            ...common,
            id: `mcp.${this.profile.id}.resource.${hashIdentifier(resource.uri)}`,
            name: resource.name,
            description: resource.description,
            capabilityId: resource.uri,
            type: 'resource',
            annotations: {
              uri: resource.uri,
              mimeType: resource.mimeType,
              size: resource.size,
              annotations: resource.annotations,
            },
          });
        }
        cursor = response.nextCursor;
      } while (cursor);

      cursor = undefined;
      do {
        const response = await client.listResourceTemplates({ cursor }, { signal });
        for (const resource of response.resourceTemplates) {
          capabilities.push({
            ...common,
            id: `mcp.${this.profile.id}.resource-template.${hashIdentifier(resource.uriTemplate)}`,
            name: resource.name,
            description: resource.description,
            capabilityId: resource.uriTemplate,
            type: 'resource',
            annotations: {
              uriTemplate: resource.uriTemplate,
              mimeType: resource.mimeType,
              resourceTemplate: true,
              annotations: resource.annotations,
            },
          });
        }
        cursor = response.nextCursor;
      } while (cursor);
    }
    if (serverCapabilities?.prompts) {
      let cursor: string | undefined;
      do {
        const response = await client.listPrompts({ cursor }, { signal });
        for (const prompt of response.prompts) {
          capabilities.push({
            ...common,
            id: `mcp.${this.profile.id}.prompt.${prompt.name}`,
            name: prompt.name,
            description: prompt.description,
            capabilityId: prompt.name,
            type: 'prompt',
            annotations: { arguments: prompt.arguments },
          });
        }
        cursor = response.nextCursor;
      } while (cursor);
    }
    return capabilities;
  }

  async callTool(
    capabilityId: string,
    input: unknown,
    options: {
      signal?: AbortSignal;
      timeoutMs?: number;
      onProgress?: (progress: unknown) => void;
    } = {}
  ): Promise<unknown> {
    const result = await this.requireClient().callTool(
      { name: capabilityId, arguments: asRecord(input) },
      undefined,
      {
        signal: options.signal,
        timeout: options.timeoutMs,
        maxTotalTimeout: options.timeoutMs,
        onprogress: options.onProgress,
      }
    );
    if (result.isError) {
      throw Object.assign(new Error('MCP Tool returned an error.'), {
        code: 'MCP_REMOTE_ERROR',
        details: { content: result.content },
      });
    }
    return result;
  }

  async readResource(
    uri: string,
    options: { signal?: AbortSignal; timeoutMs?: number } = {}
  ): Promise<MCPResourceResult> {
    const result = await this.requireClient().readResource(
      { uri },
      {
        signal: options.signal,
        timeout: options.timeoutMs,
        maxTotalTimeout: options.timeoutMs,
      }
    );
    return {
      contents: result.contents.map((content) => ({
        uri: content.uri,
        mimeType: content.mimeType,
        ...('text' in content ? { text: content.text } : { blob: content.blob }),
        metadata: content._meta,
      })),
      metadata: result._meta,
    };
  }

  async getPrompt(
    name: string,
    args: Record<string, string> = {},
    options: { signal?: AbortSignal; timeoutMs?: number } = {}
  ): Promise<MCPPromptResult> {
    const result = await this.requireClient().getPrompt(
      { name, arguments: args },
      {
        signal: options.signal,
        timeout: options.timeoutMs,
        maxTotalTimeout: options.timeoutMs,
      }
    );
    return {
      description: result.description,
      messages: result.messages,
      metadata: result._meta,
    };
  }

  async ping(signal?: AbortSignal): Promise<void> {
    await this.requireClient().ping({ signal, timeout: 5000 });
  }

  async close(): Promise<void> {
    const client = this.client;
    this.client = undefined;
    if (client) await client.close();
    this.transport = undefined;
  }

  private async createTransport(): Promise<StdioClientTransport | StreamableHTTPClientTransport> {
    const transport = this.profile.transport;
    if (transport.type === 'stdio') {
      const referencedEnvironment = this.options.resolveEnvironmentRefs
        ? await this.options.resolveEnvironmentRefs(this.profile.environmentRefs ?? [])
        : {};
      const allowListedEnvironment = Object.fromEntries(
        (transport.envAllowList ?? []).flatMap((key) =>
          process.env[key] === undefined ? [] : [[key, process.env[key] as string]]
        )
      );
      const cwd =
        this.profile.workingDirectoryRef && this.options.resolveWorkingDirectoryRef
          ? await this.options.resolveWorkingDirectoryRef(this.profile.workingDirectoryRef)
          : undefined;
      return new StdioClientTransport({
        command: transport.command,
        args: transport.args,
        env: { ...allowListedEnvironment, ...referencedEnvironment },
        cwd,
        stderr:
          transport.stderrMode === 'capture' || transport.stderrMode === 'artifact'
            ? 'pipe'
            : (transport.stderrMode ?? 'inherit'),
      });
    }
    if (transport.type === 'streamable_http') {
      await assertRemoteEgressAllowed(transport.endpoint, this.profile.egressPolicy);
      const referencedHeaders =
        transport.headersRef && this.options.resolveHeadersRef
          ? await this.options.resolveHeadersRef(transport.headersRef)
          : {};
      const authorization =
        transport.authorizationRef && this.options.resolveAuthorizationRef
          ? await this.options.resolveAuthorizationRef(transport.authorizationRef)
          : undefined;
      return new StreamableHTTPClientTransport(new URL(transport.endpoint), {
        requestInit: {
          headers: {
            ...referencedHeaders,
            ...(authorization ? { Authorization: authorization } : {}),
          },
        },
        reconnectionOptions: {
          initialReconnectionDelay: this.profile.reconnectPolicy?.backoffMs ?? 250,
          maxReconnectionDelay: 30_000,
          reconnectionDelayGrowFactor: 2,
          maxRetries: this.profile.reconnectPolicy?.maxAttempts ?? 3,
        },
      });
    }
    throw Object.assign(new Error('Custom MCP transport requires a custom session factory.'), {
      code: 'MCP_CONNECTION_FAILED',
    });
  }

  private requireClient(): Client {
    if (!this.client) throw new Error('MCP client session is not connected.');
    return this.client;
  }
}

function legacyServerProfile(server: MCPIntegrationSpec['servers'][number]): MCPServerProfile {
  if (server.mode === 'local') {
    return {
      id: server.id,
      version: server.version,
      mode: 'local',
      transport: {
        type: 'stdio',
        command: server.command ?? '',
        args: server.args,
        stderrMode: 'capture',
      },
      singleStart: true,
    };
  }
  return {
    id: server.id,
    version: server.version,
    mode: 'remote',
    transport: { type: 'streamable_http', endpoint: server.endpoint ?? '' },
    singleStart: true,
  };
}

function connectionEvent(state: MCPConnectionState): FrameworkEventType {
  if (state === 'starting' || state === 'initializing') return 'mcp.connection.starting';
  if (state === 'ready') return 'mcp.connection.ready';
  if (state === 'degraded') return 'mcp.connection.degraded';
  if (state === 'reconnecting') return 'mcp.connection.reconnecting';
  if (state === 'failed') return 'mcp.connection.failed';
  return 'mcp.connection.closed';
}

function normalizeMCPError(
  error: unknown,
  serverId?: string,
  capabilityId?: string
): NormalizedMCPError {
  const source = error as { code?: unknown; retryable?: unknown; details?: unknown };
  const knownCodes = new Set<NormalizedMCPError['code']>([
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
    'MCP_REMOTE_ERROR',
    'MCP_TRANSPORT_CLOSED',
    'MCP_INTERNAL_ERROR',
  ]);
  const candidate = String(source?.code ?? '');
  const message = errorMessage(error);
  const code = knownCodes.has(candidate as NormalizedMCPError['code'])
    ? (candidate as NormalizedMCPError['code'])
    : candidate.toLowerCase().includes('timeout')
      ? 'MCP_REQUEST_TIMEOUT'
      : candidate.toLowerCase().includes('abort') || /cancel|abort/i.test(message)
        ? 'MCP_REQUEST_CANCELLED'
        : 'MCP_CONNECTION_FAILED';
  return {
    code,
    message,
    retryable:
      typeof source?.retryable === 'boolean'
        ? source.retryable
        : ['MCP_CONNECTION_FAILED', 'MCP_REQUEST_TIMEOUT', 'MCP_TRANSPORT_CLOSED'].includes(code),
    serverId,
    capabilityId,
    details:
      source?.details && typeof source.details === 'object'
        ? (source.details as Record<string, unknown>)
        : undefined,
  };
}

function guardedRequestError(
  code: NormalizedMCPError['code'],
  message: string,
  retryable: boolean,
  details?: Record<string, unknown>
): Error {
  return Object.assign(new Error(message), { code, retryable, details });
}

async function assertRemoteEgressAllowed(
  endpoint: string,
  policy: MCPServerProfile['egressPolicy']
): Promise<void> {
  if (!policy) return;
  const url = new URL(endpoint);
  if ((policy.requireTls ?? true) && url.protocol !== 'https:') {
    throw guardedRequestError('MCP_EGRESS_DENIED', 'Remote MCP endpoint must use TLS.', false);
  }
  if (
    policy.allowedHosts?.length &&
    !policy.allowedHosts.some((candidate) => hostMatches(url.hostname, candidate))
  ) {
    throw guardedRequestError('MCP_EGRESS_DENIED', 'Remote MCP host is not allow-listed.', false);
  }
  if (!(policy.denyPrivateNetworks ?? true)) return;
  const addresses = isIP(url.hostname)
    ? [{ address: url.hostname }]
    : await lookup(url.hostname, { all: true, verbatim: true });
  if (addresses.some(({ address }) => isPrivateOrLocalAddress(address))) {
    throw guardedRequestError(
      'MCP_EGRESS_DENIED',
      'Remote MCP endpoint resolved to a private or local address.',
      false
    );
  }
}

function hostMatches(hostname: string, candidate: string): boolean {
  const host = hostname.toLowerCase();
  const rule = candidate.toLowerCase();
  if (!rule.startsWith('*.')) return host === rule;
  const suffix = rule.slice(1);
  return host.endsWith(suffix) && host.length > suffix.length;
}

function isPrivateOrLocalAddress(address: string): boolean {
  const normalized = address.toLowerCase().split('%')[0];
  if (normalized === '::1' || normalized === '::' || normalized.startsWith('fe80:')) return true;
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true;
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(normalized)?.[1];
  const ipv4 = mapped ?? (isIP(normalized) === 4 ? normalized : undefined);
  if (!ipv4) return false;
  const [first, second] = ipv4.split('.').map(Number);
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168) ||
    (first === 100 && second >= 64 && second <= 127) ||
    first >= 224
  );
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function hashIdentifier(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function clone<T>(value: T): T {
  return value === null ? value : (JSON.parse(JSON.stringify(value)) as T);
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_resolve, reject) => {
        timer = setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
