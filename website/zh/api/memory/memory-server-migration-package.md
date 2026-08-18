# `@codesoul-co/hypha-memory` / `memory-server-migration-package`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-migration-package.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)
- 导出数: **16**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryServerMigrationPackageSpec` | 常量 | <code>const memoryServerMigrationPackageSpec: MemoryServerMigrationPackageSpec</code> | 由 `memory-server-migration-package` 模块导出的 memory Server Migration Package Spec 常量。 |
| `lifecycleFailureError` | 函数 | <code>lifecycleFailureError(point: MemoryServerLifecycleFailurePoint): NormalizedMemoryError</code> | lifecycle Failure Error 的公开运行时操作。 |
| `runMemoryServerMigrationPackageAcceptance` | 函数 | <code>runMemoryServerMigrationPackageAcceptance(ports: MemoryServerMigrationPackagePorts, spec?: MemoryServerMigrationPackageSpec): Promise&lt;MemoryServerMigrationPackageReport&gt;</code> | run Memory Server Migration Package Acceptance 的公开运行时操作。 |
| `runMigrationStateMachineAcceptance` | 函数 | <code>runMigrationStateMachineAcceptance(port: MemoryServerMigrationStateMachinePort): Promise&lt;MemoryServerMigrationPackageSuiteReport&gt;</code> | run Migration State Machine Acceptance 的公开运行时操作。 |
| `runRuntimeLifecycleAcceptance` | 函数 | <code>runRuntimeLifecycleAcceptance(port: MemoryServerRuntimeLifecyclePort, spec?: MemoryServerMigrationPackageSpec): Promise&lt;MemoryServerMigrationPackageSuiteReport&gt;</code> | run Runtime Lifecycle Acceptance 的公开运行时操作。 |
| `MemoryServerLifecycleFailureEvidence` | 接口 | <code>interface MemoryServerLifecycleFailureEvidence</code> | Memory Server Lifecycle Failure Evidence 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationPackageFinding` | 接口 | <code>interface MemoryServerMigrationPackageFinding</code> | Memory Server Migration Package Finding 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationPackagePorts` | 接口 | <code>interface MemoryServerMigrationPackagePorts</code> | Memory Server Migration Package Ports 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationPackageReport` | 接口 | <code>interface MemoryServerMigrationPackageReport</code> | Memory Server Migration Package Report 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationPackageSpec` | 接口 | <code>interface MemoryServerMigrationPackageSpec</code> | Memory Server Migration Package Spec 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationPackageSuiteReport` | 接口 | <code>interface MemoryServerMigrationPackageSuiteReport</code> | Memory Server Migration Package Suite Report 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationStateMachinePort` | 接口 | <code>interface MemoryServerMigrationStateMachinePort</code> | Memory Server Migration State Machine Port 的字段契约；完整字段见下表。 |
| `MemoryServerRuntimeLifecycleEvidence` | 接口 | <code>interface MemoryServerRuntimeLifecycleEvidence</code> | Memory Server Runtime Lifecycle Evidence 的字段契约；完整字段见下表。 |
| `MemoryServerRuntimeLifecyclePort` | 接口 | <code>interface MemoryServerRuntimeLifecyclePort</code> | Memory Server Runtime Lifecycle Port 的字段契约；完整字段见下表。 |
| `MemoryServerLifecycleFailurePoint` | 类型 | <code>type MemoryServerLifecycleFailurePoint = (typeof memoryServerMigrationPackageSpec.lifecycleFailurePoints)[number]</code> | Memory Server Lifecycle Failure Point 的公共类型别名。 |
| `MemoryServerMigrationPackageSuiteId` | 类型 | <code>type MemoryServerMigrationPackageSuiteId = 'consumer_contract' &#124; 'redis_behavior' &#124; 'permanent_behavior' &#124; 'migration_state_machine' &#124; 'runtime_lifecycle'</code> | Memory Server Migration Package Suite Id 的公共类型别名。 |

## `MemoryServerLifecycleFailureEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `openHandleCount` | 属性 | <code>openHandleCount: number</code> | open Handle Count 字段。 |
| `point` | 属性 | <code>point: "provider_create" &#124; "capability_negotiation" &#124; "health_check" &#124; "activity_registration"</code> | point 字段。 |
| `rejected` | 属性 | <code>rejected: boolean</code> | rejected 字段。 |
| `resourcesClosed` | 属性 | <code>resourcesClosed: number</code> | resources Closed 字段。 |
| `resourcesCreated` | 属性 | <code>resourcesCreated: number</code> | resources Created 字段。 |

## `MemoryServerMigrationPackageFinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `fixtureId` | 属性 | <code>fixtureId: string</code> | fixture Id 字段。 |
| `issue` | 属性 | <code>issue: string</code> | issue 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |

## `MemoryServerMigrationPackagePorts` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contract` | 属性 | <code>contract: MemoryServerMigrationAcceptancePorts</code> | contract 字段。 |
| `migrationStateMachine` | 属性 | <code>migrationStateMachine: MemoryServerMigrationStateMachinePort</code> | migration State Machine 字段。 |
| `permanentBehavior` | 方法 | <code>permanentBehavior(fixture: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-permanent-migration-fixtures").PermanentMemoryFailureFixture): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-permanent-migration-fixtures").PermanentMemoryMigrationAcceptanceHarness</code> | permanent Behavior 的公开运行时操作。 |
| `redisBehavior` | 方法 | <code>redisBehavior(fixtureId: string): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-redis-migration-fixtures").WorkingMemoryMigrationAcceptanceHarness</code> | redis Behavior 的公开运行时操作。 |
| `runtimeLifecycle` | 属性 | <code>runtimeLifecycle: MemoryServerRuntimeLifecyclePort</code> | runtime Lifecycle 字段。 |

## `MemoryServerMigrationPackageReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseAcceptanceRef` | 属性 | <code>baseAcceptanceRef: MemoryContractSpecRef</code> | base Acceptance Ref 字段。 |
| `contractRef` | 属性 | <code>contractRef: MemoryContractSpecRef</code> | contract Ref 字段。 |
| `passed` | 属性 | <code>passed: boolean</code> | passed 字段。 |
| `suites` | 属性 | <code>suites: readonly MemoryServerMigrationPackageSuiteReport[]</code> | suites 字段。 |

## `MemoryServerMigrationPackageSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseAcceptanceRef` | 属性 | <code>baseAcceptanceRef: MemoryContractSpecRef</code> | base Acceptance Ref 字段。 |
| `contractRef` | 属性 | <code>contractRef: MemoryContractSpecRef</code> | contract Ref 字段。 |
| `lifecycleFailurePoints` | 属性 | <code>lifecycleFailurePoints: readonly ["provider_create", "capability_negotiation", "health_check", "activity_registration"]</code> | lifecycle Failure Points 字段。 |
| `requiredSuites` | 属性 | <code>requiredSuites: readonly ["consumer_contract", "redis_behavior", "permanent_behavior", "migration_state_machine", "runtime_lifecycle"]</code> | required Suites 字段。 |

## `MemoryServerMigrationPackageSuiteReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cases` | 属性 | <code>cases: number</code> | cases 字段。 |
| `findings` | 属性 | <code>findings: readonly MemoryServerMigrationPackageFinding[]</code> | findings 字段。 |
| `id` | 属性 | <code>id: MemoryServerMigrationPackageSuiteId</code> | id 字段。 |
| `passed` | 属性 | <code>passed: boolean</code> | passed 字段。 |

## `MemoryServerMigrationStateMachinePort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState &#124; Promise&lt;MemoryServerCanonicalMigrationState&gt;</code> | 创建 create。 |
| `transition` | 方法 | <code>transition(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult &#124; Promise&lt;MemoryServerMigrationTransitionResult&gt;</code> | 迁移 transition。 |

## `MemoryServerRuntimeLifecycleEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `closeInvocations` | 属性 | <code>closeInvocations: number</code> | close Invocations 字段。 |
| `failures` | 属性 | <code>failures: readonly MemoryServerLifecycleFailureEvidence[]</code> | failures 字段。 |
| `installationCloseCount` | 属性 | <code>installationCloseCount: number</code> | installation Close Count 字段。 |
| `openHandleCount` | 属性 | <code>openHandleCount: number</code> | open Handle Count 字段。 |
| `providerCloseCount` | 属性 | <code>providerCloseCount: number</code> | provider Close Count 字段。 |

## `MemoryServerRuntimeLifecyclePort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `observe` | 方法 | <code>observe(): Promise&lt;MemoryServerRuntimeLifecycleEvidence&gt;</code> | observe 的公开运行时操作。 |
