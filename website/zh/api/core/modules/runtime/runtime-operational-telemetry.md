# `@codesoul-co/hypha-core` / `modules/runtime/runtime-operational-telemetry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-operational-telemetry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeOperationalTelemetry` | 类 | <code>new RuntimeOperationalTelemetry(options: RuntimeOperationalTelemetryOptions): RuntimeOperationalTelemetry</code> | Stable, low-cardinality Runtime metrics. Run and fingerprint identities stay in durable Events and checkpoints instead of becoming metric attributes. |
| `RUNTIME_OPERATIONAL_METRIC_NAMES` | 常量 | <code>const RUNTIME_OPERATIONAL_METRIC_NAMES: { readonly quarantineTotal: "hypha.runtime.quarantine.total"; readonly continuationLatencyMs: "hypha.runtime.continuation.latency_ms"; readonly leaseRenewalLatencyMs: "hypha.runtime.lease.renewal.latency_ms"; readonly leaseRenewalTotal: "hypha.runtime.lease.renewal.total"; readonly noProgressFingerprintTotal: "hypha.runtime.no_progress.fingerprint.total"; readonly noProgress...</code> | 由 `modules/runtime/runtime-operational-telemetry` 模块导出的 RUNTIME OPERATIONAL METRIC NAMES 常量。 |
| `RuntimeOperationalTelemetryOptions` | 接口 | <code>interface RuntimeOperationalTelemetryOptions</code> | Runtime Operational Telemetry Options 的字段契约；完整字段见下表。 |
| `RuntimeLeaseResource` | 类型 | <code>type RuntimeLeaseResource = 'session_command' &#124; 'run' &#124; 'state_claim'</code> | Runtime Lease Resource 的公共类型别名。 |
| `RuntimeQuarantineReason` | 类型 | <code>type RuntimeQuarantineReason = 'checkpoint_missing' &#124; 'checkpoint_identity_mismatch' &#124; 'checkpoint_hash_mismatch' &#124; 'command_without_valid_checkpoint' &#124; 'canonical_stream_corrupt'</code> | Runtime Quarantine Reason 的公共类型别名。 |
| `RuntimeQuarantineSource` | 类型 | <code>type RuntimeQuarantineSource = 'continuation_reconciler' &#124; 'startup_integrity_audit'</code> | Runtime Quarantine Source 的公共类型别名。 |

## `RuntimeOperationalTelemetry` 公开成员

Stable, low-cardinality Runtime metrics. Run and fingerprint identities stay in durable Events and checkpoints instead of becoming metric attributes.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeOperationalTelemetryOptions): RuntimeOperationalTelemetry</code> | 创建该类的实例。 |
| `recordContinuationLatency` | 方法 | <code>recordContinuationLatency(input: { suspendedAt: string; resumedAt: string; outcome: "resumed" &#124; "scheduled" &#124; "reused"; }): Promise&lt;void&gt;</code> | 记录 Continuation Latency。 |
| `recordLeaseRenewal` | 方法 | <code>recordLeaseRenewal(input: { resource: RuntimeLeaseResource; durationMs: number; outcome: "succeeded" &#124; "failed"; }): Promise&lt;void&gt;</code> | 记录 Lease Renewal。 |
| `recordNoProgressFingerprint` | 方法 | <code>recordNoProgressFingerprint(input: { consecutiveNoProgress: number; source: "react_checkpoint" &#124; "recovery"; }): Promise&lt;void&gt;</code> | 记录 No Progress Fingerprint。 |
| `recordQuarantine` | 方法 | <code>recordQuarantine(input: { source: RuntimeQuarantineSource; reason: RuntimeQuarantineReason; }): Promise&lt;void&gt;</code> | 记录 Quarantine。 |

## `RuntimeOperationalTelemetryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `recorder` | 属性 | <code>recorder: TelemetryRecorder</code> | recorder 字段。 |
