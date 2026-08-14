# 能力：Memory、Skills、Tools 与 MCP

这些模块提供上下文或副作用。Domain Pack 中出现一个能力名称并不会自动赋予执行权；可信组合层必须注册它，Policy 还必须允许本次调用。

## [`hypha-memory`](./memory)

Memory 契约描述带作用域的 Structured、Vector、Artifact、Episodic 与 Semantic Memory。

```ts
import { memorySpecDefinition, validateMemorySpec } from '@codesoul-co/hypha-memory';
const memory = validateMemorySpec({
  ...memorySpecDefinition.example,
  id: 'memory.research', version: '1.0.0',
});
```

Concrete MemoryProvider 在可信组合层绑定。生产读写应带 `userId`、Session/Run Scope、Policy 证据与 Trace Hook。Memory Write 是副作用，不是隐藏 Callback。

## [`hypha-skills`](./skills)

Skill 是经过版本化、按需选择并渐进式加载到 Agent Context 的指令资产。

```ts
import { SkillRegistry, SkillSelector, skillSpecDefinition } from '@codesoul-co/hypha-skills';
const registry = new SkillRegistry();
registry.register(skillSpecDefinition.parse(skillSpecDefinition.example));
const selector = new SkillSelector(registry);
```

保持 Skill 索引与短描述轻量；只有完成选择、授权与信任检查后才加载完整指令正文。

## [`hypha-tools`](./tools)

Tool 由类型化契约与独立注册的 Handler 组成。

```ts
import { ToolRegistry, toolSpecDefinition } from '@codesoul-co/hypha-tools';
const spec = toolSpecDefinition.parse({
  ...toolSpecDefinition.example,
  id: 'tool.lookup', name: 'lookup', sideEffectLevel: 'read',
});
const tools = new ToolRegistry();
tools.register(spec, async (input) => ({ input, source: 'local-index' }));
```

实际执行应使用 Governed Runner，由它包装 Timeout、Cancellation、Policy、Trace 与 Receipt。不能让模型生成的输入直接获得 Host Filesystem 或 External Write 权限。

## [`hypha-mcp`](./mcp)

MCP 契约描述允许的 Server/Capability，并把其 Tool 归一化到同一治理路径。

```ts
import { mcpIntegrationSpecDefinition } from '@codesoul-co/hypha-mcp';
const integration = mcpIntegrationSpecDefinition.parse({
  id: 'mcp.docs', version: '1.0.0',
  servers: [{ id: 'docs', mode: 'local', command: 'docs-mcp' }],
  allowedCapabilities: ['search'],
});
```

Spec 是权限输入，不是执行本身。连接 MCP Gateway、发现能力、注册到 ToolRegistry 后，仍然执行与本地 Tool 相同的 Policy 与 Trace Hook。

## 能力生命周期

```text
Domain Pack Allow-list
  → Registry Lookup
  → Trust + Policy Decision
  → Governed Execution
  → Receipt + Event/Trace
  → Replayable Outcome
```
