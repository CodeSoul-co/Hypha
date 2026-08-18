# `@codesoul-co/hypha-serving-cache` / `schemas`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)
- Exports: **10**

## Using this module

Use the Schemas module for declaring and runtime-validating contracts. It exports 6 constants, 4 functions.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 6 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { cachedModelResponseProjectionSchema } from '@codesoul-co/hypha-serving-cache';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = cachedModelResponseProjectionSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cachedModelResponseProjectionSchema` | constant | <code>const cachedModelResponseProjectionSchema: z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; providerId: z.ZodOptional&lt;z.ZodString&gt;; model: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodString; toolCalls: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; toolId: z.ZodString; arguments: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;; }, "strict", z.ZodTypeAny, { id: string; toolId: string; arguments?: unknown; }, { id...</code> | Runtime schema for Cached Model Response Projection. |
| `cacheEntrySchema` | constant | <code>const cacheEntrySchema: z.ZodObject&lt;{ schemaVersion: z.ZodOptional&lt;z.ZodLiteral&lt;"1.0"&gt;&gt;; keyVersion: z.ZodOptional&lt;z.ZodLiteral&lt;"1"&gt;&gt;; key: z.ZodString; value: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;; createdAt: z.ZodNumber; expiresAt: z.ZodOptional&lt;z.ZodNumber&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; metadata: z.ZodOptional&lt;z.ZodObject&lt;{ provider: z.ZodString; model: z.ZodString; cacheType: z.ZodEnum&lt;["exact", ...</code> | Runtime schema for Cache Entry. |
| `cachePolicySchema` | constant | <code>const cachePolicySchema: z.ZodObject&lt;{ enabled: z.ZodBoolean; mode: z.ZodEnum&lt;["off", "read", "write", "readwrite"]&gt;; ttlMs: z.ZodOptional&lt;z.ZodNumber&gt;; respectNoCache: z.ZodOptional&lt;z.ZodBoolean&gt;; failureMode: z.ZodOptional&lt;z.ZodEnum&lt;["bypass", "strict"]&gt;&gt;; scopeRequirement: z.ZodOptional&lt;z.ZodEnum&lt;["none", "user", "session"]&gt;&gt;; operationTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; singleflight: z.ZodOptional&lt;z.ZodBool...</code> | Runtime schema for Cache Policy. |
| `cacheScopeSchema` | constant | <code>const cacheScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; projectId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { tenantId?: string &#124; undefined; userId?: string &#124; undefined; projectId?: string &#124; undefined; sessionId?: string &#124; undefined; domainPackId?: string &#124; undefine...</code> | Runtime schema for Cache Scope. |
| `servingCacheJsonSchemas` | constant | <code>const servingCacheJsonSchemas: { readonly CacheScope: { readonly type: "object"; readonly properties: { [k: string]: { type: string; minLength: number; }; }; readonly additionalProperties: false; }; readonly CachedModelResponseProjection: { readonly type: "object"; readonly required: readonly ["schemaVersion", "content"]; readonly properties: { readonly schemaVersion: { readonly const: "1.0"; }; readonly providerI...</code> | Serving Cache JSON Schemas constant exported by the `schemas` module. |
| `servingCacheJsonValueSchema` | constant | <code>const servingCacheJsonValueSchema: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;</code> | Runtime schema for Serving Cache JSON Value. |
| `validateCachedModelResponseProjection` | function | <code>validateCachedModelResponseProjection(input: unknown): CachedModelResponseProjection</code> | Validate Cached Model Response Projection function with 1 public call signature; parameters and return types are listed below. |
| `validateCacheEntry` | function | <code>validateCacheEntry&lt;T = unknown&gt;(input: unknown): CacheEntry&lt;T&gt;</code> | Validate Cache Entry function with 1 public call signature; parameters and return types are listed below. |
| `validateCachePolicy` | function | <code>validateCachePolicy(input: unknown): CachePolicy</code> | Validate Cache Policy function with 1 public call signature; parameters and return types are listed below. |
| `validateServingCacheJsonValue` | function | <code>validateServingCacheJsonValue(input: unknown): unknown</code> | Validate Serving Cache JSON Value function with 1 public call signature; parameters and return types are listed below. |

## `cachedModelResponseProjectionSchema`

Runtime schema for Cached Model Response Projection.

- Kind: constant
- Import: `import { cachedModelResponseProjectionSchema } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
export declare const cachedModelResponseProjectionSchema: z.ZodObject<{ schemaVersion: z.ZodLiteral<"1.0">; providerId: z.ZodOptional<z.ZodString>; model: z.ZodOptional<z.ZodString>; content: z.ZodString; toolCalls: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; toolId: z.ZodString; arguments: z.ZodType<unknown, z.ZodTypeDef, unknown>; }, "strict", z.ZodTypeAny, { id: string; toolId: string; arguments?: unknown; }, { id: string; toolId: string; arguments?: unknown; }>, "many">>; usage: z.ZodOptional<z.ZodObject<{ inputTokens: z.ZodOptional<z.ZodNumber>; outputTokens: z.ZodOptional<z.ZodNumber>; totalTokens: z.ZodOptional<z.ZodNumber>; cacheHitTokens: z.ZodOptional<z.ZodNumber>; cacheMissTokens: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { inputTokens?: number | undefined; outputTokens?: number | undefined; totalTokens?: number | undefined; cacheHitTokens?: number | undefined; cacheMissTokens?: number | undefined; }, { inputTokens?: number | undefined; outputTokens?: number | undefined; totalTokens?: number | undefined; cacheHitTokens?: number | undefined; cacheMissTokens?: number | undefined; }>>; }, "strict", z.ZodTypeAny, { schemaVersion: "1.0"; content: string; providerId?: string | undefined; model?: string | undefined; toolCalls?: { id: string; toolId: string; arguments?: unknown; }[] | undefined; usage?: { inputTokens?: number | undefined; outputTokens?: number | undefined; totalTokens?: number | undefined; cacheHitTokens?: number | undefined; cacheMissTokens?: number | undefined; } | undefined; }, { schemaVersion: "1.0"; content: string; providerId?: string | undefined; model?: string | undefined; toolCalls?: { id: string; toolId: string; arguments?: unknown; }[] | undefined; usage?: { inputTokens?: number | undefined; outputTokens?: number | undefined; totalTokens?: number | undefined; cacheHitTokens?: number | undefined; cacheMissTokens?: number | undefined; } | undefined; }>;
```

## `cacheEntrySchema`

Runtime schema for Cache Entry.

- Kind: constant
- Import: `import { cacheEntrySchema } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const cacheEntrySchema: (typeof import('@codesoul-co/hypha-serving-cache'))['cacheEntrySchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `cachePolicySchema`

Runtime schema for Cache Policy.

- Kind: constant
- Import: `import { cachePolicySchema } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
export declare const cachePolicySchema: z.ZodObject<{ enabled: z.ZodBoolean; mode: z.ZodEnum<["off", "read", "write", "readwrite"]>; ttlMs: z.ZodOptional<z.ZodNumber>; respectNoCache: z.ZodOptional<z.ZodBoolean>; failureMode: z.ZodOptional<z.ZodEnum<["bypass", "strict"]>>; scopeRequirement: z.ZodOptional<z.ZodEnum<["none", "user", "session"]>>; operationTimeoutMs: z.ZodOptional<z.ZodNumber>; singleflight: z.ZodOptional<z.ZodBoolean>; maxEntryBytes: z.ZodOptional<z.ZodNumber>; circuitBreaker: z.ZodOptional<z.ZodObject<{ failureThreshold: z.ZodNumber; resetTimeoutMs: z.ZodNumber; }, "strict", z.ZodTypeAny, { failureThreshold: number; resetTimeoutMs: number; }, { failureThreshold: number; resetTimeoutMs: number; }>>; }, "strict", z.ZodTypeAny, { enabled: boolean; mode: "off" | "read" | "write" | "readwrite"; ttlMs?: number | undefined; respectNoCache?: boolean | undefined; failureMode?: "strict" | "bypass" | undefined; scopeRequirement?: "none" | "user" | "session" | undefined; operationTimeoutMs?: number | undefined; singleflight?: boolean | undefined; maxEntryBytes?: number | undefined; circuitBreaker?: { failureThreshold: number; resetTimeoutMs: number; } | undefined; }, { enabled: boolean; mode: "off" | "read" | "write" | "readwrite"; ttlMs?: number | undefined; respectNoCache?: boolean | undefined; failureMode?: "strict" | "bypass" | undefined; scopeRequirement?: "none" | "user" | "session" | undefined; operationTimeoutMs?: number | undefined; singleflight?: boolean | undefined; maxEntryBytes?: number | undefined; circuitBreaker?: { failureThreshold: number; resetTimeoutMs: number; } | undefined; }>;
```

## `cacheScopeSchema`

Runtime schema for Cache Scope.

- Kind: constant
- Import: `import { cacheScopeSchema } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
export declare const cacheScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodOptional<z.ZodString>; projectId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { tenantId?: string | undefined; userId?: string | undefined; projectId?: string | undefined; sessionId?: string | undefined; domainPackId?: string | undefined; }, { tenantId?: string | undefined; userId?: string | undefined; projectId?: string | undefined; sessionId?: string | undefined; domainPackId?: string | undefined; }>;
```

## `servingCacheJsonSchemas`

Serving Cache JSON Schemas constant exported by the `schemas` module.

- Kind: constant
- Import: `import { servingCacheJsonSchemas } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
export declare const servingCacheJsonSchemas: { readonly CacheScope: { readonly type: "object"; readonly properties: { [k: string]: { type: string; minLength: number; }; }; readonly additionalProperties: false; }; readonly CachedModelResponseProjection: { readonly type: "object"; readonly required: readonly ["schemaVersion", "content"]; readonly properties: { readonly schemaVersion: { readonly const: "1.0"; }; readonly providerId: { readonly type: "string"; readonly minLength: 1; }; readonly model: { readonly type: "string"; readonly minLength: 1; }; readonly content: {}; readonly toolCalls: { readonly type: "array"; }; readonly usage: { readonly type: "object"; }; }; readonly additionalProperties: false; }; readonly CacheEntry: { readonly type: "object"; readonly required: readonly ["key", "value", "createdAt"]; readonly properties: { readonly schemaVersion: { readonly const: "1.0"; }; readonly keyVersion: { readonly const: "1"; }; readonly key: { readonly type: "string"; readonly minLength: 1; }; readonly value: {}; readonly createdAt: { readonly type: "integer"; readonly minimum: 0; }; readonly expiresAt: { readonly type: "integer"; readonly minimum: 0; }; readonly sizeBytes: { readonly type: "integer"; readonly minimum: 0; }; readonly metadata: { readonly type: "object"; }; }; readonly additionalProperties: false; }; readonly CachePolicy: { readonly type: "object"; readonly required: readonly ["enabled", "mode"]; readonly properties: { readonly enabled: { readonly type: "boolean"; }; readonly mode: { readonly enum: readonly ["off", "read", "write", "readwrite"]; }; readonly ttlMs: { readonly type: "number"; readonly exclusiveMinimum: 0; }; readonly respectNoCache: { readonly type: "boolean"; }; readonly failureMode: { readonly enum: readonly ["bypass", "strict"]; }; readonly scopeRequirement: { readonly enum: readonly ["none", "user", "session"]; }; readonly operationTimeoutMs: { readonly type: "integer"; readonly minimum: 1; }; readonly singleflight: { readonly type: "boolean"; }; readonly maxEntryBytes: { readonly type: "integer"; readonly minimum: 1; }; readonly circuitBreaker: { readonly type: "object"; }; }; readonly additionalProperties: false; }; };
```

## `servingCacheJsonValueSchema`

Runtime schema for Serving Cache JSON Value.

- Kind: constant
- Import: `import { servingCacheJsonValueSchema } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
export declare const servingCacheJsonValueSchema: z.ZodType<unknown, z.ZodTypeDef, unknown>;
```

## `validateCachedModelResponseProjection`

Validate Cached Model Response Projection function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateCachedModelResponseProjection } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
export declare function validateCachedModelResponseProjection(input: unknown): CachedModelResponseProjection;
```

### Call signature

```text
validateCachedModelResponseProjection(input: unknown): CachedModelResponseProjection
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CachedModelResponseProjection`
- Description: The return contract is defined by the type shown above.

## `validateCacheEntry`

Validate Cache Entry function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateCacheEntry } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
export declare function validateCacheEntry<T = unknown>(input: unknown): CacheEntry<T>;
```

### Call signature

```text
validateCacheEntry<T = unknown>(input: unknown): CacheEntry<T>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CacheEntry<T>`
- Description: The return contract is defined by the type shown above.

## `validateCachePolicy`

Validate Cache Policy function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateCachePolicy } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
export declare function validateCachePolicy(input: unknown): CachePolicy;
```

### Call signature

```text
validateCachePolicy(input: unknown): CachePolicy
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CachePolicy`
- Description: The return contract is defined by the type shown above.

## `validateServingCacheJsonValue`

Validate Serving Cache JSON Value function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateServingCacheJsonValue } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)

### Declaration

```text
export declare function validateServingCacheJsonValue(input: unknown): unknown;
```

### Call signature

```text
validateServingCacheJsonValue(input: unknown): unknown
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `unknown`
- Description: The return contract is defined by the type shown above.
