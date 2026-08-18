# `@codesoul-co/hypha-memory` / `external-provider-operations`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/external-provider-operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryExternalProviderOperationStore` | class | <code>new InMemoryExternalProviderOperationStore(): InMemoryExternalProviderOperationStore</code> | Runtime implementation for In Memory External Provider Operation Store; see its public constructor and members below. |
| `StructuredExternalProviderOperationStore` | class | <code>new StructuredExternalProviderOperationStore(options: { store: StructuredStoreProvider; table?: string; }): StructuredExternalProviderOperationStore</code> | Runtime implementation for Structured External Provider Operation Store; see its public constructor and members below. |
| `externalProviderOperationSchema` | constant | <code>const externalProviderOperationSchema: ZodType&lt;ExternalProviderOperation, ZodTypeDef, ExternalProviderOperation&gt;</code> | Runtime schema for external Provider Operation. |
| `createExternalProviderOperation` | function | <code>createExternalProviderOperation(input: Omit&lt;ExternalProviderOperation, "id" &#124; "scopeHash" &#124; "attempts" &#124; "createdAt" &#124; "updatedAt"&gt; &amp; { now?: string; }): ExternalProviderOperation</code> | Creates External Provider Operation at this module boundary. |
| `externalProviderOperationId` | function | <code>externalProviderOperationId(providerId: string, operationId: string): string</code> | Public runtime operation for external Provider Operation Id. |
| `fingerprintExternalOperationFailure` | function | <code>fingerprintExternalOperationFailure(error: NormalizedMemoryError): string</code> | Public runtime operation for fingerprint External Operation Failure. |
| `resolveExternalProviderOperationStore` | function | <code>resolveExternalProviderOperationStore(store: ExternalProviderOperationStore &#124; undefined, profile: "production" &#124; "test" &#124; "ephemeral"): ExternalProviderOperationStore</code> | Resolves External Provider Operation Store at this module boundary. |
| `ExternalProviderOperation` | interface | <code>interface ExternalProviderOperation</code> | Field contract for External Provider Operation; see all contract members below. |
| `ExternalProviderOperationStore` | interface | <code>interface ExternalProviderOperationStore</code> | Field contract for External Provider Operation Store; see all contract members below. |
| `ExternalProviderOperationState` | type | <code>type ExternalProviderOperationState = 'pending' &#124; 'running' &#124; 'reconcile_required' &#124; 'succeeded' &#124; 'failed' &#124; 'cancelled' &#124; 'dead_letter'</code> | Public type alias for External Provider Operation State. |

## `InMemoryExternalProviderOperationStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | Public runtime operation for claim. |
| `constructor` | constructor | <code>(): InMemoryExternalProviderOperationStore</code> | Creates an instance of this class. |
| `durability` | property | <code>durability: "ephemeral"</code> | Public durability property. |
| `get` | method | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | Gets get at this module boundary. |
| `listRecoverable` | method | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | Lists Recoverable at this module boundary. |
| `set` | method | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `StructuredExternalProviderOperationStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | Public runtime operation for claim. |
| `constructor` | constructor | <code>(options: { store: StructuredStoreProvider; table?: string; }): StructuredExternalProviderOperationStore</code> | Creates an instance of this class. |
| `durability` | property | <code>durability: "durable"</code> | Public durability property. |
| `get` | method | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | Gets get at this module boundary. |
| `listRecoverable` | method | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | Lists Recoverable at this module boundary. |
| `set` | method | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `ExternalProviderOperation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public attempts property. |
| `cancellationRequestedAt` | property | <code>cancellationRequestedAt: string</code> | Public cancellation Requested At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `externalOperationId` | property | <code>externalOperationId: string</code> | Public external Operation Id property. |
| `failure` | property | <code>failure: NormalizedMemoryError</code> | Public failure property. |
| `failureFingerprint` | property | <code>failureFingerprint: string</code> | Public failure Fingerprint property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: "mem0_event" &#124; "vertex_lro" &#124; "hindsight_operation" &#124; "unknown_write"</code> | Public kind property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `nextAttemptAt` | property | <code>nextAttemptAt: string</code> | Public next Attempt At property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: { principalId: string; userId?: string; }</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `state` | property | <code>state: ExternalProviderOperationState</code> | Public state property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `ExternalProviderOperationStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | Public runtime operation for claim. |
| `durability` | property | <code>durability: "ephemeral" &#124; "durable"</code> | Public durability property. |
| `get` | method | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | Gets get at this module boundary. |
| `listRecoverable` | method | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | Lists Recoverable at this module boundary. |
| `set` | method | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | Sets set at this module boundary. |
