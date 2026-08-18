# `@codesoul-co/hypha-memory` / `provider-return-evidence`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/provider-return-evidence.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)
- 导出数: **6**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Provider return evidence 模块公开 1 常量、2 函数、3 接口。

### 从包入口导入

```ts
import {
  memoryProviderReturnEvidenceSchema,
  createMemoryProviderReturnEvidence,
  verifyMemoryProviderReturnEvidence,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryProviderEvidenceContext,
  MemoryProviderRecordBinding,
  MemoryProviderReturnEvidence,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryProviderReturnEvidenceSchema` | 常量 | <code>const memoryProviderReturnEvidenceSchema: ZodType&lt;MemoryProviderReturnEvidence, ZodTypeDef, MemoryProviderReturnEvidence&gt;</code> | Memory Provider Return Evidence 的运行时 Schema。 |
| `createMemoryProviderReturnEvidence` | 函数 | <code>createMemoryProviderReturnEvidence(context: MemoryProviderEvidenceContext): MemoryProviderReturnEvidence</code> | Create Memory Provider Return Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `verifyMemoryProviderReturnEvidence` | 函数 | <code>verifyMemoryProviderReturnEvidence(evidence: unknown, context: Omit&lt;MemoryProviderEvidenceContext, "status" &#124; "error"&gt;): MemoryProviderReturnEvidence</code> | Verify Memory Provider Return Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryProviderEvidenceContext` | 接口 | <code>interface MemoryProviderEvidenceContext</code> | Memory Provider Evidence Context 接口，共包含 10 个公开字段或方法。 |
| `MemoryProviderRecordBinding` | 接口 | <code>interface MemoryProviderRecordBinding</code> | Memory Provider Record Binding 接口，共包含 5 个公开字段或方法。 |
| `MemoryProviderReturnEvidence` | 接口 | <code>interface MemoryProviderReturnEvidence</code> | Memory Provider Return Evidence 接口，共包含 12 个公开字段或方法。 |

## `memoryProviderReturnEvidenceSchema`

Memory Provider Return Evidence 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryProviderReturnEvidenceSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### 声明

```text
export declare const memoryProviderReturnEvidenceSchema: ZodType<MemoryProviderReturnEvidence, ZodTypeDef, MemoryProviderReturnEvidence>;
```

## `createMemoryProviderReturnEvidence`

Create Memory Provider Return Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMemoryProviderReturnEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### 声明

```text
export declare function createMemoryProviderReturnEvidence(context: MemoryProviderEvidenceContext): MemoryProviderReturnEvidence;
```

### 调用签名

```text
createMemoryProviderReturnEvidence(context: MemoryProviderEvidenceContext): MemoryProviderReturnEvidence
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `context` | <code>MemoryProviderEvidenceContext</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryProviderReturnEvidence`
- 说明: 返回值契约由上述类型定义。

## `verifyMemoryProviderReturnEvidence`

Verify Memory Provider Return Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { verifyMemoryProviderReturnEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### 声明

```text
export declare function verifyMemoryProviderReturnEvidence(evidence: unknown, context: Omit<MemoryProviderEvidenceContext, 'status' | 'error'>): MemoryProviderReturnEvidence;
```

### 调用签名

```text
verifyMemoryProviderReturnEvidence(evidence: unknown, context: Omit<MemoryProviderEvidenceContext, "status" | "error">): MemoryProviderReturnEvidence
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `evidence` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>Omit&lt;MemoryProviderEvidenceContext, "status" &#124; "error"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryProviderReturnEvidence`
- 说明: 返回值契约由上述类型定义。

## `MemoryProviderEvidenceContext`

Memory Provider Evidence Context 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderEvidenceContext } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### 声明

```text
export interface MemoryProviderEvidenceContext {
    operationId: string;
    operation: MemoryActivityOperation;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    providerId: string;
    providerRevision?: string;
    input: unknown;
    output: unknown;
    status: MemoryProviderReturnEvidence['terminal']['status'];
    error?: NormalizedMemoryError;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: MemoryActivityOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "partial"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderRecordBinding`

Memory Provider Record Binding 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderRecordBinding } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### 声明

```text
export interface MemoryProviderRecordBinding {
    memoryId: string;
    versionId: string;
    revision: number;
    scopeHash: string;
    providerId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderReturnEvidence`

Memory Provider Return Evidence 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderReturnEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### 声明

```text
export interface MemoryProviderReturnEvidence {
    schemaVersion: '1.0';
    operationId: string;
    operation: MemoryActivityOperation;
    inputHash: string;
    principalHash: string;
    scopeHash: string;
    providerId: string;
    providerRevision?: string;
    outputHash: string;
    recordBindings: MemoryProviderRecordBinding[];
    terminal: {
        status: 'completed' | 'partial' | 'failed' | 'cancelled';
        error?: NormalizedMemoryError;
    };
    proofHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: MemoryActivityOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputHash` | 属性 | <code>outputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalHash` | 属性 | <code>principalHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `proofHash` | 属性 | <code>proofHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recordBindings` | 属性 | <code>recordBindings: MemoryProviderRecordBinding[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminal` | 属性 | <code>terminal: { status: "completed" &#124; "partial" &#124; "failed" &#124; "cancelled"; error?: NormalizedMemoryError; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
