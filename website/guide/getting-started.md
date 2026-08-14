# Get started

This guide builds an application that consumes Hypha as versioned npm libraries. Node.js 22 LTS or newer is required.

## 1. Create an application

```bash
mkdir my-hypha-agent && cd my-hypha-agent
npm init -y
npm install -D typescript tsx vitest @types/node
npm install \
  @codesoul-co/hypha-core@1.0.1 \
  @codesoul-co/hypha-fsm@1.0.1 \
  @codesoul-co/hypha-domain@1.0.1 \
  @codesoul-co/hypha-kernel@1.0.1 \
  @codesoul-co/hypha-harness@1.0.1
```

Add capability/provider packages only when the composition needs them. See the [15-package matrix](/packages/).

## 2. Own the product definition

Create an `agent/` directory containing:

| File | Responsibility |
| --- | --- |
| `domain-pack.yaml` | Task/output schemas, Workflow, allow-lists, profiles, policy and fixtures |
| `prompt.json` | Versioned Prompt registration payload |
| `skill.md` | Progressively loaded instruction asset and trust metadata |
| `hypha.user.yaml` | Deployment-owned Server overlay; never commit secrets |

Domain-specific workflow, prompts and schemas belong here—not in Core, Kernel or Harness.

## 3. Compile, then bind providers

```ts
import {
  compileDomainPackToHarnessedSystem,
  loadDomainPackFile,
} from '@codesoul-co/hypha-domain';

const pack = await loadDomainPackFile('./agent/domain-pack.yaml');
const system = compileDomainPackToHarnessedSystem(pack, {
  agentRef: { id: 'agent.example', version: '1.0.0' },
  taskSchemaId: 'task.example',
  workflowId: 'workflow.example',
  agentToolRefs: ['search'],
  agentSkillRefs: [{ id: 'skill.example', version: '1.0.0' }],
});
```

Compilation validates product intent. Trusted application/server composition separately registers model, Tool, MCP, Memory and storage providers.

## 4. Choose the execution path

- **ReAct Agent:** execute `system` through Kernel + Harness. Keep its framework-owned FSM unchanged.
- **Custom workflow:** map the selected Workflow to a separate `FSMProcessSpec`, validate it, then submit an FSM Run.

Read [Control an FSM](/guide/fsm-control) before changing nodes or edges.

## 5. Verify the boundary

```bash
npm run typecheck
npm test
```

At minimum, test deterministic compilation, selected capability IDs, output schema, FSM topology, Event scopes and replayed state.

## Next

- Understand [Events, Sessions, Runs and Domain Packs](/guide/architecture).
- Build the [complete composition](/guide/full-system).
- Copy and run the repository’s [release-agent example](/guide/examples).
