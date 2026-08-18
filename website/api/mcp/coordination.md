# `@codesoul-co/hypha-mcp` / `coordination`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Source: [`packages/mcp/src/coordination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)
- Exports: **4**

## Using this module

Use the Coordination module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 interfaces.

### Import from the package entrypoint

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

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RedisMCPReconnectCoordinator` | class | <code>new RedisMCPReconnectCoordinator(client: RedisLikeMCPLeaseClient, namespace?: string, now?: () =&gt; number): RedisMCPReconnectCoordinator</code> | A per-server Redis lease that prevents reconnect storms across workers. |
| `MCPReconnectCoordinator` | interface | <code>interface MCPReconnectCoordinator</code> | MCP Reconnect Coordinator interface with 1 public fields or methods. |
| `MCPReconnectLease` | interface | <code>interface MCPReconnectLease</code> | MCP Reconnect Lease interface with 6 public fields or methods. |
| `RedisLikeMCPLeaseClient` | interface | <code>interface RedisLikeMCPLeaseClient</code> | Redis Like MCP Lease Client interface with 2 public fields or methods. |

## `RedisMCPReconnectCoordinator`

A per-server Redis lease that prevents reconnect storms across workers.

- Kind: class
- Import: `import { RedisMCPReconnectCoordinator } from '@codesoul-co/hypha-mcp';`
- Source module: [`coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(input: { serverId: string; ownerId: string; ttlMs: number; }): Promise&lt;MCPReconnectLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(client: RedisLikeMCPLeaseClient, namespace?: string, now?: () =&gt; number): RedisMCPReconnectCoordinator</code> | Creates an instance of this class. |

## `MCPReconnectCoordinator`

MCP Reconnect Coordinator interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MCPReconnectCoordinator } from '@codesoul-co/hypha-mcp';`
- Source module: [`coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)

### Declaration

```text
export interface MCPReconnectCoordinator {
    acquire(input: {
        serverId: string;
        ownerId: string;
        ttlMs: number;
    }): Promise<MCPReconnectLease | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(input: { serverId: string; ownerId: string; ttlMs: number; }): Promise&lt;MCPReconnectLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MCPReconnectLease`

MCP Reconnect Lease interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MCPReconnectLease } from '@codesoul-co/hypha-mcp';`
- Source module: [`coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertCurrent` | method | <code>assertCurrent(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `release` | method | <code>release(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RedisLikeMCPLeaseClient`

Redis Like MCP Lease Client interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RedisLikeMCPLeaseClient } from '@codesoul-co/hypha-mcp';`
- Source module: [`coordination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts)

### Declaration

```text
export interface RedisLikeMCPLeaseClient {
    set(key: string, value: string, mode: 'PX', ttlMs: number, condition: 'NX'): Promise<string | null>;
    eval(script: string, numberOfKeys: number, ...args: Array<string | number>): Promise<number | string | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eval` | method | <code>eval(script: string, numberOfKeys: number, ...args: Array&lt;string &#124; number&gt;): Promise&lt;number &#124; string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, value: string, mode: "PX", ttlMs: number, condition: "NX"): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
