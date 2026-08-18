# `@codesoul-co/hypha-memory` / `memory-server-redis-migration`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-redis-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)
- 导出数: **9**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory server redis migration 模块公开 1 类、1 函数、7 接口。

### 从包入口导入

```ts
import {
  RedisStreamWorkingMemoryMigrationAdapter,
  scanRedisWorkingMemoryKeys,
} from '@codesoul-co/hypha-memory';

import type {
  RedisScanBudget,
  RedisScanReport,
  RedisStreamMigrationClient,
  RedisStreamWorkingMemoryMigrationAdapterOptions,
  WorkingMemoryMigrationAppend,
  WorkingMemoryMigrationEntry,
  WorkingMemoryMigrationPort,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RedisStreamWorkingMemoryMigrationAdapter` | 类 | <code>new RedisStreamWorkingMemoryMigrationAdapter(options: RedisStreamWorkingMemoryMigrationAdapterOptions): RedisStreamWorkingMemoryMigrationAdapter</code> | Redis Stream adapter used by dev to execute the Framework-owned migration acceptance suite. |
| `scanRedisWorkingMemoryKeys` | 函数 | <code>scanRedisWorkingMemoryKeys(client: Pick&lt;RedisStreamMigrationClient, "scan"&gt;, pattern: string, budget?: RedisScanBudget, nowMs?: () =&gt; number): Promise&lt;RedisScanReport&gt;</code> | Scan Redis Working Memory Keys 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `RedisScanBudget` | 接口 | <code>interface RedisScanBudget</code> | Redis Scan Budget 接口，共包含 4 个公开字段或方法。 |
| `RedisScanReport` | 接口 | <code>interface RedisScanReport</code> | Redis Scan Report 接口，共包含 3 个公开字段或方法。 |
| `RedisStreamMigrationClient` | 接口 | <code>interface RedisStreamMigrationClient</code> | Redis Stream Migration Client 接口，共包含 6 个公开字段或方法。 |
| `RedisStreamWorkingMemoryMigrationAdapterOptions` | 接口 | <code>interface RedisStreamWorkingMemoryMigrationAdapterOptions</code> | Redis Stream Working Memory Migration Adapter Options 接口，共包含 4 个公开字段或方法。 |
| `WorkingMemoryMigrationAppend` | 接口 | <code>interface WorkingMemoryMigrationAppend</code> | Working Memory Migration Append 接口，共包含 5 个公开字段或方法。 |
| `WorkingMemoryMigrationEntry` | 接口 | <code>interface WorkingMemoryMigrationEntry</code> | Working Memory Migration Entry 接口，共包含 4 个公开字段或方法。 |
| `WorkingMemoryMigrationPort` | 接口 | <code>interface WorkingMemoryMigrationPort</code> | Working Memory Migration Port 接口，共包含 4 个公开字段或方法。 |

## `RedisStreamWorkingMemoryMigrationAdapter`

Redis Stream adapter used by dev to execute the Framework-owned migration acceptance suite.

- 种类: 类
- 导入: `import { RedisStreamWorkingMemoryMigrationAdapter } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### 声明

```text
export declare class RedisStreamWorkingMemoryMigrationAdapter implements WorkingMemoryMigrationPort {
    constructor(options: RedisStreamWorkingMemoryMigrationAdapterOptions);
    append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryMigrationEntry<TValue>>>;
    latest<TValue = unknown>(scope: ManagedMemoryScope): Promise<WorkingMemoryMigrationEntry<TValue> | null>;
    clearScope(scope: ManagedMemoryScope, budget?: Partial<RedisScanBudget>): Promise<RedisScanReport>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope, budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: RedisStreamWorkingMemoryMigrationAdapterOptions): RedisStreamWorkingMemoryMigrationAdapter</code> | 创建该类的实例。 |
| `latest` | 方法 | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `scanRedisWorkingMemoryKeys`

Scan Redis Working Memory Keys 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { scanRedisWorkingMemoryKeys } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### 声明

```text
export declare function scanRedisWorkingMemoryKeys(client: Pick<RedisStreamMigrationClient, 'scan'>, pattern: string, budget?: RedisScanBudget, nowMs?: () => number): Promise<RedisScanReport>;
```

### 调用签名

```text
scanRedisWorkingMemoryKeys(client: Pick<RedisStreamMigrationClient, "scan">, pattern: string, budget?: RedisScanBudget, nowMs?: () => number): Promise<RedisScanReport>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `client` | <code>Pick&lt;RedisStreamMigrationClient, "scan"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `pattern` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `budget` | <code>RedisScanBudget</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `nowMs` | <code>() =&gt; number</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<RedisScanReport>`
- 说明: 返回值契约由上述类型定义。

## `RedisScanBudget`

Redis Scan Budget 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisScanBudget } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### 声明

```text
export interface RedisScanBudget {
    maxCalls: number;
    maxItems: number;
    maxDurationMs: number;
    count: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `count` | 属性 | <code>count: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCalls` | 属性 | <code>maxCalls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDurationMs` | 属性 | <code>maxDurationMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxItems` | 属性 | <code>maxItems: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RedisScanReport`

Redis Scan Report 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisScanReport } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### 声明

```text
export interface RedisScanReport {
    keys: string[];
    calls: number;
    terminated: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `calls` | 属性 | <code>calls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `keys` | 属性 | <code>keys: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminated` | 属性 | <code>terminated: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RedisStreamMigrationClient`

Redis Stream Migration Client 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisStreamMigrationClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### 声明

```text
export interface RedisStreamMigrationClient {
    xadd(key: string, id: '*', field: 'entry', value: string): Promise<string | null>;
    xtrim(key: string, strategy: 'MAXLEN', threshold: number): Promise<number>;
    xrange(key: string, start: '-', end: '+'): Promise<Array<[string, string[]]>>;
    xrevrange(key: string, end: '+', start: '-', countToken: 'COUNT', count: 1): Promise<Array<[string, string[]]>>;
    scan(cursor: string, matchToken: 'MATCH', pattern: string, countToken: 'COUNT', count: number): Promise<[string, string[]]>;
    del(...keys: string[]): Promise<number>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scan` | 方法 | <code>scan(cursor: string, matchToken: "MATCH", pattern: string, countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `xadd` | 方法 | <code>xadd(key: string, id: "*", field: "entry", value: string): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `xrange` | 方法 | <code>xrange(key: string, start: "-", end: "+"): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `xrevrange` | 方法 | <code>xrevrange(key: string, end: "+", start: "-", countToken: "COUNT", count: 1): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `xtrim` | 方法 | <code>xtrim(key: string, strategy: "MAXLEN", threshold: number): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisStreamWorkingMemoryMigrationAdapterOptions`

Redis Stream Working Memory Migration Adapter Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisStreamWorkingMemoryMigrationAdapterOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### 声明

```text
export interface RedisStreamWorkingMemoryMigrationAdapterOptions {
    client: RedisStreamMigrationClient;
    namespace?: string;
    scanBudget?: Partial<RedisScanBudget>;
    nowMs?: () => number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisStreamMigrationClient</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `namespace` | 属性 | <code>namespace?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nowMs` | 方法 | <code>nowMs?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scanBudget` | 属性 | <code>scanBudget?: Partial&lt;RedisScanBudget&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkingMemoryMigrationAppend`

Working Memory Migration Append 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkingMemoryMigrationAppend } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### 声明

```text
export interface WorkingMemoryMigrationAppend<TValue = unknown> {
    id: string;
    scope: ManagedMemoryScope;
    value: TValue;
    createdAt: string;
    maxMessages: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMessages` | 属性 | <code>maxMessages: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: TValue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkingMemoryMigrationEntry`

Working Memory Migration Entry 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkingMemoryMigrationEntry } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### 声明

```text
export interface WorkingMemoryMigrationEntry<TValue = unknown> {
    id: string;
    scopeHash: string;
    value: TValue;
    createdAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: TValue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkingMemoryMigrationPort`

Working Memory Migration Port 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkingMemoryMigrationPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### 声明

```text
export interface WorkingMemoryMigrationPort {
    append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryMigrationEntry<TValue>>>;
    latest<TValue = unknown>(scope: ManagedMemoryScope): Promise<WorkingMemoryMigrationEntry<TValue> | null>;
    clearScope(scope: ManagedMemoryScope, budget?: Partial<RedisScanBudget>): Promise<RedisScanReport>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope, budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `latest` | 方法 | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
