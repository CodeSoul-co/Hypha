# `@codesoul-co/hypha-memory` / `structured-managed-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/structured-managed-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-managed-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredManagedMemoryRecordStore` | class | <code>new StructuredManagedMemoryRecordStore(options: StructuredManagedMemoryRecordStoreOptions): StructuredManagedMemoryRecordStore</code> | Runtime implementation for Structured Managed Memory Record Store; see its public constructor and members below. |
| `StructuredManagedMemoryRecordStoreOptions` | interface | <code>interface StructuredManagedMemoryRecordStoreOptions</code> | Field contract for Structured Managed Memory Record Store Options; see all contract members below. |

## `StructuredManagedMemoryRecordStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: StructuredManagedMemoryRecordStoreOptions): StructuredManagedMemoryRecordStore</code> | Creates an instance of this class. |
| `create` | method | <code>create(record: ManagedMemoryRecord): Promise&lt;ManagedMemoryRecord&gt;</code> | Creates create at this module boundary. |
| `createVersion` | method | <code>createVersion(record: ManagedMemoryRecord, expectedRevision: number): Promise&lt;ManagedMemoryRecord&gt;</code> | Creates Version at this module boundary. |
| `delete` | method | <code>delete(id: string, scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getVersionByScopeHash` | method | <code>getVersionByScopeHash(id: string, versionId: string, scopeHash: string): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets Version By Scope Hash at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(id: string, scope: ManagedMemoryScope): Promise&lt;ManagedMemoryRecord[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: ManagedMemoryRecordQuery): Promise&lt;ManagedMemoryRecord[]&gt;</code> | Lists list at this module boundary. |
| `transaction` | method | <code>transaction&lt;T&gt;(fn: (store: ManagedMemoryRecordStore) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for transaction. |
| `updateStatus` | method | <code>updateStatus(id: string, scope: ManagedMemoryScope, expectedRevision: number, status: MemoryStatus, updatedAt: string): Promise&lt;ManagedMemoryRecord&gt;</code> | Public runtime operation for update Status. |

## `StructuredManagedMemoryRecordStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentTable` | property | <code>currentTable: string</code> | Public current Table property. |
| `inTransaction` | property | <code>inTransaction: boolean</code> | Public in Transaction property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `provider` | property | <code>provider: StructuredStoreProvider</code> | Public provider property. |
| `versionsTable` | property | <code>versionsTable: string</code> | Public versions Table property. |
