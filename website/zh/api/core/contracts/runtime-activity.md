# `@codesoul-co/hypha-core` / `contracts/runtime-activity`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-activity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_DESCRIPTOR_VERSION` | 常量 | <code>const RUNTIME_ACTIVITY_DESCRIPTOR_VERSION: "1.0.0"</code> | 由 `contracts/runtime-activity` 模块导出的 RUNTIME ACTIVITY DESCRIPTOR VERSION 常量。 |
| `RUNTIME_ACTIVITY_KINDS` | 常量 | <code>const RUNTIME_ACTIVITY_KINDS: readonly ["react_quantum", "tool", "memory", "execution", "mcp", "policy"]</code> | 由 `contracts/runtime-activity` 模块导出的 RUNTIME ACTIVITY KINDS 常量。 |
| `RuntimeActivityDescriptor` | 接口 | <code>interface RuntimeActivityDescriptor</code> | Runtime Activity Descriptor 的字段契约；完整字段见下表。 |
| `RuntimeActivityKind` | 类型 | <code>type RuntimeActivityKind = (typeof RUNTIME_ACTIVITY_KINDS)[number]</code> | Runtime Activity Kind 的公共类型别名。 |

## `RuntimeActivityDescriptor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | activity Id 字段。 |
| `activityKind` | 属性 | <code>activityKind: "memory" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "react_quantum"</code> | activity Kind 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `inputRef` | 属性 | <code>inputRef: string</code> | input Ref 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `providerRef` | 属性 | <code>providerRef: string</code> | provider Ref 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | state Attempt 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |
