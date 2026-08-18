# `@codesoul-co/hypha-core` / `modules/artifact/manager-policy`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/manager-policy.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)
- Exports: **7**

## Using this module

Use the Manager policy module for applying policy and governance checks. It exports 6 functions, 1 type.

### Import from the package entrypoint

```ts
import {
  assertCreateAccess,
  assertProfilePermission,
  assertRecordPermission,
  canAccessRecord,
  profileReference,
  resolveProfileRef,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactPermission,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 6 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertCreateAccess` | function | <code>assertCreateAccess(access: ArtifactAccessRecord, principal: ExecutionPrincipal, workspaceId: string, tenantId?: string): void</code> | Assert Create Access function with 1 public call signature; parameters and return types are listed below. |
| `assertProfilePermission` | function | <code>assertProfilePermission(profile: ArtifactProfileSpec, principal: ExecutionPrincipal, permission: ArtifactPermission): void</code> | Assert Profile Permission function with 1 public call signature; parameters and return types are listed below. |
| `assertRecordPermission` | function | <code>assertRecordPermission(profile: ArtifactProfileSpec, record: ArtifactRecord, principal: ExecutionPrincipal, permission: ArtifactPermission): void</code> | Assert Record Permission function with 1 public call signature; parameters and return types are listed below. |
| `canAccessRecord` | function | <code>canAccessRecord(record: ArtifactRecord, principal: ExecutionPrincipal): boolean</code> | Can Access Record function with 1 public call signature; parameters and return types are listed below. |
| `profileReference` | function | <code>profileReference(profile: ArtifactProfileSpec): SpecRef</code> | Profile Reference function with 1 public call signature; parameters and return types are listed below. |
| `resolveProfileRef` | function | <code>resolveProfileRef(profiles: ArtifactProfileSpec[], ref: SpecRef): ArtifactProfileSpec &#124; null</code> | Resolve Profile Ref function with 1 public call signature; parameters and return types are listed below. |
| `ArtifactPermission` | type | <code>type ArtifactPermission = 'read' &#124; 'write' &#124; 'delete'</code> | Public type alias for Artifact Permission; the declaration contains its complete type expression. |

## `assertCreateAccess`

Assert Create Access function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertCreateAccess } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### Declaration

```text
export declare function assertCreateAccess(access: ArtifactAccessRecord, principal: ExecutionPrincipal, workspaceId: string, tenantId?: string): void;
```

### Call signature

```text
assertCreateAccess(access: ArtifactAccessRecord, principal: ExecutionPrincipal, workspaceId: string, tenantId?: string): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `access` | <code>ArtifactAccessRecord</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `principal` | <code>ExecutionPrincipal</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `workspaceId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `tenantId` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `assertProfilePermission`

Assert Profile Permission function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertProfilePermission } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### Declaration

```text
export declare function assertProfilePermission(profile: ArtifactProfileSpec, principal: ExecutionPrincipal, permission: ArtifactPermission): void;
```

### Call signature

```text
assertProfilePermission(profile: ArtifactProfileSpec, principal: ExecutionPrincipal, permission: ArtifactPermission): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `profile` | <code>ArtifactProfileSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `principal` | <code>ExecutionPrincipal</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `permission` | <code>ArtifactPermission</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `assertRecordPermission`

Assert Record Permission function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertRecordPermission } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### Declaration

```text
export declare function assertRecordPermission(profile: ArtifactProfileSpec, record: ArtifactRecord, principal: ExecutionPrincipal, permission: ArtifactPermission): void;
```

### Call signature

```text
assertRecordPermission(profile: ArtifactProfileSpec, record: ArtifactRecord, principal: ExecutionPrincipal, permission: ArtifactPermission): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `profile` | <code>ArtifactProfileSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `record` | <code>ArtifactRecord</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `principal` | <code>ExecutionPrincipal</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `permission` | <code>ArtifactPermission</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `canAccessRecord`

Can Access Record function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { canAccessRecord } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### Declaration

```text
export declare function canAccessRecord(record: ArtifactRecord, principal: ExecutionPrincipal): boolean;
```

### Call signature

```text
canAccessRecord(record: ArtifactRecord, principal: ExecutionPrincipal): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `record` | <code>ArtifactRecord</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `principal` | <code>ExecutionPrincipal</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `profileReference`

Profile Reference function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { profileReference } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### Declaration

```text
export declare function profileReference(profile: ArtifactProfileSpec): SpecRef;
```

### Call signature

```text
profileReference(profile: ArtifactProfileSpec): SpecRef
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `profile` | <code>ArtifactProfileSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SpecRef`
- Description: The return contract is defined by the type shown above.

## `resolveProfileRef`

Resolve Profile Ref function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { resolveProfileRef } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### Declaration

```text
export declare function resolveProfileRef(profiles: ArtifactProfileSpec[], ref: SpecRef): ArtifactProfileSpec | null;
```

### Call signature

```text
resolveProfileRef(profiles: ArtifactProfileSpec[], ref: SpecRef): ArtifactProfileSpec | null
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `profiles` | <code>ArtifactProfileSpec[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `ref` | <code>SpecRef</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactProfileSpec`
- Description: The return contract is defined by the type shown above.

## `ArtifactPermission`

Public type alias for Artifact Permission; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactPermission } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### Declaration

```text
export type ArtifactPermission = 'read' | 'write' | 'delete';
```
