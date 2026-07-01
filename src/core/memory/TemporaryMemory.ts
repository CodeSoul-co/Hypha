import { getRedisClient } from '../../services/database';
import { TempMemoryOptions } from './types';
import { memoryConfig } from '../../config';
import { logger } from '../../utils/logger';
import { generateMessageId, now } from '../../utils/helpers';
import { REDIS_KEYS } from '../../constants';

// Import TempMessage from LLM types
import { TempMessage } from '../llm/types';

export class TemporaryMemory implements TempMemoryOptions {
  readonly maxPairs: number;
  readonly ttl: number;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(options?: Partial<TempMemoryOptions>) {
    const config = memoryConfig();
    this.maxPairs = options?.maxPairs || config.temporary.maxPairs;
    this.ttl = options?.ttl || config.temporary.ttl;
  }

  private getKey(sessionId: string): string {
    return `${REDIS_KEYS.TEMP_MEMORY}:${sessionId}`;
  }

  private getSessionMetaKey(sessionId: string): string {
    return `${REDIS_KEYS.TEMP_MEMORY}:meta:${sessionId}`;
  }

  private getUserSessionsKey(userId: string): string {
    return `${REDIS_KEYS.TEMP_MEMORY}:user:${userId}`;
  }

  async addMessage(sessionId: string, message: Omit<TempMessage, 'id' | 'timestamp'>): Promise<void> {
    const redis = getRedisClient();
    if (!redis) {
      throw new Error('Redis client not initialized');
    }

    const key = this.getKey(sessionId);
    const id = generateMessageId();
    const timestamp = now();
    const startTime = Date.now();

    const messageData: TempMessage = {
      ...message,
      id,
      timestamp,
    };

    // Add to stream
    await redis.xadd(
      key,
      '*',
      'id', messageData.id,
      'userId', messageData.userId,
      'sessionId', messageData.sessionId,
      'role', messageData.role,
      'content', messageData.content,
      'modelId', messageData.modelId || '',
      'modelProvider', messageData.modelProvider || '',
      'timestamp', messageData.timestamp.toISOString(),
      'metadata', JSON.stringify(messageData.metadata || {})
    );

    // Set TTL on the key
    await redis.expire(key, this.ttl);

    // Track user's sessions
    await redis.sadd(this.getUserSessionsKey(message.userId), sessionId);

    // Enforce max pairs limit
    await this.enforceLimit(sessionId);

    const duration = Date.now() - startTime;
    logger.debug(`[Redis] XADD ${key}`, {
      sessionId,
      messageId: id,
      role: message.role,
      contentPreview: message.content.substring(0, 50) + (message.content.length > 50 ? '...' : ''),
      durationMs: duration,
    });
  }

  private async enforceLimit(sessionId: string): Promise<void> {
    const redis = getRedisClient();
    if (!redis) return;

    const key = this.getKey(sessionId);

    // Get current message count
    const count = await redis.xlen(key);

    // Max messages = maxPairs * 2 (user + assistant)
    const maxMessages = this.maxPairs * 2;

    if (count > maxMessages) {
      // Remove oldest messages to get back to limit
      const toRemove = count - maxMessages;
      await redis.xtrim(key, 'MAXLEN', toRemove);
      logger.debug('Trimmed temporary memory', { sessionId, removed: toRemove });
    }
  }

  async getMessages(sessionId: string, limit?: number): Promise<TempMessage[]> {
    const redis = getRedisClient();
    if (!redis) {
      throw new Error('Redis client not initialized');
    }

    const key = this.getKey(sessionId);
    const maxMessages = (limit || this.maxPairs) * 2;
    const startTime = Date.now();

    const messages = await redis.xrange(key, '-', '+', 'COUNT', maxMessages);

    const duration = Date.now() - startTime;
    logger.debug(`[Redis] XRANGE ${key}`, {
      sessionId,
      count: messages.length,
      requestedLimit: maxMessages,
      durationMs: duration,
    });

    return messages.map(([id, fields]) => {
      const data: Record<string, string> = {};
      for (let i = 0; i < fields.length; i += 2) {
        data[fields[i]] = fields[i + 1];
      }

      return {
        id: data.id,
        userId: data.userId,
        sessionId: data.sessionId,
        role: data.role as TempMessage['role'],
        content: data.content,
        modelId: data.modelId || undefined,
        modelProvider: data.modelProvider || undefined,
        timestamp: new Date(data.timestamp),
        metadata: JSON.parse(data.metadata || '{}'),
      };
    });
  }

  async clearMessages(sessionId: string): Promise<void> {
    const redis = getRedisClient();
    if (!redis) {
      throw new Error('Redis client not initialized');
    }

    const key = this.getKey(sessionId);
    await redis.del(key);
    logger.debug('Cleared temporary memory', { sessionId });
  }

  async getAllSessions(userId: string): Promise<string[]> {
    const redis = getRedisClient();
    if (!redis) {
      throw new Error('Redis client not initialized');
    }

    const sessions = await redis.smembers(this.getUserSessionsKey(userId));

    // Filter to only return sessions that still have messages
    const validSessions: string[] = [];
    for (const sessionId of sessions) {
      const key = this.getKey(sessionId);
      const exists = await redis.exists(key);
      if (exists) {
        validSessions.push(sessionId);
      } else {
        // Clean up invalid session reference
        await redis.srem(this.getUserSessionsKey(userId), sessionId);
      }
    }

    return validSessions;
  }

  async getSessionInfo(sessionId: string): Promise<{
    messageCount: number;
    oldestTimestamp?: Date;
    newestTimestamp?: Date;
  }> {
    const redis = getRedisClient();
    if (!redis) {
      throw new Error('Redis client not initialized');
    }

    const key = this.getKey(sessionId);
    const count = await redis.xlen(key);

    if (count === 0) {
      return { messageCount: 0 };
    }

    const oldest = await redis.xrange(key, '-', '+', 'COUNT', 1);
    const newest = await redis.xrange(key, '+', '-', 'COUNT', 1);

    let oldestTimestamp: Date | undefined;
    let newestTimestamp: Date | undefined;

    if (oldest.length > 0) {
      const data: Record<string, string> = {};
      for (let i = 0; i < oldest[0][1].length; i += 2) {
        data[oldest[0][1][i]] = oldest[0][1][i + 1];
      }
      oldestTimestamp = new Date(data.timestamp);
    }

    if (newest.length > 0) {
      const data: Record<string, string> = {};
      for (let i = 0; i < newest[0][1].length; i += 2) {
        data[newest[0][1][i]] = newest[0][1][i + 1];
      }
      newestTimestamp = new Date(data.timestamp);
    }

    return { messageCount: count, oldestTimestamp, newestTimestamp };
  }

  async startCleanup(): Promise<void> {
    const config = memoryConfig();
    const interval = config.temporary.cleanupInterval * 1000;

    this.cleanupInterval = setInterval(async () => {
      await this.cleanupExpiredSessions();
    }, interval);

    logger.info('Temporary memory cleanup started', { intervalMs: interval });
  }

  async stopCleanup(): Promise<void> {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
      logger.info('Temporary memory cleanup stopped');
    }
  }

  private async cleanupExpiredSessions(): Promise<void> {
    const redis = getRedisClient();
    if (!redis) return;

    try {
      // Get all session keys
      const pattern = `${REDIS_KEYS.TEMP_MEMORY}:*`;
      const keys = await redis.keys(pattern.replace('orbit:', ''));

      let cleaned = 0;
      for (const key of keys) {
        // Skip meta keys
        if (key.includes(':meta:')) continue;

        const ttl = await redis.ttl(key);
        if (ttl === -2) {
          // Key doesn't exist
          continue;
        } else if (ttl === -1) {
          // No TTL set, set one
          await redis.expire(key, this.ttl);
          cleaned++;
        }
      }

      if (cleaned > 0) {
        logger.debug('Cleaned up temporary memory sessions', { cleaned });
      }
    } catch (error) {
      logger.error('Error during temporary memory cleanup:', error);
    }
  }
}

// Singleton instance
let tempMemoryInstance: TemporaryMemory | null = null;

export function getTemporaryMemory(): TemporaryMemory {
  if (!tempMemoryInstance) {
    tempMemoryInstance = new TemporaryMemory();
  }
  return tempMemoryInstance;
}

export default TemporaryMemory;
