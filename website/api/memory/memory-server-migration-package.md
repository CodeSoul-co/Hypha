# `@codesoul-co/hypha-memory` / `memory-server-migration-package`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-migration-package.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)
- Exports: **16**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryServerMigrationPackageSpec` | constant | <code>const memoryServerMigrationPackageSpec: MemoryServerMigrationPackageSpec</code> | memory Server Migration Package Spec constant exported by the `memory-server-migration-package` module. |
| `lifecycleFailureError` | function | <code>lifecycleFailureError(point: MemoryServerLifecycleFailurePoint): NormalizedMemoryError</code> | Public runtime operation for lifecycle Failure Error. |
| `runMemoryServerMigrationPackageAcceptance` | function | <code>runMemoryServerMigrationPackageAcceptance(ports: MemoryServerMigrationPackagePorts, spec?: MemoryServerMigrationPackageSpec): Promise&lt;MemoryServerMigrationPackageReport&gt;</code> | Public runtime operation for run Memory Server Migration Package Acceptance. |
| `runMigrationStateMachineAcceptance` | function | <code>runMigrationStateMachineAcceptance(port: MemoryServerMigrationStateMachinePort): Promise&lt;MemoryServerMigrationPackageSuiteReport&gt;</code> | Public runtime operation for run Migration State Machine Acceptance. |
| `runRuntimeLifecycleAcceptance` | function | <code>runRuntimeLifecycleAcceptance(port: MemoryServerRuntimeLifecyclePort, spec?: MemoryServerMigrationPackageSpec): Promise&lt;MemoryServerMigrationPackageSuiteReport&gt;</code> | Public runtime operation for run Runtime Lifecycle Acceptance. |
| `MemoryServerLifecycleFailureEvidence` | interface | <code>interface MemoryServerLifecycleFailureEvidence</code> | Field contract for Memory Server Lifecycle Failure Evidence; see all contract members below. |
| `MemoryServerMigrationPackageFinding` | interface | <code>interface MemoryServerMigrationPackageFinding</code> | Field contract for Memory Server Migration Package Finding; see all contract members below. |
| `MemoryServerMigrationPackagePorts` | interface | <code>interface MemoryServerMigrationPackagePorts</code> | Field contract for Memory Server Migration Package Ports; see all contract members below. |
| `MemoryServerMigrationPackageReport` | interface | <code>interface MemoryServerMigrationPackageReport</code> | Field contract for Memory Server Migration Package Report; see all contract members below. |
| `MemoryServerMigrationPackageSpec` | interface | <code>interface MemoryServerMigrationPackageSpec</code> | Field contract for Memory Server Migration Package Spec; see all contract members below. |
| `MemoryServerMigrationPackageSuiteReport` | interface | <code>interface MemoryServerMigrationPackageSuiteReport</code> | Field contract for Memory Server Migration Package Suite Report; see all contract members below. |
| `MemoryServerMigrationStateMachinePort` | interface | <code>interface MemoryServerMigrationStateMachinePort</code> | Field contract for Memory Server Migration State Machine Port; see all contract members below. |
| `MemoryServerRuntimeLifecycleEvidence` | interface | <code>interface MemoryServerRuntimeLifecycleEvidence</code> | Field contract for Memory Server Runtime Lifecycle Evidence; see all contract members below. |
| `MemoryServerRuntimeLifecyclePort` | interface | <code>interface MemoryServerRuntimeLifecyclePort</code> | Field contract for Memory Server Runtime Lifecycle Port; see all contract members below. |
| `MemoryServerLifecycleFailurePoint` | type | <code>type MemoryServerLifecycleFailurePoint = (typeof memoryServerMigrationPackageSpec.lifecycleFailurePoints)[number]</code> | Public type alias for Memory Server Lifecycle Failure Point. |
| `MemoryServerMigrationPackageSuiteId` | type | <code>type MemoryServerMigrationPackageSuiteId = 'consumer_contract' &#124; 'redis_behavior' &#124; 'permanent_behavior' &#124; 'migration_state_machine' &#124; 'runtime_lifecycle'</code> | Public type alias for Memory Server Migration Package Suite Id. |

## `MemoryServerLifecycleFailureEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `openHandleCount` | property | <code>openHandleCount: number</code> | Public open Handle Count property. |
| `point` | property | <code>point: "provider_create" &#124; "capability_negotiation" &#124; "health_check" &#124; "activity_registration"</code> | Public point property. |
| `rejected` | property | <code>rejected: boolean</code> | Public rejected property. |
| `resourcesClosed` | property | <code>resourcesClosed: number</code> | Public resources Closed property. |
| `resourcesCreated` | property | <code>resourcesCreated: number</code> | Public resources Created property. |

## `MemoryServerMigrationPackageFinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public code property. |
| `fixtureId` | property | <code>fixtureId: string</code> | Public fixture Id property. |
| `issue` | property | <code>issue: string</code> | Public issue property. |
| `message` | property | <code>message: string</code> | Public message property. |

## `MemoryServerMigrationPackagePorts` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contract` | property | <code>contract: MemoryServerMigrationAcceptancePorts</code> | Public contract property. |
| `migrationStateMachine` | property | <code>migrationStateMachine: MemoryServerMigrationStateMachinePort</code> | Public migration State Machine property. |
| `permanentBehavior` | method | <code>permanentBehavior(fixture: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-permanent-migration-fixtures").PermanentMemoryFailureFixture): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-permanent-migration-fixtures").PermanentMemoryMigrationAcceptanceHarness</code> | Public runtime operation for permanent Behavior. |
| `redisBehavior` | method | <code>redisBehavior(fixtureId: string): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-redis-migration-fixtures").WorkingMemoryMigrationAcceptanceHarness</code> | Public runtime operation for redis Behavior. |
| `runtimeLifecycle` | property | <code>runtimeLifecycle: MemoryServerRuntimeLifecyclePort</code> | Public runtime Lifecycle property. |

## `MemoryServerMigrationPackageReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseAcceptanceRef` | property | <code>baseAcceptanceRef: MemoryContractSpecRef</code> | Public base Acceptance Ref property. |
| `contractRef` | property | <code>contractRef: MemoryContractSpecRef</code> | Public contract Ref property. |
| `passed` | property | <code>passed: boolean</code> | Public passed property. |
| `suites` | property | <code>suites: readonly MemoryServerMigrationPackageSuiteReport[]</code> | Public suites property. |

## `MemoryServerMigrationPackageSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseAcceptanceRef` | property | <code>baseAcceptanceRef: MemoryContractSpecRef</code> | Public base Acceptance Ref property. |
| `contractRef` | property | <code>contractRef: MemoryContractSpecRef</code> | Public contract Ref property. |
| `lifecycleFailurePoints` | property | <code>lifecycleFailurePoints: readonly ["provider_create", "capability_negotiation", "health_check", "activity_registration"]</code> | Public lifecycle Failure Points property. |
| `requiredSuites` | property | <code>requiredSuites: readonly ["consumer_contract", "redis_behavior", "permanent_behavior", "migration_state_machine", "runtime_lifecycle"]</code> | Public required Suites property. |

## `MemoryServerMigrationPackageSuiteReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cases` | property | <code>cases: number</code> | Public cases property. |
| `findings` | property | <code>findings: readonly MemoryServerMigrationPackageFinding[]</code> | Public findings property. |
| `id` | property | <code>id: MemoryServerMigrationPackageSuiteId</code> | Public id property. |
| `passed` | property | <code>passed: boolean</code> | Public passed property. |

## `MemoryServerMigrationStateMachinePort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState &#124; Promise&lt;MemoryServerCanonicalMigrationState&gt;</code> | Creates create at this module boundary. |
| `transition` | method | <code>transition(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult &#124; Promise&lt;MemoryServerMigrationTransitionResult&gt;</code> | Transitions transition at this module boundary. |

## `MemoryServerRuntimeLifecycleEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `closeInvocations` | property | <code>closeInvocations: number</code> | Public close Invocations property. |
| `failures` | property | <code>failures: readonly MemoryServerLifecycleFailureEvidence[]</code> | Public failures property. |
| `installationCloseCount` | property | <code>installationCloseCount: number</code> | Public installation Close Count property. |
| `openHandleCount` | property | <code>openHandleCount: number</code> | Public open Handle Count property. |
| `providerCloseCount` | property | <code>providerCloseCount: number</code> | Public provider Close Count property. |

## `MemoryServerRuntimeLifecyclePort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `observe` | method | <code>observe(): Promise&lt;MemoryServerRuntimeLifecycleEvidence&gt;</code> | Public runtime operation for observe. |
