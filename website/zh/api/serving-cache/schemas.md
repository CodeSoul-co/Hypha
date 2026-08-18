# `@codesoul-co/hypha-serving-cache` / `schemas`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 源码: [`packages/serving-cache/src/schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)
- 导出数: **10**

## 模块用法

用于声明并运行时校验契约。Schemas 模块公开 6 常量、4 函数。

### 从包入口导入

```ts
import {
  cachedModelResponseProjectionSchema,
  cacheEntrySchema,
  cachePolicySchema,
  cacheScopeSchema,
  servingCacheJsonSchemas,
  servingCacheJsonValueSchema,
  validateCachedModelResponseProjection,
  validateCacheEntry,
} from '@codesoul-co/hypha-serving-cache';

// 完整导出列表见下方。
```

### 使用要点

- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 6 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { cachedModelResponseProjectionSchema } from '@codesoul-co/hypha-serving-cache';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = cachedModelResponseProjectionSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cachedModelResponseProjectionSchema` | 常量 | <code>const cachedModelResponseProjectionSchema: z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; providerId: z.ZodOptional&lt;z.ZodString&gt;; model: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodString; toolCalls: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; toolId: z.ZodString; arguments: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;; }, "strict", z.ZodTypeAny, { id: string; toolId: string; arguments?: unknown; }, { id...</code> | Cached Model Response Projection 的运行时 Schema。 |
| `cacheEntrySchema` | 常量 | <code>const cacheEntrySchema: z.ZodObject&lt;{ schemaVersion: z.ZodOptional&lt;z.ZodLiteral&lt;"1.0"&gt;&gt;; keyVersion: z.ZodOptional&lt;z.ZodLiteral&lt;"1"&gt;&gt;; key: z.ZodString; value: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;; createdAt: z.ZodNumber; expiresAt: z.ZodOptional&lt;z.ZodNumber&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; metadata: z.ZodOptional&lt;z.ZodObject&lt;{ provider: z.ZodString; model: z.ZodString; cacheType: z.ZodEnum&lt;["exact", ...</code> | Cache Entry 的运行时 Schema。 |
| `cachePolicySchema` | 常量 | <code>const cachePolicySchema: z.ZodObject&lt;{ enabled: z.ZodBoolean; mode: z.ZodEnum&lt;["off", "read", "write", "readwrite"]&gt;; ttlMs: z.ZodOptional&lt;z.ZodNumber&gt;; respectNoCache: z.ZodOptional&lt;z.ZodBoolean&gt;; failureMode: z.ZodOptional&lt;z.ZodEnum&lt;["bypass", "strict"]&gt;&gt;; scopeRequirement: z.ZodOptional&lt;z.ZodEnum&lt;["none", "user", "session"]&gt;&gt;; operationTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; singleflight: z.ZodOptional&lt;z.ZodBool...</code> | Cache Policy 的运行时 Schema。 |
| `cacheScopeSchema` | 常量 | <code>const cacheScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; projectId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { tenantId?: string &#124; undefined; userId?: string &#124; undefined; projectId?: string &#124; undefined; sessionId?: string &#124; undefined; domainPackId?: string &#124; undefine...</code> | Cache Scope 的运行时 Schema。 |
| `servingCacheJsonSchemas` | 常量 | <code>const servingCacheJsonSchemas: { readonly CacheScope: { readonly type: "object"; readonly properties: { [k: string]: { type: string; minLength: number; }; }; readonly additionalProperties: false; }; readonly CachedModelResponseProjection: { readonly type: "object"; readonly required: readonly ["schemaVersion", "content"]; readonly properties: { readonly schemaVersion: { readonly const: "1.0"; }; readonly providerI...</code> | 由 `schemas` 模块导出的 Serving Cache JSON Schemas 常量。 |
| `servingCacheJsonValueSchema` | 常量 | <code>const servingCacheJsonValueSchema: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;</code> | Serving Cache JSON Value 的运行时 Schema。 |
| `validateCachedModelResponseProjection` | 函数 | <code>validateCachedModelResponseProjection(input: unknown): CachedModelResponseProjection</code> | Validate Cached Model Response Projection 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateCacheEntry` | 函数 | <code>validateCacheEntry&lt;T = unknown&gt;(input: unknown): CacheEntry&lt;T&gt;</code> | Validate Cache Entry 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateCachePolicy` | 函数 | <code>validateCachePolicy(input: unknown): CachePolicy</code> | Validate Cache Policy 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateServingCacheJsonValue` | 函数 | <code>validateServingCacheJsonValue(input: unknown): unknown</code> | Validate Serving Cache JSON Value 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `cachedModelResponseProjectionSchema`

Cached Model Response Projection 的运行时 Schema。

- 种类: 常量
- 导入: `import { cachedModelResponseProjectionSchema } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
export declare const cachedModelResponseProjectionSchema: z.ZodObject<{ schemaVersion: z.ZodLiteral<"1.0">; providerId: z.ZodOptional<z.ZodString>; model: z.ZodOptional<z.ZodString>; content: z.ZodString; toolCalls: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; toolId: z.ZodString; arguments: z.ZodType<unknown, z.ZodTypeDef, unknown>; }, "strict", z.ZodTypeAny, { id: string; toolId: string; arguments?: unknown; }, { id: string; toolId: string; arguments?: unknown; }>, "many">>; usage: z.ZodOptional<z.ZodObject<{ inputTokens: z.ZodOptional<z.ZodNumber>; outputTokens: z.ZodOptional<z.ZodNumber>; totalTokens: z.ZodOptional<z.ZodNumber>; cacheHitTokens: z.ZodOptional<z.ZodNumber>; cacheMissTokens: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { inputTokens?: number | undefined; outputTokens?: number | undefined; totalTokens?: number | undefined; cacheHitTokens?: number | undefined; cacheMissTokens?: number | undefined; }, { inputTokens?: number | undefined; outputTokens?: number | undefined; totalTokens?: number | undefined; cacheHitTokens?: number | undefined; cacheMissTokens?: number | undefined; }>>; }, "strict", z.ZodTypeAny, { schemaVersion: "1.0"; content: string; providerId?: string | undefined; model?: string | undefined; toolCalls?: { id: string; toolId: string; arguments?: unknown; }[] | undefined; usage?: { inputTokens?: number | undefined; outputTokens?: number | undefined; totalTokens?: number | undefined; cacheHitTokens?: number | undefined; cacheMissTokens?: number | undefined; } | undefined; }, { schemaVersion: "1.0"; content: string; providerId?: string | undefined; model?: string | undefined; toolCalls?: { id: string; toolId: string; arguments?: unknown; }[] | undefined; usage?: { inputTokens?: number | undefined; outputTokens?: number | undefined; totalTokens?: number | undefined; cacheHitTokens?: number | undefined; cacheMissTokens?: number | undefined; } | undefined; }>;
```

## `cacheEntrySchema`

Cache Entry 的运行时 Schema。

- 种类: 常量
- 导入: `import { cacheEntrySchema } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const cacheEntrySchema: (typeof import('@codesoul-co/hypha-serving-cache'))['cacheEntrySchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `cachePolicySchema`

Cache Policy 的运行时 Schema。

- 种类: 常量
- 导入: `import { cachePolicySchema } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
export declare const cachePolicySchema: z.ZodObject<{ enabled: z.ZodBoolean; mode: z.ZodEnum<["off", "read", "write", "readwrite"]>; ttlMs: z.ZodOptional<z.ZodNumber>; respectNoCache: z.ZodOptional<z.ZodBoolean>; failureMode: z.ZodOptional<z.ZodEnum<["bypass", "strict"]>>; scopeRequirement: z.ZodOptional<z.ZodEnum<["none", "user", "session"]>>; operationTimeoutMs: z.ZodOptional<z.ZodNumber>; singleflight: z.ZodOptional<z.ZodBoolean>; maxEntryBytes: z.ZodOptional<z.ZodNumber>; circuitBreaker: z.ZodOptional<z.ZodObject<{ failureThreshold: z.ZodNumber; resetTimeoutMs: z.ZodNumber; }, "strict", z.ZodTypeAny, { failureThreshold: number; resetTimeoutMs: number; }, { failureThreshold: number; resetTimeoutMs: number; }>>; }, "strict", z.ZodTypeAny, { enabled: boolean; mode: "off" | "read" | "write" | "readwrite"; ttlMs?: number | undefined; respectNoCache?: boolean | undefined; failureMode?: "strict" | "bypass" | undefined; scopeRequirement?: "none" | "user" | "session" | undefined; operationTimeoutMs?: number | undefined; singleflight?: boolean | undefined; maxEntryBytes?: number | undefined; circuitBreaker?: { failureThreshold: number; resetTimeoutMs: number; } | undefined; }, { enabled: boolean; mode: "off" | "read" | "write" | "readwrite"; ttlMs?: number | undefined; respectNoCache?: boolean | undefined; failureMode?: "strict" | "bypass" | undefined; scopeRequirement?: "none" | "user" | "session" | undefined; operationTimeoutMs?: number | undefined; singleflight?: boolean | undefined; maxEntryBytes?: number | undefined; circuitBreaker?: { failureThreshold: number; resetTimeoutMs: number; } | undefined; }>;
```

## `cacheScopeSchema`

Cache Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { cacheScopeSchema } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
export declare const cacheScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; projectId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { tenantId?: string | undefined; userId?: string | undefined; projectId?: string | undefined; sessionId?: string | undefined; domainPackId?: string | undefined; }, { tenantId?: string | undefined; userId?: string | undefined; projectId?: string | undefined; sessionId?: string | undefined; domainPackId?: string | undefined; }>;
```

## `servingCacheJsonSchemas`

由 `schemas` 模块导出的 Serving Cache JSON Schemas 常量。

- 种类: 常量
- 导入: `import { servingCacheJsonSchemas } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
export declare const servingCacheJsonSchemas: { readonly CacheScope: { readonly type: "object"; readonly properties: { [k: string]: { type: string; minLength: number; }; }; readonly additionalProperties: false; }; readonly CachedModelResponseProjection: { readonly type: "object"; readonly required: readonly ["schemaVersion", "content"]; readonly properties: { readonly schemaVersion: { readonly const: "1.0"; }; readonly providerId: { readonly type: "string"; readonly minLength: 1; }; readonly model: { readonly type: "string"; readonly minLength: 1; }; readonly content: {}; readonly toolCalls: { readonly type: "array"; }; readonly usage: { readonly type: "object"; }; }; readonly additionalProperties: false; }; readonly CacheEntry: { readonly type: "object"; readonly required: readonly ["key", "value", "createdAt"]; readonly properties: { readonly schemaVersion: { readonly const: "1.0"; }; readonly keyVersion: { readonly const: "1"; }; readonly key: { readonly type: "string"; readonly minLength: 1; }; readonly value: {}; readonly createdAt: { readonly type: "integer"; readonly minimum: 0; }; readonly expiresAt: { readonly type: "integer"; readonly minimum: 0; }; readonly sizeBytes: { readonly type: "integer"; readonly minimum: 0; }; readonly metadata: { readonly type: "object"; }; }; readonly additionalProperties: false; }; readonly CachePolicy: { readonly type: "object"; readonly required: readonly ["enabled", "mode"]; readonly properties: { readonly enabled: { readonly type: "boolean"; }; readonly mode: { readonly enum: readonly ["off", "read", "write", "readwrite"]; }; readonly ttlMs: { readonly type: "number"; readonly exclusiveMinimum: 0; }; readonly respectNoCache: { readonly type: "boolean"; }; readonly failureMode: { readonly enum: readonly ["bypass", "strict"]; }; readonly scopeRequirement: { readonly enum: readonly ["none", "user", "session"]; }; readonly operationTimeoutMs: { readonly type: "integer"; readonly minimum: 1; }; readonly singleflight: { readonly type: "boolean"; }; readonly maxEntryBytes: { readonly type: "integer"; readonly minimum: 1; }; readonly circuitBreaker: { readonly type: "object"; }; }; readonly additionalProperties: false; }; };
```

## `servingCacheJsonValueSchema`

Serving Cache JSON Value 的运行时 Schema。

- 种类: 常量
- 导入: `import { servingCacheJsonValueSchema } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
export declare const servingCacheJsonValueSchema: z.ZodType<unknown, z.ZodTypeDef, unknown>;
```

## `validateCachedModelResponseProjection`

Validate Cached Model Response Projection 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateCachedModelResponseProjection } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
export declare function validateCachedModelResponseProjection(input: unknown): CachedModelResponseProjection;
```

### 调用签名

```text
validateCachedModelResponseProjection(input: unknown): CachedModelResponseProjection
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CachedModelResponseProjection`
- 说明: 返回值契约由上述类型定义。

## `validateCacheEntry`

Validate Cache Entry 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateCacheEntry } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
export declare function validateCacheEntry<T = unknown>(input: unknown): CacheEntry<T>;
```

### 调用签名

```text
validateCacheEntry<T = unknown>(input: unknown): CacheEntry<T>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CacheEntry<T>`
- 说明: 返回值契约由上述类型定义。

## `validateCachePolicy`

Validate Cache Policy 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateCachePolicy } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
export declare function validateCachePolicy(input: unknown): CachePolicy;
```

### 调用签名

```text
validateCachePolicy(input: unknown): CachePolicy
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CachePolicy`
- 说明: 返回值契约由上述类型定义。

## `validateServingCacheJsonValue`

Validate Serving Cache JSON Value 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateServingCacheJsonValue } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### 声明

```text
export declare function validateServingCacheJsonValue(input: unknown): unknown;
```

### 调用签名

```text
validateServingCacheJsonValue(input: unknown): unknown
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `unknown`
- 说明: 返回值契约由上述类型定义。
