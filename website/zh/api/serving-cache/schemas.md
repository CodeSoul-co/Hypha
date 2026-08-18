# `@codesoul-co/hypha-serving-cache` / `schemas`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 模块指南: [学习与组合说明](/zh/packages/serving-cache)
- 源码: [`packages/serving-cache/src/schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cachedModelResponseProjectionSchema` | 常量 | <code>const cachedModelResponseProjectionSchema: z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; providerId: z.ZodOptional&lt;z.ZodString&gt;; model: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodString; toolCalls: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; toolId: z.ZodString; arguments: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;; }, "strict", z.ZodTypeAny, { id: string; toolId: string; arguments?: unknown; }, { id...</code> | cached Model Response Projection 的运行时 Schema。 |
| `cacheEntrySchema` | 常量 | <code>const cacheEntrySchema: z.ZodObject&lt;{ schemaVersion: z.ZodOptional&lt;z.ZodLiteral&lt;"1.0"&gt;&gt;; keyVersion: z.ZodOptional&lt;z.ZodLiteral&lt;"1"&gt;&gt;; key: z.ZodString; value: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;; createdAt: z.ZodNumber; expiresAt: z.ZodOptional&lt;z.ZodNumber&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; metadata: z.ZodOptional&lt;z.ZodObject&lt;{ provider: z.ZodString; model: z.ZodString; cacheType: z.ZodEnum&lt;["exact", ...</code> | cache Entry 的运行时 Schema。 |
| `cachePolicySchema` | 常量 | <code>const cachePolicySchema: z.ZodObject&lt;{ enabled: z.ZodBoolean; mode: z.ZodEnum&lt;["off", "read", "write", "readwrite"]&gt;; ttlMs: z.ZodOptional&lt;z.ZodNumber&gt;; respectNoCache: z.ZodOptional&lt;z.ZodBoolean&gt;; failureMode: z.ZodOptional&lt;z.ZodEnum&lt;["bypass", "strict"]&gt;&gt;; scopeRequirement: z.ZodOptional&lt;z.ZodEnum&lt;["none", "user", "session"]&gt;&gt;; operationTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; singleflight: z.ZodOptional&lt;z.ZodBool...</code> | cache Policy 的运行时 Schema。 |
| `cacheScopeSchema` | 常量 | <code>const cacheScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; projectId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { tenantId?: string &#124; undefined; userId?: string &#124; undefined; projectId?: string &#124; undefined; sessionId?: string &#124; undefined; domainPackId?: string &#124; undefine...</code> | cache Scope 的运行时 Schema。 |
| `servingCacheJsonSchemas` | 常量 | <code>const servingCacheJsonSchemas: { readonly CacheScope: { readonly type: "object"; readonly properties: { [k: string]: { type: string; minLength: number; }; }; readonly additionalProperties: false; }; readonly CachedModelResponseProjection: { readonly type: "object"; readonly required: readonly ["schemaVersion", "content"]; readonly properties: { readonly schemaVersion: { readonly const: "1.0"; }; readonly providerI...</code> | 由 `schemas` 模块导出的 serving Cache Json Schemas 常量。 |
| `servingCacheJsonValueSchema` | 常量 | <code>const servingCacheJsonValueSchema: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;</code> | serving Cache Json Value 的运行时 Schema。 |
| `validateCachedModelResponseProjection` | 函数 | <code>validateCachedModelResponseProjection(input: unknown): CachedModelResponseProjection</code> | 校验 Cached Model Response Projection。 |
| `validateCacheEntry` | 函数 | <code>validateCacheEntry&lt;T = unknown&gt;(input: unknown): CacheEntry&lt;T&gt;</code> | 校验 Cache Entry。 |
| `validateCachePolicy` | 函数 | <code>validateCachePolicy(input: unknown): CachePolicy</code> | 校验 Cache Policy。 |
| `validateServingCacheJsonValue` | 函数 | <code>validateServingCacheJsonValue(input: unknown): unknown</code> | 校验 Serving Cache Json Value。 |
