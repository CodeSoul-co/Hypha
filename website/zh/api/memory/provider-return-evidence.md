# `@codesoul-co/hypha-memory` / `provider-return-evidence`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/provider-return-evidence.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryProviderReturnEvidenceSchema` | 常量 | <code>const memoryProviderReturnEvidenceSchema: ZodType&lt;MemoryProviderReturnEvidence, ZodTypeDef, MemoryProviderReturnEvidence&gt;</code> | memory Provider Return Evidence 的运行时 Schema。 |
| `createMemoryProviderReturnEvidence` | 函数 | <code>createMemoryProviderReturnEvidence(context: MemoryProviderEvidenceContext): MemoryProviderReturnEvidence</code> | 创建 Memory Provider Return Evidence。 |
| `verifyMemoryProviderReturnEvidence` | 函数 | <code>verifyMemoryProviderReturnEvidence(evidence: unknown, context: Omit&lt;MemoryProviderEvidenceContext, "status" &#124; "error"&gt;): MemoryProviderReturnEvidence</code> | verify Memory Provider Return Evidence 的公开运行时操作。 |
| `MemoryProviderEvidenceContext` | 接口 | <code>interface MemoryProviderEvidenceContext</code> | Memory Provider Evidence Context 的字段契约；完整字段见下表。 |
| `MemoryProviderRecordBinding` | 接口 | <code>interface MemoryProviderRecordBinding</code> | Memory Provider Record Binding 的字段契约；完整字段见下表。 |
| `MemoryProviderReturnEvidence` | 接口 | <code>interface MemoryProviderReturnEvidence</code> | Memory Provider Return Evidence 的字段契约；完整字段见下表。 |

## `MemoryProviderEvidenceContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error: NormalizedMemoryError</code> | error 字段。 |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `operation` | 属性 | <code>operation: MemoryActivityOperation</code> | operation 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "partial"</code> | status 字段。 |

## `MemoryProviderRecordBinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `versionId` | 属性 | <code>versionId: string</code> | version Id 字段。 |

## `MemoryProviderReturnEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `inputHash` | 属性 | <code>inputHash: string</code> | input Hash 字段。 |
| `operation` | 属性 | <code>operation: MemoryActivityOperation</code> | operation 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `outputHash` | 属性 | <code>outputHash: string</code> | output Hash 字段。 |
| `principalHash` | 属性 | <code>principalHash: string</code> | principal Hash 字段。 |
| `proofHash` | 属性 | <code>proofHash: string</code> | proof Hash 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `recordBindings` | 属性 | <code>recordBindings: MemoryProviderRecordBinding[]</code> | record Bindings 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | schema Version 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `terminal` | 属性 | <code>terminal: { status: "completed" &#124; "partial" &#124; "failed" &#124; "cancelled"; error?: NormalizedMemoryError; }</code> | terminal 字段。 |
