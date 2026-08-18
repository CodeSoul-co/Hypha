# `@codesoul-co/hypha-mcp` / `coordination`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 源码: [`packages/mcp/src/coordination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)
- 导出数: **4**

## 模块用法

用于使用该功能边界的公共契约与操作。Coordination 模块公开 1 类、3 接口。

### 从包入口导入

```ts
import {
  RedisMCPReconnectCoordinator,
} from '@codesoul-co/hypha-mcp';

import type {
  MCPReconnectCoordinator,
  MCPReconnectLease,
  RedisLikeMCPLeaseClient,
} from '@codesoul-co/hypha-mcp';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RedisMCPReconnectCoordinator` | 类 | <code>new RedisMCPReconnectCoordinator(client: RedisLikeMCPLeaseClient, namespace?: string, now?: () =&gt; number): RedisMCPReconnectCoordinator</code> | A per-server Redis lease that prevents reconnect storms across workers. |
| `MCPReconnectCoordinator` | 接口 | <code>interface MCPReconnectCoordinator</code> | MCP Reconnect Coordinator 接口，共包含 1 个公开字段或方法。 |
| `MCPReconnectLease` | 接口 | <code>interface MCPReconnectLease</code> | MCP Reconnect Lease 接口，共包含 6 个公开字段或方法。 |
| `RedisLikeMCPLeaseClient` | 接口 | <code>interface RedisLikeMCPLeaseClient</code> | Redis Like MCP Lease Client 接口，共包含 2 个公开字段或方法。 |

## `RedisMCPReconnectCoordinator`

A per-server Redis lease that prevents reconnect storms across workers.

- 种类: 类
- 导入: `import { RedisMCPReconnectCoordinator } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)

### 声明

```text
export declare class RedisMCPReconnectCoordinator implements MCPReconnectCoordinator {
    constructor(client: RedisLikeMCPLeaseClient, namespace?: string, now?: () => number);
    acquire(input: {
            serverId: string;
            ownerId: string;
            ttlMs: number;
        }): Promise<MCPReconnectLease | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(input: { serverId: string; ownerId: string; ttlMs: number; }): Promise&lt;MCPReconnectLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(client: RedisLikeMCPLeaseClient, namespace?: string, now?: () =&gt; number): RedisMCPReconnectCoordinator</code> | 创建该类的实例。 |

## `MCPReconnectCoordinator`

MCP Reconnect Coordinator 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPReconnectCoordinator } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)

### 声明

```text
export interface MCPReconnectCoordinator {
    acquire(input: {
        serverId: string;
        ownerId: string;
        ttlMs: number;
    }): Promise<MCPReconnectLease | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(input: { serverId: string; ownerId: string; ttlMs: number; }): Promise&lt;MCPReconnectLease &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPReconnectLease`

MCP Reconnect Lease 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPReconnectLease } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)

### 声明

```text
export interface MCPReconnectLease {
    serverId: string;
    ownerId: string;
    fencingToken: string;
    expiresAt: string;
    assertCurrent(): Promise<void>;
    release(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertCurrent` | 方法 | <code>assertCurrent(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `release` | 方法 | <code>release(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RedisLikeMCPLeaseClient`

Redis Like MCP Lease Client 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisLikeMCPLeaseClient } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)

### 声明

```text
export interface RedisLikeMCPLeaseClient {
    set(key: string, value: string, mode: 'PX', ttlMs: number, condition: 'NX'): Promise<string | null>;
    eval(script: string, numberOfKeys: number, ...args: Array<string | number>): Promise<number | string | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eval` | 方法 | <code>eval(script: string, numberOfKeys: number, ...args: Array&lt;string &#124; number&gt;): Promise&lt;number &#124; string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, value: string, mode: "PX", ttlMs: number, condition: "NX"): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
