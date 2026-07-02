<p align="center">
  <img src="docs/hypha_logo.png" alt="hypha logo" width="180" />
</p>

<p align="center">
  <strong>Harness-oriented agent system framework for production-grade LLM agent applications.</strong>
</p>

<p align="center">
  English | <a href="README.zh-CN.md">中文</a>
</p>

## Overview

hypha is an open-source, TypeScript-based, harness-oriented agent system framework for building production-grade LLM agent applications in real business environments.

Many agent frameworks focus on how agents are composed: roles, prompts, tools, workflows, graphs, crews, or multi-agent conversations. hypha focuses on a complementary production question: how an agent system is run, evaluated, traced, replayed, governed, and deployed over time.

The core idea of hypha is:

> An agent should not be defined separately from the harness required to run, evaluate, trace, govern, and deploy it.

In hypha, the primary unit is not an isolated agent. It is a harnessed agent system. Each agent system includes not only the agent's role, tools, memory, and process, but also runtime specifications, evaluation rules, trace structure, replay logic, permission policy, regression configuration, and deployment configuration.

hypha adopts a **ReAct + FSM** execution model:

- **ReAct** defines how every agent reasons and acts: observe, reason, plan, act, observe again, and verify.
- **FSM** defines how the software system implements that loop with explicit states, transitions, guards, and failure handling.

This means hypha agents are not implemented as loose prompt chains or hidden `while` loops. They are explicit, inspectable, replayable state machines around a ReAct-style reasoning and acting loop.

## Why hypha?

A prototype agent often needs only:

```text
prompt
tools
memory
workflow
```

A production-grade agent system also needs:

```text
runtime lifecycle management
structured tracing
tool access control
output validation
business rule enforcement
failure replay
regression testing
cost monitoring
audit logs
human review
deployment configuration
user-scoped isolation and workspace configuration
```

When these capabilities are scattered across business code, evaluation scripts, logging systems, deployment scripts, and debugging tools, teams pay the cost repeatedly. Reproducibility becomes weak, evaluation becomes inconsistent, regressions become hard to detect, and production behavior becomes difficult to govern.

hypha aims to unify these concerns in one framework: not only to help developers build agents, but also to help them run, evaluate, trace, govern, and deploy agent systems.

## Core Concept: Harnessed Agent System

hypha treats every agent application as a complete system package:

```text
HarnessedAgentSystem = {
  ReActAgentSpec,
  ToolSpec,
  MemorySpec,
  FSMProcessSpec,
  RuntimeHarness,
  EvaluationHarness,
  TraceSpec,
  PolicySpec,
  ReplaySpec,
  RegressionSpec,
  DeploymentSpec
}
```

When defining an agent system in hypha, developers should describe not only how the agent completes tasks, but also:

```text
how it runs;
how it observes context;
how it reasons and plans;
how it calls tools;
how it reads and writes state;
how it records traces;
how it validates outputs;
how it is evaluated;
how failures are replayed;
how updates are regression-tested;
what its permission boundaries are;
when human review is required;
how it is deployed into a business environment.
```

## ReAct + FSM Execution Model

hypha requires every agent to be designed around the **ReAct** pattern: reasoning and acting are interleaved instead of separated into a one-shot plan and a blind execution phase.

A hypha agent should follow this conceptual loop:

```text
Observe -> Reason / Plan -> Act -> Observe -> Verify -> Continue | Stop | Escalate
```

hypha implements this loop with an explicit finite-state machine. A typical runtime FSM may look like:

```text
Idle
  -> RunInitialized
  -> ContextBuilt
  -> Reasoning
  -> ActionSelected
  -> PolicyChecked
  -> Acting
  -> ObservationRecorded
  -> Verifying
  -> MemorySync
  -> Reasoning | HumanReview | Completed | Failed
```

The FSM layer gives hypha deterministic software-engineering properties around a probabilistic model:

- every state transition can be traced;
- every tool action can be guarded by policy;
- every failure can be categorized and replayed;
- every run can be paused, resumed, reviewed, or terminated;
- every Domain Pack can customize transition guards without rewriting the agent kernel.

This is the main separation of responsibilities:

```text
ReAct agent logic = reasoning, planning, acting, verifying
FSM runtime       = state transitions, guards, retries, trace, replay, escalation
Production harness = policy, evaluation, audit, deployment, regression
```

## Domain Packs

hypha uses Domain Packs to support business-domain adaptation.

A Domain Pack is a complete agent system definition package for a specific domain. It includes not only domain prompts or tool lists, but also task structures, tool schemas, memory structures, roles, business processes, permission policies, evaluation metrics, guardrails, output formats, and deployment configuration.

A typical Domain Pack may include:

```text
TaskSchema
ToolSchema
MemorySchema
RoleSchema
ProcessTemplate
BusinessRules
PermissionPolicy
EvaluationRubric
Guardrails
OutputContract
DeploymentConfig
FSMOverrides
RegressionCases
```

With Domain Packs, hypha can adapt the same agent kernel and production harness to domains such as legal assistance, education, enterprise knowledge bases, research writing, data analysis, customer support, software engineering, and internal workflow automation.

## Architecture Direction

hypha's long-term architecture is organized into three layers:

```text
+------------------------------------------------------+
|                    Domain Packs                      |
|  Legal | Education | Enterprise QA | Research | Data  |
+------------------------------------------------------+

+------------------------------------------------------+
|                  hypha Agent Kernel                  |
| ReAct Planner | ReAct Executor | Router | Tool Manager |
+------------------------------------------------------+

+------------------------------------------------------+
|                hypha Production Harness              |
| FSM Runtime | Runs | Traces | Evaluation | Replay      |
| Policy | Audit | Human Review | Regression             |
+------------------------------------------------------+
```

- **Agent Kernel** provides common ReAct execution capabilities, including observation building, planning, reasoning, tool calling, routing, memory access, output validation, and error recovery.
- **FSM Runtime** makes the ReAct loop explicit through states, transitions, guards, retries, interruption, continuation, and terminal states.
- **Production Harness** provides run management, trace collection, cost tracking, policy enforcement, failure replay, regression testing, audit logging, and human review.
- **Domain Packs** define how the framework is adapted to concrete business scenarios.

hypha's architecture should prioritize clear boundaries, stable interfaces, modular implementation, and testable behavior. Application logic, runtime state, evaluation logic, and deployment configuration should not be coupled into a single layer.

## Repository Layout

hypha is moving toward a workspace layout:

```text
packages/  framework specs, interfaces, runtime contracts, and adapters
apps/      application surfaces such as the API server and CLI
configs/   local agent, tool, and workflow configuration
docs/      architecture notes, guides, and shared assets
tests/     unit and integration tests for current app behavior
```

The current Express API service lives in `apps/server/src`. The CLI example lives in `apps/cli`. New framework-level work should start in `packages/*` as versioned specs or interfaces before being wired into app surfaces.

`packages/inference` is reserved for agent-internal inference orchestration, including future prefix and KV cache management.

Stage 0/1 package contracts now cover core specs/events/policy, ReAct kernel contracts, FSM state transitions, DomainPack workflow compilation, event-first runtime projections, model/memory/tool/MCP/skill abstractions, inference KV/prefix cache management, reasoning strategies, and local reference adapters. Run `npm run test:packages` for these contract tests.

DomainPack declares domain definitions and optional SessionProfile defaults; Session is a runtime context container that references a DomainPack, Run is a concrete execution under Session, and Event is the source-of-truth fact record for trace, replay, audit, regression, and state projection.

## Memory and State Layer

hypha does not bind itself to a single memory or storage implementation. Memory is treated as a pluggable, policy-governed agentic layer rather than a single database choice.

Different agent systems may need different memory patterns:

- **Working memory**: short-lived state for the current run or task step.
- **Episodic memory**: run history, traces, observations, decisions, and tool outcomes.
- **Semantic memory**: facts, documents, embeddings, and knowledge retrieved by meaning.
- **Procedural memory**: reusable skills, task procedures, playbooks, and domain rules.
- **Artifact memory**: files, reports, code, tables, generated outputs, and intermediate artifacts.
- **Governance memory**: policy decisions, approvals, audit records, evaluation results, and regression outcomes.

Depending on the use case, hypha should support multiple memory backends and mixed memory modes:

- **Vector databases**, such as Milvus, Chroma, pgvector, Qdrant, Weaviate, or other embedding stores.
- **Relational databases**, such as PostgreSQL, MySQL, SQLite, or other SQL systems for structured state and transactional records.
- **Document and file-system storage**, such as Markdown, JSON, local files, object storage, or repository-backed artifacts.
- **Runtime state stores**, such as Redis, MongoDB, or other low-latency state layers.
- **Hybrid memory**, where vector search provides semantic recall while relational storage provides authoritative state, versioning, permissions, and provenance.
- **Agent-native substrates**, such as Plasmod or similar runtime state, event, memory, and materialized-view systems.

A future `MemoryProvider` interface should make these modes interchangeable:

```text
MemoryProvider = {
  read(scope, query)
  search(scope, query, options)
  write(scope, record, policy)
  update(scope, recordId, patch)
  invalidate(scope, recordId, reason)
  summarize(scope, options)
  audit(scope, options)
}
```

A `MemorySpec` should declare not only where memory is stored, but also how it is used:

```text
MemorySpec = {
  providers,
  memoryTypes,
  readPolicy,
  writePolicy,
  freshnessPolicy,
  provenancePolicy,
  retentionPolicy,
  privacyPolicy,
  retrievalStrategy,
  hybridJoinStrategy
}
```

hypha and Plasmod can be complementary:

```text
hypha   = agent system framework + production harness
Plasmod = runtime state, event, memory, and materialized view substrate
```

hypha defines how an agent system is built, run, evaluated, and governed. Plasmod or another state layer stores runtime state, events, memory, traces, visibility scopes, and materialized views.

## Runtime Mode

hypha defaults to a **single-user** runtime for local and self-hosted deployments. A configured owner account is seeded from `auth.singleUser` in `config.yaml`, and public registration is disabled unless multi-user mode is explicitly enabled.

The internal runtime still keeps user-scoped isolation for sessions, memory, token usage, API keys, and operation queues. This keeps today's single-user deployment simple while preserving the concurrency and queueing model required for future multi-user clients.

## Engineering Principles

Every part of hypha should follow these principles:

- **ReAct-first agent design**: every agent must expose reasoning, acting, observation, and verification as explicit phases.
- **FSM-first runtime implementation**: every run must move through explicit states and guarded transitions.
- **Modular boundaries**: agent kernel, harness, domain packs, memory, policy, evaluation, and deployment need clear interfaces.
- **Memory-provider neutrality**: vector, relational, document, runtime-state, and hybrid memory modes should be supported through adapters.
- **Single-user by default, user-scoped internally**: default deployments should run as one owner account, while internal APIs keep `userId` boundaries, per-user session queues, and multi-user-safe storage.
- **Maintainability first**: demo logic should not be frozen into framework core; shared capabilities should become stable abstractions.
- **Extensibility first**: new models, tools, storage backends, domains, and deployment modes should be integrated through plugins or configuration when possible.
- **Observability and replayability**: runs, traces, errors, cost, evaluation, and review records should be first-class framework capabilities.
- **Testing and regression**: framework capabilities need unit, integration, and regression testing strategies.
- **Production constraints upfront**: permissions, audit, human review, output contracts, and deployment configuration should not be afterthoughts.

## License
MIT
