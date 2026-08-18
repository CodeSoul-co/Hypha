# `@codesoul-co/hypha-memory` / `memory-server-redis-migration`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-redis-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)
- Exports: **9**

## Using this module

Use the Memory server redis migration module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 function, 7 interfaces.

### Import from the package entrypoint

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

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RedisStreamWorkingMemoryMigrationAdapter` | class | <code>new RedisStreamWorkingMemoryMigrationAdapter(options: RedisStreamWorkingMemoryMigrationAdapterOptions): RedisStreamWorkingMemoryMigrationAdapter</code> | Redis Stream adapter used by dev to execute the Framework-owned migration acceptance suite. |
| `scanRedisWorkingMemoryKeys` | function | <code>scanRedisWorkingMemoryKeys(client: Pick&lt;RedisStreamMigrationClient, "scan"&gt;, pattern: string, budget?: RedisScanBudget, nowMs?: () =&gt; number): Promise&lt;RedisScanReport&gt;</code> | Scan Redis Working Memory Keys function with 1 public call signature; parameters and return types are listed below. |
| `RedisScanBudget` | interface | <code>interface RedisScanBudget</code> | Redis Scan Budget interface with 4 public fields or methods. |
| `RedisScanReport` | interface | <code>interface RedisScanReport</code> | Redis Scan Report interface with 3 public fields or methods. |
| `RedisStreamMigrationClient` | interface | <code>interface RedisStreamMigrationClient</code> | Redis Stream Migration Client interface with 6 public fields or methods. |
| `RedisStreamWorkingMemoryMigrationAdapterOptions` | interface | <code>interface RedisStreamWorkingMemoryMigrationAdapterOptions</code> | Redis Stream Working Memory Migration Adapter Options interface with 4 public fields or methods. |
| `WorkingMemoryMigrationAppend` | interface | <code>interface WorkingMemoryMigrationAppend</code> | Working Memory Migration Append interface with 5 public fields or methods. |
| `WorkingMemoryMigrationEntry` | interface | <code>interface WorkingMemoryMigrationEntry</code> | Working Memory Migration Entry interface with 4 public fields or methods. |
| `WorkingMemoryMigrationPort` | interface | <code>interface WorkingMemoryMigrationPort</code> | Working Memory Migration Port interface with 4 public fields or methods. |

## `RedisStreamWorkingMemoryMigrationAdapter`

Redis Stream adapter used by dev to execute the Framework-owned migration acceptance suite.

- Kind: class
- Import: `import { RedisStreamWorkingMemoryMigrationAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### Declaration

```text
export declare class RedisStreamWorkingMemoryMigrationAdapter implements WorkingMemoryMigrationPort {
    constructor(options: RedisStreamWorkingMemoryMigrationAdapterOptions);
    append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryMigrationEntry<TValue>>>;
    latest<TValue = unknown>(scope: ManagedMemoryScope): Promise<WorkingMemoryMigrationEntry<TValue> | null>;
    clearScope(scope: ManagedMemoryScope, budget?: Partial<RedisScanBudget>): Promise<RedisScanReport>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope, budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: RedisStreamWorkingMemoryMigrationAdapterOptions): RedisStreamWorkingMemoryMigrationAdapter</code> | Creates an instance of this class. |
| `latest` | method | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `scanRedisWorkingMemoryKeys`

Scan Redis Working Memory Keys function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { scanRedisWorkingMemoryKeys } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### Declaration

```text
export declare function scanRedisWorkingMemoryKeys(client: Pick<RedisStreamMigrationClient, 'scan'>, pattern: string, budget?: RedisScanBudget, nowMs?: () => number): Promise<RedisScanReport>;
```

### Call signature

```text
scanRedisWorkingMemoryKeys(client: Pick<RedisStreamMigrationClient, "scan">, pattern: string, budget?: RedisScanBudget, nowMs?: () => number): Promise<RedisScanReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client` | <code>Pick&lt;RedisStreamMigrationClient, "scan"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `pattern` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `budget` | <code>RedisScanBudget</code> | No | Optional parameter; accepted values are defined by the type column. |
| `nowMs` | <code>() =&gt; number</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<RedisScanReport>`
- Description: The return contract is defined by the type shown above.

## `RedisScanBudget`

Redis Scan Budget interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RedisScanBudget } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### Declaration

```text
export interface RedisScanBudget {
    maxCalls: number;
    maxItems: number;
    maxDurationMs: number;
    count: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `count` | property | <code>count: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCalls` | property | <code>maxCalls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDurationMs` | property | <code>maxDurationMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxItems` | property | <code>maxItems: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RedisScanReport`

Redis Scan Report interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RedisScanReport } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### Declaration

```text
export interface RedisScanReport {
    keys: string[];
    calls: number;
    terminated: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `calls` | property | <code>calls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `keys` | property | <code>keys: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminated` | property | <code>terminated: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RedisStreamMigrationClient`

Redis Stream Migration Client interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RedisStreamMigrationClient } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `scan` | method | <code>scan(cursor: string, matchToken: "MATCH", pattern: string, countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `xadd` | method | <code>xadd(key: string, id: "*", field: "entry", value: string): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `xrange` | method | <code>xrange(key: string, start: "-", end: "+"): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `xrevrange` | method | <code>xrevrange(key: string, end: "+", start: "-", countToken: "COUNT", count: 1): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `xtrim` | method | <code>xtrim(key: string, strategy: "MAXLEN", threshold: number): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RedisStreamWorkingMemoryMigrationAdapterOptions`

Redis Stream Working Memory Migration Adapter Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RedisStreamWorkingMemoryMigrationAdapterOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### Declaration

```text
export interface RedisStreamWorkingMemoryMigrationAdapterOptions {
    client: RedisStreamMigrationClient;
    namespace?: string;
    scanBudget?: Partial<RedisScanBudget>;
    nowMs?: () => number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisStreamMigrationClient</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `namespace` | property | <code>namespace?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nowMs` | method | <code>nowMs?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `scanBudget` | property | <code>scanBudget?: Partial&lt;RedisScanBudget&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkingMemoryMigrationAppend`

Working Memory Migration Append interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { WorkingMemoryMigrationAppend } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### Declaration

```text
export interface WorkingMemoryMigrationAppend<TValue = unknown> {
    id: string;
    scope: ManagedMemoryScope;
    value: TValue;
    createdAt: string;
    maxMessages: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMessages` | property | <code>maxMessages: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: TValue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkingMemoryMigrationEntry`

Working Memory Migration Entry interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { WorkingMemoryMigrationEntry } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### Declaration

```text
export interface WorkingMemoryMigrationEntry<TValue = unknown> {
    id: string;
    scopeHash: string;
    value: TValue;
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: TValue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkingMemoryMigrationPort`

Working Memory Migration Port interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { WorkingMemoryMigrationPort } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)

### Declaration

```text
export interface WorkingMemoryMigrationPort {
    append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryMigrationEntry<TValue>>>;
    latest<TValue = unknown>(scope: ManagedMemoryScope): Promise<WorkingMemoryMigrationEntry<TValue> | null>;
    clearScope(scope: ManagedMemoryScope, budget?: Partial<RedisScanBudget>): Promise<RedisScanReport>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope, budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `latest` | method | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
