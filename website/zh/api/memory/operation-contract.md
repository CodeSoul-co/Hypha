# `@codesoul-co/hypha-memory` / `operation-contract`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/operation-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)
- 导出数: **12**

## 模块用法

用于声明并运行时校验契约。Operation contract 模块公开 8 常量、4 函数。

### 从包入口导入

```ts
import {
  managedMemoryDeleteRequestSchema,
  managedMemorySearchRequestSchema,
  managedMemoryUpdateRequestSchema,
  memoryAddRequestExample,
  memoryAddRequestSchema,
  memoryPatchSchema,
  memorySearchFilterSchema,
  paginationRequestSchema,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 8 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { managedMemoryDeleteRequestSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = managedMemoryDeleteRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `managedMemoryDeleteRequestSchema` | 常量 | <code>const managedMemoryDeleteRequestSchema: z.ZodType&lt;ManagedMemoryDeleteRequest, z.ZodTypeDef, ManagedMemoryDeleteRequest&gt;</code> | Managed Memory Delete Request 的运行时 Schema。 |
| `managedMemorySearchRequestSchema` | 常量 | <code>const managedMemorySearchRequestSchema: z.ZodType&lt;ManagedMemorySearchRequest, z.ZodTypeDef, ManagedMemorySearchRequest&gt;</code> | Managed Memory Search Request 的运行时 Schema。 |
| `managedMemoryUpdateRequestSchema` | 常量 | <code>const managedMemoryUpdateRequestSchema: z.ZodType&lt;ManagedMemoryUpdateRequest, z.ZodTypeDef, ManagedMemoryUpdateRequest&gt;</code> | Managed Memory Update Request 的运行时 Schema。 |
| `memoryAddRequestExample` | 常量 | <code>const memoryAddRequestExample: MemoryAddRequest</code> | Memory Add Request 的有效示例值。 |
| `memoryAddRequestSchema` | 常量 | <code>const memoryAddRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata:...</code> | Memory Add Request 的运行时 Schema。 |
| `memoryPatchSchema` | 常量 | <code>const memoryPatchSchema: z.ZodEffects&lt;z.ZodObject&lt;{ content: z.ZodOptional&lt;z.ZodUnknown&gt;; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodString&gt;; confidence: z.ZodOptional&lt;z.ZodNumber&gt;; importance: z.ZodOptional&lt;z.ZodNumber&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; status: z.ZodOptional&lt;z.ZodEnum&lt;["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending",...</code> | Memory Patch 的运行时 Schema。 |
| `memorySearchFilterSchema` | 常量 | <code>const memorySearchFilterSchema: z.ZodType&lt;MemorySearchFilter, z.ZodTypeDef, MemorySearchFilter&gt;</code> | Memory Search Filter 的运行时 Schema。 |
| `paginationRequestSchema` | 常量 | <code>const paginationRequestSchema: z.ZodType&lt;PaginationRequest, z.ZodTypeDef, PaginationRequest&gt;</code> | Pagination Request 的运行时 Schema。 |
| `validateManagedMemoryDeleteRequest` | 函数 | <code>validateManagedMemoryDeleteRequest(input: unknown): ManagedMemoryDeleteRequest</code> | Validate Managed Memory Delete Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateManagedMemorySearchRequest` | 函数 | <code>validateManagedMemorySearchRequest(input: unknown): ManagedMemorySearchRequest</code> | Validate Managed Memory Search Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateManagedMemoryUpdateRequest` | 函数 | <code>validateManagedMemoryUpdateRequest(input: unknown): ManagedMemoryUpdateRequest</code> | Validate Managed Memory Update Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateMemoryAddRequest` | 函数 | <code>validateMemoryAddRequest(input: unknown): MemoryAddRequest</code> | Validate Memory Add Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `managedMemoryDeleteRequestSchema`

Managed Memory Delete Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { managedMemoryDeleteRequestSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare const managedMemoryDeleteRequestSchema: z.ZodType<ManagedMemoryDeleteRequest, z.ZodTypeDef, ManagedMemoryDeleteRequest>;
```

## `managedMemorySearchRequestSchema`

Managed Memory Search Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { managedMemorySearchRequestSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare const managedMemorySearchRequestSchema: z.ZodType<ManagedMemorySearchRequest, z.ZodTypeDef, ManagedMemorySearchRequest>;
```

## `managedMemoryUpdateRequestSchema`

Managed Memory Update Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { managedMemoryUpdateRequestSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare const managedMemoryUpdateRequestSchema: z.ZodType<ManagedMemoryUpdateRequest, z.ZodTypeDef, ManagedMemoryUpdateRequest>;
```

## `memoryAddRequestExample`

Memory Add Request 的有效示例值。

- 种类: 常量
- 导入: `import { memoryAddRequestExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare const memoryAddRequestExample: MemoryAddRequest;
```

## `memoryAddRequestSchema`

Memory Add Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryAddRequestSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const memoryAddRequestSchema: (typeof import('@codesoul-co/hypha-memory'))['memoryAddRequestSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `memoryPatchSchema`

Memory Patch 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryPatchSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare const memoryPatchSchema: z.ZodEffects<z.ZodObject<{ content: z.ZodOptional<z.ZodUnknown>; canonicalText: z.ZodOptional<z.ZodString>; summary: z.ZodOptional<z.ZodString>; confidence: z.ZodOptional<z.ZodNumber>; importance: z.ZodOptional<z.ZodNumber>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; status: z.ZodOptional<z.ZodEnum<["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending", "failed"]>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { status?: "pending" | "failed" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending" | undefined; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; summary?: string | undefined; }, { status?: "pending" | "failed" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending" | undefined; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; summary?: string | undefined; }>, { status?: "pending" | "failed" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending" | undefined; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; summary?: string | undefined; }, { status?: "pending" | "failed" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending" | undefined; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; summary?: string | undefined; }>;
```

## `memorySearchFilterSchema`

Memory Search Filter 的运行时 Schema。

- 种类: 常量
- 导入: `import { memorySearchFilterSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare const memorySearchFilterSchema: z.ZodType<MemorySearchFilter, z.ZodTypeDef, MemorySearchFilter>;
```

## `paginationRequestSchema`

Pagination Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { paginationRequestSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare const paginationRequestSchema: z.ZodType<PaginationRequest, z.ZodTypeDef, PaginationRequest>;
```

## `validateManagedMemoryDeleteRequest`

Validate Managed Memory Delete Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateManagedMemoryDeleteRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare function validateManagedMemoryDeleteRequest(input: unknown): ManagedMemoryDeleteRequest;
```

### 调用签名

```text
validateManagedMemoryDeleteRequest(input: unknown): ManagedMemoryDeleteRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ManagedMemoryDeleteRequest`
- 说明: 返回值契约由上述类型定义。

## `validateManagedMemorySearchRequest`

Validate Managed Memory Search Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateManagedMemorySearchRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare function validateManagedMemorySearchRequest(input: unknown): ManagedMemorySearchRequest;
```

### 调用签名

```text
validateManagedMemorySearchRequest(input: unknown): ManagedMemorySearchRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ManagedMemorySearchRequest`
- 说明: 返回值契约由上述类型定义。

## `validateManagedMemoryUpdateRequest`

Validate Managed Memory Update Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateManagedMemoryUpdateRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare function validateManagedMemoryUpdateRequest(input: unknown): ManagedMemoryUpdateRequest;
```

### 调用签名

```text
validateManagedMemoryUpdateRequest(input: unknown): ManagedMemoryUpdateRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ManagedMemoryUpdateRequest`
- 说明: 返回值契约由上述类型定义。

## `validateMemoryAddRequest`

Validate Memory Add Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryAddRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### 声明

```text
export declare function validateMemoryAddRequest(input: unknown): MemoryAddRequest;
```

### 调用签名

```text
validateMemoryAddRequest(input: unknown): MemoryAddRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryAddRequest`
- 说明: 返回值契约由上述类型定义。
