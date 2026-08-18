# `@codesoul-co/hypha-mcp` / `connection-manager`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Source: [`packages/mcp/src/connection-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)
- Exports: **18**

## Using this module

Use the Connection manager module for using the public contracts and operations for this capability boundary. It exports 2 classes, 4 constants, 2 functions, 9 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  MCPConnectionManager,
  SDKMCPConnectionSessionFactory,
  mcpConnectionRecordDefinition,
  mcpConnectionRecordExample,
  mcpConnectionRecordJsonSchema,
  mcpConnectionRecordSchema,
  assertRemoteEgressAllowed,
  createGuardedMCPFetch,
} from '@codesoul-co/hypha-mcp';

import type {
  GuardedMCPFetchOptions,
  MCPConnectionManagerOptions,
  MCPConnectionRecord,
  MCPConnectionSession,
  MCPConnectionSessionFactory,
  MCPConnectionStatus,
  MCPRemoteContentArtifact,
  MCPRemoteContentArtifactPort,
} from '@codesoul-co/hypha-mcp';

// The complete export list is documented below.
```

### Usage patterns

- Use the 10 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 4 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { mcpConnectionRecordSchema } from '@codesoul-co/hypha-mcp';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = mcpConnectionRecordSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MCPConnectionManager` | class | <code>new MCPConnectionManager(options: MCPConnectionManagerOptions): MCPConnectionManager</code> | MCP Connection Manager class with 16 public constructor or member entries; its exact declarations are listed below. |
| `SDKMCPConnectionSessionFactory` | class | <code>new SDKMCPConnectionSessionFactory(options?: SDKMCPConnectionSessionFactoryOptions): SDKMCPConnectionSessionFactory</code> | SDKMCP Connection Session Factory class with 2 public constructor or member entries; its exact declarations are listed below. |
| `mcpConnectionRecordDefinition` | constant | <code>const mcpConnectionRecordDefinition: SpecSchemaDefinition&lt;MCPConnectionRecord&gt;</code> | MCP Connection Record Definition constant exported by the `connection-manager` module. |
| `mcpConnectionRecordExample` | constant | <code>const mcpConnectionRecordExample: MCPConnectionRecord</code> | Valid example value for MCP Connection Record. |
| `mcpConnectionRecordJsonSchema` | constant | <code>const mcpConnectionRecordJsonSchema: JsonSchema</code> | JSON Schema for MCP Connection Record. |
| `mcpConnectionRecordSchema` | constant | <code>const mcpConnectionRecordSchema: z.ZodObject&lt;{ id: z.ZodString; serverId: z.ZodString; revision: z.ZodNumber; state: z.ZodEnum&lt;["disconnected", "starting", "initializing", "ready", "degraded", "reconnecting", "closing", "closed", "failed"]&gt;; transportType: z.ZodEnum&lt;["stdio", "streamable_http", "custom"]&gt;; negotiatedProtocolVersion: z.ZodOptional&lt;z.ZodString&gt;; clientInfo: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.Z...</code> | Runtime schema for MCP Connection Record. |
| `assertRemoteEgressAllowed` | function | <code>assertRemoteEgressAllowed(endpoint: string, policy: MCPServerProfile["egressPolicy"]): Promise&lt;void&gt;</code> | Assert Remote Egress Allowed function with 1 public call signature; parameters and return types are listed below. |
| `createGuardedMCPFetch` | function | <code>createGuardedMCPFetch(options?: GuardedMCPFetchOptions): MCPFetch</code> | Applies the remote MCP egress policy to every request and redirect hop. Credentials are resolved immediately before each request so rotations take effect without rebuilding declarative profiles. |
| `GuardedMCPFetchOptions` | interface | <code>interface GuardedMCPFetchOptions</code> | Guarded MCP Fetch Options interface with 4 public fields or methods. |
| `MCPConnectionManagerOptions` | interface | <code>interface MCPConnectionManagerOptions</code> | MCP Connection Manager Options interface with 12 public fields or methods. |
| `MCPConnectionRecord` | interface | <code>interface MCPConnectionRecord</code> | MCP Connection Record interface with 18 public fields or methods. |
| `MCPConnectionSession` | interface | <code>interface MCPConnectionSession</code> | MCP Connection Session interface with 9 public fields or methods. |
| `MCPConnectionSessionFactory` | interface | <code>interface MCPConnectionSessionFactory</code> | MCP Connection Session Factory interface with 1 public fields or methods. |
| `MCPConnectionStatus` | interface | <code>interface MCPConnectionStatus</code> | MCP Connection Status interface with 2 public fields or methods. |
| `MCPRemoteContentArtifact` | interface | <code>interface MCPRemoteContentArtifact</code> | MCP Remote Content Artifact interface with 3 public fields or methods. |
| `MCPRemoteContentArtifactPort` | interface | <code>interface MCPRemoteContentArtifactPort</code> | MCP Remote Content Artifact Port interface with 1 public fields or methods. |
| `SDKMCPConnectionSessionFactoryOptions` | interface | <code>interface SDKMCPConnectionSessionFactoryOptions</code> | SDKMCP Connection Session Factory Options interface with 5 public fields or methods. |
| `MCPConnectionState` | type | <code>type MCPConnectionState = 'disconnected' &#124; 'starting' &#124; 'initializing' &#124; 'ready' &#124; 'degraded' &#124; 'reconnecting' &#124; 'closing' &#124; 'closed' &#124; 'failed'</code> | Public type alias for MCP Connection State; the declaration contains its complete type expression. |

## `MCPConnectionManager`

MCP Connection Manager class with 16 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MCPConnectionManager } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export declare class MCPConnectionManager implements MCPGateway {
    constructor(options: MCPConnectionManagerOptions);
    onListChanged(listener: (serverId: string) => Promise<void> | void): () => void;
    register(profile: MCPServerProfile): MCPConnectionRecord;
    connect(serverId: string): Promise<MCPConnectionRecord>;
    get(serverId: string): Promise<MCPConnectionRecord | null>;
    status(serverId: string): Promise<MCPConnectionStatus>;
    health(serverId?: string): Promise<Record<string, ProviderHealth>>;
    reconnect(serverId: string): Promise<MCPConnectionRecord>;
    cancelRequest(requestId: string): Promise<void>;
    disconnect(serverId: string, reason?: string): Promise<void>;
    closeAll(): Promise<void>;
    discover(integration: MCPIntegrationSpec): Promise<MCPCapabilityDescriptor[]>;
    normalize(capability: MCPCapabilityDescriptor): Promise<NormalizedMCPCapability>;
    call(request: MCPToolCallRequest): Promise<unknown>;
    readResource(request: MCPResourceReadRequest): Promise<MCPResourceResult>;
    getPrompt(request: MCPPromptRequest): Promise<MCPPromptResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `call` | method | <code>call(request: MCPToolCallRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `cancelRequest` | method | <code>cancelRequest(requestId: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `closeAll` | method | <code>closeAll(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `connect` | method | <code>connect(serverId: string): Promise&lt;MCPConnectionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MCPConnectionManagerOptions): MCPConnectionManager</code> | Creates an instance of this class. |
| `disconnect` | method | <code>disconnect(serverId: string, reason?: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `discover` | method | <code>discover(integration: MCPIntegrationSpec): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(serverId: string): Promise&lt;MCPConnectionRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getPrompt` | method | <code>getPrompt(request: MCPPromptRequest): Promise&lt;MCPPromptResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(serverId?: string): Promise&lt;Record&lt;string, ProviderHealth&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `normalize` | method | <code>normalize(capability: MCPCapabilityDescriptor): Promise&lt;NormalizedMCPCapability&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `onListChanged` | method | <code>onListChanged(listener: (serverId: string) =&gt; Promise&lt;void&gt; &#124; void): () =&gt; void</code> | Public method; parameters and return type are shown in the signature. |
| `readResource` | method | <code>readResource(request: MCPResourceReadRequest): Promise&lt;MCPResourceResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reconnect` | method | <code>reconnect(serverId: string): Promise&lt;MCPConnectionRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(profile: MCPServerProfile): MCPConnectionRecord</code> | Public method; parameters and return type are shown in the signature. |
| `status` | method | <code>status(serverId: string): Promise&lt;MCPConnectionStatus&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SDKMCPConnectionSessionFactory`

SDKMCP Connection Session Factory class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SDKMCPConnectionSessionFactory } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export declare class SDKMCPConnectionSessionFactory implements MCPConnectionSessionFactory {
    constructor(options?: SDKMCPConnectionSessionFactoryOptions);
    create(profile: MCPServerProfile): MCPConnectionSession;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: SDKMCPConnectionSessionFactoryOptions): SDKMCPConnectionSessionFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(profile: MCPServerProfile): MCPConnectionSession</code> | Public method; parameters and return type are shown in the signature. |

## `mcpConnectionRecordDefinition`

MCP Connection Record Definition constant exported by the `connection-manager` module.

- Kind: constant
- Import: `import { mcpConnectionRecordDefinition } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export declare const mcpConnectionRecordDefinition: SpecSchemaDefinition<MCPConnectionRecord>;
```

## `mcpConnectionRecordExample`

Valid example value for MCP Connection Record.

- Kind: constant
- Import: `import { mcpConnectionRecordExample } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export declare const mcpConnectionRecordExample: MCPConnectionRecord;
```

## `mcpConnectionRecordJsonSchema`

JSON Schema for MCP Connection Record.

- Kind: constant
- Import: `import { mcpConnectionRecordJsonSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export declare const mcpConnectionRecordJsonSchema: JsonSchema;
```

## `mcpConnectionRecordSchema`

Runtime schema for MCP Connection Record.

- Kind: constant
- Import: `import { mcpConnectionRecordSchema } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const mcpConnectionRecordSchema: (typeof import('@codesoul-co/hypha-mcp'))['mcpConnectionRecordSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `assertRemoteEgressAllowed`

Assert Remote Egress Allowed function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertRemoteEgressAllowed } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export declare function assertRemoteEgressAllowed(endpoint: string, policy: MCPServerProfile['egressPolicy']): Promise<void>;
```

### Call signature

```text
assertRemoteEgressAllowed(endpoint: string, policy: MCPServerProfile["egressPolicy"]): Promise<void>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `endpoint` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `policy` | <code>{ allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<void>`
- Description: The return contract is defined by the type shown above.

## `createGuardedMCPFetch`

Applies the remote MCP egress policy to every request and redirect hop. Credentials are resolved immediately before each request so rotations take effect without rebuilding declarative profiles.

- Kind: function
- Import: `import { createGuardedMCPFetch } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export declare function createGuardedMCPFetch(options?: GuardedMCPFetchOptions): MCPFetch;
```

### Call signature

```text
createGuardedMCPFetch(options?: GuardedMCPFetchOptions): MCPFetch
```

Applies the remote MCP egress policy to every request and redirect hop. Credentials are resolved immediately before each request so rotations take effect without rebuilding declarative profiles.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>GuardedMCPFetchOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MCPFetch`
- Description: The return contract is defined by the type shown above.

## `GuardedMCPFetchOptions`

Guarded MCP Fetch Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { GuardedMCPFetchOptions } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export interface GuardedMCPFetchOptions {
    policy?: MCPServerProfile['egressPolicy'];
    fetch?: MCPFetch;
    resolveHeaders?: () => Promise<Record<string, string>> | Record<string, string>;
    resolveAuthorization?: () => Promise<string | undefined> | string | undefined;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetch` | method | <code>fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `policy` | property | <code>policy?: { allowedHosts?: string[]; denyPrivateNetworks?: boolean; requireTls?: boolean; maxRedirects?: number; allowCrossOriginRedirects?: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolveAuthorization` | method | <code>resolveAuthorization?(): Promise&lt;string &#124; undefined&gt; &#124; string &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `resolveHeaders` | method | <code>resolveHeaders?(): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MCPConnectionManagerOptions`

MCP Connection Manager Options interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MCPConnectionManagerOptions } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export interface MCPConnectionManagerOptions {
    sessionFactory: MCPConnectionSessionFactory;
    trace?: TraceRecorder;
    traceContext?: {
        runId: string;
        stepId?: string;
        sessionId?: string;
    };
    now?: () => string;
    monotonicNow?: () => number;
    sleep?: (ms: number) => Promise<void>;
    random?: () => number;
    onListChanged?: (serverId: string) => Promise<void> | void;
    telemetry?: TelemetryRecorder;
    contentArtifacts?: MCPRemoteContentArtifactPort;
    reconnectCoordinator?: MCPReconnectCoordinator;
    reconnectOwnerId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentArtifacts` | property | <code>contentArtifacts?: MCPRemoteContentArtifactPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `monotonicNow` | method | <code>monotonicNow?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `onListChanged` | method | <code>onListChanged?(serverId: string): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `random` | method | <code>random?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `reconnectCoordinator` | property | <code>reconnectCoordinator?: MCPReconnectCoordinator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconnectOwnerId` | property | <code>reconnectOwnerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionFactory` | property | <code>sessionFactory: MCPConnectionSessionFactory</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sleep` | method | <code>sleep?(ms: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `telemetry` | property | <code>telemetry?: TelemetryRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: TraceRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceContext` | property | <code>traceContext?: { runId: string; stepId?: string; sessionId?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPConnectionRecord`

MCP Connection Record interface with 18 public fields or methods.

- Kind: interface
- Import: `import type { MCPConnectionRecord } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export interface MCPConnectionRecord {
    id: string;
    serverId: string;
    revision: number;
    state: MCPConnectionState;
    transportType: MCPTransportSpec['type'];
    negotiatedProtocolVersion?: string;
    clientInfo?: Record<string, unknown>;
    serverInfo?: Record<string, unknown>;
    serverCapabilities?: Record<string, unknown>;
    startedAt?: string;
    readyAt?: string;
    lastActivityAt?: string;
    lastHealthCheckAt?: string;
    closedAt?: string;
    activeRequestCount: number;
    reconnectAttempts: number;
    error?: NormalizedMCPError;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeRequestCount` | property | <code>activeRequestCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `clientInfo` | property | <code>clientInfo?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `closedAt` | property | <code>closedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedMCPError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastActivityAt` | property | <code>lastActivityAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastHealthCheckAt` | property | <code>lastHealthCheckAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `negotiatedProtocolVersion` | property | <code>negotiatedProtocolVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readyAt` | property | <code>readyAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconnectAttempts` | property | <code>reconnectAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverCapabilities` | property | <code>serverCapabilities?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverInfo` | property | <code>serverInfo?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: MCPConnectionState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transportType` | property | <code>transportType: "custom" &#124; "stdio" &#124; "streamable_http"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPConnectionSession`

MCP Connection Session interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MCPConnectionSession } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export interface MCPConnectionSession {
    connect(signal?: AbortSignal): Promise<{
        negotiatedProtocolVersion?: string;
        serverInfo?: Record<string, unknown>;
        serverCapabilities?: Record<string, unknown>;
    }>;
    listCapabilities(signal?: AbortSignal): Promise<MCPCapabilityDescriptor[]>;
    callTool(capabilityId: string, input: unknown, options?: {
        signal?: AbortSignal;
        timeoutMs?: number;
        onProgress?: (progress: unknown) => void;
    }): Promise<unknown>;
    readResource?(uri: string, options?: {
        signal?: AbortSignal;
        timeoutMs?: number;
    }): Promise<MCPResourceResult>;
    getPrompt?(name: string, args?: Record<string, string>, options?: {
        signal?: AbortSignal;
        timeoutMs?: number;
    }): Promise<MCPPromptResult>;
    ping(signal?: AbortSignal): Promise<void>;
    close(): Promise<void>;
    onClose?: (error?: Error) => void;
    onListChanged?: () => void;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `callTool` | method | <code>callTool(capabilityId: string, input: unknown, options?: { signal?: AbortSignal; timeoutMs?: number; onProgress?: (progress: unknown) =&gt; void; }): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `connect` | method | <code>connect(signal?: AbortSignal): Promise&lt;{ negotiatedProtocolVersion?: string; serverInfo?: Record&lt;string, unknown&gt;; serverCapabilities?: Record&lt;string, unknown&gt;; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getPrompt` | method | <code>getPrompt?(name: string, args?: Record&lt;string, string&gt;, options?: { signal?: AbortSignal; timeoutMs?: number; }): Promise&lt;MCPPromptResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listCapabilities` | method | <code>listCapabilities(signal?: AbortSignal): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `onClose` | method | <code>onClose?(error?: Error): void</code> | Public method; parameters and return type are shown in the signature. |
| `onListChanged` | method | <code>onListChanged?(): void</code> | Public method; parameters and return type are shown in the signature. |
| `ping` | method | <code>ping(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `readResource` | method | <code>readResource?(uri: string, options?: { signal?: AbortSignal; timeoutMs?: number; }): Promise&lt;MCPResourceResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MCPConnectionSessionFactory`

MCP Connection Session Factory interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MCPConnectionSessionFactory } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export interface MCPConnectionSessionFactory {
    create(profile: MCPServerProfile): MCPConnectionSession;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(profile: MCPServerProfile): MCPConnectionSession</code> | Public method; parameters and return type are shown in the signature. |

## `MCPConnectionStatus`

MCP Connection Status interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MCPConnectionStatus } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export interface MCPConnectionStatus {
    record: MCPConnectionRecord | null;
    health: ProviderHealth;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | property | <code>health: ProviderHealth</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: MCPConnectionRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPRemoteContentArtifact`

MCP Remote Content Artifact interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MCPRemoteContentArtifact } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export interface MCPRemoteContentArtifact {
    artifactRef: string;
    contentHash: string;
    sizeBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPRemoteContentArtifactPort`

MCP Remote Content Artifact Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MCPRemoteContentArtifactPort } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export interface MCPRemoteContentArtifactPort {
    store(input: {
        serverId: string;
        kind: 'resource' | 'prompt';
        capabilityId: string;
        mediaType: string;
        bytes: Uint8Array;
        contentHash: string;
        provenance: Record<string, unknown>;
    }): Promise<MCPRemoteContentArtifact>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | method | <code>store(input: { serverId: string; kind: "resource" &#124; "prompt"; capabilityId: string; mediaType: string; bytes: Uint8Array; contentHash: string; provenance: Record&lt;string, unknown&gt;; }): Promise&lt;MCPRemoteContentArtifact&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SDKMCPConnectionSessionFactoryOptions`

SDKMCP Connection Session Factory Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SDKMCPConnectionSessionFactoryOptions } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export interface SDKMCPConnectionSessionFactoryOptions {
    clientInfo?: {
        name: string;
        version: string;
    };
    resolveHeadersRef?: (ref: string) => Promise<Record<string, string>> | Record<string, string>;
    resolveAuthorizationRef?: (ref: string) => Promise<string> | string;
    resolveWorkingDirectoryRef?: (ref: string) => Promise<string> | string;
    resolveEnvironmentRefs?: (refs: string[]) => Promise<Record<string, string>> | Record<string, string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clientInfo` | property | <code>clientInfo?: { name: string; version: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolveAuthorizationRef` | method | <code>resolveAuthorizationRef?(ref: string): Promise&lt;string&gt; &#124; string</code> | Public method; parameters and return type are shown in the signature. |
| `resolveEnvironmentRefs` | method | <code>resolveEnvironmentRefs?(refs: string[]): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resolveHeadersRef` | method | <code>resolveHeadersRef?(ref: string): Promise&lt;Record&lt;string, string&gt;&gt; &#124; Record&lt;string, string&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resolveWorkingDirectoryRef` | method | <code>resolveWorkingDirectoryRef?(ref: string): Promise&lt;string&gt; &#124; string</code> | Public method; parameters and return type are shown in the signature. |

## `MCPConnectionState`

Public type alias for MCP Connection State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MCPConnectionState } from '@codesoul-co/hypha-mcp';`
- Source module: [`connection-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts)

### Declaration

```text
export type MCPConnectionState = 'disconnected' | 'starting' | 'initializing' | 'ready' | 'degraded' | 'reconnecting' | 'closing' | 'closed' | 'failed';
```
