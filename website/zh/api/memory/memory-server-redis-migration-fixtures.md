# `@codesoul-co/hypha-memory` / `memory-server-redis-migration-fixtures`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-redis-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)
- 导出数: **9**

## 模块用法

用于编写确定性测试与契约断言。Memory server redis migration fixtures 模块公开 2 类、1 常量、2 函数、2 接口、2 类型。

### 从包入口导入

```ts
import {
  InMemoryRedisStreamMigrationClient,
  InMemoryWorkingMemoryMigrationPort,
  redisWorkingMemoryBoundaryCases,
  createInMemoryWorkingMemoryMigrationHarness,
  createRedisStreamWorkingMemoryMigrationHarness,
} from '@codesoul-co/hypha-memory';

import type {
  RedisWorkingMemoryBoundaryCase,
  WorkingMemoryMigrationAcceptanceHarness,
  RedisMigrationCommand,
  WorkingMemoryMigrationHarnessFactory,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRedisStreamMigrationClient` | 类 | <code>new InMemoryRedisStreamMigrationClient(): InMemoryRedisStreamMigrationClient</code> | In Memory Redis Stream Migration Client 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryWorkingMemoryMigrationPort` | 类 | <code>new InMemoryWorkingMemoryMigrationPort(storage?: Map&lt;string, WorkingMemoryMigrationEntry&lt;unknown&gt;[]&gt;): InMemoryWorkingMemoryMigrationPort</code> | In Memory Working Memory Migration Port 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `redisWorkingMemoryBoundaryCases` | 常量 | <code>const redisWorkingMemoryBoundaryCases: readonly RedisWorkingMemoryBoundaryCase[]</code> | 由 `memory-server-redis-migration-fixtures` 模块导出的 Redis Working Memory Boundary Cases 常量。 |
| `createInMemoryWorkingMemoryMigrationHarness` | 函数 | <code>createInMemoryWorkingMemoryMigrationHarness(): WorkingMemoryMigrationAcceptanceHarness</code> | Create In Memory Working Memory Migration Harness 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createRedisStreamWorkingMemoryMigrationHarness` | 函数 | <code>createRedisStreamWorkingMemoryMigrationHarness(fixtureId: string, client?: InMemoryRedisStreamMigrationClient): WorkingMemoryMigrationAcceptanceHarness &amp; { client: InMemoryRedisStreamMigrationClient; }</code> | Create Redis Stream Working Memory Migration Harness 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `RedisWorkingMemoryBoundaryCase` | 接口 | <code>interface RedisWorkingMemoryBoundaryCase</code> | Redis Working Memory Boundary Case 接口，共包含 6 个公开字段或方法。 |
| `WorkingMemoryMigrationAcceptanceHarness` | 接口 | <code>interface WorkingMemoryMigrationAcceptanceHarness</code> | Working Memory Migration Acceptance Harness 接口，共包含 2 个公开字段或方法。 |
| `RedisMigrationCommand` | 类型 | <code>type RedisMigrationCommand = { name: 'XADD'; key: string; } &#124; { name: 'XTRIM'; key: string; strategy: 'MAXLEN'; threshold: number; } &#124; { name: 'XRANGE'; key: string; start: '-'; end: '+'; } &#124; { name: 'XREVRANGE'; key: string; end: '+'; start: '-'; count: 1; } &#124; { name: 'SCAN'; cursor: string; pattern: string; count: number; } &#124; { name: 'DEL'; keys: string[]; }</code> | Redis Migration Command 公共类型别名；完整类型表达式见声明。 |
| `WorkingMemoryMigrationHarnessFactory` | 类型 | <code>type WorkingMemoryMigrationHarnessFactory = (fixtureId: string) =&gt; WorkingMemoryMigrationAcceptanceHarness</code> | Working Memory Migration Harness Factory 公共类型别名；完整类型表达式见声明。 |

## `InMemoryRedisStreamMigrationClient`

In Memory Redis Stream Migration Client 类，共公开 10 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryRedisStreamMigrationClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### 声明

```text
export declare class InMemoryRedisStreamMigrationClient implements RedisStreamMigrationClient {
    readonly commands: RedisMigrationCommand[];
    xadd(key: string, _id: '*', field: 'entry', value: string): Promise<string>;
    xtrim(key: string, strategy: 'MAXLEN', threshold: number): Promise<number>;
    xrange(key: string, start: '-', end: '+'): Promise<Array<[string, string[]]>>;
    xrevrange(key: string, end: '+', start: '-', _countToken: 'COUNT', count: 1): Promise<Array<[string, string[]]>>;
    scan(cursor: string, _matchToken: 'MATCH', pattern: string, _countToken: 'COUNT', count: number): Promise<[string, string[]]>;
    del(...keys: string[]): Promise<number>;
    seedStream(key: string): void;
    repeatScanCursor(cursor: string): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commands` | 属性 | <code>readonly commands: RedisMigrationCommand[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryRedisStreamMigrationClient</code> | 创建该类的实例。 |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `repeatScanCursor` | 方法 | <code>repeatScanCursor(cursor: string): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scan` | 方法 | <code>scan(cursor: string, _matchToken: "MATCH", pattern: string, _countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `seedStream` | 方法 | <code>seedStream(key: string): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `xadd` | 方法 | <code>xadd(key: string, _id: "*", field: "entry", value: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `xrange` | 方法 | <code>xrange(key: string, start: "-", end: "+"): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `xrevrange` | 方法 | <code>xrevrange(key: string, end: "+", start: "-", _countToken: "COUNT", count: 1): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `xtrim` | 方法 | <code>xtrim(key: string, strategy: "MAXLEN", threshold: number): Promise&lt;number&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryWorkingMemoryMigrationPort`

In Memory Working Memory Migration Port 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryWorkingMemoryMigrationPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### 声明

```text
export declare class InMemoryWorkingMemoryMigrationPort implements WorkingMemoryMigrationPort {
    constructor(storage?: Map<string, WorkingMemoryMigrationEntry<unknown>[]>);
    append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryMigrationEntry<TValue>>>;
    latest<TValue = unknown>(scope: ManagedMemoryScope): Promise<WorkingMemoryMigrationEntry<TValue> | null>;
    clearScope(scope: ManagedMemoryScope, _budget?: Partial<RedisScanBudget>): Promise<RedisScanReport>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope, _budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(storage?: Map&lt;string, WorkingMemoryMigrationEntry&lt;unknown&gt;[]&gt;): InMemoryWorkingMemoryMigrationPort</code> | 创建该类的实例。 |
| `latest` | 方法 | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `redisWorkingMemoryBoundaryCases`

由 `memory-server-redis-migration-fixtures` 模块导出的 Redis Working Memory Boundary Cases 常量。

- 种类: 常量
- 导入: `import { redisWorkingMemoryBoundaryCases } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### 声明

```text
export declare const redisWorkingMemoryBoundaryCases: readonly RedisWorkingMemoryBoundaryCase[];
```

## `createInMemoryWorkingMemoryMigrationHarness`

Create In Memory Working Memory Migration Harness 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createInMemoryWorkingMemoryMigrationHarness } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### 声明

```text
export declare function createInMemoryWorkingMemoryMigrationHarness(): WorkingMemoryMigrationAcceptanceHarness;
```

### 调用签名

```text
createInMemoryWorkingMemoryMigrationHarness(): WorkingMemoryMigrationAcceptanceHarness
```

#### 参数

无参数。

#### 返回值

- 类型: `WorkingMemoryMigrationAcceptanceHarness`
- 说明: 返回值契约由上述类型定义。

## `createRedisStreamWorkingMemoryMigrationHarness`

Create Redis Stream Working Memory Migration Harness 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createRedisStreamWorkingMemoryMigrationHarness } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### 声明

```text
export declare function createRedisStreamWorkingMemoryMigrationHarness(fixtureId: string, client?: InMemoryRedisStreamMigrationClient): WorkingMemoryMigrationAcceptanceHarness & {
    client: InMemoryRedisStreamMigrationClient;
};
```

### 调用签名

```text
createRedisStreamWorkingMemoryMigrationHarness(fixtureId: string, client?: InMemoryRedisStreamMigrationClient): WorkingMemoryMigrationAcceptanceHarness & { client: InMemoryRedisStreamMigrationClient; }
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `fixtureId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `client` | <code>InMemoryRedisStreamMigrationClient</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkingMemoryMigrationAcceptanceHarness & { client: InMemoryRedisStreamMigrationClient; }`
- 说明: 返回值契约由上述类型定义。

## `RedisWorkingMemoryBoundaryCase`

Redis Working Memory Boundary Case 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisWorkingMemoryBoundaryCase } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### 声明

```text
export interface RedisWorkingMemoryBoundaryCase {
    id: string;
    preloadCount: number;
    appendCount: number;
    maxMessages: number;
    concurrent: boolean;
    exactOrder: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appendCount` | 属性 | <code>appendCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `concurrent` | 属性 | <code>concurrent: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exactOrder` | 属性 | <code>exactOrder: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMessages` | 属性 | <code>maxMessages: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preloadCount` | 属性 | <code>preloadCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkingMemoryMigrationAcceptanceHarness`

Working Memory Migration Acceptance Harness 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkingMemoryMigrationAcceptanceHarness } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### 声明

```text
export interface WorkingMemoryMigrationAcceptanceHarness {
    port: WorkingMemoryMigrationPort;
    restart(): WorkingMemoryMigrationPort;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `port` | 属性 | <code>port: WorkingMemoryMigrationPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `restart` | 方法 | <code>restart(): WorkingMemoryMigrationPort</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RedisMigrationCommand`

Redis Migration Command 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RedisMigrationCommand } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### 声明

```text
export type RedisMigrationCommand = {
    name: 'XADD';
    key: string;
} | {
    name: 'XTRIM';
    key: string;
    strategy: 'MAXLEN';
    threshold: number;
} | {
    name: 'XRANGE';
    key: string;
    start: '-';
    end: '+';
} | {
    name: 'XREVRANGE';
    key: string;
    end: '+';
    start: '-';
    count: 1;
} | {
    name: 'SCAN';
    cursor: string;
    pattern: string;
    count: number;
} | {
    name: 'DEL';
    keys: string[];
};
```

## `WorkingMemoryMigrationHarnessFactory`

Working Memory Migration Harness Factory 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkingMemoryMigrationHarnessFactory } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### 声明

```text
export type WorkingMemoryMigrationHarnessFactory = (fixtureId: string) => WorkingMemoryMigrationAcceptanceHarness;
```
