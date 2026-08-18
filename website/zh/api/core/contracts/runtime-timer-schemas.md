# `@codesoul-co/hypha-core` / `contracts/runtime-timer-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-timer-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)
- 导出数: **12**

## 模块用法

用于声明并运行时校验契约。Runtime timer schemas 模块公开 10 常量、2 函数。

### 从包入口导入

```ts
import {
  runtimeTimerContractDefinitions,
  runtimeTimerContractJsonSchemas,
  runtimeTimerSweepRequestDefinition,
  runtimeTimerSweepRequestExample,
  runtimeTimerSweepRequestJsonSchema,
  runtimeTimerSweepRequestSchema,
  runtimeTimerSweepResultDefinition,
  runtimeTimerSweepResultExample,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 10 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { runtimeTimerSweepRequestSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = runtimeTimerSweepRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeTimerContractDefinitions` | 常量 | <code>const runtimeTimerContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeTimerSweepRequest&gt;, SpecSchemaDefinition&lt;RuntimeTimerSweepResult&gt;]</code> | 由 `contracts/runtime-timer-schemas` 模块导出的 Runtime Timer Contract Definitions 常量。 |
| `runtimeTimerContractJsonSchemas` | 常量 | <code>const runtimeTimerContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-timer-schemas` 模块导出的 Runtime Timer Contract JSON Schemas 常量。 |
| `runtimeTimerSweepRequestDefinition` | 常量 | <code>const runtimeTimerSweepRequestDefinition: SpecSchemaDefinition&lt;RuntimeTimerSweepRequest&gt;</code> | 由 `contracts/runtime-timer-schemas` 模块导出的 Runtime Timer Sweep Request Definition 常量。 |
| `runtimeTimerSweepRequestExample` | 常量 | <code>const runtimeTimerSweepRequestExample: RuntimeTimerSweepRequest</code> | Runtime Timer Sweep Request 的有效示例值。 |
| `runtimeTimerSweepRequestJsonSchema` | 常量 | <code>const runtimeTimerSweepRequestJsonSchema: JsonSchema</code> | Runtime Timer Sweep Request 的 JSON Schema。 |
| `runtimeTimerSweepRequestSchema` | 常量 | <code>const runtimeTimerSweepRequestSchema: z.ZodObject&lt;{ ownerId: z.ZodString; leaseTtlMs: z.ZodNumber; limit: z.ZodNumber; cursor: z.ZodOptional&lt;z.ZodString&gt;; firedAt: z.ZodString; }, "strict", z.ZodTypeAny, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string &#124; undefined; }, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string &#124; undefined; }&gt;</code> | Runtime Timer Sweep Request 的运行时 Schema。 |
| `runtimeTimerSweepResultDefinition` | 常量 | <code>const runtimeTimerSweepResultDefinition: SpecSchemaDefinition&lt;RuntimeTimerSweepResult&gt;</code> | 由 `contracts/runtime-timer-schemas` 模块导出的 Runtime Timer Sweep Result Definition 常量。 |
| `runtimeTimerSweepResultExample` | 常量 | <code>const runtimeTimerSweepResultExample: RuntimeTimerSweepResult</code> | Runtime Timer Sweep Result 的有效示例值。 |
| `runtimeTimerSweepResultJsonSchema` | 常量 | <code>const runtimeTimerSweepResultJsonSchema: JsonSchema</code> | Runtime Timer Sweep Result 的 JSON Schema。 |
| `runtimeTimerSweepResultSchema` | 常量 | <code>const runtimeTimerSweepResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scanned: z.ZodNumber; fired: z.ZodNumber; notDue: z.ZodNumber; leaseUnavailable: z.ZodNumber; alreadyResolved: z.ZodNumber; results: z.ZodArray&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, {...</code> | Runtime Timer Sweep Result 的运行时 Schema。 |
| `validateRuntimeTimerSweepRequest` | 函数 | <code>validateRuntimeTimerSweepRequest(input: unknown): RuntimeTimerSweepRequest</code> | Validate Runtime Timer Sweep Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateRuntimeTimerSweepResult` | 函数 | <code>validateRuntimeTimerSweepResult(input: unknown): RuntimeTimerSweepResult</code> | Validate Runtime Timer Sweep Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `runtimeTimerContractDefinitions`

由 `contracts/runtime-timer-schemas` 模块导出的 Runtime Timer Contract Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeTimerContractDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerContractDefinitions: readonly [SpecSchemaDefinition<RuntimeTimerSweepRequest>, SpecSchemaDefinition<RuntimeTimerSweepResult>];
```

## `runtimeTimerContractJsonSchemas`

由 `contracts/runtime-timer-schemas` 模块导出的 Runtime Timer Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { runtimeTimerContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerContractJsonSchemas: Record<string, JsonSchema>;
```

## `runtimeTimerSweepRequestDefinition`

由 `contracts/runtime-timer-schemas` 模块导出的 Runtime Timer Sweep Request Definition 常量。

- 种类: 常量
- 导入: `import { runtimeTimerSweepRequestDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerSweepRequestDefinition: SpecSchemaDefinition<RuntimeTimerSweepRequest>;
```

## `runtimeTimerSweepRequestExample`

Runtime Timer Sweep Request 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeTimerSweepRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerSweepRequestExample: RuntimeTimerSweepRequest;
```

## `runtimeTimerSweepRequestJsonSchema`

Runtime Timer Sweep Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeTimerSweepRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerSweepRequestJsonSchema: JsonSchema;
```

## `runtimeTimerSweepRequestSchema`

Runtime Timer Sweep Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeTimerSweepRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerSweepRequestSchema: z.ZodObject<{ ownerId: z.ZodString; leaseTtlMs: z.ZodNumber; limit: z.ZodNumber; cursor: z.ZodOptional<z.ZodString>; firedAt: z.ZodString; }, "strict", z.ZodTypeAny, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string | undefined; }, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string | undefined; }>;
```

## `runtimeTimerSweepResultDefinition`

由 `contracts/runtime-timer-schemas` 模块导出的 Runtime Timer Sweep Result Definition 常量。

- 种类: 常量
- 导入: `import { runtimeTimerSweepResultDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerSweepResultDefinition: SpecSchemaDefinition<RuntimeTimerSweepResult>;
```

## `runtimeTimerSweepResultExample`

Runtime Timer Sweep Result 的有效示例值。

- 种类: 常量
- 导入: `import { runtimeTimerSweepResultExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerSweepResultExample: RuntimeTimerSweepResult;
```

## `runtimeTimerSweepResultJsonSchema`

Runtime Timer Sweep Result 的 JSON Schema。

- 种类: 常量
- 导入: `import { runtimeTimerSweepResultJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerSweepResultJsonSchema: JsonSchema;
```

## `runtimeTimerSweepResultSchema`

Runtime Timer Sweep Result 的运行时 Schema。

- 种类: 常量
- 导入: `import { runtimeTimerSweepResultSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare const runtimeTimerSweepResultSchema: z.ZodEffects<z.ZodObject<{ scanned: z.ZodNumber; fired: z.ZodNumber; notDue: z.ZodNumber; leaseUnavailable: z.ZodNumber; alreadyResolved: z.ZodNumber; results: z.ZodArray<z.ZodObject<{ scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string | undefined; }, { userId: string; runId: string; tenantId?: string | undefined; }>; disposition: z.ZodEnum<["fired", "not_due", "lease_unavailable", "already_resolved"]>; eventIds: z.ZodArray<z.ZodString, "many">; }, "strict", z.ZodTypeAny, { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }, { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }>, "many">; nextCursor: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { fired: number; scanned: number; notDue: number; leaseUnavailable: number; alreadyResolved: number; results: { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }[]; nextCursor?: string | undefined; }, { fired: number; scanned: number; notDue: number; leaseUnavailable: number; alreadyResolved: number; results: { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }[]; nextCursor?: string | undefined; }>, { fired: number; scanned: number; notDue: number; leaseUnavailable: number; alreadyResolved: number; results: { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }[]; nextCursor?: string | undefined; }, { fired: number; scanned: number; notDue: number; leaseUnavailable: number; alreadyResolved: number; results: { scope: { userId: string; runId: string; tenantId?: string | undefined; }; disposition: "not_due" | "lease_unavailable" | "fired" | "already_resolved"; eventIds: string[]; }[]; nextCursor?: string | undefined; }>;
```

## `validateRuntimeTimerSweepRequest`

Validate Runtime Timer Sweep Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeTimerSweepRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare function validateRuntimeTimerSweepRequest(input: unknown): RuntimeTimerSweepRequest;
```

### 调用签名

```text
validateRuntimeTimerSweepRequest(input: unknown): RuntimeTimerSweepRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeTimerSweepRequest`
- 说明: 返回值契约由上述类型定义。

## `validateRuntimeTimerSweepResult`

Validate Runtime Timer Sweep Result 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateRuntimeTimerSweepResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-timer-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)

### 声明

```text
export declare function validateRuntimeTimerSweepResult(input: unknown): RuntimeTimerSweepResult;
```

### 调用签名

```text
validateRuntimeTimerSweepResult(input: unknown): RuntimeTimerSweepResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeTimerSweepResult`
- 说明: 返回值契约由上述类型定义。
