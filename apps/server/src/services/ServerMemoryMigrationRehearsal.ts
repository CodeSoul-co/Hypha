import { createHash, randomUUID } from 'crypto';
import type { Collection } from 'mongodb';
import type {
  ManagedMemoryRecord,
  ManagedMemoryScope,
  ManagedMemoryType,
  MemoryApplicationService,
  MemoryContractSpecRef,
  MemoryPrincipal,
  MemoryServerMigrationInventoryRecord,
  MemoryServerMigrationRehearsalCheckpoint,
  MemoryServerMigrationRehearsalCheckpointStore,
  MemoryServerMigrationRehearsalDataPort,
} from '@hypha/memory';
import type { TempMessage } from '../core/llm/types';
import type { PermanentConversation, PermanentMessage } from '../core/memory/types';

export interface ServerLegacyMemoryPorts {
  temporary: {
    getAllSessions(userId: string): Promise<string[]>;
    getMessages(sessionId: string, limit: number, userId: string): Promise<TempMessage[]>;
    addMessage(sessionId: string, message: Omit<TempMessage, 'id' | 'timestamp'>): Promise<void>;
  };
  permanent: {
    listConversations(
      userId: string,
      options: { page: number; pageSize: number }
    ): Promise<PermanentConversation[]>;
    getMessages(
      conversationId: string,
      options: { page: number; pageSize: number }
    ): Promise<PermanentMessage[]>;
  };
}

export interface ServerLegacyMemoryRecord extends MemoryServerMigrationInventoryRecord {
  content: unknown;
  inputType: 'message' | 'structured';
  memoryType: ManagedMemoryType;
  sourceType: 'user_message' | 'assistant_message' | 'tool_result' | 'system';
  sourceId: string;
  tags: string[];
  metadata: Record<string, unknown>;
}

export class ServerLegacyMemoryMigrationSource {
  private reads = 0;
  private writes = 0;

  constructor(
    private readonly ports: ServerLegacyMemoryPorts,
    private readonly userId: string,
    private readonly probeSessionId = `migration-probe-${randomUUID()}`
  ) {}

  async list(): Promise<ServerLegacyMemoryRecord[]> {
    this.reads += 1;
    const result: ServerLegacyMemoryRecord[] = [];
    const sessions = await this.ports.temporary.getAllSessions(this.userId);
    for (const sessionId of sessions) {
      const messages = await this.ports.temporary.getMessages(sessionId, 5_000, this.userId);
      result.push(...messages.map((message) => temporaryRecord(sessionId, message)));
    }
    const conversations = await this.ports.permanent.listConversations(this.userId, {
      page: 1,
      pageSize: 10_000,
    });
    for (const conversation of conversations) {
      result.push(conversationRecord(conversation));
      const messages = await this.ports.permanent.getMessages(conversation.id, {
        page: 1,
        pageSize: 10_000,
      });
      result.push(...messages.map((message) => permanentMessageRecord(conversation, message)));
    }
    return result.sort((left, right) => left.key.localeCompare(right.key));
  }

  async writeProbe(): Promise<ServerLegacyMemoryRecord> {
    this.writes += 1;
    const marker = `memory-migration-probe:${randomUUID()}`;
    await this.ports.temporary.addMessage(this.probeSessionId, {
      userId: this.userId,
      sessionId: this.probeSessionId,
      role: 'assistant',
      content: marker,
      metadata: { migrationProbe: marker },
    });
    const messages = await this.ports.temporary.getMessages(
      this.probeSessionId,
      5_000,
      this.userId
    );
    const message = messages.find((candidate) => candidate.content === marker);
    if (!message) throw new Error('Legacy dual-write probe was not persisted.');
    return temporaryRecord(this.probeSessionId, message);
  }

  beginRetirementObservation(): void {
    this.reads = 0;
    this.writes = 0;
  }

  retirementObservation() {
    return {
      legacyReadTraffic: this.reads,
      legacyWriteTraffic: this.writes,
      legacyImports: 0,
      legacyRegistrations: 0,
    };
  }
}

export interface ServerCanonicalMemoryMigrationDataPortOptions {
  migrationId: string;
  userId: string;
  source: ServerLegacyMemoryMigrationSource;
  service: () => MemoryApplicationService;
  profileRef: () => MemoryContractSpecRef;
}

export class ServerCanonicalMemoryMigrationDataPort implements MemoryServerMigrationRehearsalDataPort {
  private readonly records = new Map<string, ServerLegacyMemoryRecord>();

  constructor(private readonly options: ServerCanonicalMemoryMigrationDataPortOptions) {}

  async listLegacy() {
    const records = await this.options.source.list();
    for (const record of records) this.records.set(record.key, record);
    return records.map(inventory);
  }

  async listCanonical() {
    const result = await this.options.service().list({
      operationId: operation('migration-list'),
      principal: principal(this.options.userId),
      scope: scope(this.options.userId),
      filter: { tagsAll: [migrationTag(this.options.migrationId)] },
      pagination: { limit: 10_000 },
    });
    return result.records.map((record) => ({
      key: requiredMetadata(record, 'migrationKey'),
      digest: requiredMetadata(record, 'migrationDigest'),
    }));
  }

  async importCanonical(record: MemoryServerMigrationInventoryRecord, idempotencyKey: string) {
    const legacy = this.records.get(record.key);
    if (!legacy || legacy.digest !== record.digest) {
      throw new Error(`Legacy migration record ${record.key} changed after inventory.`);
    }
    const result = await this.options.service().add({
      operationId: operation('migration-import'),
      principal: principal(this.options.userId),
      scope: scope(this.options.userId),
      input: legacy.content,
      inputType: legacy.inputType,
      memoryType: legacy.memoryType,
      source: { type: legacy.sourceType, sourceId: legacy.sourceId },
      extractionMode: 'none',
      writeMode: 'sync',
      idempotencyKey,
      profileRef: this.options.profileRef(),
      tags: [...legacy.tags, migrationTag(this.options.migrationId)],
      metadata: {
        ...legacy.metadata,
        migrationId: this.options.migrationId,
        migrationKey: legacy.key,
        migrationDigest: legacy.digest,
      },
    });
    const canonical = result.records[0];
    if (!canonical) throw new Error(`Canonical import ${legacy.key} returned ${result.status}.`);
    return { canonicalId: canonical.id };
  }

  async writeDualProbe(idempotencyKey: string) {
    const record = await this.options.source.writeProbe();
    this.records.set(record.key, record);
    const imported = await this.importCanonical(record, idempotencyKey);
    return { record: inventory(record), canonicalId: imported.canonicalId };
  }

  async removeCanonical(canonicalIds: readonly string[]) {
    if (canonicalIds.length === 0) return;
    await this.options.service().delete({
      operationId: operation('migration-rollback'),
      principal: principal(this.options.userId),
      scope: scope(this.options.userId),
      memoryIds: [...canonicalIds],
      mode: 'soft',
      reason: `Rollback of ${this.options.migrationId}.`,
      idempotencyKey: `memory-migration:${this.options.migrationId}:rollback`,
    });
  }

  beginRetirementObservation(): void {
    this.options.source.beginRetirementObservation();
  }

  async observeRetirement() {
    return this.options.source.retirementObservation();
  }
}

interface CheckpointDocument {
  _id: string;
  checkpoint: MemoryServerMigrationRehearsalCheckpoint;
  updatedAt: string;
}

export class MongoServerMemoryMigrationCheckpointStore implements MemoryServerMigrationRehearsalCheckpointStore {
  constructor(private readonly collection: Collection<CheckpointDocument>) {}

  async load(migrationId: string) {
    const document = await this.collection.findOne({ _id: migrationId });
    return document?.checkpoint ?? null;
  }

  async save(migrationId: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint) {
    await this.collection.updateOne(
      { _id: migrationId },
      { $set: { checkpoint: structuredClone(checkpoint), updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
  }
}

function temporaryRecord(sessionId: string, message: TempMessage): ServerLegacyMemoryRecord {
  const content = {
    content: message.content,
    role: message.role,
    modelId: message.modelId,
    modelProvider: message.modelProvider,
    metadata: message.metadata ?? {},
    sessionId,
    timestamp: message.timestamp.toISOString(),
  };
  return record(`temporary-message:${message.id}`, content, {
    inputType: 'message',
    memoryType: 'working',
    sourceType: messageSource(message.role),
    sourceId: message.id,
    tags: ['hypha:chat-message', `session:${sessionId}`, `role:${message.role}`],
    metadata: { sessionId, role: message.role, legacyStore: 'redis' },
  });
}

function conversationRecord(conversation: PermanentConversation): ServerLegacyMemoryRecord {
  const content = {
    agentId: conversation.agentId,
    isArchived: conversation.isArchived,
    modelId: conversation.modelId,
    modelProvider: conversation.modelProvider,
    sessionId: conversation.sessionId,
    tags: conversation.tags ?? [],
    title: conversation.title,
  };
  return record(`conversation:${conversation.id}`, content, {
    inputType: 'structured',
    memoryType: 'episodic',
    sourceType: 'system',
    sourceId: conversation.id,
    tags: ['hypha:conversation', `session:${conversation.sessionId}`],
    metadata: { sessionId: conversation.sessionId, legacyStore: 'mongodb' },
  });
}

function permanentMessageRecord(
  conversation: PermanentConversation,
  message: PermanentMessage
): ServerLegacyMemoryRecord {
  const content = {
    content: message.content,
    role: message.role,
    modelId: message.modelId,
    modelProvider: message.modelProvider,
    metadata: message.metadata ?? {},
    sessionId: conversation.sessionId,
    timestamp: message.timestamp.toISOString(),
  };
  return record(`permanent-message:${message.id}`, content, {
    inputType: 'message',
    memoryType: 'working',
    sourceType: messageSource(message.role),
    sourceId: message.id,
    tags: ['hypha:chat-message', `session:${conversation.sessionId}`, `role:${message.role}`],
    metadata: { sessionId: conversation.sessionId, role: message.role, legacyStore: 'mongodb' },
  });
}

function record(
  key: string,
  content: unknown,
  values: Omit<ServerLegacyMemoryRecord, 'key' | 'digest' | 'content'>
): ServerLegacyMemoryRecord {
  const normalizedContent = jsonValue(content);
  return {
    key,
    digest: digest(normalizedContent),
    content: normalizedContent,
    ...values,
    tags: [...values.tags],
    metadata: jsonValue(values.metadata) as Record<string, unknown>,
  };
}

function inventory(record: ServerLegacyMemoryRecord) {
  return { key: record.key, digest: record.digest };
}

function digest(value: unknown) {
  return createHash('sha256').update(stableJson(value)).digest('hex');
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, item]) => item !== undefined)
      .sort(([left], [right]) => left.localeCompare(right));
    return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${stableJson(item)}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'null';
}

function jsonValue(value: unknown): unknown {
  return JSON.parse(stableJson(value));
}
function requiredMetadata(record: ManagedMemoryRecord, key: string): string {
  const value = record.metadata?.[key];
  if (typeof value !== 'string' || !value) throw new Error(`Canonical record lacks ${key}.`);
  return value;
}

function messageSource(role: TempMessage['role'] | PermanentMessage['role'] | 'tool') {
  if (role === 'user') return 'user_message' as const;
  if (role === 'assistant') return 'assistant_message' as const;
  if (role === 'tool') return 'tool_result' as const;
  return 'system' as const;
}

function principal(userId: string): MemoryPrincipal {
  return {
    principalId: `migration:${userId}`,
    type: 'system',
    userId,
    permissionScopes: ['memory:read', 'memory:write', 'memory:delete'],
  };
}

function scope(userId: string): ManagedMemoryScope {
  return { userId };
}

function migrationTag(migrationId: string) {
  return `hypha:memory-migration:${migrationId}`;
}

function operation(kind: string) {
  return `server:${kind}:${randomUUID()}`;
}
