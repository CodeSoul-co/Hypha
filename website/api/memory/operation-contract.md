# `@codesoul-co/hypha-memory` / `operation-contract`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/operation-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)
- Exports: **12**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `managedMemoryDeleteRequestSchema` | constant | <code>const managedMemoryDeleteRequestSchema: z.ZodType&lt;ManagedMemoryDeleteRequest, z.ZodTypeDef, ManagedMemoryDeleteRequest&gt;</code> | Runtime schema for managed Memory Delete Request. |
| `managedMemorySearchRequestSchema` | constant | <code>const managedMemorySearchRequestSchema: z.ZodType&lt;ManagedMemorySearchRequest, z.ZodTypeDef, ManagedMemorySearchRequest&gt;</code> | Runtime schema for managed Memory Search Request. |
| `managedMemoryUpdateRequestSchema` | constant | <code>const managedMemoryUpdateRequestSchema: z.ZodType&lt;ManagedMemoryUpdateRequest, z.ZodTypeDef, ManagedMemoryUpdateRequest&gt;</code> | Runtime schema for managed Memory Update Request. |
| `memoryAddRequestExample` | constant | <code>const memoryAddRequestExample: MemoryAddRequest</code> | Valid example value for memory Add Request. |
| `memoryAddRequestSchema` | constant | <code>const memoryAddRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata:...</code> | Runtime schema for memory Add Request. |
| `memoryPatchSchema` | constant | <code>const memoryPatchSchema: z.ZodEffects&lt;z.ZodObject&lt;{ content: z.ZodOptional&lt;z.ZodUnknown&gt;; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodString&gt;; confidence: z.ZodOptional&lt;z.ZodNumber&gt;; importance: z.ZodOptional&lt;z.ZodNumber&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; status: z.ZodOptional&lt;z.ZodEnum&lt;["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending",...</code> | Runtime schema for memory Patch. |
| `memorySearchFilterSchema` | constant | <code>const memorySearchFilterSchema: z.ZodType&lt;MemorySearchFilter, z.ZodTypeDef, MemorySearchFilter&gt;</code> | Runtime schema for memory Search Filter. |
| `paginationRequestSchema` | constant | <code>const paginationRequestSchema: z.ZodType&lt;PaginationRequest, z.ZodTypeDef, PaginationRequest&gt;</code> | Runtime schema for pagination Request. |
| `validateManagedMemoryDeleteRequest` | function | <code>validateManagedMemoryDeleteRequest(input: unknown): ManagedMemoryDeleteRequest</code> | Validates Managed Memory Delete Request at this module boundary. |
| `validateManagedMemorySearchRequest` | function | <code>validateManagedMemorySearchRequest(input: unknown): ManagedMemorySearchRequest</code> | Validates Managed Memory Search Request at this module boundary. |
| `validateManagedMemoryUpdateRequest` | function | <code>validateManagedMemoryUpdateRequest(input: unknown): ManagedMemoryUpdateRequest</code> | Validates Managed Memory Update Request at this module boundary. |
| `validateMemoryAddRequest` | function | <code>validateMemoryAddRequest(input: unknown): MemoryAddRequest</code> | Validates Memory Add Request at this module boundary. |
