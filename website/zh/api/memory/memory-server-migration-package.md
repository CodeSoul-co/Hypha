# `@codesoul-co/hypha-memory` / `memory-server-migration-package`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-migration-package.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)
- 导出数: **16**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory server migration package 模块公开 1 常量、4 函数、9 接口、2 类型。

### 从包入口导入

```ts
import {
  memoryServerMigrationPackageSpec,
  lifecycleFailureError,
  runMemoryServerMigrationPackageAcceptance,
  runMigrationStateMachineAcceptance,
  runRuntimeLifecycleAcceptance,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryServerLifecycleFailureEvidence,
  MemoryServerMigrationPackageFinding,
  MemoryServerMigrationPackagePorts,
  MemoryServerMigrationPackageReport,
  MemoryServerMigrationPackageSpec,
  MemoryServerMigrationPackageSuiteReport,
  MemoryServerMigrationStateMachinePort,
  MemoryServerRuntimeLifecycleEvidence,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryServerMigrationPackageSpec` | 常量 | <code>const memoryServerMigrationPackageSpec: MemoryServerMigrationPackageSpec</code> | 由 `memory-server-migration-package` 模块导出的 Memory Server Migration Package Spec 常量。 |
| `lifecycleFailureError` | 函数 | <code>lifecycleFailureError(point: MemoryServerLifecycleFailurePoint): NormalizedMemoryError</code> | Lifecycle Failure Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runMemoryServerMigrationPackageAcceptance` | 函数 | <code>runMemoryServerMigrationPackageAcceptance(ports: MemoryServerMigrationPackagePorts, spec?: MemoryServerMigrationPackageSpec): Promise&lt;MemoryServerMigrationPackageReport&gt;</code> | Run Memory Server Migration Package Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runMigrationStateMachineAcceptance` | 函数 | <code>runMigrationStateMachineAcceptance(port: MemoryServerMigrationStateMachinePort): Promise&lt;MemoryServerMigrationPackageSuiteReport&gt;</code> | Run Migration State Machine Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runRuntimeLifecycleAcceptance` | 函数 | <code>runRuntimeLifecycleAcceptance(port: MemoryServerRuntimeLifecyclePort, spec?: MemoryServerMigrationPackageSpec): Promise&lt;MemoryServerMigrationPackageSuiteReport&gt;</code> | Run Runtime Lifecycle Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryServerLifecycleFailureEvidence` | 接口 | <code>interface MemoryServerLifecycleFailureEvidence</code> | Memory Server Lifecycle Failure Evidence 接口，共包含 5 个公开字段或方法。 |
| `MemoryServerMigrationPackageFinding` | 接口 | <code>interface MemoryServerMigrationPackageFinding</code> | Memory Server Migration Package Finding 接口，共包含 4 个公开字段或方法。 |
| `MemoryServerMigrationPackagePorts` | 接口 | <code>interface MemoryServerMigrationPackagePorts</code> | Memory Server Migration Package Ports 接口，共包含 5 个公开字段或方法。 |
| `MemoryServerMigrationPackageReport` | 接口 | <code>interface MemoryServerMigrationPackageReport</code> | Memory Server Migration Package Report 接口，共包含 4 个公开字段或方法。 |
| `MemoryServerMigrationPackageSpec` | 接口 | <code>interface MemoryServerMigrationPackageSpec</code> | Memory Server Migration Package Spec 接口，共包含 4 个公开字段或方法。 |
| `MemoryServerMigrationPackageSuiteReport` | 接口 | <code>interface MemoryServerMigrationPackageSuiteReport</code> | Memory Server Migration Package Suite Report 接口，共包含 4 个公开字段或方法。 |
| `MemoryServerMigrationStateMachinePort` | 接口 | <code>interface MemoryServerMigrationStateMachinePort</code> | Memory Server Migration State Machine Port 接口，共包含 2 个公开字段或方法。 |
| `MemoryServerRuntimeLifecycleEvidence` | 接口 | <code>interface MemoryServerRuntimeLifecycleEvidence</code> | Memory Server Runtime Lifecycle Evidence 接口，共包含 5 个公开字段或方法。 |
| `MemoryServerRuntimeLifecyclePort` | 接口 | <code>interface MemoryServerRuntimeLifecyclePort</code> | Memory Server Runtime Lifecycle Port 接口，共包含 1 个公开字段或方法。 |
| `MemoryServerLifecycleFailurePoint` | 类型 | <code>type MemoryServerLifecycleFailurePoint = (typeof memoryServerMigrationPackageSpec.lifecycleFailurePoints)[number]</code> | Memory Server Lifecycle Failure Point 公共类型别名；完整类型表达式见声明。 |
| `MemoryServerMigrationPackageSuiteId` | 类型 | <code>type MemoryServerMigrationPackageSuiteId = 'consumer_contract' &#124; 'redis_behavior' &#124; 'permanent_behavior' &#124; 'migration_state_machine' &#124; 'runtime_lifecycle'</code> | Memory Server Migration Package Suite ID 公共类型别名；完整类型表达式见声明。 |

## `memoryServerMigrationPackageSpec`

由 `memory-server-migration-package` 模块导出的 Memory Server Migration Package Spec 常量。

- 种类: 常量
- 导入: `import { memoryServerMigrationPackageSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export declare const memoryServerMigrationPackageSpec: MemoryServerMigrationPackageSpec;
```

## `lifecycleFailureError`

Lifecycle Failure Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { lifecycleFailureError } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export declare function lifecycleFailureError(point: MemoryServerLifecycleFailurePoint): NormalizedMemoryError;
```

### 调用签名

```text
lifecycleFailureError(point: MemoryServerLifecycleFailurePoint): NormalizedMemoryError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `point` | <code>"provider_create" &#124; "capability_negotiation" &#124; "health_check" &#124; "activity_registration"</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `NormalizedMemoryError`
- 说明: 返回值契约由上述类型定义。

## `runMemoryServerMigrationPackageAcceptance`

Run Memory Server Migration Package Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runMemoryServerMigrationPackageAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export declare function runMemoryServerMigrationPackageAcceptance(ports: MemoryServerMigrationPackagePorts, spec?: MemoryServerMigrationPackageSpec): Promise<MemoryServerMigrationPackageReport>;
```

### 调用签名

```text
runMemoryServerMigrationPackageAcceptance(ports: MemoryServerMigrationPackagePorts, spec?: MemoryServerMigrationPackageSpec): Promise<MemoryServerMigrationPackageReport>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `ports` | <code>MemoryServerMigrationPackagePorts</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `spec` | <code>MemoryServerMigrationPackageSpec</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryServerMigrationPackageReport>`
- 说明: 返回值契约由上述类型定义。

## `runMigrationStateMachineAcceptance`

Run Migration State Machine Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runMigrationStateMachineAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export declare function runMigrationStateMachineAcceptance(port: MemoryServerMigrationStateMachinePort): Promise<MemoryServerMigrationPackageSuiteReport>;
```

### 调用签名

```text
runMigrationStateMachineAcceptance(port: MemoryServerMigrationStateMachinePort): Promise<MemoryServerMigrationPackageSuiteReport>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `port` | <code>MemoryServerMigrationStateMachinePort</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryServerMigrationPackageSuiteReport>`
- 说明: 返回值契约由上述类型定义。

## `runRuntimeLifecycleAcceptance`

Run Runtime Lifecycle Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runRuntimeLifecycleAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export declare function runRuntimeLifecycleAcceptance(port: MemoryServerRuntimeLifecyclePort, spec?: MemoryServerMigrationPackageSpec): Promise<MemoryServerMigrationPackageSuiteReport>;
```

### 调用签名

```text
runRuntimeLifecycleAcceptance(port: MemoryServerRuntimeLifecyclePort, spec?: MemoryServerMigrationPackageSpec): Promise<MemoryServerMigrationPackageSuiteReport>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `port` | <code>MemoryServerRuntimeLifecyclePort</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `spec` | <code>MemoryServerMigrationPackageSpec</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryServerMigrationPackageSuiteReport>`
- 说明: 返回值契约由上述类型定义。

## `MemoryServerLifecycleFailureEvidence`

Memory Server Lifecycle Failure Evidence 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerLifecycleFailureEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export interface MemoryServerLifecycleFailureEvidence {
    point: MemoryServerLifecycleFailurePoint;
    rejected: boolean;
    resourcesCreated: number;
    resourcesClosed: number;
    openHandleCount: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `openHandleCount` | 属性 | <code>openHandleCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `point` | 属性 | <code>point: "provider_create" &#124; "capability_negotiation" &#124; "health_check" &#124; "activity_registration"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejected` | 属性 | <code>rejected: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourcesClosed` | 属性 | <code>resourcesClosed: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourcesCreated` | 属性 | <code>resourcesCreated: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationPackageFinding`

Memory Server Migration Package Finding 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationPackageFinding } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export interface MemoryServerMigrationPackageFinding {
    code: string;
    message: string;
    fixtureId?: string;
    issue?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fixtureId` | 属性 | <code>fixtureId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issue` | 属性 | <code>issue?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationPackagePorts`

Memory Server Migration Package Ports 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationPackagePorts } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export interface MemoryServerMigrationPackagePorts {
    contract: MemoryServerMigrationAcceptancePorts;
    redisBehavior: WorkingMemoryMigrationHarnessFactory;
    permanentBehavior: PermanentMemoryMigrationHarnessFactory;
    migrationStateMachine: MemoryServerMigrationStateMachinePort;
    runtimeLifecycle: MemoryServerRuntimeLifecyclePort;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contract` | 属性 | <code>contract: MemoryServerMigrationAcceptancePorts</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `migrationStateMachine` | 属性 | <code>migrationStateMachine: MemoryServerMigrationStateMachinePort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permanentBehavior` | 方法 | <code>permanentBehavior(fixture: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-permanent-migration-fixtures").PermanentMemoryFailureFixture): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-permanent-migration-fixtures").PermanentMemoryMigrationAcceptanceHarness</code> | 公开方法；参数与返回类型以签名列为准。 |
| `redisBehavior` | 方法 | <code>redisBehavior(fixtureId: string): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-redis-migration-fixtures").WorkingMemoryMigrationAcceptanceHarness</code> | 公开方法；参数与返回类型以签名列为准。 |
| `runtimeLifecycle` | 属性 | <code>runtimeLifecycle: MemoryServerRuntimeLifecyclePort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationPackageReport`

Memory Server Migration Package Report 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationPackageReport } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export interface MemoryServerMigrationPackageReport {
    contractRef: MemoryContractSpecRef;
    baseAcceptanceRef: MemoryContractSpecRef;
    passed: boolean;
    suites: readonly MemoryServerMigrationPackageSuiteReport[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseAcceptanceRef` | 属性 | <code>baseAcceptanceRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractRef` | 属性 | <code>contractRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `passed` | 属性 | <code>passed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `suites` | 属性 | <code>suites: readonly MemoryServerMigrationPackageSuiteReport[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationPackageSpec`

Memory Server Migration Package Spec 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationPackageSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export interface MemoryServerMigrationPackageSpec {
    contractRef: MemoryContractSpecRef;
    baseAcceptanceRef: MemoryContractSpecRef;
    requiredSuites: readonly [
        'consumer_contract',
        'redis_behavior',
        'permanent_behavior',
        'migration_state_machine',
        'runtime_lifecycle'
    ];
    lifecycleFailurePoints: readonly [
        'provider_create',
        'capability_negotiation',
        'health_check',
        'activity_registration'
    ];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseAcceptanceRef` | 属性 | <code>baseAcceptanceRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractRef` | 属性 | <code>contractRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lifecycleFailurePoints` | 属性 | <code>lifecycleFailurePoints: readonly ["provider_create", "capability_negotiation", "health_check", "activity_registration"]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredSuites` | 属性 | <code>requiredSuites: readonly ["consumer_contract", "redis_behavior", "permanent_behavior", "migration_state_machine", "runtime_lifecycle"]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationPackageSuiteReport`

Memory Server Migration Package Suite Report 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationPackageSuiteReport } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export interface MemoryServerMigrationPackageSuiteReport {
    id: MemoryServerMigrationPackageSuiteId;
    passed: boolean;
    cases: number;
    findings: readonly MemoryServerMigrationPackageFinding[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cases` | 属性 | <code>cases: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `findings` | 属性 | <code>findings: readonly MemoryServerMigrationPackageFinding[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: MemoryServerMigrationPackageSuiteId</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `passed` | 属性 | <code>passed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationStateMachinePort`

Memory Server Migration State Machine Port 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationStateMachinePort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export interface MemoryServerMigrationStateMachinePort {
    create(input: {
        migrationId: string;
        revision: string;
        createdAt: string;
    }): MemoryServerCanonicalMigrationState | Promise<MemoryServerCanonicalMigrationState>;
    transition(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult | Promise<MemoryServerMigrationTransitionResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState &#124; Promise&lt;MemoryServerCanonicalMigrationState&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `transition` | 方法 | <code>transition(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult &#124; Promise&lt;MemoryServerMigrationTransitionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryServerRuntimeLifecycleEvidence`

Memory Server Runtime Lifecycle Evidence 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerRuntimeLifecycleEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export interface MemoryServerRuntimeLifecycleEvidence {
    closeInvocations: number;
    providerCloseCount: number;
    installationCloseCount: number;
    openHandleCount: number;
    failures: readonly MemoryServerLifecycleFailureEvidence[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `closeInvocations` | 属性 | <code>closeInvocations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failures` | 属性 | <code>failures: readonly MemoryServerLifecycleFailureEvidence[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `installationCloseCount` | 属性 | <code>installationCloseCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `openHandleCount` | 属性 | <code>openHandleCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerCloseCount` | 属性 | <code>providerCloseCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerRuntimeLifecyclePort`

Memory Server Runtime Lifecycle Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerRuntimeLifecyclePort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export interface MemoryServerRuntimeLifecyclePort {
    observe(): Promise<MemoryServerRuntimeLifecycleEvidence>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `observe` | 方法 | <code>observe(): Promise&lt;MemoryServerRuntimeLifecycleEvidence&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryServerLifecycleFailurePoint`

Memory Server Lifecycle Failure Point 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryServerLifecycleFailurePoint } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export type MemoryServerLifecycleFailurePoint = (typeof memoryServerMigrationPackageSpec.lifecycleFailurePoints)[number];
```

## `MemoryServerMigrationPackageSuiteId`

Memory Server Migration Package Suite ID 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryServerMigrationPackageSuiteId } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### 声明

```text
export type MemoryServerMigrationPackageSuiteId = 'consumer_contract' | 'redis_behavior' | 'permanent_behavior' | 'migration_state_machine' | 'runtime_lifecycle';
```
