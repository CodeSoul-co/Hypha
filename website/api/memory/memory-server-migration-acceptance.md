# `@codesoul-co/hypha-memory` / `memory-server-migration-acceptance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)
- Exports: **12**

## Using this module

Use the Memory server migration acceptance module for using the public contracts and operations for this capability boundary. It exports 4 functions, 8 interfaces.

### Import from the package entrypoint

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

### Usage patterns

- Use the 8 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runCanonicalConsumerMigrationAcceptance` | function | <code>runCanonicalConsumerMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["canonicalConsumer"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | Run Canonical Consumer Migration Acceptance function with 1 public call signature; parameters and return types are listed below. |
| `runMemoryServerMigrationAcceptance` | function | <code>runMemoryServerMigrationAcceptance(ports: MemoryServerMigrationAcceptancePorts, acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationAcceptanceReport&gt;</code> | Run Memory Server Migration Acceptance function with 1 public call signature; parameters and return types are listed below. |
| `runPermanentMemoryMigrationAcceptance` | function | <code>runPermanentMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["permanentMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | Run Permanent Memory Migration Acceptance function with 1 public call signature; parameters and return types are listed below. |
| `runRedisWorkingMemoryMigrationAcceptance` | function | <code>runRedisWorkingMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["redisWorkingMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | Run Redis Working Memory Migration Acceptance function with 1 public call signature; parameters and return types are listed below. |
| `CanonicalMemoryConsumerObservation` | interface | <code>interface CanonicalMemoryConsumerObservation</code> | Canonical Memory Consumer Observation interface with 9 public fields or methods. |
| `MemoryMigrationObservationPort` | interface | <code>interface MemoryMigrationObservationPort</code> | Memory Migration Observation Port interface with 1 public fields or methods. |
| `MemoryServerMigrationAcceptancePorts` | interface | <code>interface MemoryServerMigrationAcceptancePorts</code> | Memory Server Migration Acceptance Ports interface with 3 public fields or methods. |
| `MemoryServerMigrationAcceptanceReport` | interface | <code>interface MemoryServerMigrationAcceptanceReport</code> | Memory Server Migration Acceptance Report interface with 3 public fields or methods. |
| `MemoryServerMigrationFinding` | interface | <code>interface MemoryServerMigrationFinding</code> | Memory Server Migration Finding interface with 3 public fields or methods. |
| `MemoryServerMigrationSuiteReport` | interface | <code>interface MemoryServerMigrationSuiteReport</code> | Memory Server Migration Suite Report interface with 3 public fields or methods. |
| `PermanentMemoryFailureObservation` | interface | <code>interface PermanentMemoryFailureObservation</code> | Permanent Memory Failure Observation interface with 4 public fields or methods. |
| `RedisWorkingMemoryObservation` | interface | <code>interface RedisWorkingMemoryObservation</code> | Redis Working Memory Observation interface with 3 public fields or methods. |

## `runCanonicalConsumerMigrationAcceptance`

Run Canonical Consumer Migration Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runCanonicalConsumerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export declare function runCanonicalConsumerMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts['canonicalConsumer'], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>;
```

### Call signature

```text
runCanonicalConsumerMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["canonicalConsumer"], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `port` | <code>MemoryMigrationObservationPort&lt;CanonicalMemoryConsumerObservation&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryServerMigrationSuiteReport>`
- Description: The return contract is defined by the type shown above.

## `runMemoryServerMigrationAcceptance`

Run Memory Server Migration Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runMemoryServerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export declare function runMemoryServerMigrationAcceptance(ports: MemoryServerMigrationAcceptancePorts, acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationAcceptanceReport>;
```

### Call signature

```text
runMemoryServerMigrationAcceptance(ports: MemoryServerMigrationAcceptancePorts, acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationAcceptanceReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `ports` | <code>MemoryServerMigrationAcceptancePorts</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryServerMigrationAcceptanceReport>`
- Description: The return contract is defined by the type shown above.

## `runPermanentMemoryMigrationAcceptance`

Run Permanent Memory Migration Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runPermanentMemoryMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export declare function runPermanentMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts['permanentMemory'], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>;
```

### Call signature

```text
runPermanentMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["permanentMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `port` | <code>MemoryMigrationObservationPort&lt;PermanentMemoryFailureObservation&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryServerMigrationSuiteReport>`
- Description: The return contract is defined by the type shown above.

## `runRedisWorkingMemoryMigrationAcceptance`

Run Redis Working Memory Migration Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runRedisWorkingMemoryMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export declare function runRedisWorkingMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts['redisWorkingMemory'], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>;
```

### Call signature

```text
runRedisWorkingMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["redisWorkingMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise<MemoryServerMigrationSuiteReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `port` | <code>MemoryMigrationObservationPort&lt;RedisWorkingMemoryObservation&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<MemoryServerMigrationSuiteReport>`
- Description: The return contract is defined by the type shown above.

## `CanonicalMemoryConsumerObservation`

Canonical Memory Consumer Observation interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { CanonicalMemoryConsumerObservation } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compositionReceipt` | property | <code>compositionReceipt?: MemoryRuntimeCompositionReceipt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `consumerServiceInstanceIds` | property | <code>consumerServiceInstanceIds: Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `directStoreConsumers` | property | <code>directStoreConsumers: readonly MemoryServerConsumer[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyAdapterResponsibilities` | property | <code>legacyAdapterResponsibilities: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileSwitches` | property | <code>profileSwitches: readonly CanonicalProfileSwitchObservation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeDependencies` | property | <code>runtimeDependencies: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secondWritePaths` | property | <code>secondWritePaths: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serviceRegistrationCount` | property | <code>serviceRegistrationCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `unresolvedDependencyRefs` | property | <code>unresolvedDependencyRefs: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryMigrationObservationPort`

Memory Migration Observation Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryMigrationObservationPort } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export interface MemoryMigrationObservationPort<T> {
    observe(fixture: MemoryServerMigrationSharedFixture): Promise<T>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `observe` | method | <code>observe(fixture: MemoryServerMigrationSharedFixture): Promise&lt;T&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryServerMigrationAcceptancePorts`

Memory Server Migration Acceptance Ports interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationAcceptancePorts } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export interface MemoryServerMigrationAcceptancePorts {
    canonicalConsumer: MemoryMigrationObservationPort<CanonicalMemoryConsumerObservation>;
    redisWorkingMemory: MemoryMigrationObservationPort<RedisWorkingMemoryObservation>;
    permanentMemory: MemoryMigrationObservationPort<PermanentMemoryFailureObservation>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalConsumer` | property | <code>canonicalConsumer: MemoryMigrationObservationPort&lt;CanonicalMemoryConsumerObservation&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permanentMemory` | property | <code>permanentMemory: MemoryMigrationObservationPort&lt;PermanentMemoryFailureObservation&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redisWorkingMemory` | property | <code>redisWorkingMemory: MemoryMigrationObservationPort&lt;RedisWorkingMemoryObservation&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationAcceptanceReport`

Memory Server Migration Acceptance Report interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationAcceptanceReport } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export interface MemoryServerMigrationAcceptanceReport {
    contractRef: MemoryServerMigrationAcceptance['contractRef'];
    passed: boolean;
    suites: readonly MemoryServerMigrationSuiteReport[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contractRef` | property | <code>contractRef: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passed` | property | <code>passed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `suites` | property | <code>suites: readonly MemoryServerMigrationSuiteReport[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationFinding`

Memory Server Migration Finding interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationFinding } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export interface MemoryServerMigrationFinding {
    issue: MemoryServerMigrationIssue;
    code: string;
    message: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issue` | property | <code>issue: MemoryServerMigrationIssue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationSuiteReport`

Memory Server Migration Suite Report interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationSuiteReport } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export interface MemoryServerMigrationSuiteReport {
    issue: MemoryServerMigrationIssue;
    passed: boolean;
    findings: MemoryServerMigrationFinding[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `findings` | property | <code>findings: MemoryServerMigrationFinding[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issue` | property | <code>issue: MemoryServerMigrationIssue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passed` | property | <code>passed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PermanentMemoryFailureObservation`

Permanent Memory Failure Observation interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryFailureObservation } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export interface PermanentMemoryFailureObservation {
    notFoundReturnsEmpty: boolean;
    providerFailureResult: 'normalized_error' | 'empty_result' | 'success';
    normalizedFailure?: NormalizedMemoryError;
    failureDisposition: 'retry_reconcile_quarantine_or_dlq' | 'empty_result' | 'none';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `failureDisposition` | property | <code>failureDisposition: "none" &#124; "retry_reconcile_quarantine_or_dlq" &#124; "empty_result"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `normalizedFailure` | property | <code>normalizedFailure?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `notFoundReturnsEmpty` | property | <code>notFoundReturnsEmpty: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerFailureResult` | property | <code>providerFailureResult: "normalized_error" &#124; "success" &#124; "empty_result"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RedisWorkingMemoryObservation`

Redis Working Memory Observation interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RedisWorkingMemoryObservation } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)

### Declaration

```text
export interface RedisWorkingMemoryObservation {
    trimArgumentSemantics: 'target_max_length' | 'deletion_count';
    newestReadStrategy: 'reverse_range' | 'forward_range' | 'reliable_metadata';
    cleanupStrategy: 'scan' | 'keys';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cleanupStrategy` | property | <code>cleanupStrategy: "scan" &#124; "keys"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `newestReadStrategy` | property | <code>newestReadStrategy: "reverse_range" &#124; "forward_range" &#124; "reliable_metadata"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trimArgumentSemantics` | property | <code>trimArgumentSemantics: "target_max_length" &#124; "deletion_count"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
