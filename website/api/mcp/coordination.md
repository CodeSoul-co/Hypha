# `@codesoul-co/hypha-mcp` / `coordination`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Package guide: [learning and composition guide](/packages/mcp)
- Source: [`packages/mcp/src/coordination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RedisMCPReconnectCoordinator` | class | <code>new RedisMCPReconnectCoordinator(client: RedisLikeMCPLeaseClient, namespace?: string, now?: () =&gt; number): RedisMCPReconnectCoordinator</code> | A per-server Redis lease that prevents reconnect storms across workers. |
| `MCPReconnectCoordinator` | interface | <code>interface MCPReconnectCoordinator</code> | Field contract for MCP Reconnect Coordinator; see all contract members below. |
| `MCPReconnectLease` | interface | <code>interface MCPReconnectLease</code> | Field contract for MCP Reconnect Lease; see all contract members below. |
| `RedisLikeMCPLeaseClient` | interface | <code>interface RedisLikeMCPLeaseClient</code> | Field contract for Redis Like MCP Lease Client; see all contract members below. |

## `RedisMCPReconnectCoordinator` public members

A per-server Redis lease that prevents reconnect storms across workers.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(input: { serverId: string; ownerId: string; ttlMs: number; }): Promise&lt;MCPReconnectLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `constructor` | constructor | <code>(client: RedisLikeMCPLeaseClient, namespace?: string, now?: () =&gt; number): RedisMCPReconnectCoordinator</code> | Creates an instance of this class. |

## `MCPReconnectCoordinator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(input: { serverId: string; ownerId: string; ttlMs: number; }): Promise&lt;MCPReconnectLease &#124; null&gt;</code> | Public runtime operation for acquire. |

## `MCPReconnectLease` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertCurrent` | method | <code>assertCurrent(): Promise&lt;void&gt;</code> | Asserts Current at this module boundary. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `fencingToken` | property | <code>fencingToken: string</code> | Public fencing Token property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `release` | method | <code>release(): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |

## `RedisLikeMCPLeaseClient` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eval` | method | <code>eval(script: string, numberOfKeys: number, ...args: Array&lt;string &#124; number&gt;): Promise&lt;number &#124; string &#124; null&gt;</code> | Public runtime operation for eval. |
| `set` | method | <code>set(key: string, value: string, mode: "PX", ttlMs: number, condition: "NX"): Promise&lt;string &#124; null&gt;</code> | Sets set at this module boundary. |
