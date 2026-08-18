# `@codesoul-co/hypha-core` / `contracts/recovery-knowledge-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/recovery-knowledge-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)
- 导出数: **12**

## 模块用法

用于声明并运行时校验契约。Recovery knowledge schemas 模块公开 10 常量、2 函数。

### 从包入口导入

```ts
import {
  recoveryKnowledgeJsonSchema,
  recoveryKnowledgeKeyJsonSchema,
  recoveryKnowledgeKeySchema,
  recoveryKnowledgeSchema,
  recoveryKnowledgeScopeJsonSchema,
  recoveryKnowledgeScopeSchema,
  scopedRecoveryKnowledgeJsonSchema,
  scopedRecoveryKnowledgeKeyJsonSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 10 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { recoveryKnowledgeKeySchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = recoveryKnowledgeKeySchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `recoveryKnowledgeJsonSchema` | 常量 | <code>const recoveryKnowledgeJsonSchema: JsonSchema</code> | Recovery Knowledge 的 JSON Schema。 |
| `recoveryKnowledgeKeyJsonSchema` | 常量 | <code>const recoveryKnowledgeKeyJsonSchema: JsonSchema</code> | Recovery Knowledge Key 的 JSON Schema。 |
| `recoveryKnowledgeKeySchema` | 常量 | <code>const recoveryKnowledgeKeySchema: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string...</code> | Recovery Knowledge Key 的运行时 Schema。 |
| `recoveryKnowledgeSchema` | 常量 | <code>const recoveryKnowledgeSchema: z.ZodObject&lt;{ key: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; t...</code> | Recovery Knowledge 的运行时 Schema。 |
| `recoveryKnowledgeScopeJsonSchema` | 常量 | <code>const recoveryKnowledgeScopeJsonSchema: JsonSchema</code> | Recovery Knowledge Scope 的 JSON Schema。 |
| `recoveryKnowledgeScopeSchema` | 常量 | <code>const recoveryKnowledgeScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string &#124; undefined; workspaceId?: string &#124; undefined; sessionId?: string &#124; undefined; agentId...</code> | Recovery Knowledge Scope 的运行时 Schema。 |
| `scopedRecoveryKnowledgeJsonSchema` | 常量 | <code>const scopedRecoveryKnowledgeJsonSchema: JsonSchema</code> | Scoped Recovery Knowledge 的 JSON Schema。 |
| `scopedRecoveryKnowledgeKeyJsonSchema` | 常量 | <code>const scopedRecoveryKnowledgeKeyJsonSchema: JsonSchema</code> | Scoped Recovery Knowledge Key 的 JSON Schema。 |
| `scopedRecoveryKnowledgeKeySchema` | 常量 | <code>const scopedRecoveryKnowledgeKeySchema: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; policyRevision: z.ZodOptional&lt;z.ZodString&gt;; specRevision: z.ZodOptional&lt;z.ZodString&gt;; providerRevision: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z....</code> | Scoped Recovery Knowledge Key 的运行时 Schema。 |
| `scopedRecoveryKnowledgeSchema` | 常量 | <code>const scopedRecoveryKnowledgeSchema: z.ZodObject&lt;{ strategy: z.ZodEnum&lt;["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]&gt;; outcome: z.ZodEnum&lt;["recovered", "degraded", "compensated", "failed"]&gt;; evidenceHash: z.ZodString; learnedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; validation: z.ZodObject&lt;{ status: z.ZodEnum&lt;["verified", "negative...</code> | Scoped Recovery Knowledge 的运行时 Schema。 |
| `parseRecoveryKnowledge` | 函数 | <code>parseRecoveryKnowledge(input: unknown): RecoveryKnowledge</code> | Parse Recovery Knowledge 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `parseScopedRecoveryKnowledge` | 函数 | <code>parseScopedRecoveryKnowledge(input: unknown): RecoveryKnowledge &amp; { key: RecoveryKnowledgeKey &amp; { scope: RecoveryKnowledgeScope; }; }</code> | Parse Scoped Recovery Knowledge 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `recoveryKnowledgeJsonSchema`

Recovery Knowledge 的 JSON Schema。

- 种类: 常量
- 导入: `import { recoveryKnowledgeJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const recoveryKnowledgeJsonSchema: JsonSchema;
```

## `recoveryKnowledgeKeyJsonSchema`

Recovery Knowledge Key 的 JSON Schema。

- 种类: 常量
- 导入: `import { recoveryKnowledgeKeyJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const recoveryKnowledgeKeyJsonSchema: JsonSchema;
```

## `recoveryKnowledgeKeySchema`

Recovery Knowledge Key 的运行时 Schema。

- 种类: 常量
- 导入: `import { recoveryKnowledgeKeySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const recoveryKnowledgeKeySchema: z.ZodObject<{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>>; policyRevision: z.ZodOptional<z.ZodString>; specRevision: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }, { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }>;
```

## `recoveryKnowledgeSchema`

Recovery Knowledge 的运行时 Schema。

- 种类: 常量
- 导入: `import { recoveryKnowledgeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const recoveryKnowledgeSchema: z.ZodObject<{ key: z.ZodObject<{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>>; policyRevision: z.ZodOptional<z.ZodString>; specRevision: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }, { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }>; strategy: z.ZodEnum<["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]>; outcome: z.ZodEnum<["recovered", "degraded", "compensated", "failed"]>; evidenceHash: z.ZodString; learnedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; validation: z.ZodObject<{ status: z.ZodEnum<["verified", "negative"]>; sourceEventId: z.ZodOptional<z.ZodString>; proof: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }, { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }>; }, "strict", z.ZodTypeAny, { validation: { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }; strategy: "wait" | "fail" | "reconcile" | "retry" | "cancel" | "fallback" | "degrade" | "compensate" | "human_review" | "quarantine"; key: { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }; outcome: "failed" | "degraded" | "recovered" | "compensated"; evidenceHash: string; learnedAt: string; expiresAt?: string | undefined; }, { validation: { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }; strategy: "wait" | "fail" | "reconcile" | "retry" | "cancel" | "fallback" | "degrade" | "compensate" | "human_review" | "quarantine"; key: { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }; outcome: "failed" | "degraded" | "recovered" | "compensated"; evidenceHash: string; learnedAt: string; expiresAt?: string | undefined; }>;
```

## `recoveryKnowledgeScopeJsonSchema`

Recovery Knowledge Scope 的 JSON Schema。

- 种类: 常量
- 导入: `import { recoveryKnowledgeScopeJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const recoveryKnowledgeScopeJsonSchema: JsonSchema;
```

## `recoveryKnowledgeScopeSchema`

Recovery Knowledge Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { recoveryKnowledgeScopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const recoveryKnowledgeScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>;
```

## `scopedRecoveryKnowledgeJsonSchema`

Scoped Recovery Knowledge 的 JSON Schema。

- 种类: 常量
- 导入: `import { scopedRecoveryKnowledgeJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const scopedRecoveryKnowledgeJsonSchema: JsonSchema;
```

## `scopedRecoveryKnowledgeKeyJsonSchema`

Scoped Recovery Knowledge Key 的 JSON Schema。

- 种类: 常量
- 导入: `import { scopedRecoveryKnowledgeKeyJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const scopedRecoveryKnowledgeKeyJsonSchema: JsonSchema;
```

## `scopedRecoveryKnowledgeKeySchema`

Scoped Recovery Knowledge Key 的运行时 Schema。

- 种类: 常量
- 导入: `import { scopedRecoveryKnowledgeKeySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const scopedRecoveryKnowledgeKeySchema: z.ZodObject<{ fingerprint: z.ZodString; participantId: z.ZodString; policyRevision: z.ZodOptional<z.ZodString>; specRevision: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; } & { scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }, { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }>;
```

## `scopedRecoveryKnowledgeSchema`

Scoped Recovery Knowledge 的运行时 Schema。

- 种类: 常量
- 导入: `import { scopedRecoveryKnowledgeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare const scopedRecoveryKnowledgeSchema: z.ZodObject<{ strategy: z.ZodEnum<["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]>; outcome: z.ZodEnum<["recovered", "degraded", "compensated", "failed"]>; evidenceHash: z.ZodString; learnedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; validation: z.ZodObject<{ status: z.ZodEnum<["verified", "negative"]>; sourceEventId: z.ZodOptional<z.ZodString>; proof: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }, { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }>; } & { key: z.ZodObject<{ fingerprint: z.ZodString; participantId: z.ZodString; policyRevision: z.ZodOptional<z.ZodString>; specRevision: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; } & { scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }, { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }>; }, "strict", z.ZodTypeAny, { validation: { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }; strategy: "wait" | "fail" | "reconcile" | "retry" | "cancel" | "fallback" | "degrade" | "compensate" | "human_review" | "quarantine"; key: { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }; outcome: "failed" | "degraded" | "recovered" | "compensated"; evidenceHash: string; learnedAt: string; expiresAt?: string | undefined; }, { validation: { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }; strategy: "wait" | "fail" | "reconcile" | "retry" | "cancel" | "fallback" | "degrade" | "compensate" | "human_review" | "quarantine"; key: { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }; outcome: "failed" | "degraded" | "recovered" | "compensated"; evidenceHash: string; learnedAt: string; expiresAt?: string | undefined; }>;
```

## `parseRecoveryKnowledge`

Parse Recovery Knowledge 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { parseRecoveryKnowledge } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare function parseRecoveryKnowledge(input: unknown): RecoveryKnowledge;
```

### 调用签名

```text
parseRecoveryKnowledge(input: unknown): RecoveryKnowledge
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RecoveryKnowledge`
- 说明: 返回值契约由上述类型定义。

## `parseScopedRecoveryKnowledge`

Parse Scoped Recovery Knowledge 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { parseScopedRecoveryKnowledge } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### 声明

```text
export declare function parseScopedRecoveryKnowledge(input: unknown): RecoveryKnowledge & {
    key: RecoveryKnowledgeKey & {
        scope: RecoveryKnowledgeScope;
    };
};
```

### 调用签名

```text
parseScopedRecoveryKnowledge(input: unknown): RecoveryKnowledge & { key: RecoveryKnowledgeKey & { scope: RecoveryKnowledgeScope; }; }
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RecoveryKnowledge & { key: RecoveryKnowledgeKey & { scope: RecoveryKnowledgeScope; }; }`
- 说明: 返回值契约由上述类型定义。
