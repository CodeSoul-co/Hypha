# `@codesoul-co/hypha-inference` / `agent-prompts`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/agent-prompts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)
- Exports: **16**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `AgentPromptRegistry` | class | <code>new AgentPromptRegistry(): AgentPromptRegistry</code> | Runtime implementation for Agent Prompt Registry; see its public constructor and members below. |
| `agentPromptRefSchema` | constant | <code>const agentPromptRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; priority?: number &#124; undefined; required?: boolean &#124; undefined; }, { id: string; version?: string &#124; undefined; priority?: number &#124; undefined; required?: boolean &#124; undefined; }&gt;</code> | Runtime schema for agent Prompt Ref. |
| `agentPromptSpecSchema` | constant | <code>const agentPromptSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; role: z.ZodEnum&lt;["system", "developer"]&gt;; template: z.ZodString; variables: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ name: z.ZodString; type: z.ZodEnum&lt;["string", "number", "boolean", "array", "object"]&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; default: z.ZodOption...</code> | Runtime schema for agent Prompt Spec. |
| `agentPromptVariableSpecSchema` | constant | <code>const agentPromptVariableSpecSchema: z.ZodObject&lt;{ name: z.ZodString; type: z.ZodEnum&lt;["string", "number", "boolean", "array", "object"]&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; default: z.ZodOptional&lt;z.ZodUnknown&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { name: string; type: "string" &#124; "number" &#124; "boolean" &#124; "object" &#124; "array"; description?: string &#124; undefined; default?: unknown; requi...</code> | Runtime schema for agent Prompt Variable Spec. |
| `agentPromptSubjectHash` | function | <code>agentPromptSubjectHash(spec: Pick&lt;AgentPromptSpec, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;): string</code> | Public runtime operation for agent Prompt Subject Hash. |
| `renderAgentPrompt` | function | <code>renderAgentPrompt(spec: AgentPromptSpec, variables: Record&lt;string, unknown&gt;): string</code> | Public runtime operation for render Agent Prompt. |
| `AgentPromptApproval` | interface | <code>interface AgentPromptApproval</code> | Field contract for Agent Prompt Approval; see all contract members below. |
| `AgentPromptPrincipal` | interface | <code>interface AgentPromptPrincipal</code> | Field contract for Agent Prompt Principal; see all contract members below. |
| `AgentPromptRef` | interface | <code>interface AgentPromptRef</code> | Field contract for Agent Prompt Ref; see all contract members below. |
| `AgentPromptResolution` | interface | <code>interface AgentPromptResolution</code> | Field contract for Agent Prompt Resolution; see all contract members below. |
| `AgentPromptResolutionContext` | interface | <code>interface AgentPromptResolutionContext</code> | Field contract for Agent Prompt Resolution Context; see all contract members below. |
| `AgentPromptSpec` | interface | <code>interface AgentPromptSpec</code> | Field contract for Agent Prompt Spec; see all contract members below. |
| `AgentPromptVariableSpec` | interface | <code>interface AgentPromptVariableSpec</code> | Field contract for Agent Prompt Variable Spec; see all contract members below. |
| `ResolvedAgentPromptBlock` | interface | <code>interface ResolvedAgentPromptBlock</code> | Field contract for Resolved Agent Prompt Block; see all contract members below. |
| `AgentPromptRole` | type | <code>type AgentPromptRole = 'system' &#124; 'developer'</code> | Public type alias for Agent Prompt Role. |
| `AgentPromptVariableType` | type | <code>type AgentPromptVariableType = 'string' &#124; 'number' &#124; 'boolean' &#124; 'array' &#124; 'object'</code> | Public type alias for Agent Prompt Variable Type. |

## `AgentPromptRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): AgentPromptRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string, version?: string): AgentPromptSpec &#124; null</code> | Gets get at this module boundary. |
| `list` | method | <code>list(): AgentPromptSpec[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(input: AgentPromptSpec, options?: { replace?: boolean; expectedRevision?: number; }): AgentPromptSpec</code> | Registers register at this module boundary. |
| `resolve` | method | <code>resolve(refs: AgentPromptRef[], context: AgentPromptResolutionContext): AgentPromptResolution</code> | Resolves resolve at this module boundary. |
| `unregister` | method | <code>unregister(id: string, version?: string): boolean</code> | Public runtime operation for unregister. |

## `AgentPromptApproval` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `approvedBy` | property | <code>approvedBy: string</code> | Public approved By property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `domainId` | property | <code>domainId: string</code> | Public domain Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `promptId` | property | <code>promptId: string</code> | Public prompt Id property. |
| `promptRevision` | property | <code>promptRevision: number</code> | Public prompt Revision property. |
| `promptVersion` | property | <code>promptVersion: string</code> | Public prompt Version property. |
| `status` | property | <code>status: "approved"</code> | Public status property. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public subject Hash property. |
| `subjectType` | property | <code>subjectType: "agent_prompt"</code> | Public subject Type property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |

## `AgentPromptPrincipal` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `domainId` | property | <code>domainId: string</code> | Public domain Id property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |

## `AgentPromptRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `AgentPromptResolution` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blocks` | property | <code>blocks: ResolvedAgentPromptBlock[]</code> | Public blocks property. |
| `instructions` | property | <code>instructions: string</code> | Public instructions property. |
| `missing` | property | <code>missing: AgentPromptRef[]</code> | Public missing property. |

## `AgentPromptResolutionContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvals` | property | <code>approvals: AgentPromptApproval[]</code> | Public approvals property. |
| `principal` | property | <code>principal: AgentPromptPrincipal</code> | Public principal property. |
| `variables` | property | <code>variables: Record&lt;string, unknown&gt;</code> | Public variables property. |

## `AgentPromptSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentIds` | property | <code>agentIds: string[]</code> | Public agent Ids property. |
| `cacheable` | property | <code>cacheable: boolean</code> | Public cacheable property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `domainIds` | property | <code>domainIds: string[]</code> | Public domain Ids property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `role` | property | <code>role: AgentPromptRole</code> | Public role property. |
| `scope` | property | <code>scope: "tenant" &#124; "owner" &#124; "global"</code> | Public scope property. |
| `stable` | property | <code>stable: boolean</code> | Public stable property. |
| `template` | property | <code>template: string</code> | Public template property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `trustLevel` | property | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public trust Level property. |
| `variables` | property | <code>variables: AgentPromptVariableSpec[]</code> | Public variables property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `AgentPromptVariableSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `default` | property | <code>default: unknown</code> | Public default property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
| `type` | property | <code>type: AgentPromptVariableType</code> | Public type property. |

## `ResolvedAgentPromptBlock` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheable` | property | <code>cacheable: boolean</code> | Public cacheable property. |
| `content` | property | <code>content: string</code> | Public content property. |
| `hash` | property | <code>hash: string</code> | Public hash property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `order` | property | <code>order: number</code> | Public order property. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `role` | property | <code>role: AgentPromptRole</code> | Public role property. |
| `scope` | property | <code>scope: "tenant" &#124; "owner" &#124; "global"</code> | Public scope property. |
| `stable` | property | <code>stable: boolean</code> | Public stable property. |
| `templateContentHash` | property | <code>templateContentHash: string</code> | Public template Content Hash property. |
| `templateId` | property | <code>templateId: string</code> | Public template Id property. |
| `templateRevision` | property | <code>templateRevision: number</code> | Public template Revision property. |
| `templateVersion` | property | <code>templateVersion: string</code> | Public template Version property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `trustLevel` | property | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public trust Level property. |
| `type` | property | <code>type: "prompt-template"</code> | Public type property. |
