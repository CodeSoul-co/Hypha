# RFC: Stage 0 Framework Contracts

## Status

Accepted for Stage 0.

## Context

hypha needs a stable engineering backbone before adding domain demos, UI surfaces, or concrete provider implementations. The framework direction is ReAct + FSM, harness-first, spec-first, local-first, and provider-neutral.

## Decision

Stage 0 establishes `packages/*` as the public framework boundary and keeps `apps/*` as presentation or API surfaces. New capabilities must enter through versioned specs, provider-neutral interfaces, policy hooks, trace events, and package-level tests before app integration.

The accepted Stage 0 contracts are:

- `core`: specs, policy, events, errors, ids.
- `kernel`: ReAct agent contracts.
- `fsm`: explicit state machine contracts and snapshots.
- `domain`: DomainPack and WorkflowSpec compiler to FSMProcessSpec.
- `harness`: trace, replay, regression, run/session, and user-scoped queues.
- `models`: provider-neutral model request/response contracts.
- `memory`: structured, vector, artifact, embedding, and unified memory contracts.
- `tools`: governed ToolSpec and ToolRunner.
- `mcp`: MCP capability normalization.
- `skills`: agent-bound SkillSpec and progressive disclosure.
- `inference`: agent-internal inference manager with prefix and KV cache boundaries.

## Consequences

CLI, web, and server code must not define framework core types. Workflow belongs to DomainPack and compiles to FSM. Skill belongs to Agent. Tool calls, MCP calls, memory writes, and other side effects must pass through policy and trace hooks.

Concrete providers such as SQLite, OpenAI, OpenAI-compatible models, local vector indexes, and file artifact stores should now be added behind these contracts.
