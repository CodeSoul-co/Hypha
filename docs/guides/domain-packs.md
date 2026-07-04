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

Validate a pack before using it:

```ts
import { validateDomainPackSpec, compileWorkflowToFSM } from '@hypha/domain';

const validPack = validateDomainPackSpec(domainPack);
const fsm = compileWorkflowToFSM(validPack);
```

## Field Contracts

| Field                            | Required | Purpose                                                                              |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `id`, `version`, `name`          | yes      | Stable spec identity and display name.                                               |
| `taskSchemas`                    | yes      | Declares task types, input schema, acceptance constraints, and output contract refs. |
| `outputContracts`                | no       | Declares structured output schemas used by tasks and evaluations.                    |
| `sessionProfiles`                | no       | Declares default metadata and profile refs for runtime Session initialization.       |
| `workflows`                      | yes      | Declares workflow states and transitions.                                            |
| `defaultWorkflow`                | no       | Selects the workflow used when no workflow id is provided.                           |
| `allowedSkills`, `defaultSkills` | no       | Declares which agent skills are permitted or enabled by default.                     |
| `tools`                          | no       | Embeds local or normalized `ToolSpec` contracts.                                     |
| `mcpProfiles`                    | no       | Declares MCP server and capability import policy.                                    |
| `memoryProfiles`                 | no       | Declares memory provider, type, provenance, privacy, and retrieval policy.           |
| `policies`                       | no       | Declares permission or review policies.                                              |
| `evaluationProfiles`             | no       | Declares schema, process, cost, latency, human, or regression evaluations.           |
| `regressionCases`                | no       | Declares event-derived regression cases.                                             |
| `deploymentProfile`              | no       | Declares deployment mode and runtime mode metadata.                                  |
| `metadata`                       | no       | Domain-specific metadata.                                                            |

## Workflow Rules

Workflow states are declarative. They may reference allowed tools, skills, MCP profiles, memory policy, policy refs, human review, timeout, retry, input contract, and output contract.

Workflow transitions should use deterministic guards. Avoid provider-specific prompts or business-specific side effects inside core workflow declarations. If a domain needs specialized behavior, express it as a DomainPack example or as an adapter outside framework core.

## Skill Binding Rules

Domain Packs may declare `allowedSkills` and `defaultSkills`, but skills still attach to agents through `ReActAgentSpec.skillRefs`. Workflow states can narrow the active set with `allowedSkills`.

```ts
const state = {
  id: 'Reasoning',
  goal: 'Reason and select the next action.',
  allowedSkills: ['skill.context-enrichment'],
};
```

`validateDomainPackSpec()` rejects `defaultSkills`, task default skills, or workflow state `allowedSkills` that are outside the DomainPack `allowedSkills` list. At runtime, pass the selected state as `metadata.workflowState`; `SkillContextBuilder` uses that allow-list before loading skill instructions.

## Session Initialization

`SessionProfileSpec` belongs inside DomainPack, but Session itself is runtime data. Use `initializeDomainSession(domainPack, options)` to merge profile defaults with runtime metadata and produce references for the runtime layer.

```ts
const sessionInit = initializeDomainSession(domainPack, {
  profileId: 'session.default',
  metadata: { ownerMode: 'single-user' },
});
```

The returned object contains `domainPackRef`, optional `sessionProfileRef`, merged `metadata`, and default memory/tool/MCP/skill/policy refs.
