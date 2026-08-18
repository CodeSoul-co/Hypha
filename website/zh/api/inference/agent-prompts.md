# `@codesoul-co/hypha-inference` / `agent-prompts`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/agent-prompts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)
- 导出数: **16**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `AgentPromptRegistry` | 类 | <code>new AgentPromptRegistry(): AgentPromptRegistry</code> | Agent Prompt Registry 的运行时实现；公开构造函数与成员见下表。 |
| `agentPromptRefSchema` | 常量 | <code>const agentPromptRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; priority?: number &#124; undefined; required?: boolean &#124; undefined; }, { id: string; version?: string &#124; undefined; priority?: number &#124; undefined; required?: boolean &#124; undefined; }&gt;</code> | agent Prompt Ref 的运行时 Schema。 |
| `agentPromptSpecSchema` | 常量 | <code>const agentPromptSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; role: z.ZodEnum&lt;["system", "developer"]&gt;; template: z.ZodString; variables: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ name: z.ZodString; type: z.ZodEnum&lt;["string", "number", "boolean", "array", "object"]&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; default: z.ZodOption...</code> | agent Prompt Spec 的运行时 Schema。 |
| `agentPromptVariableSpecSchema` | 常量 | <code>const agentPromptVariableSpecSchema: z.ZodObject&lt;{ name: z.ZodString; type: z.ZodEnum&lt;["string", "number", "boolean", "array", "object"]&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; default: z.ZodOptional&lt;z.ZodUnknown&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { name: string; type: "string" &#124; "number" &#124; "boolean" &#124; "object" &#124; "array"; description?: string &#124; undefined; default?: unknown; requi...</code> | agent Prompt Variable Spec 的运行时 Schema。 |
| `agentPromptSubjectHash` | 函数 | <code>agentPromptSubjectHash(spec: Pick&lt;AgentPromptSpec, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;): string</code> | agent Prompt Subject Hash 的公开运行时操作。 |
| `renderAgentPrompt` | 函数 | <code>renderAgentPrompt(spec: AgentPromptSpec, variables: Record&lt;string, unknown&gt;): string</code> | render Agent Prompt 的公开运行时操作。 |
| `AgentPromptApproval` | 接口 | <code>interface AgentPromptApproval</code> | Agent Prompt Approval 的字段契约；完整字段见下表。 |
| `AgentPromptPrincipal` | 接口 | <code>interface AgentPromptPrincipal</code> | Agent Prompt Principal 的字段契约；完整字段见下表。 |
| `AgentPromptRef` | 接口 | <code>interface AgentPromptRef</code> | Agent Prompt Ref 的字段契约；完整字段见下表。 |
| `AgentPromptResolution` | 接口 | <code>interface AgentPromptResolution</code> | Agent Prompt Resolution 的字段契约；完整字段见下表。 |
| `AgentPromptResolutionContext` | 接口 | <code>interface AgentPromptResolutionContext</code> | Agent Prompt Resolution Context 的字段契约；完整字段见下表。 |
| `AgentPromptSpec` | 接口 | <code>interface AgentPromptSpec</code> | Agent Prompt Spec 的字段契约；完整字段见下表。 |
| `AgentPromptVariableSpec` | 接口 | <code>interface AgentPromptVariableSpec</code> | Agent Prompt Variable Spec 的字段契约；完整字段见下表。 |
| `ResolvedAgentPromptBlock` | 接口 | <code>interface ResolvedAgentPromptBlock</code> | Resolved Agent Prompt Block 的字段契约；完整字段见下表。 |
| `AgentPromptRole` | 类型 | <code>type AgentPromptRole = 'system' &#124; 'developer'</code> | Agent Prompt Role 的公共类型别名。 |
| `AgentPromptVariableType` | 类型 | <code>type AgentPromptVariableType = 'string' &#124; 'number' &#124; 'boolean' &#124; 'array' &#124; 'object'</code> | Agent Prompt Variable Type 的公共类型别名。 |

## `AgentPromptRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): AgentPromptRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string, version?: string): AgentPromptSpec &#124; null</code> | 读取 get。 |
| `list` | 方法 | <code>list(): AgentPromptSpec[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(input: AgentPromptSpec, options?: { replace?: boolean; expectedRevision?: number; }): AgentPromptSpec</code> | 注册 register。 |
| `resolve` | 方法 | <code>resolve(refs: AgentPromptRef[], context: AgentPromptResolutionContext): AgentPromptResolution</code> | 解析 resolve。 |
| `unregister` | 方法 | <code>unregister(id: string, version?: string): boolean</code> | unregister 的公开运行时操作。 |

## `AgentPromptApproval` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `approvedBy` | 属性 | <code>approvedBy: string</code> | approved By 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `domainId` | 属性 | <code>domainId: string</code> | domain Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `promptId` | 属性 | <code>promptId: string</code> | prompt Id 字段。 |
| `promptRevision` | 属性 | <code>promptRevision: number</code> | prompt Revision 字段。 |
| `promptVersion` | 属性 | <code>promptVersion: string</code> | prompt Version 字段。 |
| `status` | 属性 | <code>status: "approved"</code> | status 字段。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | subject Hash 字段。 |
| `subjectType` | 属性 | <code>subjectType: "agent_prompt"</code> | subject Type 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |

## `AgentPromptPrincipal` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `domainId` | 属性 | <code>domainId: string</code> | domain Id 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |

## `AgentPromptRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `AgentPromptResolution` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blocks` | 属性 | <code>blocks: ResolvedAgentPromptBlock[]</code> | blocks 字段。 |
| `instructions` | 属性 | <code>instructions: string</code> | instructions 字段。 |
| `missing` | 属性 | <code>missing: AgentPromptRef[]</code> | missing 字段。 |

## `AgentPromptResolutionContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvals` | 属性 | <code>approvals: AgentPromptApproval[]</code> | approvals 字段。 |
| `principal` | 属性 | <code>principal: AgentPromptPrincipal</code> | principal 字段。 |
| `variables` | 属性 | <code>variables: Record&lt;string, unknown&gt;</code> | variables 字段。 |

## `AgentPromptSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentIds` | 属性 | <code>agentIds: string[]</code> | agent Ids 字段。 |
| `cacheable` | 属性 | <code>cacheable: boolean</code> | cacheable 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `domainIds` | 属性 | <code>domainIds: string[]</code> | domain Ids 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `revision` | 属性 | <code>revision: number</code> | revision 字段。 |
| `role` | 属性 | <code>role: AgentPromptRole</code> | role 字段。 |
| `scope` | 属性 | <code>scope: "tenant" &#124; "owner" &#124; "global"</code> | scope 字段。 |
| `stable` | 属性 | <code>stable: boolean</code> | stable 字段。 |
| `template` | 属性 | <code>template: string</code> | template 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | trust Level 字段。 |
| `variables` | 属性 | <code>variables: AgentPromptVariableSpec[]</code> | variables 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `AgentPromptVariableSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `default` | 属性 | <code>default: unknown</code> | default 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
| `type` | 属性 | <code>type: AgentPromptVariableType</code> | type 字段。 |

## `ResolvedAgentPromptBlock` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheable` | 属性 | <code>cacheable: boolean</code> | cacheable 字段。 |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `hash` | 属性 | <code>hash: string</code> | hash 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `order` | 属性 | <code>order: number</code> | order 字段。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `role` | 属性 | <code>role: AgentPromptRole</code> | role 字段。 |
| `scope` | 属性 | <code>scope: "tenant" &#124; "owner" &#124; "global"</code> | scope 字段。 |
| `stable` | 属性 | <code>stable: boolean</code> | stable 字段。 |
| `templateContentHash` | 属性 | <code>templateContentHash: string</code> | template Content Hash 字段。 |
| `templateId` | 属性 | <code>templateId: string</code> | template Id 字段。 |
| `templateRevision` | 属性 | <code>templateRevision: number</code> | template Revision 字段。 |
| `templateVersion` | 属性 | <code>templateVersion: string</code> | template Version 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | trust Level 字段。 |
| `type` | 属性 | <code>type: "prompt-template"</code> | type 字段。 |
