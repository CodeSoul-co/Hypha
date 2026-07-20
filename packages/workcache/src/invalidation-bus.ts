import type { WorkCacheInvalidationBus, WorkCacheInvalidationMessage } from './types';

export class InMemoryWorkCacheInvalidationBus implements WorkCacheInvalidationBus {
  private readonly handlers = new Set<
    (message: WorkCacheInvalidationMessage) => Promise<void> | void
  >();

  async publish(message: WorkCacheInvalidationMessage): Promise<void> {
    await Promise.all([...this.handlers].map((handler) => handler(message)));
  }

  subscribe(handler: (message: WorkCacheInvalidationMessage) => Promise<void> | void): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }
}

export interface RedisWorkCachePubSubClient {
  publish(channel: string, message: string): Promise<number>;
  subscribe(channel: string): Promise<unknown>;
  unsubscribe(channel: string): Promise<unknown>;
  on(event: 'message', handler: (channel: string, message: string) => void): unknown;
  off?(event: 'message', handler: (channel: string, message: string) => void): unknown;
  quit?(): Promise<unknown>;
}

export interface RedisWorkCacheInvalidationBusOptions {
  publisher: RedisWorkCachePubSubClient;
  subscriber: RedisWorkCachePubSubClient;
  channel?: string;
  closeClients?: boolean;
}

export class RedisWorkCacheInvalidationBus implements WorkCacheInvalidationBus {
  private readonly channel: string;

  constructor(private readonly options: RedisWorkCacheInvalidationBusOptions) {
    this.channel = options.channel ?? 'hypha:workcache:v1:invalidate';
  }

  async publish(message: WorkCacheInvalidationMessage): Promise<void> {
    await this.options.publisher.publish(this.channel, JSON.stringify(message));
  }

  async subscribe(
    handler: (message: WorkCacheInvalidationMessage) => Promise<void> | void
  ): Promise<() => Promise<void>> {
    const listener = (channel: string, raw: string) => {
      if (channel !== this.channel) return;
      const message = parseInvalidationMessage(raw);
      if (message) void Promise.resolve(handler(message)).catch(() => undefined);
    };
    this.options.subscriber.on('message', listener);
    await this.options.subscriber.subscribe(this.channel);
    return async () => {
      this.options.subscriber.off?.('message', listener);
      await this.options.subscriber.unsubscribe(this.channel);
    };
  }

  async close(): Promise<void> {
    if (!this.options.closeClients) return;
    await Promise.all([this.options.publisher.quit?.(), this.options.subscriber.quit?.()]);
  }
}

function parseInvalidationMessage(raw: string): WorkCacheInvalidationMessage | null {
  try {
    const value = JSON.parse(raw) as Partial<WorkCacheInvalidationMessage>;
    if (
      value.schemaVersion !== '1.0' ||
      typeof value.originId !== 'string' ||
      !Array.isArray(value.blockIds) ||
      !value.blockIds.every((blockId) => typeof blockId === 'string') ||
      typeof value.reason !== 'string' ||
      typeof value.timestamp !== 'string'
    ) {
      return null;
    }
    return value as WorkCacheInvalidationMessage;
  } catch {
    return null;
  }
}
