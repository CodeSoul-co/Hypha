# `@codesoul-co/hypha-memory` / `memory-server-redis-migration-fixtures`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-redis-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)
- Exports: **9**

## Using this module

Use the Memory server redis migration fixtures module for writing deterministic tests and contract assertions. It exports 2 classes, 1 constant, 2 functions, 2 interfaces, 2 types.

### Import from the package entrypoint

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

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRedisStreamMigrationClient` | class | <code>new InMemoryRedisStreamMigrationClient(): InMemoryRedisStreamMigrationClient</code> | In Memory Redis Stream Migration Client class with 10 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryWorkingMemoryMigrationPort` | class | <code>new InMemoryWorkingMemoryMigrationPort(storage?: Map&lt;string, WorkingMemoryMigrationEntry&lt;unknown&gt;[]&gt;): InMemoryWorkingMemoryMigrationPort</code> | In Memory Working Memory Migration Port class with 5 public constructor or member entries; its exact declarations are listed below. |
| `redisWorkingMemoryBoundaryCases` | constant | <code>const redisWorkingMemoryBoundaryCases: readonly RedisWorkingMemoryBoundaryCase[]</code> | Redis Working Memory Boundary Cases constant exported by the `memory-server-redis-migration-fixtures` module. |
| `createInMemoryWorkingMemoryMigrationHarness` | function | <code>createInMemoryWorkingMemoryMigrationHarness(): WorkingMemoryMigrationAcceptanceHarness</code> | Create In Memory Working Memory Migration Harness function with 1 public call signature; parameters and return types are listed below. |
| `createRedisStreamWorkingMemoryMigrationHarness` | function | <code>createRedisStreamWorkingMemoryMigrationHarness(fixtureId: string, client?: InMemoryRedisStreamMigrationClient): WorkingMemoryMigrationAcceptanceHarness &amp; { client: InMemoryRedisStreamMigrationClient; }</code> | Create Redis Stream Working Memory Migration Harness function with 1 public call signature; parameters and return types are listed below. |
| `RedisWorkingMemoryBoundaryCase` | interface | <code>interface RedisWorkingMemoryBoundaryCase</code> | Redis Working Memory Boundary Case interface with 6 public fields or methods. |
| `WorkingMemoryMigrationAcceptanceHarness` | interface | <code>interface WorkingMemoryMigrationAcceptanceHarness</code> | Working Memory Migration Acceptance Harness interface with 2 public fields or methods. |
| `RedisMigrationCommand` | type | <code>type RedisMigrationCommand = { name: 'XADD'; key: string; } &#124; { name: 'XTRIM'; key: string; strategy: 'MAXLEN'; threshold: number; } &#124; { name: 'XRANGE'; key: string; start: '-'; end: '+'; } &#124; { name: 'XREVRANGE'; key: string; end: '+'; start: '-'; count: 1; } &#124; { name: 'SCAN'; cursor: string; pattern: string; count: number; } &#124; { name: 'DEL'; keys: string[]; }</code> | Public type alias for Redis Migration Command; the declaration contains its complete type expression. |
| `WorkingMemoryMigrationHarnessFactory` | type | <code>type WorkingMemoryMigrationHarnessFactory = (fixtureId: string) =&gt; WorkingMemoryMigrationAcceptanceHarness</code> | Public type alias for Working Memory Migration Harness Factory; the declaration contains its complete type expression. |

## `InMemoryRedisStreamMigrationClient`

In Memory Redis Stream Migration Client class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryRedisStreamMigrationClient } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commands` | property | <code>readonly commands: RedisMigrationCommand[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryRedisStreamMigrationClient</code> | Creates an instance of this class. |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `repeatScanCursor` | method | <code>repeatScanCursor(cursor: string): void</code> | Public method; parameters and return type are shown in the signature. |
| `scan` | method | <code>scan(cursor: string, _matchToken: "MATCH", pattern: string, _countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `seedStream` | method | <code>seedStream(key: string): void</code> | Public method; parameters and return type are shown in the signature. |
| `xadd` | method | <code>xadd(key: string, _id: "*", field: "entry", value: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `xrange` | method | <code>xrange(key: string, start: "-", end: "+"): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `xrevrange` | method | <code>xrevrange(key: string, end: "+", start: "-", _countToken: "COUNT", count: 1): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `xtrim` | method | <code>xtrim(key: string, strategy: "MAXLEN", threshold: number): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryWorkingMemoryMigrationPort`

In Memory Working Memory Migration Port class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryWorkingMemoryMigrationPort } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### Declaration

```text
export declare class InMemoryWorkingMemoryMigrationPort implements WorkingMemoryMigrationPort {
    constructor(storage?: Map<string, WorkingMemoryMigrationEntry<unknown>[]>);
    append<TValue = unknown>(input: WorkingMemoryMigrationAppend<TValue>): Promise<void>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<Array<WorkingMemoryMigrationEntry<TValue>>>;
    latest<TValue = unknown>(scope: ManagedMemoryScope): Promise<WorkingMemoryMigrationEntry<TValue> | null>;
    clearScope(scope: ManagedMemoryScope, _budget?: Partial<RedisScanBudget>): Promise<RedisScanReport>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope, _budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(storage?: Map&lt;string, WorkingMemoryMigrationEntry&lt;unknown&gt;[]&gt;): InMemoryWorkingMemoryMigrationPort</code> | Creates an instance of this class. |
| `latest` | method | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `redisWorkingMemoryBoundaryCases`

Redis Working Memory Boundary Cases constant exported by the `memory-server-redis-migration-fixtures` module.

- Kind: constant
- Import: `import { redisWorkingMemoryBoundaryCases } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### Declaration

```text
export declare const redisWorkingMemoryBoundaryCases: readonly RedisWorkingMemoryBoundaryCase[];
```

## `createInMemoryWorkingMemoryMigrationHarness`

Create In Memory Working Memory Migration Harness function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createInMemoryWorkingMemoryMigrationHarness } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### Declaration

```text
export declare function createInMemoryWorkingMemoryMigrationHarness(): WorkingMemoryMigrationAcceptanceHarness;
```

### Call signature

```text
createInMemoryWorkingMemoryMigrationHarness(): WorkingMemoryMigrationAcceptanceHarness
```

#### Parameters

No parameters.

#### Returns

- Type: `WorkingMemoryMigrationAcceptanceHarness`
- Description: The return contract is defined by the type shown above.

## `createRedisStreamWorkingMemoryMigrationHarness`

Create Redis Stream Working Memory Migration Harness function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createRedisStreamWorkingMemoryMigrationHarness } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### Declaration

```text
export declare function createRedisStreamWorkingMemoryMigrationHarness(fixtureId: string, client?: InMemoryRedisStreamMigrationClient): WorkingMemoryMigrationAcceptanceHarness & {
    client: InMemoryRedisStreamMigrationClient;
};
```

### Call signature

```text
createRedisStreamWorkingMemoryMigrationHarness(fixtureId: string, client?: InMemoryRedisStreamMigrationClient): WorkingMemoryMigrationAcceptanceHarness & { client: InMemoryRedisStreamMigrationClient; }
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `fixtureId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `client` | <code>InMemoryRedisStreamMigrationClient</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkingMemoryMigrationAcceptanceHarness & { client: InMemoryRedisStreamMigrationClient; }`
- Description: The return contract is defined by the type shown above.

## `RedisWorkingMemoryBoundaryCase`

Redis Working Memory Boundary Case interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RedisWorkingMemoryBoundaryCase } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appendCount` | property | <code>appendCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `concurrent` | property | <code>concurrent: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exactOrder` | property | <code>exactOrder: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMessages` | property | <code>maxMessages: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preloadCount` | property | <code>preloadCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkingMemoryMigrationAcceptanceHarness`

Working Memory Migration Acceptance Harness interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { WorkingMemoryMigrationAcceptanceHarness } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### Declaration

```text
export interface WorkingMemoryMigrationAcceptanceHarness {
    port: WorkingMemoryMigrationPort;
    restart(): WorkingMemoryMigrationPort;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `port` | property | <code>port: WorkingMemoryMigrationPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `restart` | method | <code>restart(): WorkingMemoryMigrationPort</code> | Public method; parameters and return type are shown in the signature. |

## `RedisMigrationCommand`

Public type alias for Redis Migration Command; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RedisMigrationCommand } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### Declaration

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

Public type alias for Working Memory Migration Harness Factory; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkingMemoryMigrationHarnessFactory } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)

### Declaration

```text
export type WorkingMemoryMigrationHarnessFactory = (fixtureId: string) => WorkingMemoryMigrationAcceptanceHarness;
```
