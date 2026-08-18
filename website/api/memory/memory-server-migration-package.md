# `@codesoul-co/hypha-memory` / `memory-server-migration-package`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-migration-package.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)
- Exports: **16**

## Using this module

Use the Memory server migration package module for using the public contracts and operations for this capability boundary. It exports 1 constant, 4 functions, 9 interfaces, 2 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryServerMigrationPackageSpec` | constant | <code>const memoryServerMigrationPackageSpec: MemoryServerMigrationPackageSpec</code> | Memory Server Migration Package Spec constant exported by the `memory-server-migration-package` module. |
| `lifecycleFailureError` | function | <code>lifecycleFailureError(point: MemoryServerLifecycleFailurePoint): NormalizedMemoryError</code> | Lifecycle Failure Error function with 1 public call signature; parameters and return types are listed below. |
| `runMemoryServerMigrationPackageAcceptance` | function | <code>runMemoryServerMigrationPackageAcceptance(ports: MemoryServerMigrationPackagePorts, spec?: MemoryServerMigrationPackageSpec): Promise&lt;MemoryServerMigrationPackageReport&gt;</code> | Run Memory Server Migration Package Acceptance function with 1 public call signature; parameters and return types are listed below. |
| `runMigrationStateMachineAcceptance` | function | <code>runMigrationStateMachineAcceptance(port: MemoryServerMigrationStateMachinePort): Promise&lt;MemoryServerMigrationPackageSuiteReport&gt;</code> | Run Migration State Machine Acceptance function with 1 public call signature; parameters and return types are listed below. |
| `runRuntimeLifecycleAcceptance` | function | <code>runRuntimeLifecycleAcceptance(port: MemoryServerRuntimeLifecyclePort, spec?: MemoryServerMigrationPackageSpec): Promise&lt;MemoryServerMigrationPackageSuiteReport&gt;</code> | Run Runtime Lifecycle Acceptance function with 1 public call signature; parameters and return types are listed below. |
| `MemoryServerLifecycleFailureEvidence` | interface | <code>interface MemoryServerLifecycleFailureEvidence</code> | Memory Server Lifecycle Failure Evidence interface with 5 public fields or methods. |
| `MemoryServerMigrationPackageFinding` | interface | <code>interface MemoryServerMigrationPackageFinding</code> | Memory Server Migration Package Finding interface with 4 public fields or methods. |
| `MemoryServerMigrationPackagePorts` | interface | <code>interface MemoryServerMigrationPackagePorts</code> | Memory Server Migration Package Ports interface with 5 public fields or methods. |
| `MemoryServerMigrationPackageReport` | interface | <code>interface MemoryServerMigrationPackageReport</code> | Memory Server Migration Package Report interface with 4 public fields or methods. |
| `MemoryServerMigrationPackageSpec` | interface | <code>interface MemoryServerMigrationPackageSpec</code> | Memory Server Migration Package Spec interface with 4 public fields or methods. |
| `MemoryServerMigrationPackageSuiteReport` | interface | <code>interface MemoryServerMigrationPackageSuiteReport</code> | Memory Server Migration Package Suite Report interface with 4 public fields or methods. |
| `MemoryServerMigrationStateMachinePort` | interface | <code>interface MemoryServerMigrationStateMachinePort</code> | Memory Server Migration State Machine Port interface with 2 public fields or methods. |
| `MemoryServerRuntimeLifecycleEvidence` | interface | <code>interface MemoryServerRuntimeLifecycleEvidence</code> | Memory Server Runtime Lifecycle Evidence interface with 5 public fields or methods. |
| `MemoryServerRuntimeLifecyclePort` | interface | <code>interface MemoryServerRuntimeLifecyclePort</code> | Memory Server Runtime Lifecycle Port interface with 1 public fields or methods. |
| `MemoryServerLifecycleFailurePoint` | type | <code>type MemoryServerLifecycleFailurePoint = (typeof memoryServerMigrationPackageSpec.lifecycleFailurePoints)[number]</code> | Public type alias for Memory Server Lifecycle Failure Point; the declaration contains its complete type expression. |
| `MemoryServerMigrationPackageSuiteId` | type | <code>type MemoryServerMigrationPackageSuiteId = 'consumer_contract' &#124; 'redis_behavior' &#124; 'permanent_behavior' &#124; 'migration_state_machine' &#124; 'runtime_lifecycle'</code> | Public type alias for Memory Server Migration Package Suite ID; the declaration contains its complete type expression. |

## `memoryServerMigrationPackageSpec`

Memory Server Migration Package Spec constant exported by the `memory-server-migration-package` module.

- Kind: constant
- Import: `import { memoryServerMigrationPackageSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export declare const memoryServerMigrationPackageSpec: MemoryServerMigrationPackageSpec;
```

## `lifecycleFailureError`

Lifecycle Failure Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { lifecycleFailureError } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export declare function lifecycleFailureError(point: MemoryServerLifecycleFailurePoint): NormalizedMemoryError;
```

### Call signature

```text
lifecycleFailureError(point: MemoryServerLifecycleFailurePoint): NormalizedMemoryError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `point` | <code>"provider_create" &#124; "capability_negotiation" &#124; "health_check" &#124; "activity_registration"</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `NormalizedMemoryError`
- Description: The return contract is defined by the type shown above.

## `runMemoryServerMigrationPackageAcceptance`

Run Memory Server Migration Package Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runMemoryServerMigrationPackageAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export declare function runMemoryServerMigrationPackageAcceptance(ports: MemoryServerMigrationPackagePorts, spec?: MemoryServerMigrationPackageSpec): Promise<MemoryServerMigrationPackageReport>;
```

### Call signature

```text
runMemoryServerMigrationPackageAcceptance(ports: MemoryServerMigrationPackagePorts, spec?: MemoryServerMigrationPackageSpec): Promise<MemoryServerMigrationPackageReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `ports` | <code>MemoryServerMigrationPackagePorts</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `spec` | <code>MemoryServerMigrationPackageSpec</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryServerMigrationPackageReport>`
- Description: The return contract is defined by the type shown above.

## `runMigrationStateMachineAcceptance`

Run Migration State Machine Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runMigrationStateMachineAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export declare function runMigrationStateMachineAcceptance(port: MemoryServerMigrationStateMachinePort): Promise<MemoryServerMigrationPackageSuiteReport>;
```

### Call signature

```text
runMigrationStateMachineAcceptance(port: MemoryServerMigrationStateMachinePort): Promise<MemoryServerMigrationPackageSuiteReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `port` | <code>MemoryServerMigrationStateMachinePort</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryServerMigrationPackageSuiteReport>`
- Description: The return contract is defined by the type shown above.

## `runRuntimeLifecycleAcceptance`

Run Runtime Lifecycle Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runRuntimeLifecycleAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export declare function runRuntimeLifecycleAcceptance(port: MemoryServerRuntimeLifecyclePort, spec?: MemoryServerMigrationPackageSpec): Promise<MemoryServerMigrationPackageSuiteReport>;
```

### Call signature

```text
runRuntimeLifecycleAcceptance(port: MemoryServerRuntimeLifecyclePort, spec?: MemoryServerMigrationPackageSpec): Promise<MemoryServerMigrationPackageSuiteReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `port` | <code>MemoryServerRuntimeLifecyclePort</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `spec` | <code>MemoryServerMigrationPackageSpec</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryServerMigrationPackageSuiteReport>`
- Description: The return contract is defined by the type shown above.

## `MemoryServerLifecycleFailureEvidence`

Memory Server Lifecycle Failure Evidence interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerLifecycleFailureEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export interface MemoryServerLifecycleFailureEvidence {
    point: MemoryServerLifecycleFailurePoint;
    rejected: boolean;
    resourcesCreated: number;
    resourcesClosed: number;
    openHandleCount: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `openHandleCount` | property | <code>openHandleCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `point` | property | <code>point: "provider_create" &#124; "capability_negotiation" &#124; "health_check" &#124; "activity_registration"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejected` | property | <code>rejected: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourcesClosed` | property | <code>resourcesClosed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourcesCreated` | property | <code>resourcesCreated: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationPackageFinding`

Memory Server Migration Package Finding interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationPackageFinding } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export interface MemoryServerMigrationPackageFinding {
    code: string;
    message: string;
    fixtureId?: string;
    issue?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fixtureId` | property | <code>fixtureId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issue` | property | <code>issue?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationPackagePorts`

Memory Server Migration Package Ports interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationPackagePorts } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export interface MemoryServerMigrationPackagePorts {
    contract: MemoryServerMigrationAcceptancePorts;
    redisBehavior: WorkingMemoryMigrationHarnessFactory;
    permanentBehavior: PermanentMemoryMigrationHarnessFactory;
    migrationStateMachine: MemoryServerMigrationStateMachinePort;
    runtimeLifecycle: MemoryServerRuntimeLifecyclePort;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contract` | property | <code>contract: MemoryServerMigrationAcceptancePorts</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `migrationStateMachine` | property | <code>migrationStateMachine: MemoryServerMigrationStateMachinePort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permanentBehavior` | method | <code>permanentBehavior(fixture: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-permanent-migration-fixtures").PermanentMemoryFailureFixture): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-permanent-migration-fixtures").PermanentMemoryMigrationAcceptanceHarness</code> | Public method; parameters and return type are shown in the signature. |
| `redisBehavior` | method | <code>redisBehavior(fixtureId: string): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/memory-server-redis-migration-fixtures").WorkingMemoryMigrationAcceptanceHarness</code> | Public method; parameters and return type are shown in the signature. |
| `runtimeLifecycle` | property | <code>runtimeLifecycle: MemoryServerRuntimeLifecyclePort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationPackageReport`

Memory Server Migration Package Report interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationPackageReport } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export interface MemoryServerMigrationPackageReport {
    contractRef: MemoryContractSpecRef;
    baseAcceptanceRef: MemoryContractSpecRef;
    passed: boolean;
    suites: readonly MemoryServerMigrationPackageSuiteReport[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseAcceptanceRef` | property | <code>baseAcceptanceRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractRef` | property | <code>contractRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passed` | property | <code>passed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `suites` | property | <code>suites: readonly MemoryServerMigrationPackageSuiteReport[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationPackageSpec`

Memory Server Migration Package Spec interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationPackageSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseAcceptanceRef` | property | <code>baseAcceptanceRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractRef` | property | <code>contractRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lifecycleFailurePoints` | property | <code>lifecycleFailurePoints: readonly ["provider_create", "capability_negotiation", "health_check", "activity_registration"]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredSuites` | property | <code>requiredSuites: readonly ["consumer_contract", "redis_behavior", "permanent_behavior", "migration_state_machine", "runtime_lifecycle"]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationPackageSuiteReport`

Memory Server Migration Package Suite Report interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationPackageSuiteReport } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export interface MemoryServerMigrationPackageSuiteReport {
    id: MemoryServerMigrationPackageSuiteId;
    passed: boolean;
    cases: number;
    findings: readonly MemoryServerMigrationPackageFinding[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cases` | property | <code>cases: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `findings` | property | <code>findings: readonly MemoryServerMigrationPackageFinding[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: MemoryServerMigrationPackageSuiteId</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passed` | property | <code>passed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationStateMachinePort`

Memory Server Migration State Machine Port interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationStateMachinePort } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState &#124; Promise&lt;MemoryServerCanonicalMigrationState&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transition` | method | <code>transition(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult &#124; Promise&lt;MemoryServerMigrationTransitionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryServerRuntimeLifecycleEvidence`

Memory Server Runtime Lifecycle Evidence interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerRuntimeLifecycleEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export interface MemoryServerRuntimeLifecycleEvidence {
    closeInvocations: number;
    providerCloseCount: number;
    installationCloseCount: number;
    openHandleCount: number;
    failures: readonly MemoryServerLifecycleFailureEvidence[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `closeInvocations` | property | <code>closeInvocations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failures` | property | <code>failures: readonly MemoryServerLifecycleFailureEvidence[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `installationCloseCount` | property | <code>installationCloseCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `openHandleCount` | property | <code>openHandleCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerCloseCount` | property | <code>providerCloseCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerRuntimeLifecyclePort`

Memory Server Runtime Lifecycle Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerRuntimeLifecyclePort } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export interface MemoryServerRuntimeLifecyclePort {
    observe(): Promise<MemoryServerRuntimeLifecycleEvidence>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `observe` | method | <code>observe(): Promise&lt;MemoryServerRuntimeLifecycleEvidence&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryServerLifecycleFailurePoint`

Public type alias for Memory Server Lifecycle Failure Point; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryServerLifecycleFailurePoint } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export type MemoryServerLifecycleFailurePoint = (typeof memoryServerMigrationPackageSpec.lifecycleFailurePoints)[number];
```

## `MemoryServerMigrationPackageSuiteId`

Public type alias for Memory Server Migration Package Suite ID; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryServerMigrationPackageSuiteId } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-package`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package.ts)

### Declaration

```text
export type MemoryServerMigrationPackageSuiteId = 'consumer_contract' | 'redis_behavior' | 'permanent_behavior' | 'migration_state_machine' | 'runtime_lifecycle';
```
