# `@codesoul-co/hypha-inference` / `recovery`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adviseInferenceRecovery` | 函数 | <code>adviseInferenceRecovery(failure: RecoveryFailure): InferenceRecoveryAdvice</code> | advise Inference Recovery 的公开运行时操作。 |
| `classifyInferenceCacheFailure` | 函数 | <code>classifyInferenceCacheFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure</code> | classify Inference Cache Failure 的公开运行时操作。 |
| `classifyInferenceFailure` | 函数 | <code>classifyInferenceFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure</code> | classify Inference Failure 的公开运行时操作。 |
| `InferenceFailureContext` | 接口 | <code>interface InferenceFailureContext</code> | Inference Failure Context 的字段契约；完整字段见下表。 |
| `InferenceRecoveryAdvice` | 接口 | <code>interface InferenceRecoveryAdvice</code> | Inference Recovery Advice 的字段契约；完整字段见下表。 |
| `InferenceRecoveryOperation` | 类型 | <code>type InferenceRecoveryOperation = 'infer' &#124; 'stream' &#124; 'prefix_cache_read' &#124; 'kv_cache_read' &#124; 'kv_cache_write' &#124; 'cache_invalidate'</code> | Inference Recovery Operation 的公共类型别名。 |

## `InferenceFailureContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `operation` | 属性 | <code>operation: InferenceRecoveryOperation</code> | operation 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `request` | 属性 | <code>request: InferenceRequest&lt;unknown&gt;</code> | request 字段。 |
| `specRevision` | 属性 | <code>specRevision: string</code> | spec Revision 字段。 |

## `InferenceRecoveryAdvice` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mayBypassCache` | 属性 | <code>mayBypassCache: boolean</code> | may Bypass Cache 字段。 |
| `mayUseCompatibleProviderFallback` | 属性 | <code>mayUseCompatibleProviderFallback: boolean</code> | may Use Compatible Provider Fallback 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | strategy 字段。 |
