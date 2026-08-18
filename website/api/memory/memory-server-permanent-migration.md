# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-permanent-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)
- Exports: **14**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `PermanentMemoryMigrationAdapter` | class | <code>new PermanentMemoryMigrationAdapter(options: PermanentMemoryMigrationAdapterOptions): PermanentMemoryMigrationAdapter</code> | Runtime implementation for Permanent Memory Migration Adapter; see its public constructor and members below. |
| `decidePermanentMemoryFailure` | function | <code>decidePermanentMemoryFailure(error: NormalizedMemoryError, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): PermanentMemoryFailureDecision</code> | Decides Permanent Memory Failure at this module boundary. |
| `isExplicitPermanentMemoryNotFound` | function | <code>isExplicitPermanentMemoryNotFound(error: unknown): boolean</code> | Checks Explicit Permanent Memory Not Found at this module boundary. |
| `normalizePermanentMemoryProviderError` | function | <code>normalizePermanentMemoryProviderError(providerError: unknown, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): NormalizedMemoryError</code> | Normalizes Permanent Memory Provider Error at this module boundary. |
| `PermanentMemoryFailureDecision` | interface | <code>interface PermanentMemoryFailureDecision</code> | Field contract for Permanent Memory Failure Decision; see all contract members below. |
| `PermanentMemoryFailureEvent` | interface | <code>interface PermanentMemoryFailureEvent</code> | Field contract for Permanent Memory Failure Event; see all contract members below. |
| `PermanentMemoryFailureObserver` | interface | <code>interface PermanentMemoryFailureObserver</code> | Field contract for Permanent Memory Failure Observer; see all contract members below. |
| `PermanentMemoryMigrationAdapterOptions` | interface | <code>interface PermanentMemoryMigrationAdapterOptions</code> | Field contract for Permanent Memory Migration Adapter Options; see all contract members below. |
| `PermanentMemoryMigrationPort` | interface | <code>interface PermanentMemoryMigrationPort</code> | Field contract for Permanent Memory Migration Port; see all contract members below. |
| `PermanentMemoryMigrationProvider` | interface | <code>interface PermanentMemoryMigrationProvider</code> | Field contract for Permanent Memory Migration Provider; see all contract members below. |
| `PermanentMemoryMigrationRequest` | interface | <code>interface PermanentMemoryMigrationRequest</code> | Field contract for Permanent Memory Migration Request; see all contract members below. |
| `PermanentMemoryFailureDisposition` | type | <code>type PermanentMemoryFailureDisposition = 'retry' &#124; 'reconcile' &#124; 'quarantine' &#124; 'dlq'</code> | Public type alias for Permanent Memory Failure Disposition. |
| `PermanentMemoryFailureFinalState` | type | <code>type PermanentMemoryFailureFinalState = 'waiting' &#124; 'reconciling' &#124; 'quarantined' &#124; 'dead_lettered'</code> | Public type alias for Permanent Memory Failure Final State. |
| `PermanentMemoryMigrationOperation` | type | <code>type PermanentMemoryMigrationOperation = 'get' &#124; 'list' &#124; 'delete' &#124; 'write'</code> | Public type alias for Permanent Memory Migration Operation. |

## `PermanentMemoryMigrationAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: PermanentMemoryMigrationAdapterOptions): PermanentMemoryMigrationAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: PermanentMemoryMigrationRequest): Promise&lt;boolean&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue &#124; null&gt;</code> | Gets get at this module boundary. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue[]&gt;</code> | Lists list at this module boundary. |
| `write` | method | <code>write&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest, value: TValue): Promise&lt;void&gt;</code> | Public runtime operation for write. |

## `PermanentMemoryFailureDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `disposition` | property | <code>disposition: PermanentMemoryFailureDisposition</code> | Public disposition property. |
| `finalState` | property | <code>finalState: PermanentMemoryFailureFinalState</code> | Public final State property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |

## `PermanentMemoryFailureEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `disposition` | property | <code>disposition: PermanentMemoryFailureDisposition</code> | Public disposition property. |
| `error` | property | <code>error: NormalizedMemoryError</code> | Public error property. |
| `finalState` | property | <code>finalState: PermanentMemoryFailureFinalState</code> | Public final State property. |
| `operation` | property | <code>operation: PermanentMemoryMigrationOperation</code> | Public operation property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `profileRef` | property | <code>profileRef: string</code> | Public profile Ref property. |
| `providerRef` | property | <code>providerRef: string</code> | Public provider Ref property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `type` | property | <code>type: "permanent_memory.operation_failed"</code> | Public type property. |

## `PermanentMemoryFailureObserver` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(event: PermanentMemoryFailureEvent): void &#124; Promise&lt;void&gt;</code> | Records record at this module boundary. |

## `PermanentMemoryMigrationAdapterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `observer` | property | <code>observer: PermanentMemoryFailureObserver</code> | Public observer property. |
| `provider` | property | <code>provider: PermanentMemoryMigrationProvider</code> | Public provider property. |

## `PermanentMemoryMigrationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(request: PermanentMemoryMigrationRequest): Promise&lt;boolean&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue &#124; null&gt;</code> | Gets get at this module boundary. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue[]&gt;</code> | Lists list at this module boundary. |
| `write` | method | <code>write&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest, value: TValue): Promise&lt;void&gt;</code> | Public runtime operation for write. |

## `PermanentMemoryMigrationProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(scope: ManagedMemoryScope, recordId: string): Promise&lt;boolean&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, recordId: string): Promise&lt;TValue &#124; null&gt;</code> | Gets get at this module boundary. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;TValue[]&gt;</code> | Lists list at this module boundary. |
| `write` | method | <code>write&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, recordId: string, value: TValue): Promise&lt;void&gt;</code> | Public runtime operation for write. |

## `PermanentMemoryMigrationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `profileRef` | property | <code>profileRef: string</code> | Public profile Ref property. |
| `providerRef` | property | <code>providerRef: string</code> | Public provider Ref property. |
| `recordId` | property | <code>recordId: string</code> | Public record Id property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
