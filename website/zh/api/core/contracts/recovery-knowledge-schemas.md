# `@codesoul-co/hypha-core` / `contracts/recovery-knowledge-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/recovery-knowledge-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery-knowledge-schemas.ts)
- 导出数: **12**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `recoveryKnowledgeJsonSchema` | 常量 | <code>const recoveryKnowledgeJsonSchema: JsonSchema</code> | recovery Knowledge 的 JSON Schema。 |
| `recoveryKnowledgeKeyJsonSchema` | 常量 | <code>const recoveryKnowledgeKeyJsonSchema: JsonSchema</code> | recovery Knowledge Key 的 JSON Schema。 |
| `recoveryKnowledgeKeySchema` | 常量 | <code>const recoveryKnowledgeKeySchema: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string...</code> | recovery Knowledge Key 的运行时 Schema。 |
| `recoveryKnowledgeSchema` | 常量 | <code>const recoveryKnowledgeSchema: z.ZodObject&lt;{ key: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; scope: z.ZodOptional&lt;z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; t...</code> | recovery Knowledge 的运行时 Schema。 |
| `recoveryKnowledgeScopeJsonSchema` | 常量 | <code>const recoveryKnowledgeScopeJsonSchema: JsonSchema</code> | recovery Knowledge Scope 的 JSON Schema。 |
| `recoveryKnowledgeScopeSchema` | 常量 | <code>const recoveryKnowledgeScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; tenantId?: string &#124; undefined; workspaceId?: string &#124; undefined; sessionId?: string &#124; undefined; agentId...</code> | recovery Knowledge Scope 的运行时 Schema。 |
| `scopedRecoveryKnowledgeJsonSchema` | 常量 | <code>const scopedRecoveryKnowledgeJsonSchema: JsonSchema</code> | scoped Recovery Knowledge 的 JSON Schema。 |
| `scopedRecoveryKnowledgeKeyJsonSchema` | 常量 | <code>const scopedRecoveryKnowledgeKeyJsonSchema: JsonSchema</code> | scoped Recovery Knowledge Key 的 JSON Schema。 |
| `scopedRecoveryKnowledgeKeySchema` | 常量 | <code>const scopedRecoveryKnowledgeKeySchema: z.ZodObject&lt;{ fingerprint: z.ZodString; participantId: z.ZodString; policyRevision: z.ZodOptional&lt;z.ZodString&gt;; specRevision: z.ZodOptional&lt;z.ZodString&gt;; providerRevision: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z....</code> | scoped Recovery Knowledge Key 的运行时 Schema。 |
| `scopedRecoveryKnowledgeSchema` | 常量 | <code>const scopedRecoveryKnowledgeSchema: z.ZodObject&lt;{ strategy: z.ZodEnum&lt;["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]&gt;; outcome: z.ZodEnum&lt;["recovered", "degraded", "compensated", "failed"]&gt;; evidenceHash: z.ZodString; learnedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; validation: z.ZodObject&lt;{ status: z.ZodEnum&lt;["verified", "negative...</code> | scoped Recovery Knowledge 的运行时 Schema。 |
| `parseRecoveryKnowledge` | 函数 | <code>parseRecoveryKnowledge(input: unknown): RecoveryKnowledge</code> | 解析并校验 Recovery Knowledge。 |
| `parseScopedRecoveryKnowledge` | 函数 | <code>parseScopedRecoveryKnowledge(input: unknown): RecoveryKnowledge &amp; { key: RecoveryKnowledgeKey &amp; { scope: RecoveryKnowledgeScope; }; }</code> | 解析并校验 Scoped Recovery Knowledge。 |
