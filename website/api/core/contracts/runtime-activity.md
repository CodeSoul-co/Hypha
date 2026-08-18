# `@codesoul-co/hypha-core` / `contracts/runtime-activity`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-activity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_DESCRIPTOR_VERSION` | constant | <code>const RUNTIME_ACTIVITY_DESCRIPTOR_VERSION: "1.0.0"</code> | RUNTIME ACTIVITY DESCRIPTOR VERSION constant exported by the `contracts/runtime-activity` module. |
| `RUNTIME_ACTIVITY_KINDS` | constant | <code>const RUNTIME_ACTIVITY_KINDS: readonly ["react_quantum", "tool", "memory", "execution", "mcp", "policy"]</code> | RUNTIME ACTIVITY KINDS constant exported by the `contracts/runtime-activity` module. |
| `RuntimeActivityDescriptor` | interface | <code>interface RuntimeActivityDescriptor</code> | Field contract for Runtime Activity Descriptor; see all contract members below. |
| `RuntimeActivityKind` | type | <code>type RuntimeActivityKind = (typeof RUNTIME_ACTIVITY_KINDS)[number]</code> | Public type alias for Runtime Activity Kind. |

## `RuntimeActivityDescriptor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public activity Id property. |
| `activityKind` | property | <code>activityKind: "memory" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "react_quantum"</code> | Public activity Kind property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `inputRef` | property | <code>inputRef: string</code> | Public input Ref property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `providerRef` | property | <code>providerRef: string</code> | Public provider Ref property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public state Attempt property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |
