# `@codesoul-co/hypha-kernel`

`hypha-kernel` contains provider-neutral Agent and ReAct reasoning contracts. It coordinates context, inference, skills, tools and memory behind ports while leaving application workflow topology to a Domain Pack/FSM.

```bash
npm install @codesoul-co/hypha-kernel@1.0.1
```

## Main exports

| Export | Responsibility |
| --- | --- |
| `ReActAgentSpec` | Versioned Agent configuration and capability references |
| `reactAgentSpecDefinition` | Runtime parser, example and JSON Schema |
| `ReActRunner` | Provider-neutral bounded ReAct loop |
| `ReActAgentRunner` | Resolves an Agent spec and loaded capabilities |
| `ToolRunnerActivityAdapter` | Converts governed Tool results into Kernel activity results |
| `ReActAgentRuntime` | Port for starting/resuming Agent execution |

## Define an Agent

```ts
import { reactAgentSpecDefinition } from '@codesoul-co/hypha-kernel';

const agent = reactAgentSpecDefinition.parse({
  ...reactAgentSpecDefinition.example,
  id: 'agent.release-research',
  version: '1.0.0',
  name: 'Release research agent',
  modelAlias: 'reasoning.primary',
  promptRefs: [{ id: 'prompt.release-research', version: '1.0.0' }],
  skillRefs: [{ id: 'skill.release-research', version: '1.0.0' }],
  toolRefs: ['search'],
});
```

Use aliases and references, not provider objects or secrets. Resolve the alias through [`hypha-models`](./models) or [`hypha-inference`](./inference) during trusted composition.

## Execution boundary

The runner follows a bounded cycle:

```text
build context → reason → select action → policy check
→ governed action → observe → verify → memory sync
```

Each effect crosses an injected port. A Tool call should go through `ToolRunnerActivityAdapter`; Memory writes, inference and trace recording need equivalent governed bindings. Domain code should never call a provider SDK from inside the reasoning loop.

## Budgets and termination

Configure finite step, token, time and recovery budgets. The caller must handle completion, failure, cancellation and human-review outcomes explicitly. Long-running work should be split into resumable quanta by [`hypha-harness`](./harness), not hidden inside an unbounded loop.

## Composition checklist

1. Parse the Agent spec.
2. Resolve allowed Skill, Tool, prompt and Memory references.
3. Bind inference and effect ports.
4. Start through the Harness with a scoped Run context.
5. Record decisions and effect receipts as Events.
6. Resume only from validated continuation/checkpoint evidence.

## Boundary to remember

Kernel owns reasoning semantics. [`hypha-domain`](./domain) owns product definitions; [`hypha-fsm`](./fsm) owns allowed state movement; applications own HTTP, CLI and UI behavior.

