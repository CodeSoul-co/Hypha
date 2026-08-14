# `@codesoul-co/hypha-domain`

`hypha-domain` defines application-owned Domain Packs and compiles a selected task/workflow/profile set into validated FSM and Agent-system bindings. It is the correct place for product workflow, schemas, policies and evaluation fixtures.

```bash
npm install @codesoul-co/hypha-domain@1.0.1
```

## A Domain Pack can contain

| Definition | Purpose |
| --- | --- |
| Task schemas and output contracts | Validate product input/output |
| `WorkflowSpec` | Application states, transitions, guards and policies |
| Session profiles | Product context defaults, not authoritative state |
| Skill/Tool/MCP allow-lists | Constrain capabilities per workflow/state |
| Memory/context/reasoning profiles | Bind provider-neutral behavior |
| Policies and business rules | Govern product decisions/effects |
| Evaluation/regression fixtures | Prove behavior across releases |

## Load and compile a pack

```ts
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  loadDomainPackFile,
} from '@codesoul-co/hypha-domain';
import type { ReActAgentSpec } from '@codesoul-co/hypha-kernel';

const pack = await loadDomainPackFile('./agent/domain-pack.yaml');

const compiled = compileDomainPackToHarnessedSystem(pack, {
  agentRef: { id: 'agent.release-research', version: '1.0.0' },
  taskSchemaId: 'task.research',
  workflowId: 'workflow.research',
  memoryProfileId: 'memory.release',
  reasoningProfileId: 'reasoning.release',
  agentSkillRefs: [{ id: 'skill.release-research', version: '1.0.0' }],
  agentToolRefs: ['search'],
});

const baseAgent: ReActAgentSpec & Record<string, unknown> = {
  id: 'agent.release-research',
  version: '1.0.0',
  name: 'Release research agent',
  modelAlias: 'reasoning.primary',
};

const agent = applyDomainAgentPatch(baseAgent, compiled.agentPatch);
```

## Compilation outputs

`compileDomainPackToHarnessedSystem()` returns resolved bindings, an application `fsmProcess`, a protected `harnessedSystem`, an Agent patch, Session initialization and deterministic dependency/audit hashes. Persist the selected versions/hashes with Run evidence.

## Workflow to FSM

The selected `WorkflowSpec` compiles to an application-owned `FSMProcessSpec`. You can define and adjust its nodes, edges, guards, timeout, retry and human-review policies. The separate Harness FSM remains framework-owned so product topology cannot bypass policy or trace phases.

## Capability binding

State bindings can narrow allowed Tools, Skills, prompt refs, MCP profiles, Memory policy and permission scopes. A declaration is still not authority: registries, policy and governed runners enforce it at runtime.

## Authoring rules

- Validate YAML/JSON before compilation.
- Reference versions explicitly and reject missing dependencies.
- Keep provider secrets/endpoints out of the pack.
- Keep framework internals and app routes out of the pack.
- Recompile and compare dependency hashes when a referenced definition changes.

The runnable composition is documented in [Compose a full system](/guide/full-system).
