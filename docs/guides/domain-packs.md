# Domain Packs

`DomainPackSpec` is the field-level declaration package for a domain. It defines what tasks exist, how workflows run, what capabilities are allowed, which memory and MCP profiles apply, and how outputs are evaluated.

## Minimal Shape

```ts
import type { DomainPackSpec } from '@hypha/domain';

export const domainPack: DomainPackSpec = {
  id: 'domain.default',
  version: '0.0.0',
  name: 'Default Domain Pack',
  taskSchemas: [
    {
      id: 'task.default',
      version: '0.0.0',
      taskType: 'default',
      inputSchema: { type: 'object' },
      outputContractRef: 'output.default',
      defaultWorkflowRef: 'workflow.default',
    },
  ],
  outputContracts: [
    {
      id: 'output.default',
      version: '0.0.0',
      schema: { type: 'object' },
    },
  ],
  workflows: [
    {
      id: 'workflow.default',
      version: '0.0.0',
      initialState: 'Intake',
      terminalStates: ['Completed', 'Failed'],
      states: [
        { id: 'Intake', goal: 'Normalize task input.' },
        { id: 'Completed', goal: 'Return final output.' },
        { id: 'Failed', goal: 'Record failure.' },
      ],
      transitions: [
        { from: 'Intake', to: 'Completed', guard: 'input.ready == true' },
        { from: 'Intake', to: 'Failed' },
      ],
    },
  ],
  defaultWorkflow: 'workflow.default',
  allowedSkills: [{ id: 'skill.context-enrichment', version: '0.0.0' }],
  defaultSkills: [{ id: 'skill.context-enrichment', version: '0.0.0' }],
};
```

Validate and compile a pack before using it:

```ts
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  validateDomainPackSpec,
} from '@hypha/domain';

const validPack = validateDomainPackSpec(domainPack);
const compiled = compileDomainPackToHarnessedSystem(validPack, {
  agentRef: { id: 'agent.default', version: '0.0.0' },
});

compiled.fsmProcess; // FSMProcessSpec
compiled.harnessedSystem; // HarnessedAgentSystemSpec
compiled.agentPatch; // skill/tool/memory/context refs for an AgentSpec

const baseAgent = {
  id: 'agent.default',
  version: '0.0.0',
  name: 'Default Agent',
  modelAlias: 'default-chat',
};
const agent = applyDomainAgentPatch(baseAgent, compiled.agentPatch);
```

`configs/domain-packs/minimal.domain.yaml` is a loadable local example that
includes task, output, workflow, skill, tool, MCP, memory, context, business
rule, policy, evaluation, regression, and deployment bindings.

## Field Contracts

| Field                            | Required | Purpose                                                                              |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `id`, `version`, `name`          | yes      | Stable spec identity and display name.                                               |
| `taskSchemas`                    | yes      | Declares task types, input schema, acceptance constraints, and output contract refs. |
| `outputContracts`                | yes      | Declares structured output schemas used by tasks and evaluations.                    |
| `sessionProfiles`                | no       | Declares default metadata and profile refs for runtime Session initialization.       |
| `workflows`                      | yes      | Declares workflow states and transitions.                                            |
| `defaultWorkflow`                | no       | Selects the workflow used when no workflow id is provided.                           |
| `allowedSkills`, `defaultSkills` | no       | Declares which agent skills are permitted or enabled by default.                     |
| `skillPolicies`                  | no       | Binds skills to policy refs, tool allow-lists, required tools, and trust level.      |
| `tools`                          | no       | Embeds local or normalized `ToolSpec` contracts.                                     |
| `mcpProfiles`                    | no       | Declares MCP server and capability import policy.                                    |
| `memoryProfiles`                 | no       | Declares memory provider, type, provenance, privacy, and retrieval policy.           |
| `contextProfiles`                | no       | Declares context sources, token budget, provenance, and instruction boundaries.      |
| `businessRules`                  | no       | Declares abstract domain rules with output-contract, policy, and evaluation refs.    |
| `policies`                       | no       | Declares permission or review policies.                                              |
| `evaluationProfiles`             | no       | Declares schema, process, cost, latency, human, or regression evaluations.           |
| `regressionCases`                | no       | Declares event-derived regression cases.                                             |
| `deploymentProfile`              | no       | Declares deployment mode and runtime mode metadata.                                  |
| `metadata`                       | no       | Domain-specific metadata.                                                            |

## Workflow Rules

Workflow states are declarative. They may reference allowed tools, allowed or required skills, MCP profiles, memory policy, policy refs, human review, timeout, retry, input contract, and output contract.

Workflow transitions should use deterministic guards. Avoid provider-specific prompts or business-specific side effects inside core workflow declarations. If a domain needs specialized behavior, express it as a DomainPack example or as an adapter outside framework core.

## Loading, Overlays, and Registry

Use the local loader for predefined or user-edited packs:

```ts
import { DomainPackRegistry, LocalDomainPackLoader, extendDomainPack } from '@hypha/domain';

const registry = new DomainPackRegistry();
await new LocalDomainPackLoader({
  directories: ['configs/domain-packs'],
}).loadInto(registry);

const base = registry.get('domain.minimal');
if (!base) throw new Error('DomainPack not found: domain.minimal');

const customized = extendDomainPack(base, {
  version: '0.0.1',
  remove: { regressionCases: ['regression.minimal'] },
  defaultSkills: [{ id: 'skill.context-enrichment', version: '0.0.0' }],
});
```

`extendDomainPack()` upserts array fields by `id`, so a predefined pack can be
customized without copying every task, workflow, tool, profile, or policy. Use
`remove` to delete inherited entries by `id`; the resulting pack is still fully
validated, so deleting a referenced item must be paired with a replacement or
reference update.

## Skill Binding Rules

Domain Packs may declare `allowedSkills` and `defaultSkills`, but skills still attach to agents through `ReActAgentSpec.skillRefs`. Workflow states can narrow the active set with `allowedSkills` and force state-scoped capabilities with `requiredSkills`.

```ts
const state = {
  id: 'Reasoning',
  goal: 'Reason and select the next action.',
  allowedSkills: ['skill.context-enrichment'],
  requiredSkills: ['skill.context-enrichment'],
};
```

`validateDomainPackSpec()` rejects `defaultSkills`, task default skills, skill
policies, or workflow state `allowedSkills` that are outside the DomainPack
`allowedSkills` list. A state `requiredSkills` entry must also be present in
that state's `allowedSkills` when the state provides an explicit allow-list. At
runtime, pass the selected state as
`metadata.workflowState`; `SkillContextBuilder` uses that allow-list before
loading skill instructions and treats `requiredSkills` as mandatory activations.
If any required skill is not attached to the agent, not registered, disallowed,
or policy-denied, context building fails before model inference.

## Session Initialization

`SessionProfileSpec` belongs inside DomainPack, but Session itself is runtime data. Use `initializeDomainSession(domainPack, options)` to merge profile defaults with runtime metadata and produce references for the runtime layer.

```ts
const sessionInit = initializeDomainSession(domainPack, {
  profileId: 'session.default',
  metadata: { ownerMode: 'single-user' },
});
```

The returned object contains `domainPackRef`, optional `sessionProfileRef`,
merged `metadata`, and default memory/context/tool/MCP/skill/policy refs.

## Compilation Result

`compileDomainPackToHarnessedSystem()` resolves a selected task, workflow,
session profile, memory profile, MCP profile, context profile, reasoning
profile, business rules, policy refs, evaluation refs, skills, and tools. It
returns:

| Field                   | Purpose                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `domainPack`            | Validated `DomainPackSpec`.                                                                                     |
| `bindings`              | Resolved task, profiles, policies, tools, skills, and workflow state restrictions.                              |
| `fsmProcess`            | Compiled `FSMProcessSpec` from the selected workflow.                                                           |
| `harnessedSystem`       | `HarnessedAgentSystemSpec` tying agent, FSM, trace, policy, memory, MCP, context, tools, skills, and contracts. |
| `agentPatch`            | Agent-facing refs for skills, tools, memory, context, policies, and metadata.                                   |
| `sessionInitialization` | Runtime session defaults derived from the selected `SessionProfileSpec`.                                        |

The selected default MCP/reasoning profiles remain available on `agentPatch`
metadata. The compiled `harnessedSystem.mcpRefs` and `reasoningRefs` include
both selected defaults and workflow state-scoped refs, so downstream runtime
assemblers can load every profile used by the workflow.

All DomainPack-internal references are checked during validation: task output
contracts, workflow state transitions, session profile refs, state
tool/MCP/reasoning bindings, business rule refs, policy refs, evaluation refs,
and skill policies must resolve inside the same DomainPack. Runtime compile
options may add agent/system refs, but they do not repair broken internal
DomainPack references.
