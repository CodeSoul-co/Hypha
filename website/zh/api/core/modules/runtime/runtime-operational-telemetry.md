# `@codesoul-co/hypha-core` / `modules/runtime/runtime-operational-telemetry`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-operational-telemetry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)
- 导出数: **6**

## 模块用法

用于执行该边界的运行时行为。Runtime operational telemetry 模块公开 1 类、1 常量、1 接口、3 类型。

### 从包入口导入

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

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeOperationalTelemetry` | 类 | <code>new RuntimeOperationalTelemetry(options: RuntimeOperationalTelemetryOptions): RuntimeOperationalTelemetry</code> | Stable, low-cardinality Runtime metrics. Run and fingerprint identities stay in durable Events and checkpoints instead of becoming metric attributes. |
| `RUNTIME_OPERATIONAL_METRIC_NAMES` | 常量 | <code>const RUNTIME_OPERATIONAL_METRIC_NAMES: { readonly quarantineTotal: "hypha.runtime.quarantine.total"; readonly continuationLatencyMs: "hypha.runtime.continuation.latency_ms"; readonly leaseRenewalLatencyMs: "hypha.runtime.lease.renewal.latency_ms"; readonly leaseRenewalTotal: "hypha.runtime.lease.renewal.total"; readonly noProgressFingerprintTotal: "hypha.runtime.no_progress.fingerprint.total"; readonly noProgress...</code> | 由 `modules/runtime/runtime-operational-telemetry` 模块导出的 RUNTIME OPERATIONAL METRIC NAMES 常量。 |
| `RuntimeOperationalTelemetryOptions` | 接口 | <code>interface RuntimeOperationalTelemetryOptions</code> | Runtime Operational Telemetry Options 接口，共包含 2 个公开字段或方法。 |
| `RuntimeLeaseResource` | 类型 | <code>type RuntimeLeaseResource = 'session_command' &#124; 'run' &#124; 'state_claim'</code> | Runtime Lease Resource 公共类型别名；完整类型表达式见声明。 |
| `RuntimeQuarantineReason` | 类型 | <code>type RuntimeQuarantineReason = 'checkpoint_missing' &#124; 'checkpoint_identity_mismatch' &#124; 'checkpoint_hash_mismatch' &#124; 'command_without_valid_checkpoint' &#124; 'canonical_stream_corrupt'</code> | Runtime Quarantine Reason 公共类型别名；完整类型表达式见声明。 |
| `RuntimeQuarantineSource` | 类型 | <code>type RuntimeQuarantineSource = 'continuation_reconciler' &#124; 'startup_integrity_audit'</code> | Runtime Quarantine Source 公共类型别名；完整类型表达式见声明。 |

## `RuntimeOperationalTelemetry`

Stable, low-cardinality Runtime metrics. Run and fingerprint identities stay in durable Events and checkpoints instead of becoming metric attributes.

- 种类: 类
- 导入: `import { RuntimeOperationalTelemetry } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeOperationalTelemetryOptions): RuntimeOperationalTelemetry</code> | 创建该类的实例。 |
| `recordContinuationLatency` | 方法 | <code>recordContinuationLatency(input: { suspendedAt: string; resumedAt: string; outcome: "resumed" &#124; "scheduled" &#124; "reused"; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordLeaseRenewal` | 方法 | <code>recordLeaseRenewal(input: { resource: RuntimeLeaseResource; durationMs: number; outcome: "succeeded" &#124; "failed"; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordNoProgressFingerprint` | 方法 | <code>recordNoProgressFingerprint(input: { consecutiveNoProgress: number; source: "react_checkpoint" &#124; "recovery"; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recordQuarantine` | 方法 | <code>recordQuarantine(input: { source: RuntimeQuarantineSource; reason: RuntimeQuarantineReason; }): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RUNTIME_OPERATIONAL_METRIC_NAMES`

由 `modules/runtime/runtime-operational-telemetry` 模块导出的 RUNTIME OPERATIONAL METRIC NAMES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_OPERATIONAL_METRIC_NAMES } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### 声明

```text
export declare const RUNTIME_OPERATIONAL_METRIC_NAMES: { readonly quarantineTotal: "hypha.runtime.quarantine.total"; readonly continuationLatencyMs: "hypha.runtime.continuation.latency_ms"; readonly leaseRenewalLatencyMs: "hypha.runtime.lease.renewal.latency_ms"; readonly leaseRenewalTotal: "hypha.runtime.lease.renewal.total"; readonly noProgressFingerprintTotal: "hypha.runtime.no_progress.fingerprint.total"; readonly noProgressConsecutive: "hypha.runtime.no_progress.consecutive"; };
```

## `RuntimeOperationalTelemetryOptions`

Runtime Operational Telemetry Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeOperationalTelemetryOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### 声明

```text
export interface RuntimeOperationalTelemetryOptions {
    recorder: TelemetryRecorder;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `recorder` | 属性 | <code>recorder: TelemetryRecorder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeLeaseResource`

Runtime Lease Resource 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeLeaseResource } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### 声明

```text
export type RuntimeLeaseResource = 'session_command' | 'run' | 'state_claim';
```

## `RuntimeQuarantineReason`

Runtime Quarantine Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeQuarantineReason } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### 声明

```text
export type RuntimeQuarantineReason = 'checkpoint_missing' | 'checkpoint_identity_mismatch' | 'checkpoint_hash_mismatch' | 'command_without_valid_checkpoint' | 'canonical_stream_corrupt';
```

## `RuntimeQuarantineSource`

Runtime Quarantine Source 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeQuarantineSource } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-operational-telemetry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-operational-telemetry.ts)

### 声明

```text
export type RuntimeQuarantineSource = 'continuation_reconciler' | 'startup_integrity_audit';
```
