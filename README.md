<p align="center">
  <img src="docs/hypha_logo.png" alt="Hypha logo" width="180" />
</p>

<h1 align="center">Hypha</h1>

<p align="center">
  <strong>Harness-oriented agent system framework for production-grade LLM agent applications.</strong>
</p>

<p align="center">
  English | <a href="README.zh-CN.md">中文</a>
</p>

---

## Overview

Hypha is an open-source, TypeScript-based, harness-oriented agent system framework for building production-grade LLM agent applications in real business environments.

Many agent frameworks focus on how agents are composed: roles, prompts, tools, workflows, graphs, crews, or multi-agent conversations. Hypha focuses on a complementary production question: how an agent system is run, evaluated, traced, replayed, governed, and deployed over time.

The core idea of Hypha is:

> An agent should not be defined separately from the harness required to run, evaluate, trace, govern, and deploy it.

In Hypha, the primary unit is not an isolated agent. It is a harnessed agent system. Each agent system includes not only the agent's role, tools, memory, and process, but also runtime specifications, evaluation rules, trace structure, replay logic, permission policy, regression configuration, and deployment configuration.

## Current Status

This repository currently uses the `generic-framework` branch of [`erwinmsmith/OrbitAgent`](https://github.com/erwinmsmith/OrbitAgent/tree/generic-framework) as the initial TypeScript backend base. The initialization phase keeps the existing runnable engineering foundation and updates the public project identity to Hypha.

Future development will gradually refactor and extend this base toward Hypha's target architecture. Every change should preserve an engineering-oriented, maintainable, testable, and extensible design.

## Why Hypha?

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
multi-tenant / multi-workspace configuration
```

When these capabilities are scattered across business code, evaluation scripts, logging systems, deployment scripts, and debugging tools, teams pay the cost repeatedly. Reproducibility becomes weak, evaluation becomes inconsistent, regressions become hard to detect, and production behavior becomes difficult to govern.

Hypha aims to unify these concerns in one framework: not only to help developers build agents, but also to help them run, evaluate, trace, govern, and deploy agent systems.

## Core Concept: Harnessed Agent System

Hypha treats every agent application as a complete system package:

```text
HarnessedAgentSystem = {
  AgentSpec,
  ToolSpec,
  MemorySpec,
  ProcessSpec,
  RuntimeHarness,
  EvaluationHarness,
  TraceSpec,
  PolicySpec,
  ReplaySpec,
  RegressionSpec,
  DeploymentSpec
}
```

When defining an agent system in Hypha, developers should describe not only how the agent completes tasks, but also:

```text
how it runs;
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

## Domain Packs

Hypha uses Domain Packs to support business-domain adaptation.

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
```

With Domain Packs, Hypha can adapt the same agent kernel and production harness to domains such as legal assistance, education, enterprise knowledge bases, research writing, data analysis, customer support, software engineering, and internal workflow automation.

## Architecture Direction

Hypha's long-term architecture is organized into three layers:

```text
+------------------------------------------------------+
|                    Domain Packs                      |
|  Legal | Education | Enterprise QA | Research | Data  |
+------------------------------------------------------+

+------------------------------------------------------+
|                  Hypha Agent Kernel                  |
| Planner | Executor | Router | Tool Manager | Runtime |
+------------------------------------------------------+

+------------------------------------------------------+
|                Hypha Production Harness              |
| Runs | Traces | Evaluation | Replay | Policy | Audit |
+------------------------------------------------------+
```

- **Agent Kernel** provides common agent execution capabilities, including planning, tool calling, routing, memory access, multi-agent coordination, output validation, and error recovery.
- **Production Harness** provides run management, trace collection, cost tracking, policy enforcement, failure replay, regression testing, audit logging, and human review.
- **Domain Packs** define how the framework is adapted to concrete business scenarios.

Hypha's architecture should prioritize clear boundaries, stable interfaces, modular implementation, and testable behavior. Business logic, runtime state, evaluation logic, and deployment configuration should not be coupled into a single layer.

## Memory and State Layer

Hypha does not bind itself to a single memory or storage implementation. Depending on the use case, future versions may support:

- vector databases such as Milvus or Chroma;
- relational databases;
- documents, Markdown, or file-system storage;
- Redis, MongoDB, or other runtime state stores;
- agent-native runtime state substrates such as Plasmod.

Hypha and Plasmod can be complementary:

```text
Hypha   = agent system framework + production harness
Plasmod = runtime state, event, memory, and materialized view substrate
```

Hypha defines how an agent system is built, run, evaluated, and governed. Plasmod or another state layer stores runtime state, events, memory, traces, visibility scopes, and materialized views.

## Engineering Principles

Every part of Hypha should follow these principles:

- **Modular boundaries**: agent kernel, harness, domain packs, memory, policy, evaluation, and deployment need clear interfaces.
- **Maintainability first**: demo logic should not be frozen into framework core; shared capabilities should become stable abstractions.
- **Extensibility first**: new models, tools, storage backends, domains, and deployment modes should be integrated through plugins or configuration when possible.
- **Observability and replayability**: runs, traces, errors, cost, evaluation, and review records should be first-class framework capabilities.
- **Testing and regression**: framework capabilities need unit, integration, and regression testing strategies.
- **Production constraints upfront**: permissions, audit, human review, output contracts, and deployment configuration should not be afterthoughts.

## Local Development

The current base is a TypeScript / Express backend. Before running it locally, prepare Node.js 18+, MongoDB, and Redis.

```bash
npm install
cp .env.example .env
npm run dev
```

Common commands:

```bash
npm run build
npm run typecheck
npm test
```

Default server URL:

```text
http://localhost:3000
```

## License

MIT
