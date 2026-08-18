# `@codesoul-co/hypha-adapters-local` / `runtime-integrity-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/runtime-integrity-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteRuntimeIntegrityStore` | class | <code>new SQLiteRuntimeIntegrityStore(options: SQLiteRuntimeIntegrityStoreOptions): SQLiteRuntimeIntegrityStore</code> | Runtime implementation for SQ Lite Runtime Integrity Store; see its public constructor and members below. |
| `SQLiteRuntimeIntegrityStoreOptions` | interface | <code>interface SQLiteRuntimeIntegrityStoreOptions</code> | Field contract for SQ Lite Runtime Integrity Store Options; see all contract members below. |

## `SQLiteRuntimeIntegrityStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: SQLiteRuntimeIntegrityStoreOptions): SQLiteRuntimeIntegrityStore</code> | Creates an instance of this class. |
| `getRepair` | method | <code>getRepair(repairId: string): Promise&lt;RuntimeIntegrityRepairEvidence &#124; null&gt;</code> | Gets Repair at this module boundary. |
| `getWatermark` | method | <code>getWatermark(): Promise&lt;RuntimeIntegrityWatermark &#124; null&gt;</code> | Gets Watermark at this module boundary. |
| `putRepair` | method | <code>putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise&lt;void&gt;</code> | Public runtime operation for put Repair. |
| `putWatermark` | method | <code>putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number &#124; null): Promise&lt;void&gt;</code> | Public runtime operation for put Watermark. |

## `SQLiteRuntimeIntegrityStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
