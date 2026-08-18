# `@codesoul-co/hypha-memory` / `structured-idempotency-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/structured-idempotency-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-idempotency-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredMemoryIdempotencyStore` | class | <code>new StructuredMemoryIdempotencyStore(options: StructuredMemoryIdempotencyStoreOptions): StructuredMemoryIdempotencyStore</code> | Durable idempotency results used to reconcile retries after process restart. |
| `StructuredMemoryIdempotencyStoreOptions` | interface | <code>interface StructuredMemoryIdempotencyStoreOptions</code> | Field contract for Structured Memory Idempotency Store Options; see all contract members below. |

## `StructuredMemoryIdempotencyStore` public members

Durable idempotency results used to reconcile retries after process restart.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: StructuredMemoryIdempotencyStoreOptions): StructuredMemoryIdempotencyStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(scopeHash: string, key: string): Promise&lt;unknown &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(scopeHash: string, key: string, result: unknown): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `StructuredMemoryIdempotencyStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | property | <code>store: StructuredStoreProvider</code> | Public store property. |
| `table` | property | <code>table: string</code> | Public table property. |
