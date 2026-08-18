# `@codesoul-co/hypha-mcp` / `governance`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Source: [`packages/mcp/src/governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)
- Exports: **11**

## Using this module

Use the Governance module for applying policy and governance checks. It exports 1 class, 5 functions, 3 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  InMemoryMCPCapabilityBaselineStore,
  attestCapability,
  capabilityHash,
  capabilityKey,
  evaluateCapabilityDrift,
  governedSideEffectLevel,
} from '@codesoul-co/hypha-mcp';

import type {
  MCPCapabilityBaselineStore,
  MCPDriftEvaluation,
  MCPDriftRecord,
  MCPDriftPolicy,
  MCPDriftStatus,
} from '@codesoul-co/hypha-mcp';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMCPCapabilityBaselineStore` | class | <code>new InMemoryMCPCapabilityBaselineStore(): InMemoryMCPCapabilityBaselineStore</code> | In Memory MCP Capability Baseline Store class with 3 public constructor or member entries; its exact declarations are listed below. |
| `attestCapability` | function | <code>attestCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor</code> | Attest Capability function with 1 public call signature; parameters and return types are listed below. |
| `capabilityHash` | function | <code>capabilityHash(capability: MCPCapabilityDescriptor): string</code> | Capability Hash function with 1 public call signature; parameters and return types are listed below. |
| `capabilityKey` | function | <code>capabilityKey(capability: Pick&lt;MCPCapabilityDescriptor, "serverId" &#124; "capabilityId"&gt;): string</code> | Capability Key function with 1 public call signature; parameters and return types are listed below. |
| `evaluateCapabilityDrift` | function | <code>evaluateCapabilityDrift(discovered: MCPCapabilityDescriptor[], baseline: MCPCapabilityDescriptor[], policy?: MCPDriftPolicy): MCPDriftEvaluation</code> | Evaluate Capability Drift function with 1 public call signature; parameters and return types are listed below. |
| `governedSideEffectLevel` | function | <code>governedSideEffectLevel(capability: MCPCapabilityDescriptor): SideEffectLevel</code> | Governed Side Effect Level function with 1 public call signature; parameters and return types are listed below. |
| `MCPCapabilityBaselineStore` | interface | <code>interface MCPCapabilityBaselineStore</code> | MCP Capability Baseline Store interface with 2 public fields or methods. |
| `MCPDriftEvaluation` | interface | <code>interface MCPDriftEvaluation</code> | MCP Drift Evaluation interface with 4 public fields or methods. |
| `MCPDriftRecord` | interface | <code>interface MCPDriftRecord</code> | MCP Drift Record interface with 6 public fields or methods. |
| `MCPDriftPolicy` | type | <code>type MCPDriftPolicy = 'quarantine' &#124; 'accept'</code> | Public type alias for MCP Drift Policy; the declaration contains its complete type expression. |
| `MCPDriftStatus` | type | <code>type MCPDriftStatus = 'added' &#124; 'unchanged' &#124; 'changed' &#124; 'removed'</code> | Public type alias for MCP Drift Status; the declaration contains its complete type expression. |

## `InMemoryMCPCapabilityBaselineStore`

In Memory MCP Capability Baseline Store class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMCPCapabilityBaselineStore } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export declare class InMemoryMCPCapabilityBaselineStore implements MCPCapabilityBaselineStore {
    load(integrationId: string): Promise<MCPCapabilityDescriptor[]>;
    save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryMCPCapabilityBaselineStore</code> | Creates an instance of this class. |
| `load` | method | <code>load(integrationId: string): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `attestCapability`

Attest Capability function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { attestCapability } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export declare function attestCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor;
```

### Call signature

```text
attestCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `capability` | <code>MCPCapabilityDescriptor</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MCPCapabilityDescriptor`
- Description: The return contract is defined by the type shown above.

## `capabilityHash`

Capability Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { capabilityHash } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export declare function capabilityHash(capability: MCPCapabilityDescriptor): string;
```

### Call signature

```text
capabilityHash(capability: MCPCapabilityDescriptor): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `capability` | <code>MCPCapabilityDescriptor</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `capabilityKey`

Capability Key function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { capabilityKey } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export declare function capabilityKey(capability: Pick<MCPCapabilityDescriptor, 'serverId' | 'capabilityId'>): string;
```

### Call signature

```text
capabilityKey(capability: Pick<MCPCapabilityDescriptor, "serverId" | "capabilityId">): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `capability` | <code>Pick&lt;MCPCapabilityDescriptor, "serverId" &#124; "capabilityId"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `evaluateCapabilityDrift`

Evaluate Capability Drift function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { evaluateCapabilityDrift } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export declare function evaluateCapabilityDrift(discovered: MCPCapabilityDescriptor[], baseline: MCPCapabilityDescriptor[], policy?: MCPDriftPolicy): MCPDriftEvaluation;
```

### Call signature

```text
evaluateCapabilityDrift(discovered: MCPCapabilityDescriptor[], baseline: MCPCapabilityDescriptor[], policy?: MCPDriftPolicy): MCPDriftEvaluation
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `discovered` | <code>MCPCapabilityDescriptor[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `baseline` | <code>MCPCapabilityDescriptor[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `policy` | <code>MCPDriftPolicy</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MCPDriftEvaluation`
- Description: The return contract is defined by the type shown above.

## `governedSideEffectLevel`

Governed Side Effect Level function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { governedSideEffectLevel } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export declare function governedSideEffectLevel(capability: MCPCapabilityDescriptor): SideEffectLevel;
```

### Call signature

```text
governedSideEffectLevel(capability: MCPCapabilityDescriptor): SideEffectLevel
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `capability` | <code>MCPCapabilityDescriptor</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SideEffectLevel`
- Description: The return contract is defined by the type shown above.

## `MCPCapabilityBaselineStore`

MCP Capability Baseline Store interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MCPCapabilityBaselineStore } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export interface MCPCapabilityBaselineStore {
    load(integrationId: string): Promise<MCPCapabilityDescriptor[]>;
    save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `load` | method | <code>load(integrationId: string): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MCPDriftEvaluation`

MCP Drift Evaluation interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MCPDriftEvaluation } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export interface MCPDriftEvaluation {
    current: MCPCapabilityDescriptor[];
    acceptedBaseline: MCPCapabilityDescriptor[];
    records: MCPDriftRecord[];
    quarantinedKeys: Set<string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptedBaseline` | property | <code>acceptedBaseline: MCPCapabilityDescriptor[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `current` | property | <code>current: MCPCapabilityDescriptor[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quarantinedKeys` | property | <code>quarantinedKeys: Set&lt;string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `records` | property | <code>records: MCPDriftRecord[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPDriftRecord`

MCP Drift Record interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MCPDriftRecord } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export interface MCPDriftRecord {
    capabilityKey: string;
    serverId: string;
    capabilityId: string;
    status: MCPDriftStatus;
    previousHash?: string;
    currentHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityKey` | property | <code>capabilityKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `currentHash` | property | <code>currentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousHash` | property | <code>previousHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverId` | property | <code>serverId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: MCPDriftStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MCPDriftPolicy`

Public type alias for MCP Drift Policy; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MCPDriftPolicy } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export type MCPDriftPolicy = 'quarantine' | 'accept';
```

## `MCPDriftStatus`

Public type alias for MCP Drift Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MCPDriftStatus } from '@codesoul-co/hypha-mcp';`
- Source module: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### Declaration

```text
export type MCPDriftStatus = 'added' | 'unchanged' | 'changed' | 'removed';
```
