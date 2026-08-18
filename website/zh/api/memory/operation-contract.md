# `@codesoul-co/hypha-memory` / `operation-contract`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/operation-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)
- 导出数: **12**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `managedMemoryDeleteRequestSchema` | 常量 | <code>const managedMemoryDeleteRequestSchema: z.ZodType&lt;ManagedMemoryDeleteRequest, z.ZodTypeDef, ManagedMemoryDeleteRequest&gt;</code> | managed Memory Delete Request 的运行时 Schema。 |
| `managedMemorySearchRequestSchema` | 常量 | <code>const managedMemorySearchRequestSchema: z.ZodType&lt;ManagedMemorySearchRequest, z.ZodTypeDef, ManagedMemorySearchRequest&gt;</code> | managed Memory Search Request 的运行时 Schema。 |
| `managedMemoryUpdateRequestSchema` | 常量 | <code>const managedMemoryUpdateRequestSchema: z.ZodType&lt;ManagedMemoryUpdateRequest, z.ZodTypeDef, ManagedMemoryUpdateRequest&gt;</code> | managed Memory Update Request 的运行时 Schema。 |
| `memoryAddRequestExample` | 常量 | <code>const memoryAddRequestExample: MemoryAddRequest</code> | memory Add Request 的有效示例值。 |
| `memoryAddRequestSchema` | 常量 | <code>const memoryAddRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata:...</code> | memory Add Request 的运行时 Schema。 |
| `memoryPatchSchema` | 常量 | <code>const memoryPatchSchema: z.ZodEffects&lt;z.ZodObject&lt;{ content: z.ZodOptional&lt;z.ZodUnknown&gt;; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodString&gt;; confidence: z.ZodOptional&lt;z.ZodNumber&gt;; importance: z.ZodOptional&lt;z.ZodNumber&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; status: z.ZodOptional&lt;z.ZodEnum&lt;["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending",...</code> | memory Patch 的运行时 Schema。 |
| `memorySearchFilterSchema` | 常量 | <code>const memorySearchFilterSchema: z.ZodType&lt;MemorySearchFilter, z.ZodTypeDef, MemorySearchFilter&gt;</code> | memory Search Filter 的运行时 Schema。 |
| `paginationRequestSchema` | 常量 | <code>const paginationRequestSchema: z.ZodType&lt;PaginationRequest, z.ZodTypeDef, PaginationRequest&gt;</code> | pagination Request 的运行时 Schema。 |
| `validateManagedMemoryDeleteRequest` | 函数 | <code>validateManagedMemoryDeleteRequest(input: unknown): ManagedMemoryDeleteRequest</code> | 校验 Managed Memory Delete Request。 |
| `validateManagedMemorySearchRequest` | 函数 | <code>validateManagedMemorySearchRequest(input: unknown): ManagedMemorySearchRequest</code> | 校验 Managed Memory Search Request。 |
| `validateManagedMemoryUpdateRequest` | 函数 | <code>validateManagedMemoryUpdateRequest(input: unknown): ManagedMemoryUpdateRequest</code> | 校验 Managed Memory Update Request。 |
| `validateMemoryAddRequest` | 函数 | <code>validateMemoryAddRequest(input: unknown): MemoryAddRequest</code> | 校验 Memory Add Request。 |
