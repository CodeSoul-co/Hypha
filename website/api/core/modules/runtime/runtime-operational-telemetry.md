# `@codesoul-co/hypha-core` / `modules/runtime/runtime-operational-telemetry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-operational-telemetry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeOperationalTelemetry` | class | <code>new RuntimeOperationalTelemetry(options: RuntimeOperationalTelemetryOptions): RuntimeOperationalTelemetry</code> | Stable, low-cardinality Runtime metrics. Run and fingerprint identities stay in durable Events and checkpoints instead of becoming metric attributes. |
| `RUNTIME_OPERATIONAL_METRIC_NAMES` | constant | <code>const RUNTIME_OPERATIONAL_METRIC_NAMES: { readonly quarantineTotal: "hypha.runtime.quarantine.total"; readonly continuationLatencyMs: "hypha.runtime.continuation.latency_ms"; readonly leaseRenewalLatencyMs: "hypha.runtime.lease.renewal.latency_ms"; readonly leaseRenewalTotal: "hypha.runtime.lease.renewal.total"; readonly noProgressFingerprintTotal: "hypha.runtime.no_progress.fingerprint.total"; readonly noProgress...</code> | RUNTIME OPERATIONAL METRIC NAMES constant exported by the `modules/runtime/runtime-operational-telemetry` module. |
| `RuntimeOperationalTelemetryOptions` | interface | <code>interface RuntimeOperationalTelemetryOptions</code> | Field contract for Runtime Operational Telemetry Options; see all contract members below. |
| `RuntimeLeaseResource` | type | <code>type RuntimeLeaseResource = 'session_command' &#124; 'run' &#124; 'state_claim'</code> | Public type alias for Runtime Lease Resource. |
| `RuntimeQuarantineReason` | type | <code>type RuntimeQuarantineReason = 'checkpoint_missing' &#124; 'checkpoint_identity_mismatch' &#124; 'checkpoint_hash_mismatch' &#124; 'command_without_valid_checkpoint' &#124; 'canonical_stream_corrupt'</code> | Public type alias for Runtime Quarantine Reason. |
| `RuntimeQuarantineSource` | type | <code>type RuntimeQuarantineSource = 'continuation_reconciler' &#124; 'startup_integrity_audit'</code> | Public type alias for Runtime Quarantine Source. |

## `RuntimeOperationalTelemetry` public members

Stable, low-cardinality Runtime metrics. Run and fingerprint identities stay in durable Events and checkpoints instead of becoming metric attributes.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeOperationalTelemetryOptions): RuntimeOperationalTelemetry</code> | Creates an instance of this class. |
| `recordContinuationLatency` | method | <code>recordContinuationLatency(input: { suspendedAt: string; resumedAt: string; outcome: "resumed" &#124; "scheduled" &#124; "reused"; }): Promise&lt;void&gt;</code> | Records Continuation Latency at this module boundary. |
| `recordLeaseRenewal` | method | <code>recordLeaseRenewal(input: { resource: RuntimeLeaseResource; durationMs: number; outcome: "succeeded" &#124; "failed"; }): Promise&lt;void&gt;</code> | Records Lease Renewal at this module boundary. |
| `recordNoProgressFingerprint` | method | <code>recordNoProgressFingerprint(input: { consecutiveNoProgress: number; source: "react_checkpoint" &#124; "recovery"; }): Promise&lt;void&gt;</code> | Records No Progress Fingerprint at this module boundary. |
| `recordQuarantine` | method | <code>recordQuarantine(input: { source: RuntimeQuarantineSource; reason: RuntimeQuarantineReason; }): Promise&lt;void&gt;</code> | Records Quarantine at this module boundary. |

## `RuntimeOperationalTelemetryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `recorder` | property | <code>recorder: TelemetryRecorder</code> | Public recorder property. |
