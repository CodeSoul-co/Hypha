import { randomUUID } from 'crypto';

export interface MCPReconnectLease {
  serverId: string;
  ownerId: string;
  fencingToken: string;
  expiresAt: string;
  release(): Promise<void>;
}

export interface MCPReconnectCoordinator {
  acquire(input: {
    serverId: string;
    ownerId: string;
    ttlMs: number;
  }): Promise<MCPReconnectLease | null>;
}

export interface RedisLikeMCPLeaseClient {
  set(
    key: string,
    value: string,
    mode: 'PX',
    ttlMs: number,
    condition: 'NX'
  ): Promise<string | null>;
  eval(
    script: string,
    numberOfKeys: number,
    ...args: Array<string | number>
  ): Promise<number | string | null>;
}

/** A per-server Redis lease that prevents reconnect storms across workers. */
export class RedisMCPReconnectCoordinator implements MCPReconnectCoordinator {
  private readonly namespace: string;

  constructor(
    private readonly client: RedisLikeMCPLeaseClient,
    namespace = 'hypha:mcp:reconnect:v1',
    private readonly now: () => number = Date.now
  ) {
    this.namespace = namespace.replace(/:+$/u, '');
  }

  async acquire(input: {
    serverId: string;
    ownerId: string;
    ttlMs: number;
  }): Promise<MCPReconnectLease | null> {
    if (!input.serverId || !input.ownerId || !Number.isInteger(input.ttlMs) || input.ttlMs < 1) {
      throw coordinationError('MCP_RECONNECT_LEASE_INVALID', 'MCP reconnect lease input is invalid.');
    }
    const key = `${this.namespace}:${input.serverId}`;
    const fencingToken = randomUUID();
    const value = JSON.stringify({ ownerId: input.ownerId, fencingToken });
    const acquired = await this.client.set(key, value, 'PX', input.ttlMs, 'NX');
    if (acquired !== 'OK') return null;
    let released = false;
    return {
      serverId: input.serverId,
      ownerId: input.ownerId,
      fencingToken,
      expiresAt: new Date(this.now() + input.ttlMs).toISOString(),
      release: async () => {
        if (released) return;
        released = true;
        await this.client.eval(
          [
            "if redis.call('GET', KEYS[1]) == ARGV[1] then",
            "  return redis.call('DEL', KEYS[1])",
            'end',
            'return 0',
          ].join('\n'),
          1,
          key,
          value
        );
      },
    };
  }
}

function coordinationError(code: string, message: string): Error {
  return Object.assign(new Error(message), { code });
}
