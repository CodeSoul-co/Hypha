# Capabilities: Memory, Skills, Tools & MCP

These packages add context or side effects. Merely naming a capability in a Domain Pack does not grant execution authority; trusted composition must register it and policy must allow it.

## [`hypha-memory`](./memory)

Memory contracts describe scoped structured, vector, artifact, episodic and semantic memory.

```ts
import {
  memorySpecDefinition,
  validateMemorySpec,
} from '@codesoul-co/hypha-memory';

const memory = validateMemorySpec({
  ...memorySpecDefinition.example,
  id: 'memory.research',
  version: '1.0.0',
});
```

Bind a concrete MemoryProvider in trusted composition. Production reads and writes should carry `userId`, Session/Run scope, policy evidence and trace hooks. A memory write is an effect, not an invisible callback.

## [`hypha-skills`](./skills)

Skills are versioned instruction assets selected and progressively loaded into Agent context.

```ts
import {
  SkillRegistry,
  SkillSelector,
  skillSpecDefinition,
} from '@codesoul-co/hypha-skills';

const registry = new SkillRegistry();
registry.register(skillSpecDefinition.parse(skillSpecDefinition.example));
const selector = new SkillSelector(registry);
```

Keep the short description/index cheap to load. Resolve the full instruction body only after selection, authorization and trust checks.

## [`hypha-tools`](./tools)

Tools combine a typed contract with a separately registered handler.

```ts
import { ToolRegistry, toolSpecDefinition } from '@codesoul-co/hypha-tools';

const spec = toolSpecDefinition.parse({
  ...toolSpecDefinition.example,
  id: 'tool.lookup',
  name: 'lookup',
  sideEffectLevel: 'read',
});

const tools = new ToolRegistry();
tools.register(spec, async (input) => ({ input, source: 'local-index' }));
```

Use the governed runner in real execution so timeout, cancellation, policy, trace and receipts wrap the handler. Keep host filesystem and external write authority out of model-generated input.

## [`hypha-mcp`](./mcp)

MCP integrations describe allowed servers/capabilities and normalize their tools behind the same Tool path.

```ts
import { mcpIntegrationSpecDefinition } from '@codesoul-co/hypha-mcp';

const integration = mcpIntegrationSpecDefinition.parse({
  id: 'mcp.docs',
  version: '1.0.0',
  servers: [{ id: 'docs', mode: 'local', command: 'docs-mcp' }],
  allowedCapabilities: ['search'],
});
```

The spec is permission input, not execution. Connect an MCP gateway, discover capabilities, normalize them into the ToolRegistry, then apply the same policy and trace hooks as local tools.

## Capability lifecycle

```text
Domain Pack allow-list
  → registry lookup
  → trust + policy decision
  → governed execution
  → receipt + Event/trace
  → replayable outcome
```
