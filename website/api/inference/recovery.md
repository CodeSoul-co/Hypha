# `@codesoul-co/hypha-inference` / `recovery`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adviseInferenceRecovery` | function | <code>adviseInferenceRecovery(failure: RecoveryFailure): InferenceRecoveryAdvice</code> | Public runtime operation for advise Inference Recovery. |
| `classifyInferenceCacheFailure` | function | <code>classifyInferenceCacheFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure</code> | Public runtime operation for classify Inference Cache Failure. |
| `classifyInferenceFailure` | function | <code>classifyInferenceFailure(error: unknown, context: InferenceFailureContext): RecoveryFailure</code> | Public runtime operation for classify Inference Failure. |
| `InferenceFailureContext` | interface | <code>interface InferenceFailureContext</code> | Field contract for Inference Failure Context; see all contract members below. |
| `InferenceRecoveryAdvice` | interface | <code>interface InferenceRecoveryAdvice</code> | Field contract for Inference Recovery Advice; see all contract members below. |
| `InferenceRecoveryOperation` | type | <code>type InferenceRecoveryOperation = 'infer' &#124; 'stream' &#124; 'prefix_cache_read' &#124; 'kv_cache_read' &#124; 'kv_cache_write' &#124; 'cache_invalidate'</code> | Public type alias for Inference Recovery Operation. |

## `InferenceFailureContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `operation` | property | <code>operation: InferenceRecoveryOperation</code> | Public operation property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `request` | property | <code>request: InferenceRequest&lt;unknown&gt;</code> | Public request property. |
| `specRevision` | property | <code>specRevision: string</code> | Public spec Revision property. |

## `InferenceRecoveryAdvice` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mayBypassCache` | property | <code>mayBypassCache: boolean</code> | Public may Bypass Cache property. |
| `mayUseCompatibleProviderFallback` | property | <code>mayUseCompatibleProviderFallback: boolean</code> | Public may Use Compatible Provider Fallback property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `strategy` | property | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | Public strategy property. |
