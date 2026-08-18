# `@codesoul-co/hypha-serving-cache` / `schemas`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Package guide: [learning and composition guide](/packages/serving-cache)
- Source: [`packages/serving-cache/src/schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cachedModelResponseProjectionSchema` | constant | <code>const cachedModelResponseProjectionSchema: z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; providerId: z.ZodOptional&lt;z.ZodString&gt;; model: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodString; toolCalls: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; toolId: z.ZodString; arguments: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;; }, "strict", z.ZodTypeAny, { id: string; toolId: string; arguments?: unknown; }, { id...</code> | Runtime schema for cached Model Response Projection. |
| `cacheEntrySchema` | constant | <code>const cacheEntrySchema: z.ZodObject&lt;{ schemaVersion: z.ZodOptional&lt;z.ZodLiteral&lt;"1.0"&gt;&gt;; keyVersion: z.ZodOptional&lt;z.ZodLiteral&lt;"1"&gt;&gt;; key: z.ZodString; value: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;; createdAt: z.ZodNumber; expiresAt: z.ZodOptional&lt;z.ZodNumber&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; metadata: z.ZodOptional&lt;z.ZodObject&lt;{ provider: z.ZodString; model: z.ZodString; cacheType: z.ZodEnum&lt;["exact", ...</code> | Runtime schema for cache Entry. |
| `cachePolicySchema` | constant | <code>const cachePolicySchema: z.ZodObject&lt;{ enabled: z.ZodBoolean; mode: z.ZodEnum&lt;["off", "read", "write", "readwrite"]&gt;; ttlMs: z.ZodOptional&lt;z.ZodNumber&gt;; respectNoCache: z.ZodOptional&lt;z.ZodBoolean&gt;; failureMode: z.ZodOptional&lt;z.ZodEnum&lt;["bypass", "strict"]&gt;&gt;; scopeRequirement: z.ZodOptional&lt;z.ZodEnum&lt;["none", "user", "session"]&gt;&gt;; operationTimeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; singleflight: z.ZodOptional&lt;z.ZodBool...</code> | Runtime schema for cache Policy. |
| `cacheScopeSchema` | constant | <code>const cacheScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; projectId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodOptional&lt;z.ZodString&gt;; domainPackId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { tenantId?: string &#124; undefined; userId?: string &#124; undefined; projectId?: string &#124; undefined; sessionId?: string &#124; undefined; domainPackId?: string &#124; undefine...</code> | Runtime schema for cache Scope. |
| `servingCacheJsonSchemas` | constant | <code>const servingCacheJsonSchemas: { readonly CacheScope: { readonly type: "object"; readonly properties: { [k: string]: { type: string; minLength: number; }; }; readonly additionalProperties: false; }; readonly CachedModelResponseProjection: { readonly type: "object"; readonly required: readonly ["schemaVersion", "content"]; readonly properties: { readonly schemaVersion: { readonly const: "1.0"; }; readonly providerI...</code> | serving Cache Json Schemas constant exported by the `schemas` module. |
| `servingCacheJsonValueSchema` | constant | <code>const servingCacheJsonValueSchema: z.ZodType&lt;unknown, z.ZodTypeDef, unknown&gt;</code> | Runtime schema for serving Cache Json Value. |
| `validateCachedModelResponseProjection` | function | <code>validateCachedModelResponseProjection(input: unknown): CachedModelResponseProjection</code> | Validates Cached Model Response Projection at this module boundary. |
| `validateCacheEntry` | function | <code>validateCacheEntry&lt;T = unknown&gt;(input: unknown): CacheEntry&lt;T&gt;</code> | Validates Cache Entry at this module boundary. |
| `validateCachePolicy` | function | <code>validateCachePolicy(input: unknown): CachePolicy</code> | Validates Cache Policy at this module boundary. |
| `validateServingCacheJsonValue` | function | <code>validateServingCacheJsonValue(input: unknown): unknown</code> | Validates Serving Cache Json Value at this module boundary. |
