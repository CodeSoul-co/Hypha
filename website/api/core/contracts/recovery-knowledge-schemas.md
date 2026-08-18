# `@codesoul-co/hypha-core` / `contracts/recovery-knowledge-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/recovery-knowledge-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)
- Exports: **12**

## Using this module

Use the Recovery knowledge schemas module for declaring and runtime-validating contracts. It exports 10 constants, 2 functions.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 10 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { recoveryKnowledgeKeySchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = recoveryKnowledgeKeySchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `recoveryKnowledgeJsonSchema` | constant | <code>const recoveryKnowledgeJsonSchema: JsonSchema</code> | JSON Schema for Recovery Knowledge. |
| `recoveryKnowledgeKeyJsonSchema` | constant | <code>const recoveryKnowledgeKeyJsonSchema: JsonSchema</code> | JSON Schema for Recovery Knowledge Key. |
| `recoveryKnowledgeKeySchema` | constant | <code>const recoveryKnowledgeKeySchema: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string...</code> | Runtime schema for Recovery Knowledge Key. |
| `recoveryKnowledgeSchema` | constant | <code>const recoveryKnowledgeSchema: z.ZodObject&lt;{ key: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; t...</code> | Runtime schema for Recovery Knowledge. |
| `recoveryKnowledgeScopeJsonSchema` | constant | <code>const recoveryKnowledgeScopeJsonSchema: JsonSchema</code> | JSON Schema for Recovery Knowledge Scope. |
| `recoveryKnowledgeScopeSchema` | constant | <code>const recoveryKnowledgeScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string &#124; undefined; workspaceId?: string &#124; undefined; sessionId?: string &#124; undefined; agentId...</code> | Runtime schema for Recovery Knowledge Scope. |
| `scopedRecoveryKnowledgeJsonSchema` | constant | <code>const scopedRecoveryKnowledgeJsonSchema: JsonSchema</code> | JSON Schema for Scoped Recovery Knowledge. |
| `scopedRecoveryKnowledgeKeyJsonSchema` | constant | <code>const scopedRecoveryKnowledgeKeyJsonSchema: JsonSchema</code> | JSON Schema for Scoped Recovery Knowledge Key. |
| `scopedRecoveryKnowledgeKeySchema` | constant | <code>const scopedRecoveryKnowledgeKeySchema: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; policyRevision: z.ZodOptional&lt;z.ZodString&gt;; specRevision: z.ZodOptional&lt;z.ZodString&gt;; providerRevision: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z....</code> | Runtime schema for Scoped Recovery Knowledge Key. |
| `scopedRecoveryKnowledgeSchema` | constant | <code>const scopedRecoveryKnowledgeSchema: z.ZodObject&lt;{ strategy: z.ZodEnum&lt;["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]&gt;; outcome: z.ZodEnum&lt;["recovered", "degraded", "compensated", "failed"]&gt;; evidenceHash: z.ZodString; learnedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; validation: z.ZodObject&lt;{ status: z.ZodEnum&lt;["verified", "negative...</code> | Runtime schema for Scoped Recovery Knowledge. |
| `parseRecoveryKnowledge` | function | <code>parseRecoveryKnowledge(input: unknown): RecoveryKnowledge</code> | Parse Recovery Knowledge function with 1 public call signature; parameters and return types are listed below. |
| `parseScopedRecoveryKnowledge` | function | <code>parseScopedRecoveryKnowledge(input: unknown): RecoveryKnowledge &amp; { key: RecoveryKnowledgeKey &amp; { scope: RecoveryKnowledgeScope; }; }</code> | Parse Scoped Recovery Knowledge function with 1 public call signature; parameters and return types are listed below. |

## `recoveryKnowledgeJsonSchema`

JSON Schema for Recovery Knowledge.

- Kind: constant
- Import: `import { recoveryKnowledgeJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const recoveryKnowledgeJsonSchema: JsonSchema;
```

## `recoveryKnowledgeKeyJsonSchema`

JSON Schema for Recovery Knowledge Key.

- Kind: constant
- Import: `import { recoveryKnowledgeKeyJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const recoveryKnowledgeKeyJsonSchema: JsonSchema;
```

## `recoveryKnowledgeKeySchema`

Runtime schema for Recovery Knowledge Key.

- Kind: constant
- Import: `import { recoveryKnowledgeKeySchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const recoveryKnowledgeKeySchema: z.ZodObject<{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>>; policyRevision: z.ZodOptional<z.ZodString>; specRevision: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }, { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }>;
```

## `recoveryKnowledgeSchema`

Runtime schema for Recovery Knowledge.

- Kind: constant
- Import: `import { recoveryKnowledgeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const recoveryKnowledgeSchema: z.ZodObject<{ key: z.ZodObject<{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional<z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>>; policyRevision: z.ZodOptional<z.ZodString>; specRevision: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }, { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }>; strategy: z.ZodEnum<["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]>; outcome: z.ZodEnum<["recovered", "degraded", "compensated", "failed"]>; evidenceHash: z.ZodString; learnedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; validation: z.ZodObject<{ status: z.ZodEnum<["verified", "negative"]>; sourceEventId: z.ZodOptional<z.ZodString>; proof: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }, { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }>; }, "strict", z.ZodTypeAny, { validation: { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }; strategy: "wait" | "fail" | "reconcile" | "retry" | "cancel" | "fallback" | "degrade" | "compensate" | "human_review" | "quarantine"; key: { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }; outcome: "failed" | "degraded" | "recovered" | "compensated"; evidenceHash: string; learnedAt: string; expiresAt?: string | undefined; }, { validation: { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }; strategy: "wait" | "fail" | "reconcile" | "retry" | "cancel" | "fallback" | "degrade" | "compensate" | "human_review" | "quarantine"; key: { fingerprint: string; participantId: string; scope?: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; } | undefined; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }; outcome: "failed" | "degraded" | "recovered" | "compensated"; evidenceHash: string; learnedAt: string; expiresAt?: string | undefined; }>;
```

## `recoveryKnowledgeScopeJsonSchema`

JSON Schema for Recovery Knowledge Scope.

- Kind: constant
- Import: `import { recoveryKnowledgeScopeJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const recoveryKnowledgeScopeJsonSchema: JsonSchema;
```

## `recoveryKnowledgeScopeSchema`

Runtime schema for Recovery Knowledge Scope.

- Kind: constant
- Import: `import { recoveryKnowledgeScopeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const recoveryKnowledgeScopeSchema: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>;
```

## `scopedRecoveryKnowledgeJsonSchema`

JSON Schema for Scoped Recovery Knowledge.

- Kind: constant
- Import: `import { scopedRecoveryKnowledgeJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const scopedRecoveryKnowledgeJsonSchema: JsonSchema;
```

## `scopedRecoveryKnowledgeKeyJsonSchema`

JSON Schema for Scoped Recovery Knowledge Key.

- Kind: constant
- Import: `import { scopedRecoveryKnowledgeKeyJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const scopedRecoveryKnowledgeKeyJsonSchema: JsonSchema;
```

## `scopedRecoveryKnowledgeKeySchema`

Runtime schema for Scoped Recovery Knowledge Key.

- Kind: constant
- Import: `import { scopedRecoveryKnowledgeKeySchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const scopedRecoveryKnowledgeKeySchema: z.ZodObject<{ fingerprint: z.ZodString; participantId: z.ZodString; policyRevision: z.ZodOptional<z.ZodString>; specRevision: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; } & { scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }, { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }>;
```

## `scopedRecoveryKnowledgeSchema`

Runtime schema for Scoped Recovery Knowledge.

- Kind: constant
- Import: `import { scopedRecoveryKnowledgeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare const scopedRecoveryKnowledgeSchema: z.ZodObject<{ strategy: z.ZodEnum<["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]>; outcome: z.ZodEnum<["recovered", "degraded", "compensated", "failed"]>; evidenceHash: z.ZodString; learnedAt: z.ZodString; expiresAt: z.ZodOptional<z.ZodString>; validation: z.ZodObject<{ status: z.ZodEnum<["verified", "negative"]>; sourceEventId: z.ZodOptional<z.ZodString>; proof: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strict", z.ZodTypeAny, { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }, { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }>; } & { key: z.ZodObject<{ fingerprint: z.ZodString; participantId: z.ZodString; policyRevision: z.ZodOptional<z.ZodString>; specRevision: z.ZodOptional<z.ZodString>; providerRevision: z.ZodOptional<z.ZodString>; } & { scope: z.ZodObject<{ tenantId: z.ZodOptional<z.ZodString>; userId: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; domainPackId: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }, { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }>; }, "strict", z.ZodTypeAny, { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }, { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }>; }, "strict", z.ZodTypeAny, { validation: { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }; strategy: "wait" | "fail" | "reconcile" | "retry" | "cancel" | "fallback" | "degrade" | "compensate" | "human_review" | "quarantine"; key: { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }; outcome: "failed" | "degraded" | "recovered" | "compensated"; evidenceHash: string; learnedAt: string; expiresAt?: string | undefined; }, { validation: { status: "verified" | "negative"; sourceEventId?: string | undefined; proof?: Record<string, unknown> | undefined; }; strategy: "wait" | "fail" | "reconcile" | "retry" | "cancel" | "fallback" | "degrade" | "compensate" | "human_review" | "quarantine"; key: { scope: { userId: string; tenantId?: string | undefined; workspaceId?: string | undefined; sessionId?: string | undefined; agentId?: string | undefined; domainPackId?: string | undefined; }; fingerprint: string; participantId: string; providerRevision?: string | undefined; policyRevision?: string | undefined; specRevision?: string | undefined; }; outcome: "failed" | "degraded" | "recovered" | "compensated"; evidenceHash: string; learnedAt: string; expiresAt?: string | undefined; }>;
```

## `parseRecoveryKnowledge`

Parse Recovery Knowledge function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { parseRecoveryKnowledge } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare function parseRecoveryKnowledge(input: unknown): RecoveryKnowledge;
```

### Call signature

```text
parseRecoveryKnowledge(input: unknown): RecoveryKnowledge
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RecoveryKnowledge`
- Description: The return contract is defined by the type shown above.

## `parseScopedRecoveryKnowledge`

Parse Scoped Recovery Knowledge function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { parseScopedRecoveryKnowledge } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/recovery-knowledge-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)

### Declaration

```text
export declare function parseScopedRecoveryKnowledge(input: unknown): RecoveryKnowledge & {
    key: RecoveryKnowledgeKey & {
        scope: RecoveryKnowledgeScope;
    };
};
```

### Call signature

```text
parseScopedRecoveryKnowledge(input: unknown): RecoveryKnowledge & { key: RecoveryKnowledgeKey & { scope: RecoveryKnowledgeScope; }; }
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RecoveryKnowledge & { key: RecoveryKnowledgeKey & { scope: RecoveryKnowledgeScope; }; }`
- Description: The return contract is defined by the type shown above.
