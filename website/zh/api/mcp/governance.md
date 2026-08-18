# `@codesoul-co/hypha-mcp` / `governance`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 源码: [`packages/mcp/src/governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)
- 导出数: **11**

## 模块用法

用于实施 Policy 与治理检查。Governance 模块公开 1 类、5 函数、3 接口、2 类型。

### 从包入口导入

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

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 5 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMCPCapabilityBaselineStore` | 类 | <code>new InMemoryMCPCapabilityBaselineStore(): InMemoryMCPCapabilityBaselineStore</code> | In Memory MCP Capability Baseline Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `attestCapability` | 函数 | <code>attestCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor</code> | Attest Capability 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `capabilityHash` | 函数 | <code>capabilityHash(capability: MCPCapabilityDescriptor): string</code> | Capability Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `capabilityKey` | 函数 | <code>capabilityKey(capability: Pick&lt;MCPCapabilityDescriptor, "serverId" &#124; "capabilityId"&gt;): string</code> | Capability Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `evaluateCapabilityDrift` | 函数 | <code>evaluateCapabilityDrift(discovered: MCPCapabilityDescriptor[], baseline: MCPCapabilityDescriptor[], policy?: MCPDriftPolicy): MCPDriftEvaluation</code> | Evaluate Capability Drift 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `governedSideEffectLevel` | 函数 | <code>governedSideEffectLevel(capability: MCPCapabilityDescriptor): SideEffectLevel</code> | Governed Side Effect Level 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MCPCapabilityBaselineStore` | 接口 | <code>interface MCPCapabilityBaselineStore</code> | MCP Capability Baseline Store 接口，共包含 2 个公开字段或方法。 |
| `MCPDriftEvaluation` | 接口 | <code>interface MCPDriftEvaluation</code> | MCP Drift Evaluation 接口，共包含 4 个公开字段或方法。 |
| `MCPDriftRecord` | 接口 | <code>interface MCPDriftRecord</code> | MCP Drift Record 接口，共包含 6 个公开字段或方法。 |
| `MCPDriftPolicy` | 类型 | <code>type MCPDriftPolicy = 'quarantine' &#124; 'accept'</code> | MCP Drift Policy 公共类型别名；完整类型表达式见声明。 |
| `MCPDriftStatus` | 类型 | <code>type MCPDriftStatus = 'added' &#124; 'unchanged' &#124; 'changed' &#124; 'removed'</code> | MCP Drift Status 公共类型别名；完整类型表达式见声明。 |

## `InMemoryMCPCapabilityBaselineStore`

In Memory MCP Capability Baseline Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMCPCapabilityBaselineStore } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export declare class InMemoryMCPCapabilityBaselineStore implements MCPCapabilityBaselineStore {
    load(integrationId: string): Promise<MCPCapabilityDescriptor[]>;
    save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMCPCapabilityBaselineStore</code> | 创建该类的实例。 |
| `load` | 方法 | <code>load(integrationId: string): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `attestCapability`

Attest Capability 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { attestCapability } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export declare function attestCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor;
```

### 调用签名

```text
attestCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `capability` | <code>MCPCapabilityDescriptor</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MCPCapabilityDescriptor`
- 说明: 返回值契约由上述类型定义。

## `capabilityHash`

Capability Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { capabilityHash } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export declare function capabilityHash(capability: MCPCapabilityDescriptor): string;
```

### 调用签名

```text
capabilityHash(capability: MCPCapabilityDescriptor): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `capability` | <code>MCPCapabilityDescriptor</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `capabilityKey`

Capability Key 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { capabilityKey } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export declare function capabilityKey(capability: Pick<MCPCapabilityDescriptor, 'serverId' | 'capabilityId'>): string;
```

### 调用签名

```text
capabilityKey(capability: Pick<MCPCapabilityDescriptor, "serverId" | "capabilityId">): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `capability` | <code>Pick&lt;MCPCapabilityDescriptor, "serverId" &#124; "capabilityId"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `evaluateCapabilityDrift`

Evaluate Capability Drift 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { evaluateCapabilityDrift } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export declare function evaluateCapabilityDrift(discovered: MCPCapabilityDescriptor[], baseline: MCPCapabilityDescriptor[], policy?: MCPDriftPolicy): MCPDriftEvaluation;
```

### 调用签名

```text
evaluateCapabilityDrift(discovered: MCPCapabilityDescriptor[], baseline: MCPCapabilityDescriptor[], policy?: MCPDriftPolicy): MCPDriftEvaluation
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `discovered` | <code>MCPCapabilityDescriptor[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `baseline` | <code>MCPCapabilityDescriptor[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `policy` | <code>MCPDriftPolicy</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MCPDriftEvaluation`
- 说明: 返回值契约由上述类型定义。

## `governedSideEffectLevel`

Governed Side Effect Level 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { governedSideEffectLevel } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export declare function governedSideEffectLevel(capability: MCPCapabilityDescriptor): SideEffectLevel;
```

### 调用签名

```text
governedSideEffectLevel(capability: MCPCapabilityDescriptor): SideEffectLevel
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `capability` | <code>MCPCapabilityDescriptor</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SideEffectLevel`
- 说明: 返回值契约由上述类型定义。

## `MCPCapabilityBaselineStore`

MCP Capability Baseline Store 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPCapabilityBaselineStore } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export interface MCPCapabilityBaselineStore {
    load(integrationId: string): Promise<MCPCapabilityDescriptor[]>;
    save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `load` | 方法 | <code>load(integrationId: string): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MCPDriftEvaluation`

MCP Drift Evaluation 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPDriftEvaluation } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export interface MCPDriftEvaluation {
    current: MCPCapabilityDescriptor[];
    acceptedBaseline: MCPCapabilityDescriptor[];
    records: MCPDriftRecord[];
    quarantinedKeys: Set<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptedBaseline` | 属性 | <code>acceptedBaseline: MCPCapabilityDescriptor[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `current` | 属性 | <code>current: MCPCapabilityDescriptor[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quarantinedKeys` | 属性 | <code>quarantinedKeys: Set&lt;string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `records` | 属性 | <code>records: MCPDriftRecord[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPDriftRecord`

MCP Drift Record 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MCPDriftRecord } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityKey` | 属性 | <code>capabilityKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `currentHash` | 属性 | <code>currentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousHash` | 属性 | <code>previousHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `serverId` | 属性 | <code>serverId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: MCPDriftStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MCPDriftPolicy`

MCP Drift Policy 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MCPDriftPolicy } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export type MCPDriftPolicy = 'quarantine' | 'accept';
```

## `MCPDriftStatus`

MCP Drift Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MCPDriftStatus } from '@codesoul-co/hypha-mcp';`
- 源码模块: [`governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)

### 声明

```text
export type MCPDriftStatus = 'added' | 'unchanged' | 'changed' | 'removed';
```
