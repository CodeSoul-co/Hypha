# `@codesoul-co/hypha-mcp` / `coordination`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 模块指南: [学习与组合说明](/zh/packages/mcp)
- 源码: [`packages/mcp/src/coordination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RedisMCPReconnectCoordinator` | 类 | <code>new RedisMCPReconnectCoordinator(client: RedisLikeMCPLeaseClient, namespace?: string, now?: () =&gt; number): RedisMCPReconnectCoordinator</code> | A per-server Redis lease that prevents reconnect storms across workers. |
| `MCPReconnectCoordinator` | 接口 | <code>interface MCPReconnectCoordinator</code> | MCP Reconnect Coordinator 的字段契约；完整字段见下表。 |
| `MCPReconnectLease` | 接口 | <code>interface MCPReconnectLease</code> | MCP Reconnect Lease 的字段契约；完整字段见下表。 |
| `RedisLikeMCPLeaseClient` | 接口 | <code>interface RedisLikeMCPLeaseClient</code> | Redis Like MCP Lease Client 的字段契约；完整字段见下表。 |

## `RedisMCPReconnectCoordinator` 公开成员

A per-server Redis lease that prevents reconnect storms across workers.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(input: { serverId: string; ownerId: string; ttlMs: number; }): Promise&lt;MCPReconnectLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(client: RedisLikeMCPLeaseClient, namespace?: string, now?: () =&gt; number): RedisMCPReconnectCoordinator</code> | 创建该类的实例。 |

## `MCPReconnectCoordinator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(input: { serverId: string; ownerId: string; ttlMs: number; }): Promise&lt;MCPReconnectLease &#124; null&gt;</code> | acquire 的公开运行时操作。 |

## `MCPReconnectLease` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertCurrent` | 方法 | <code>assertCurrent(): Promise&lt;void&gt;</code> | 断言 Current。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: string</code> | fencing Token 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `release` | 方法 | <code>release(): Promise&lt;void&gt;</code> | release 的公开运行时操作。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |

## `RedisLikeMCPLeaseClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eval` | 方法 | <code>eval(script: string, numberOfKeys: number, ...args: Array&lt;string &#124; number&gt;): Promise&lt;number &#124; string &#124; null&gt;</code> | eval 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, value: string, mode: "PX", ttlMs: number, condition: "NX"): Promise&lt;string &#124; null&gt;</code> | 写入 set。 |
