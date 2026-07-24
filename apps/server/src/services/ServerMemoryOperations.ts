import { randomUUID } from 'crypto';
import type {
  ManagedMemoryRecord,
  ManagedMemoryScope,
  MemoryApplicationService,
  MemoryPrincipal,
} from '@hypha/memory';
import type { TempMessage } from '../core/llm/types';
import type {
  ListConversationsOptions,
  ListMessagesOptions,
  PermanentConversation,
  PermanentMessage,
  SearchOptions,
} from '../core/memory/types';
import { getMemoryApplicationService, getServerMemoryComposition } from './ServerMemoryComposition';

const MESSAGE_TAG = 'hypha:chat-message';
const CONVERSATION_TAG = 'hypha:conversation';

type ChatMessageInput = Omit<TempMessage, 'id' | 'timestamp'>;
type ConversationInput = Omit<PermanentConversation, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Thin compatibility mapping for existing Server routes.
 *
 * It deliberately owns no persistence and performs no provider selection:
 * every operation delegates to the unique MemoryApplicationService.
 */
export class ServerMemoryOperations {
  constructor(
    private readonly service: () => MemoryApplicationService = getMemoryApplicationService,
    private readonly profileRef = () => getServerMemoryComposition().profileRef()
  ) {}

  async addMessage(sessionId: string, message: ChatMessageInput): Promise<TempMessage> {
    const messageId = randomUUID();
    const operationId = operation('add-message');
    const result = await this.service().add({
      operationId,
      principal: principal(message.userId),
      scope: userScope(message.userId),
      input: message.content,
      inputType: 'message',
      memoryType: 'working',
      source: {
        type: sourceType(message.role),
        sourceId: messageId,
        sourceMessageId: messageId,
      },
      extractionMode: 'none',
      writeMode: 'sync',
      idempotencyKey: `chat-message:${messageId}`,
      profileRef: this.profileRef(),
      tags: [MESSAGE_TAG, sessionTag(sessionId), roleTag(message.role)],
      metadata: {
        canonicalKey: `chat-message:${messageId}`,
        sessionId,
        role: message.role,
        modelId: message.modelId,
        modelProvider: message.modelProvider,
        ...(message.metadata ?? {}),
      },
    });
    const record = result.records[0];
    if (!record) throw new Error(`Canonical Memory rejected message write (${result.status}).`);
    return toTempMessage(record);
  }

  async getMessages(
    sessionId: string,
    limit: number | undefined,
    userId: string
  ): Promise<TempMessage[]> {
    const result = await this.service().list({
      operationId: operation('list-messages'),
      principal: principal(userId),
      scope: userScope(userId),
      filter: { tagsAll: [MESSAGE_TAG, sessionTag(sessionId)] },
      pagination: { limit: normalizeLimit(limit ? limit * 2 : 200) },
    });
    return result.records.map(toTempMessage).sort(compareTimestamp);
  }

  async clearMessages(sessionId: string, userId: string): Promise<void> {
    await this.service().delete({
      operationId: operation('clear-session'),
      principal: principal(userId),
      scope: userScope(userId),
      filter: { tagsAll: [MESSAGE_TAG, sessionTag(sessionId)] },
      mode: 'soft',
      reason: 'User cleared the chat session.',
      idempotencyKey: `clear-session:${userId}:${sessionId}:${randomUUID()}`,
    });
  }

  async getAllSessions(userId: string): Promise<string[]> {
    const result = await this.service().list({
      operationId: operation('list-sessions'),
      principal: principal(userId),
      scope: userScope(userId),
      filter: { tagsAll: [MESSAGE_TAG] },
      pagination: { limit: 10_000 },
    });
    return Array.from(
      new Set(
        result.records
          .map((record) => metadataString(record, 'sessionId'))
          .filter((value): value is string => Boolean(value))
      )
    ).sort();
  }

  async getSessionInfo(
    sessionId: string,
    userId: string
  ): Promise<{
    messageCount: number;
    oldestTimestamp?: Date;
    newestTimestamp?: Date;
  }> {
    const messages = await this.getMessages(sessionId, 5_000, userId);
    if (messages.length === 0) return { messageCount: 0 };
    return {
      messageCount: messages.length,
      oldestTimestamp: messages[0].timestamp,
      newestTimestamp: messages[messages.length - 1].timestamp,
    };
  }

  async createConversation(input: ConversationInput): Promise<PermanentConversation> {
    const existing = await this.getConversationBySessionId(input.sessionId, input.userId);
    if (existing) return existing;
    const conversationKey = randomUUID();
    const result = await this.service().add({
      operationId: operation('create-conversation'),
      principal: principal(input.userId),
      scope: userScope(input.userId),
      input: {
        sessionId: input.sessionId,
        agentId: input.agentId,
        modelId: input.modelId,
        modelProvider: input.modelProvider,
        title: input.title,
        tags: input.tags ?? [],
        isArchived: input.isArchived,
      },
      inputType: 'structured',
      memoryType: 'episodic',
      source: { type: 'system', sourceId: conversationKey },
      extractionMode: 'none',
      writeMode: 'sync',
      idempotencyKey: `conversation:${input.userId}:${input.sessionId}`,
      profileRef: this.profileRef(),
      tags: [CONVERSATION_TAG, sessionTag(input.sessionId)],
      metadata: {
        canonicalKey: `conversation:${conversationKey}`,
        kind: 'conversation',
        sessionId: input.sessionId,
      },
    });
    const record = result.records[0];
    if (!record)
      throw new Error(`Canonical Memory rejected conversation write (${result.status}).`);
    return toConversation(record);
  }

  async getConversation(id: string, userId: string): Promise<PermanentConversation | null> {
    const record = await this.service().get({
      operationId: operation('get-conversation'),
      principal: principal(userId),
      scope: userScope(userId),
      memoryId: id,
    });
    return record && record.tags?.includes(CONVERSATION_TAG) ? toConversation(record) : null;
  }

  async getConversationBySessionId(
    sessionId: string,
    userId: string
  ): Promise<PermanentConversation | null> {
    const records = await this.listRecords(userId, [CONVERSATION_TAG, sessionTag(sessionId)]);
    return records[0] ? toConversation(records[0]) : null;
  }

  async listConversations(
    userId: string,
    options: ListConversationsOptions = {}
  ): Promise<PermanentConversation[]> {
    const records = await this.listRecords(userId, [CONVERSATION_TAG], 10_000);
    const filtered = records
      .map(toConversation)
      .filter((item) => !options.agentId || item.agentId === options.agentId)
      .filter((item) => options.isArchived === undefined || item.isArchived === options.isArchived)
      .filter((item) => !options.startDate || item.createdAt >= options.startDate)
      .filter((item) => !options.endDate || item.createdAt <= options.endDate);
    return paginate(filtered, options);
  }

  async updateConversation(
    id: string,
    userId: string,
    updates: Partial<PermanentConversation>
  ): Promise<PermanentConversation | null> {
    const currentRecord = await this.service().get({
      operationId: operation('get-conversation-for-update'),
      principal: principal(userId),
      scope: userScope(userId),
      memoryId: id,
    });
    if (!currentRecord || !currentRecord.tags?.includes(CONVERSATION_TAG)) return null;
    const current = toConversation(currentRecord);
    const next = {
      sessionId: updates.sessionId ?? current.sessionId,
      agentId: updates.agentId ?? current.agentId,
      modelId: updates.modelId ?? current.modelId,
      modelProvider: updates.modelProvider ?? current.modelProvider,
      title: updates.title ?? current.title,
      tags: updates.tags ?? current.tags ?? [],
      isArchived: updates.isArchived ?? current.isArchived,
    };
    const result = await this.service().update({
      operationId: operation('update-conversation'),
      principal: principal(userId),
      scope: userScope(userId),
      memoryId: id,
      expectedRevision: currentRecord.revision,
      patch: {
        content: next,
        tags: [CONVERSATION_TAG, sessionTag(next.sessionId)],
        metadata: { ...currentRecord.metadata, sessionId: next.sessionId },
      },
      reason: 'User updated conversation metadata.',
      idempotencyKey: `update-conversation:${id}:${currentRecord.revision}`,
    });
    return result.records[0] ? toConversation(result.records[0]) : null;
  }

  async deleteConversation(id: string, userId: string): Promise<boolean> {
    const conversation = await this.getConversation(id, userId);
    if (!conversation) return false;
    await this.service().delete({
      operationId: operation('delete-conversation'),
      principal: principal(userId),
      scope: userScope(userId),
      memoryIds: [id],
      mode: 'soft',
      reason: 'User deleted conversation.',
      idempotencyKey: `delete-conversation:${id}`,
    });
    await this.clearMessages(conversation.sessionId, userId);
    return true;
  }

  async getConversationMessages(
    conversation: PermanentConversation,
    options: ListMessagesOptions = {}
  ): Promise<PermanentMessage[]> {
    const messages = await this.getMessages(conversation.sessionId, 5_000, conversation.userId);
    const filtered = messages
      .filter(
        (item) => !options.roles || options.roles.includes(item.role as PermanentMessage['role'])
      )
      .filter((item) => !options.startDate || item.timestamp >= options.startDate)
      .filter((item) => !options.endDate || item.timestamp <= options.endDate)
      .map((item) => ({
        id: item.id,
        conversationId: conversation.id,
        role: item.role as PermanentMessage['role'],
        content: item.content,
        timestamp: item.timestamp,
        modelId: item.modelId,
        modelProvider: item.modelProvider,
        metadata: item.metadata,
      }));
    return paginate(filtered, options);
  }

  async searchConversations(
    userId: string,
    query: string,
    options: SearchOptions = {}
  ): Promise<PermanentConversation[]> {
    const results = await this.service().search({
      operationId: operation('search-conversations'),
      principal: principal(userId),
      scope: userScope(userId),
      profileRef: this.profileRef(),
      query,
      filters: { tagsAll: [CONVERSATION_TAG] },
      memoryTypes: ['episodic'],
      mode: 'hybrid',
      topK: normalizeLimit(options.pageSize ?? 20),
      includeContent: true,
    });
    return paginate(
      results.map(({ record }) => toConversation(record)),
      options
    );
  }

  async searchMessages(
    userId: string,
    query: string,
    options: SearchOptions = {}
  ): Promise<TempMessage[]> {
    const results = await this.service().search({
      operationId: operation('search-messages'),
      principal: principal(userId),
      scope: userScope(userId),
      profileRef: this.profileRef(),
      query,
      filters: { tagsAll: [MESSAGE_TAG] },
      memoryTypes: ['working'],
      mode: 'hybrid',
      topK: normalizeLimit(options.pageSize ?? 20),
      includeContent: true,
    });
    return paginate(
      results.map(({ record }) => toTempMessage(record)),
      options
    );
  }

  async stats(userId: string): Promise<{
    totalConversations: number;
    totalMessages: number;
    archivedConversations: number;
  }> {
    const [conversations, messages] = await Promise.all([
      this.listConversations(userId, { page: 1, pageSize: 10_000 }),
      this.listRecords(userId, [MESSAGE_TAG], 10_000),
    ]);
    return {
      totalConversations: conversations.length,
      totalMessages: messages.length,
      archivedConversations: conversations.filter((item) => item.isArchived).length,
    };
  }

  private async listRecords(
    userId: string,
    tagsAll: string[],
    limit = 100
  ): Promise<ManagedMemoryRecord[]> {
    const result = await this.service().list({
      operationId: operation('list-records'),
      principal: principal(userId),
      scope: userScope(userId),
      filter: { tagsAll },
      pagination: { limit: normalizeLimit(limit) },
    });
    return result.records;
  }
}

let operations: ServerMemoryOperations | null = null;

export function getServerMemoryOperations(): ServerMemoryOperations {
  operations ??= new ServerMemoryOperations();
  return operations;
}

function principal(userId: string): MemoryPrincipal {
  return {
    principalId: `user:${userId}`,
    type: 'user',
    userId,
    permissionScopes: ['memory:read', 'memory:write', 'memory:delete'],
  };
}

function userScope(userId: string): ManagedMemoryScope {
  return { userId };
}

function operation(kind: string): string {
  return `server:${kind}:${randomUUID()}`;
}

function sessionTag(sessionId: string): string {
  return `session:${sessionId}`;
}

function roleTag(role: string): string {
  return `role:${role}`;
}

function sourceType(role: TempMessage['role']) {
  if (role === 'user') return 'user_message' as const;
  if (role === 'assistant') return 'assistant_message' as const;
  return 'system' as const;
}

function toTempMessage(record: ManagedMemoryRecord): TempMessage {
  return {
    id: record.id,
    userId: record.scope.userId,
    sessionId: metadataString(record, 'sessionId') ?? '',
    role: (metadataString(record, 'role') ?? 'system') as TempMessage['role'],
    content:
      typeof record.content === 'string'
        ? record.content
        : (record.canonicalText ?? String(record.content)),
    modelId: metadataString(record, 'modelId'),
    modelProvider: metadataString(record, 'modelProvider'),
    timestamp: new Date(record.createdAt),
    metadata: record.metadata,
  };
}

function toConversation(record: ManagedMemoryRecord): PermanentConversation {
  const content = objectContent(record);
  return {
    id: record.id,
    userId: record.scope.userId,
    sessionId: stringValue(content.sessionId) ?? metadataString(record, 'sessionId') ?? '',
    agentId: stringValue(content.agentId) ?? 'default',
    modelId: stringValue(content.modelId) ?? '',
    modelProvider: stringValue(content.modelProvider) ?? '',
    title: stringValue(content.title),
    tags: Array.isArray(content.tags)
      ? content.tags.filter((item): item is string => typeof item === 'string')
      : [],
    createdAt: new Date(record.createdAt),
    updatedAt: new Date(record.updatedAt),
    isArchived: content.isArchived === true,
  };
}

function objectContent(record: ManagedMemoryRecord): Record<string, unknown> {
  return record.content && typeof record.content === 'object'
    ? (record.content as Record<string, unknown>)
    : {};
}

function metadataString(record: ManagedMemoryRecord, key: string): string | undefined {
  return stringValue(record.metadata?.[key]);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function compareTimestamp(left: TempMessage, right: TempMessage): number {
  return left.timestamp.getTime() - right.timestamp.getTime();
}

function normalizeLimit(value: number): number {
  if (!Number.isFinite(value)) return 100;
  return Math.min(10_000, Math.max(1, Math.floor(value)));
}

function paginate<T>(items: T[], options: { page?: number; pageSize?: number }): T[] {
  const pageNumber = Math.max(1, options.page ?? 1);
  const pageSize = normalizeLimit(options.pageSize ?? 20);
  const start = (pageNumber - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
