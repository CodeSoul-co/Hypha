# `@codesoul-co/hypha-core` / `modules/artifact/manager-policy`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/manager-policy.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)
- 导出数: **7**

## 模块用法

用于实施 Policy 与治理检查。Manager policy 模块公开 6 函数、1 类型。

### 从包入口导入

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

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 6 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertCreateAccess` | 函数 | <code>assertCreateAccess(access: ArtifactAccessRecord, principal: ExecutionPrincipal, workspaceId: string, tenantId?: string): void</code> | Assert Create Access 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `assertProfilePermission` | 函数 | <code>assertProfilePermission(profile: ArtifactProfileSpec, principal: ExecutionPrincipal, permission: ArtifactPermission): void</code> | Assert Profile Permission 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `assertRecordPermission` | 函数 | <code>assertRecordPermission(profile: ArtifactProfileSpec, record: ArtifactRecord, principal: ExecutionPrincipal, permission: ArtifactPermission): void</code> | Assert Record Permission 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `canAccessRecord` | 函数 | <code>canAccessRecord(record: ArtifactRecord, principal: ExecutionPrincipal): boolean</code> | Can Access Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `profileReference` | 函数 | <code>profileReference(profile: ArtifactProfileSpec): SpecRef</code> | Profile Reference 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `resolveProfileRef` | 函数 | <code>resolveProfileRef(profiles: ArtifactProfileSpec[], ref: SpecRef): ArtifactProfileSpec &#124; null</code> | Resolve Profile Ref 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ArtifactPermission` | 类型 | <code>type ArtifactPermission = 'read' &#124; 'write' &#124; 'delete'</code> | Artifact Permission 公共类型别名；完整类型表达式见声明。 |

## `assertCreateAccess`

Assert Create Access 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertCreateAccess } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### 声明

```text
export declare function assertCreateAccess(access: ArtifactAccessRecord, principal: ExecutionPrincipal, workspaceId: string, tenantId?: string): void;
```

### 调用签名

```text
assertCreateAccess(access: ArtifactAccessRecord, principal: ExecutionPrincipal, workspaceId: string, tenantId?: string): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `access` | <code>ArtifactAccessRecord</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `principal` | <code>ExecutionPrincipal</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `workspaceId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `tenantId` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `assertProfilePermission`

Assert Profile Permission 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertProfilePermission } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### 声明

```text
export declare function assertProfilePermission(profile: ArtifactProfileSpec, principal: ExecutionPrincipal, permission: ArtifactPermission): void;
```

### 调用签名

```text
assertProfilePermission(profile: ArtifactProfileSpec, principal: ExecutionPrincipal, permission: ArtifactPermission): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `profile` | <code>ArtifactProfileSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `principal` | <code>ExecutionPrincipal</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `permission` | <code>ArtifactPermission</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `assertRecordPermission`

Assert Record Permission 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertRecordPermission } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### 声明

```text
export declare function assertRecordPermission(profile: ArtifactProfileSpec, record: ArtifactRecord, principal: ExecutionPrincipal, permission: ArtifactPermission): void;
```

### 调用签名

```text
assertRecordPermission(profile: ArtifactProfileSpec, record: ArtifactRecord, principal: ExecutionPrincipal, permission: ArtifactPermission): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `profile` | <code>ArtifactProfileSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `record` | <code>ArtifactRecord</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `principal` | <code>ExecutionPrincipal</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `permission` | <code>ArtifactPermission</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `canAccessRecord`

Can Access Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { canAccessRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### 声明

```text
export declare function canAccessRecord(record: ArtifactRecord, principal: ExecutionPrincipal): boolean;
```

### 调用签名

```text
canAccessRecord(record: ArtifactRecord, principal: ExecutionPrincipal): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `record` | <code>ArtifactRecord</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `principal` | <code>ExecutionPrincipal</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `profileReference`

Profile Reference 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { profileReference } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### 声明

```text
export declare function profileReference(profile: ArtifactProfileSpec): SpecRef;
```

### 调用签名

```text
profileReference(profile: ArtifactProfileSpec): SpecRef
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `profile` | <code>ArtifactProfileSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SpecRef`
- 说明: 返回值契约由上述类型定义。

## `resolveProfileRef`

Resolve Profile Ref 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { resolveProfileRef } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### 声明

```text
export declare function resolveProfileRef(profiles: ArtifactProfileSpec[], ref: SpecRef): ArtifactProfileSpec | null;
```

### 调用签名

```text
resolveProfileRef(profiles: ArtifactProfileSpec[], ref: SpecRef): ArtifactProfileSpec | null
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `profiles` | <code>ArtifactProfileSpec[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `ref` | <code>SpecRef</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactProfileSpec`
- 说明: 返回值契约由上述类型定义。

## `ArtifactPermission`

Artifact Permission 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactPermission } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/manager-policy`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-policy.ts)

### 声明

```text
export type ArtifactPermission = 'read' | 'write' | 'delete';
```
