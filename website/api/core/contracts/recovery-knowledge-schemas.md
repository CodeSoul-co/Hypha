# `@codesoul-co/hypha-core` / `contracts/recovery-knowledge-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/recovery-knowledge-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)
- Exports: **12**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `recoveryKnowledgeJsonSchema` | constant | <code>const recoveryKnowledgeJsonSchema: JsonSchema</code> | JSON Schema for recovery Knowledge. |
| `recoveryKnowledgeKeyJsonSchema` | constant | <code>const recoveryKnowledgeKeyJsonSchema: JsonSchema</code> | JSON Schema for recovery Knowledge Key. |
| `recoveryKnowledgeKeySchema` | constant | <code>const recoveryKnowledgeKeySchema: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string...</code> | Runtime schema for recovery Knowledge Key. |
| `recoveryKnowledgeSchema` | constant | <code>const recoveryKnowledgeSchema: z.ZodObject&lt;{ key: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; t...</code> | Runtime schema for recovery Knowledge. |
| `recoveryKnowledgeScopeJsonSchema` | constant | <code>const recoveryKnowledgeScopeJsonSchema: JsonSchema</code> | JSON Schema for recovery Knowledge Scope. |
| `recoveryKnowledgeScopeSchema` | constant | <code>const recoveryKnowledgeScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string &#124; undefined; workspaceId?: string &#124; undefined; sessionId?: string &#124; undefined; agentId...</code> | Runtime schema for recovery Knowledge Scope. |
| `scopedRecoveryKnowledgeJsonSchema` | constant | <code>const scopedRecoveryKnowledgeJsonSchema: JsonSchema</code> | JSON Schema for scoped Recovery Knowledge. |
| `scopedRecoveryKnowledgeKeyJsonSchema` | constant | <code>const scopedRecoveryKnowledgeKeyJsonSchema: JsonSchema</code> | JSON Schema for scoped Recovery Knowledge Key. |
| `scopedRecoveryKnowledgeKeySchema` | constant | <code>const scopedRecoveryKnowledgeKeySchema: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; policyRevision: z.ZodOptional&lt;z.ZodString&gt;; specRevision: z.ZodOptional&lt;z.ZodString&gt;; providerRevision: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z....</code> | Runtime schema for scoped Recovery Knowledge Key. |
| `scopedRecoveryKnowledgeSchema` | constant | <code>const scopedRecoveryKnowledgeSchema: z.ZodObject&lt;{ strategy: z.ZodEnum&lt;["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]&gt;; outcome: z.ZodEnum&lt;["recovered", "degraded", "compensated", "failed"]&gt;; evidenceHash: z.ZodString; learnedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; validation: z.ZodObject&lt;{ status: z.ZodEnum&lt;["verified", "negative...</code> | Runtime schema for scoped Recovery Knowledge. |
| `parseRecoveryKnowledge` | function | <code>parseRecoveryKnowledge(input: unknown): RecoveryKnowledge</code> | Parses and validates Recovery Knowledge at this module boundary. |
| `parseScopedRecoveryKnowledge` | function | <code>parseScopedRecoveryKnowledge(input: unknown): RecoveryKnowledge &amp; { key: RecoveryKnowledgeKey &amp; { scope: RecoveryKnowledgeScope; }; }</code> | Parses and validates Scoped Recovery Knowledge at this module boundary. |
