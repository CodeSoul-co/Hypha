# `@codesoul-co/hypha-memory` / `memory-server-migration-acceptance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)
- 导出数: **12**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory server migration acceptance 模块公开 4 函数、8 接口。

### 从包入口导入

```ts
import {
  runCanonicalConsumerMigrationAcceptance,
  runMemoryServerMigrationAcceptance,
  runPermanentMemoryMigrationAcceptance,
  runRedisWorkingMemoryMigrationAcceptance,
} from '@codesoul-co/hypha-memory';

import type {
  CanonicalMemoryConsumerObservation,
  MemoryMigrationObservationPort,
  MemoryServerMigrationAcceptancePorts,
  MemoryServerMigrationAcceptanceReport,
  MemoryServerMigrationFinding,
  MemoryServerMigrationSuiteReport,
  PermanentMemoryFailureObservation,
  RedisWorkingMemoryObservation,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 8 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runCanonicalConsumerMigrationAcceptance` | 函数 | <code>runCanonicalConsumerMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["canonicalConsumer"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | Run Canonical Consumer Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runMemoryServerMigrationAcceptance` | 函数 | <code>runMemoryServerMigrationAcceptance(ports: MemoryServerMigrationAcceptancePorts, acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationAcceptanceReport&gt;</code> | Run Memory Server Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runPermanentMemoryMigrationAcceptance` | 函数 | <code>runPermanentMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["permanentMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | Run Permanent Memory Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runRedisWorkingMemoryMigrationAcceptance` | 函数 | <code>runRedisWorkingMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["redisWorkingMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | Run Redis Working Memory Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CanonicalMemoryConsumerObservation` | 接口 | <code>interface CanonicalMemoryConsumerObservation</code> | Canonical Memory Consumer Observation 接口，共包含 9 个公开字段或方法。 |
| `MemoryMigrationObservationPort` | 接口 | <code>interface MemoryMigrationObservationPort</code> | Memory Migration Observation Port 接口，共包含 1 个公开字段或方法。 |
| `MemoryServerMigrationAcceptancePorts` | 接口 | <code>interface MemoryServerMigrationAcceptancePorts</code> | Memory Server Migration Acceptance Ports 接口，共包含 3 个公开字段或方法。 |
| `MemoryServerMigrationAcceptanceReport` | 接口 | <code>interface MemoryServerMigrationAcceptanceReport</code> | Memory Server Migration Acceptance Report 接口，共包含 3 个公开字段或方法。 |
| `MemoryServerMigrationFinding` | 接口 | <code>interface MemoryServerMigrationFinding</code> | Memory Server Migration Finding 接口，共包含 3 个公开字段或方法。 |
| `MemoryServerMigrationSuiteReport` | 接口 | <code>interface MemoryServerMigrationSuiteReport</code> | Memory Server Migration Suite Report 接口，共包含 3 个公开字段或方法。 |
| `PermanentMemoryFailureObservation` | 接口 | <code>interface PermanentMemoryFailureObservation</code> | Permanent Memory Failure Observation 接口，共包含 4 个公开字段或方法。 |
| `RedisWorkingMemoryObservation` | 接口 | <code>interface RedisWorkingMemoryObservation</code> | Redis Working Memory Observation 接口，共包含 3 个公开字段或方法。 |

## `runCanonicalConsumerMigrationAcceptance`

Run Canonical Consumer Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runCanonicalConsumerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export declare function runCanonicalConsumerMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts['canonicalConsumer'], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>;
```

### 调用签名

```text
runCanonicalConsumerMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["canonicalConsumer"], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `port` | <code>MemoryMigrationObservationPort&lt;CanonicalMemoryConsumerObservation&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryServerMigrationSuiteReport>`
- 说明: 返回值契约由上述类型定义。

## `runMemoryServerMigrationAcceptance`

Run Memory Server Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runMemoryServerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export declare function runMemoryServerMigrationAcceptance(ports: MemoryServerMigrationAcceptancePorts, acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationAcceptanceReport>;
```

### 调用签名

```text
runMemoryServerMigrationAcceptance(ports: MemoryServerMigrationAcceptancePorts, acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationAcceptanceReport>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `ports` | <code>MemoryServerMigrationAcceptancePorts</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryServerMigrationAcceptanceReport>`
- 说明: 返回值契约由上述类型定义。

## `runPermanentMemoryMigrationAcceptance`

Run Permanent Memory Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runPermanentMemoryMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export declare function runPermanentMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts['permanentMemory'], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>;
```

### 调用签名

```text
runPermanentMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["permanentMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `port` | <code>MemoryMigrationObservationPort&lt;PermanentMemoryFailureObservation&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryServerMigrationSuiteReport>`
- 说明: 返回值契约由上述类型定义。

## `runRedisWorkingMemoryMigrationAcceptance`

Run Redis Working Memory Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runRedisWorkingMemoryMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export declare function runRedisWorkingMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts['redisWorkingMemory'], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>;
```

### 调用签名

```text
runRedisWorkingMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["redisWorkingMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `port` | <code>MemoryMigrationObservationPort&lt;RedisWorkingMemoryObservation&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryServerMigrationSuiteReport>`
- 说明: 返回值契约由上述类型定义。

## `CanonicalMemoryConsumerObservation`

Canonical Memory Consumer Observation 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CanonicalMemoryConsumerObservation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export interface CanonicalMemoryConsumerObservation {
    compositionReceipt?: MemoryRuntimeCompositionReceipt;
    consumerServiceInstanceIds: Partial<Record<MemoryServerConsumer, string>>;
    serviceRegistrationCount: number;
    runtimeDependencies: readonly string[];
    unresolvedDependencyRefs: readonly string[];
    directStoreConsumers: readonly MemoryServerConsumer[];
    secondWritePaths: readonly string[];
    profileSwitches: readonly CanonicalProfileSwitchObservation[];
    legacyAdapterResponsibilities: readonly string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compositionReceipt` | 属性 | <code>compositionReceipt?: MemoryRuntimeCompositionReceipt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `consumerServiceInstanceIds` | 属性 | <code>consumerServiceInstanceIds: Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `directStoreConsumers` | 属性 | <code>directStoreConsumers: readonly MemoryServerConsumer[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyAdapterResponsibilities` | 属性 | <code>legacyAdapterResponsibilities: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileSwitches` | 属性 | <code>profileSwitches: readonly CanonicalProfileSwitchObservation[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeDependencies` | 属性 | <code>runtimeDependencies: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secondWritePaths` | 属性 | <code>secondWritePaths: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serviceRegistrationCount` | 属性 | <code>serviceRegistrationCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `unresolvedDependencyRefs` | 属性 | <code>unresolvedDependencyRefs: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryMigrationObservationPort`

Memory Migration Observation Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryMigrationObservationPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export interface MemoryMigrationObservationPort<T> {
    observe(fixture: MemoryServerMigrationSharedFixture): Promise<T>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `observe` | 方法 | <code>observe(fixture: MemoryServerMigrationSharedFixture): Promise&lt;T&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryServerMigrationAcceptancePorts`

Memory Server Migration Acceptance Ports 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationAcceptancePorts } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export interface MemoryServerMigrationAcceptancePorts {
    canonicalConsumer: MemoryMigrationObservationPort<CanonicalMemoryConsumerObservation>;
    redisWorkingMemory: MemoryMigrationObservationPort<RedisWorkingMemoryObservation>;
    permanentMemory: MemoryMigrationObservationPort<PermanentMemoryFailureObservation>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalConsumer` | 属性 | <code>canonicalConsumer: MemoryMigrationObservationPort&lt;CanonicalMemoryConsumerObservation&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permanentMemory` | 属性 | <code>permanentMemory: MemoryMigrationObservationPort&lt;PermanentMemoryFailureObservation&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redisWorkingMemory` | 属性 | <code>redisWorkingMemory: MemoryMigrationObservationPort&lt;RedisWorkingMemoryObservation&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationAcceptanceReport`

Memory Server Migration Acceptance Report 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationAcceptanceReport } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export interface MemoryServerMigrationAcceptanceReport {
    contractRef: MemoryServerMigrationAcceptance['contractRef'];
    passed: boolean;
    suites: readonly MemoryServerMigrationSuiteReport[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contractRef` | 属性 | <code>contractRef: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `passed` | 属性 | <code>passed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `suites` | 属性 | <code>suites: readonly MemoryServerMigrationSuiteReport[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationFinding`

Memory Server Migration Finding 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationFinding } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export interface MemoryServerMigrationFinding {
    issue: MemoryServerMigrationIssue;
    code: string;
    message: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issue` | 属性 | <code>issue: MemoryServerMigrationIssue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationSuiteReport`

Memory Server Migration Suite Report 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationSuiteReport } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export interface MemoryServerMigrationSuiteReport {
    issue: MemoryServerMigrationIssue;
    passed: boolean;
    findings: MemoryServerMigrationFinding[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `findings` | 属性 | <code>findings: MemoryServerMigrationFinding[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issue` | 属性 | <code>issue: MemoryServerMigrationIssue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `passed` | 属性 | <code>passed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PermanentMemoryFailureObservation`

Permanent Memory Failure Observation 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryFailureObservation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export interface PermanentMemoryFailureObservation {
    notFoundReturnsEmpty: boolean;
    providerFailureResult: 'normalized_error' | 'empty_result' | 'success';
    normalizedFailure?: NormalizedMemoryError;
    failureDisposition: 'retry_reconcile_quarantine_or_dlq' | 'empty_result' | 'none';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `failureDisposition` | 属性 | <code>failureDisposition: "none" &#124; "retry_reconcile_quarantine_or_dlq" &#124; "empty_result"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `normalizedFailure` | 属性 | <code>normalizedFailure?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `notFoundReturnsEmpty` | 属性 | <code>notFoundReturnsEmpty: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerFailureResult` | 属性 | <code>providerFailureResult: "normalized_error" &#124; "success" &#124; "empty_result"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RedisWorkingMemoryObservation`

Redis Working Memory Observation 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisWorkingMemoryObservation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### 声明

```text
export interface RedisWorkingMemoryObservation {
    trimArgumentSemantics: 'target_max_length' | 'deletion_count';
    newestReadStrategy: 'reverse_range' | 'forward_range' | 'reliable_metadata';
    cleanupStrategy: 'scan' | 'keys';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cleanupStrategy` | 属性 | <code>cleanupStrategy: "scan" &#124; "keys"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `newestReadStrategy` | 属性 | <code>newestReadStrategy: "reverse_range" &#124; "forward_range" &#124; "reliable_metadata"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trimArgumentSemantics` | 属性 | <code>trimArgumentSemantics: "target_max_length" &#124; "deletion_count"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
