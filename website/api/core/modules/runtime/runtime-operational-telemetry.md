# `@codesoul-co/hypha-core` / `modules/runtime/runtime-operational-telemetry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-operational-telemetry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)
- Exports: **6**

## Using this module

Use the Runtime operational telemetry module for executing runtime behavior at this boundary. It exports 1 class, 1 constant, 1 interface, 3 types.

### Import from the package entrypoint

```ts
import {
  RuntimeOperationalTelemetry,
  RUNTIME_OPERATIONAL_METRIC_NAMES,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeOperationalTelemetryOptions,
  RuntimeLeaseResource,
  RuntimeQuarantineReason,
  RuntimeQuarantineSource,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeOperationalTelemetry` | class | <code>new RuntimeOperationalTelemetry(options: RuntimeOperationalTelemetryOptions): RuntimeOperationalTelemetry</code> | Stable, low-cardinality Runtime metrics. Run and fingerprint identities stay in durable Events and checkpoints instead of becoming metric attributes. |
| `RUNTIME_OPERATIONAL_METRIC_NAMES` | constant | <code>const RUNTIME_OPERATIONAL_METRIC_NAMES: { readonly quarantineTotal: "hypha.runtime.quarantine.total"; readonly continuationLatencyMs: "hypha.runtime.continuation.latency_ms"; readonly leaseRenewalLatencyMs: "hypha.runtime.lease.renewal.latency_ms"; readonly leaseRenewalTotal: "hypha.runtime.lease.renewal.total"; readonly noProgressFingerprintTotal: "hypha.runtime.no_progress.fingerprint.total"; readonly noProgress...</code> | RUNTIME OPERATIONAL METRIC NAMES constant exported by the `modules/runtime/runtime-operational-telemetry` module. |
| `RuntimeOperationalTelemetryOptions` | interface | <code>interface RuntimeOperationalTelemetryOptions</code> | Runtime Operational Telemetry Options interface with 2 public fields or methods. |
| `RuntimeLeaseResource` | type | <code>type RuntimeLeaseResource = 'session_command' &#124; 'run' &#124; 'state_claim'</code> | Public type alias for Runtime Lease Resource; the declaration contains its complete type expression. |
| `RuntimeQuarantineReason` | type | <code>type RuntimeQuarantineReason = 'checkpoint_missing' &#124; 'checkpoint_identity_mismatch' &#124; 'checkpoint_hash_mismatch' &#124; 'command_without_valid_checkpoint' &#124; 'canonical_stream_corrupt'</code> | Public type alias for Runtime Quarantine Reason; the declaration contains its complete type expression. |
| `RuntimeQuarantineSource` | type | <code>type RuntimeQuarantineSource = 'continuation_reconciler' &#124; 'startup_integrity_audit'</code> | Public type alias for Runtime Quarantine Source; the declaration contains its complete type expression. |

## `RuntimeOperationalTelemetry`

Stable, low-cardinality Runtime metrics. Run and fingerprint identities stay in durable Events and checkpoints instead of becoming metric attributes.

- Kind: class
- Import: `import { RuntimeOperationalTelemetry } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### Declaration

```text
export declare class RuntimeOperationalTelemetry {
    constructor(options: RuntimeOperationalTelemetryOptions);
    recordQuarantine(input: {
            source: RuntimeQuarantineSource;
            reason: RuntimeQuarantineReason;
        }): Promise<void>;
    recordContinuationLatency(input: {
            suspendedAt: string;
            resumedAt: string;
            outcome: 'resumed' | 'scheduled' | 'reused';
        }): Promise<void>;
    recordLeaseRenewal(input: {
            resource: RuntimeLeaseResource;
            durationMs: number;
            outcome: 'succeeded' | 'failed';
        }): Promise<void>;
    recordNoProgressFingerprint(input: {
            consecutiveNoProgress: number;
            source: 'react_checkpoint' | 'recovery';
        }): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeOperationalTelemetryOptions): RuntimeOperationalTelemetry</code> | Creates an instance of this class. |
| `recordContinuationLatency` | method | <code>recordContinuationLatency(input: { suspendedAt: string; resumedAt: string; outcome: "resumed" &#124; "scheduled" &#124; "reused"; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordLeaseRenewal` | method | <code>recordLeaseRenewal(input: { resource: RuntimeLeaseResource; durationMs: number; outcome: "succeeded" &#124; "failed"; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordNoProgressFingerprint` | method | <code>recordNoProgressFingerprint(input: { consecutiveNoProgress: number; source: "react_checkpoint" &#124; "recovery"; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordQuarantine` | method | <code>recordQuarantine(input: { source: RuntimeQuarantineSource; reason: RuntimeQuarantineReason; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RUNTIME_OPERATIONAL_METRIC_NAMES`

RUNTIME OPERATIONAL METRIC NAMES constant exported by the `modules/runtime/runtime-operational-telemetry` module.

- Kind: constant
- Import: `import { RUNTIME_OPERATIONAL_METRIC_NAMES } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### Declaration

```text
export declare const RUNTIME_OPERATIONAL_METRIC_NAMES: { readonly quarantineTotal: "hypha.runtime.quarantine.total"; readonly continuationLatencyMs: "hypha.runtime.continuation.latency_ms"; readonly leaseRenewalLatencyMs: "hypha.runtime.lease.renewal.latency_ms"; readonly leaseRenewalTotal: "hypha.runtime.lease.renewal.total"; readonly noProgressFingerprintTotal: "hypha.runtime.no_progress.fingerprint.total"; readonly noProgressConsecutive: "hypha.runtime.no_progress.consecutive"; };
```

## `RuntimeOperationalTelemetryOptions`

Runtime Operational Telemetry Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeOperationalTelemetryOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### Declaration

```text
export interface RuntimeOperationalTelemetryOptions {
    recorder: TelemetryRecorder;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `recorder` | property | <code>recorder: TelemetryRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeLeaseResource`

Public type alias for Runtime Lease Resource; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeLeaseResource } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### Declaration

```text
export type RuntimeLeaseResource = 'session_command' | 'run' | 'state_claim';
```

## `RuntimeQuarantineReason`

Public type alias for Runtime Quarantine Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeQuarantineReason } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### Declaration

```text
export type RuntimeQuarantineReason = 'checkpoint_missing' | 'checkpoint_identity_mismatch' | 'checkpoint_hash_mismatch' | 'command_without_valid_checkpoint' | 'canonical_stream_corrupt';
```

## `RuntimeQuarantineSource`

Public type alias for Runtime Quarantine Source; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeQuarantineSource } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### Declaration

```text
export type RuntimeQuarantineSource = 'continuation_reconciler' | 'startup_integrity_audit';
```
