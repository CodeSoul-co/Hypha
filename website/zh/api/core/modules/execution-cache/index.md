# `@codesoul-co/hypha-core` / `modules/execution-cache/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-cache/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)
- 导出数: **32**

## 模块用法

用于执行该边界的运行时行为。Index 模块公开 23 常量、9 函数。

### 从包入口导入

```ts
import {
  executionCacheArtifactReferenceJsonSchema,
  executionCacheArtifactReferenceSchema,
  executionCacheEntryProjectionExample,
  executionCacheEntryProjectionJsonSchema,
  executionCacheEntryProjectionSchema,
  executionCacheJsonSchemas,
  executionCacheRecordJsonSchema,
  executionCacheRecordSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 9 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 23 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { executionCacheArtifactReferenceSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = executionCacheArtifactReferenceSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionCacheArtifactReferenceJsonSchema` | 常量 | <code>const executionCacheArtifactReferenceJsonSchema: JsonSchema</code> | Execution Cache Artifact Reference 的 JSON Schema。 |
| `executionCacheArtifactReferenceSchema` | 常量 | <code>const executionCacheArtifactReferenceSchema: z.ZodObject&lt;{ artifactRef: z.ZodString; contentHash: z.ZodString; }, "strict", z.ZodTypeAny, { contentHash: string; artifactRef: string; }, { contentHash: string; artifactRef: string; }&gt;</code> | Execution Cache Artifact Reference 的运行时 Schema。 |
| `executionCacheEntryProjectionExample` | 常量 | <code>const executionCacheEntryProjectionExample: ExecutionCacheEntryProjection</code> | Execution Cache Entry Projection 的有效示例值。 |
| `executionCacheEntryProjectionJsonSchema` | 常量 | <code>const executionCacheEntryProjectionJsonSchema: JsonSchema</code> | Execution Cache Entry Projection 的 JSON Schema。 |
| `executionCacheEntryProjectionSchema` | 常量 | <code>const executionCacheEntryProjectionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ commandHash: z.ZodString; validityHash: z.ZodString; validity: z.ZodObject&lt;{ executable: z.ZodString; argsHash: z.ZodString; sourceTreeHash: z.ZodString; workspaceSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; environmentHash: z.ZodString; imageDigest: z.ZodOptional&lt;z.ZodString&gt;; dependencyLockHash: z.ZodOptional&lt;z.ZodString&gt;; networkPolicyHash: z.Zo...</code> | Execution Cache Entry Projection 的运行时 Schema。 |
| `executionCacheJsonSchemas` | 常量 | <code>const executionCacheJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-cache/index` 模块导出的 Execution Cache JSON Schemas 常量。 |
| `executionCacheRecordJsonSchema` | 常量 | <code>const executionCacheRecordJsonSchema: JsonSchema</code> | Execution Cache Record 的 JSON Schema。 |
| `executionCacheRecordSchema` | 常量 | <code>const executionCacheRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; key: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; tenantId?: string &#124; undefined; }, { workspaceId: string; userId: string; tenantId?: string &#124; undefi...</code> | Execution Cache Record 的运行时 Schema。 |
| `executionCacheResultMetadataJsonSchema` | 常量 | <code>const executionCacheResultMetadataJsonSchema: JsonSchema</code> | Execution Cache Result Metadata 的 JSON Schema。 |
| `executionCacheResultMetadataSchema` | 常量 | <code>const executionCacheResultMetadataSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; status: z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;; exitCode: z.ZodNullable&lt;z.ZodNumber&gt;; signal: z.ZodOptional&lt;z.ZodString&gt;; resourceUsage: z.ZodOptional&lt;z.ZodObject&lt;{ cpuTimeMs: z.ZodOptional&lt;z.ZodNumber&gt;;...</code> | Execution Cache Result Metadata 的运行时 Schema。 |
| `executionCacheScopeJsonSchema` | 常量 | <code>const executionCacheScopeJsonSchema: JsonSchema</code> | Execution Cache Scope 的 JSON Schema。 |
| `executionCacheScopeSchema` | 常量 | <code>const executionCacheScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; tenantId?: string &#124; undefined; }, { workspaceId: string; userId: string; tenantId?: string &#124; undefined; }&gt;</code> | Execution Cache Scope 的运行时 Schema。 |
| `executionCacheValidityInputExample` | 常量 | <code>const executionCacheValidityInputExample: ExecutionCacheValidityInput</code> | Execution Cache Validity Input 的有效示例值。 |
| `executionCacheValidityInputJsonSchema` | 常量 | <code>const executionCacheValidityInputJsonSchema: JsonSchema</code> | Execution Cache Validity Input 的 JSON Schema。 |
| `executionCacheValidityInputSchema` | 常量 | <code>const executionCacheValidityInputSchema: z.ZodObject&lt;{ executable: z.ZodString; argsHash: z.ZodString; sourceTreeHash: z.ZodString; workspaceSnapshotHash: z.ZodOptional&lt;z.ZodString&gt;; environmentHash: z.ZodString; imageDigest: z.ZodOptional&lt;z.ZodString&gt;; dependencyLockHash: z.ZodOptional&lt;z.ZodString&gt;; networkPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional&lt;z.ZodString&gt;; commandPolicyRevision: z.ZodOptio...</code> | Execution Cache Validity Input 的运行时 Schema。 |
| `executionCommandFingerprintInputExample` | 常量 | <code>const executionCommandFingerprintInputExample: ExecutionCommandFingerprintInput</code> | Execution Command Fingerprint Input 的有效示例值。 |
| `executionCommandFingerprintInputJsonSchema` | 常量 | <code>const executionCommandFingerprintInputJsonSchema: JsonSchema</code> | Execution Command Fingerprint Input 的 JSON Schema。 |
| `executionCommandFingerprintInputSchema` | 常量 | <code>const executionCommandFingerprintInputSchema: z.ZodObject&lt;{ executable: z.ZodString; argsHash: z.ZodString; cwd: z.ZodOptional&lt;z.ZodString&gt;; relevantEnvHash: z.ZodString; sourceTreeHash: z.ZodString; environmentHash: z.ZodString; networkPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional&lt;z.ZodString&gt;; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { idempotencyKey: string; sourceTreeHash: string;...</code> | Execution Command Fingerprint Input 的运行时 Schema。 |
| `executionEnvironmentFingerprintExample` | 常量 | <code>const executionEnvironmentFingerprintExample: ExecutionEnvironmentFingerprint</code> | Execution Environment Fingerprint 的有效示例值。 |
| `executionEnvironmentFingerprintJsonSchema` | 常量 | <code>const executionEnvironmentFingerprintJsonSchema: JsonSchema</code> | Execution Environment Fingerprint 的 JSON Schema。 |
| `executionEnvironmentFingerprintResolutionJsonSchema` | 常量 | <code>const executionEnvironmentFingerprintResolutionJsonSchema: JsonSchema</code> | Execution Environment Fingerprint Resolution 的 JSON Schema。 |
| `executionEnvironmentFingerprintResolutionSchema` | 常量 | <code>const executionEnvironmentFingerprintResolutionSchema: z.ZodDiscriminatedUnion&lt;"status", [z.ZodObject&lt;{ status: z.ZodLiteral&lt;"resolved"&gt;; fingerprint: z.ZodEffects&lt;z.ZodObject&lt;{ environmentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string;...</code> | Execution Environment Fingerprint Resolution 的运行时 Schema。 |
| `executionEnvironmentFingerprintSchema` | 常量 | <code>const executionEnvironmentFingerprintSchema: z.ZodEffects&lt;z.ZodObject&lt;{ environmentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }&gt;; environmentRevision: z.ZodString; provid...</code> | Execution Environment Fingerprint 的运行时 Schema。 |
| `assessExecutionCacheReuse` | 函数 | <code>assessExecutionCacheReuse(input: ExecutionCacheReuseAssessmentInput): ExecutionCacheReuseAssessment</code> | Assess Execution Cache Reuse 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `canonicalizeExecutionFingerprintInput` | 函数 | <code>canonicalizeExecutionFingerprintInput(input: ExecutionCommandFingerprintInput &#124; ExecutionCacheValidityInput): string</code> | Canonicalize Execution Fingerprint Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionCacheEntryProjection` | 函数 | <code>validateExecutionCacheEntryProjection(input: unknown): ExecutionCacheEntryProjection</code> | Validate Execution Cache Entry Projection 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionCacheRecord` | 函数 | <code>validateExecutionCacheRecord(input: unknown, maxEntryBytes?: number): ExecutionCacheRecord</code> | Validate Execution Cache Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionCacheScope` | 函数 | <code>validateExecutionCacheScope(input: unknown): ExecutionCacheScope</code> | Validate Execution Cache Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionCacheValidityInput` | 函数 | <code>validateExecutionCacheValidityInput(input: unknown): ExecutionCacheValidityInput</code> | Validate Execution Cache Validity Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionCommandFingerprintInput` | 函数 | <code>validateExecutionCommandFingerprintInput(input: unknown): ExecutionCommandFingerprintInput</code> | Validate Execution Command Fingerprint Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionEnvironmentFingerprint` | 函数 | <code>validateExecutionEnvironmentFingerprint(input: unknown): ExecutionEnvironmentFingerprint</code> | Validate Execution Environment Fingerprint 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateExecutionEnvironmentFingerprintResolution` | 函数 | <code>validateExecutionEnvironmentFingerprintResolution(input: unknown): ExecutionEnvironmentFingerprintResolution</code> | Validate Execution Environment Fingerprint Resolution 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `executionCacheArtifactReferenceJsonSchema`

Execution Cache Artifact Reference 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionCacheArtifactReferenceJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheArtifactReferenceJsonSchema: JsonSchema;
```

## `executionCacheArtifactReferenceSchema`

Execution Cache Artifact Reference 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionCacheArtifactReferenceSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheArtifactReferenceSchema: z.ZodObject<{ artifactRef: z.ZodString; contentHash: z.ZodString; }, "strict", z.ZodTypeAny, { contentHash: string; artifactRef: string; }, { contentHash: string; artifactRef: string; }>;
```

## `executionCacheEntryProjectionExample`

Execution Cache Entry Projection 的有效示例值。

- 种类: 常量
- 导入: `import { executionCacheEntryProjectionExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheEntryProjectionExample: ExecutionCacheEntryProjection;
```

## `executionCacheEntryProjectionJsonSchema`

Execution Cache Entry Projection 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionCacheEntryProjectionJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheEntryProjectionJsonSchema: JsonSchema;
```

## `executionCacheEntryProjectionSchema`

Execution Cache Entry Projection 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionCacheEntryProjectionSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionCacheEntryProjectionSchema: (typeof import('@codesoul-co/hypha-core'))['executionCacheEntryProjectionSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionCacheJsonSchemas`

由 `modules/execution-cache/index` 模块导出的 Execution Cache JSON Schemas 常量。

- 种类: 常量
- 导入: `import { executionCacheJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheJsonSchemas: Record<string, JsonSchema>;
```

## `executionCacheRecordJsonSchema`

Execution Cache Record 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionCacheRecordJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheRecordJsonSchema: JsonSchema;
```

## `executionCacheRecordSchema`

Execution Cache Record 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionCacheRecordSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionCacheRecordSchema: (typeof import('@codesoul-co/hypha-core'))['executionCacheRecordSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionCacheResultMetadataJsonSchema`

Execution Cache Result Metadata 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionCacheResultMetadataJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheResultMetadataJsonSchema: JsonSchema;
```

## `executionCacheResultMetadataSchema`

Execution Cache Result Metadata 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionCacheResultMetadataSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionCacheResultMetadataSchema: (typeof import('@codesoul-co/hypha-core'))['executionCacheResultMetadataSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionCacheScopeJsonSchema`

Execution Cache Scope 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionCacheScopeJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheScopeJsonSchema: JsonSchema;
```

## `executionCacheScopeSchema`

Execution Cache Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionCacheScopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodString; }, "strict", z.ZodTypeAny, { workspaceId: string; userId: string; tenantId?: string | undefined; }, { workspaceId: string; userId: string; tenantId?: string | undefined; }>;
```

## `executionCacheValidityInputExample`

Execution Cache Validity Input 的有效示例值。

- 种类: 常量
- 导入: `import { executionCacheValidityInputExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheValidityInputExample: ExecutionCacheValidityInput;
```

## `executionCacheValidityInputJsonSchema`

Execution Cache Validity Input 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionCacheValidityInputJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheValidityInputJsonSchema: JsonSchema;
```

## `executionCacheValidityInputSchema`

Execution Cache Validity Input 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionCacheValidityInputSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCacheValidityInputSchema: z.ZodObject<{ executable: z.ZodString; argsHash: z.ZodString; sourceTreeHash: z.ZodString; workspaceSnapshotHash: z.ZodOptional<z.ZodString>; environmentHash: z.ZodString; imageDigest: z.ZodOptional<z.ZodString>; dependencyLockHash: z.ZodOptional<z.ZodString>; networkPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional<z.ZodString>; commandPolicyRevision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { sourceTreeHash: string; networkPolicyHash: string; executable: string; argsHash: string; environmentHash: string; workspaceSnapshotHash?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; commandPolicyRevision?: string | undefined; }, { sourceTreeHash: string; networkPolicyHash: string; executable: string; argsHash: string; environmentHash: string; workspaceSnapshotHash?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; commandPolicyRevision?: string | undefined; }>;
```

## `executionCommandFingerprintInputExample`

Execution Command Fingerprint Input 的有效示例值。

- 种类: 常量
- 导入: `import { executionCommandFingerprintInputExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCommandFingerprintInputExample: ExecutionCommandFingerprintInput;
```

## `executionCommandFingerprintInputJsonSchema`

Execution Command Fingerprint Input 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionCommandFingerprintInputJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCommandFingerprintInputJsonSchema: JsonSchema;
```

## `executionCommandFingerprintInputSchema`

Execution Command Fingerprint Input 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionCommandFingerprintInputSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionCommandFingerprintInputSchema: z.ZodObject<{ executable: z.ZodString; argsHash: z.ZodString; cwd: z.ZodOptional<z.ZodString>; relevantEnvHash: z.ZodString; sourceTreeHash: z.ZodString; environmentHash: z.ZodString; networkPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional<z.ZodString>; idempotencyKey: z.ZodString; }, "strict", z.ZodTypeAny, { idempotencyKey: string; sourceTreeHash: string; networkPolicyHash: string; executable: string; argsHash: string; environmentHash: string; relevantEnvHash: string; cwd?: string | undefined; secretVersionSetHash?: string | undefined; }, { idempotencyKey: string; sourceTreeHash: string; networkPolicyHash: string; executable: string; argsHash: string; environmentHash: string; relevantEnvHash: string; cwd?: string | undefined; secretVersionSetHash?: string | undefined; }>;
```

## `executionEnvironmentFingerprintExample`

Execution Environment Fingerprint 的有效示例值。

- 种类: 常量
- 导入: `import { executionEnvironmentFingerprintExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionEnvironmentFingerprintExample: ExecutionEnvironmentFingerprint;
```

## `executionEnvironmentFingerprintJsonSchema`

Execution Environment Fingerprint 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionEnvironmentFingerprintJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionEnvironmentFingerprintJsonSchema: JsonSchema;
```

## `executionEnvironmentFingerprintResolutionJsonSchema`

Execution Environment Fingerprint Resolution 的 JSON Schema。

- 种类: 常量
- 导入: `import { executionEnvironmentFingerprintResolutionJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionEnvironmentFingerprintResolutionJsonSchema: JsonSchema;
```

## `executionEnvironmentFingerprintResolutionSchema`

Execution Environment Fingerprint Resolution 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionEnvironmentFingerprintResolutionSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const executionEnvironmentFingerprintResolutionSchema: (typeof import('@codesoul-co/hypha-core'))['executionEnvironmentFingerprintResolutionSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `executionEnvironmentFingerprintSchema`

Execution Environment Fingerprint 的运行时 Schema。

- 种类: 常量
- 导入: `import { executionEnvironmentFingerprintSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare const executionEnvironmentFingerprintSchema: z.ZodEffects<z.ZodObject<{ environmentRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; }>; environmentRevision: z.ZodString; providerId: z.ZodString; imageDigest: z.ZodOptional<z.ZodString>; platform: z.ZodOptional<z.ZodString>; executableVersions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>; dependencyLockHash: z.ZodOptional<z.ZodString>; resourcePolicyHash: z.ZodString; networkPolicyHash: z.ZodString; mountPolicyHash: z.ZodString; secretVersionSetHash: z.ZodOptional<z.ZodString>; fingerprintHash: z.ZodString; }, "strict", z.ZodTypeAny, { environmentRevision: string; providerId: string; networkPolicyHash: string; environmentRef: { id: string; version?: string | undefined; revision?: string | undefined; }; mountPolicyHash: string; resourcePolicyHash: string; fingerprintHash: string; platform?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; executableVersions?: Record<string, string> | undefined; }, { environmentRevision: string; providerId: string; networkPolicyHash: string; environmentRef: { id: string; version?: string | undefined; revision?: string | undefined; }; mountPolicyHash: string; resourcePolicyHash: string; fingerprintHash: string; platform?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; executableVersions?: Record<string, string> | undefined; }>, { environmentRevision: string; providerId: string; networkPolicyHash: string; environmentRef: { id: string; version?: string | undefined; revision?: string | undefined; }; mountPolicyHash: string; resourcePolicyHash: string; fingerprintHash: string; platform?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; executableVersions?: Record<string, string> | undefined; }, { environmentRevision: string; providerId: string; networkPolicyHash: string; environmentRef: { id: string; version?: string | undefined; revision?: string | undefined; }; mountPolicyHash: string; resourcePolicyHash: string; fingerprintHash: string; platform?: string | undefined; imageDigest?: string | undefined; dependencyLockHash?: string | undefined; secretVersionSetHash?: string | undefined; executableVersions?: Record<string, string> | undefined; }>;
```

## `assessExecutionCacheReuse`

Assess Execution Cache Reuse 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assessExecutionCacheReuse } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare function assessExecutionCacheReuse(input: ExecutionCacheReuseAssessmentInput): ExecutionCacheReuseAssessment;
```

### 调用签名

```text
assessExecutionCacheReuse(input: ExecutionCacheReuseAssessmentInput): ExecutionCacheReuseAssessment
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>ExecutionCacheReuseAssessmentInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionCacheReuseAssessment`
- 说明: 返回值契约由上述类型定义。

## `canonicalizeExecutionFingerprintInput`

Canonicalize Execution Fingerprint Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { canonicalizeExecutionFingerprintInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare function canonicalizeExecutionFingerprintInput(input: ExecutionCommandFingerprintInput | ExecutionCacheValidityInput): string;
```

### 调用签名

```text
canonicalizeExecutionFingerprintInput(input: ExecutionCommandFingerprintInput | ExecutionCacheValidityInput): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>ExecutionCacheValidityInput &#124; ExecutionCommandFingerprintInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionCacheEntryProjection`

Validate Execution Cache Entry Projection 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionCacheEntryProjection } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare function validateExecutionCacheEntryProjection(input: unknown): ExecutionCacheEntryProjection;
```

### 调用签名

```text
validateExecutionCacheEntryProjection(input: unknown): ExecutionCacheEntryProjection
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionCacheEntryProjection`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionCacheRecord`

Validate Execution Cache Record 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionCacheRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare function validateExecutionCacheRecord(input: unknown, maxEntryBytes?: number): ExecutionCacheRecord;
```

### 调用签名

```text
validateExecutionCacheRecord(input: unknown, maxEntryBytes?: number): ExecutionCacheRecord
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `maxEntryBytes` | <code>number</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionCacheRecord`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionCacheScope`

Validate Execution Cache Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionCacheScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare function validateExecutionCacheScope(input: unknown): ExecutionCacheScope;
```

### 调用签名

```text
validateExecutionCacheScope(input: unknown): ExecutionCacheScope
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionCacheScope`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionCacheValidityInput`

Validate Execution Cache Validity Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionCacheValidityInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare function validateExecutionCacheValidityInput(input: unknown): ExecutionCacheValidityInput;
```

### 调用签名

```text
validateExecutionCacheValidityInput(input: unknown): ExecutionCacheValidityInput
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionCacheValidityInput`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionCommandFingerprintInput`

Validate Execution Command Fingerprint Input 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionCommandFingerprintInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare function validateExecutionCommandFingerprintInput(input: unknown): ExecutionCommandFingerprintInput;
```

### 调用签名

```text
validateExecutionCommandFingerprintInput(input: unknown): ExecutionCommandFingerprintInput
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionCommandFingerprintInput`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionEnvironmentFingerprint`

Validate Execution Environment Fingerprint 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionEnvironmentFingerprint } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare function validateExecutionEnvironmentFingerprint(input: unknown): ExecutionEnvironmentFingerprint;
```

### 调用签名

```text
validateExecutionEnvironmentFingerprint(input: unknown): ExecutionEnvironmentFingerprint
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionEnvironmentFingerprint`
- 说明: 返回值契约由上述类型定义。

## `validateExecutionEnvironmentFingerprintResolution`

Validate Execution Environment Fingerprint Resolution 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateExecutionEnvironmentFingerprintResolution } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/index.ts)

### 声明

```text
export declare function validateExecutionEnvironmentFingerprintResolution(input: unknown): ExecutionEnvironmentFingerprintResolution;
```

### 调用签名

```text
validateExecutionEnvironmentFingerprintResolution(input: unknown): ExecutionEnvironmentFingerprintResolution
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExecutionEnvironmentFingerprintResolution`
- 说明: 返回值契约由上述类型定义。
