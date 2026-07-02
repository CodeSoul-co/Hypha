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

hypha is a TypeScript framework for building LLM agent systems that can be run, traced, replayed, governed, evaluated, and extended through stable APIs.

The framework separates reusable agent-system contracts from presentation surfaces. The API server, CLI, and web clients are clients of the same framework model; they do not define the core runtime behavior.

## Core Model

hypha uses a ReAct + FSM execution model. ReAct describes the agent loop of observing, reasoning, acting, observing results, and verifying. FSM makes that loop explicit as states, guarded transitions, retries, trace events, and terminal outcomes.

The runtime model is event-first:

- `DomainPack` declares domain-level definitions such as task schemas, workflows, tools, MCP profiles, memory profiles, skill policy, permissions, evaluation rules, and output contracts.
- `Session` is the runtime user or business context container. It can reference a DomainPack and initialize metadata from a SessionProfile.
- `Run` is one concrete execution under a Session.
- `Event` is the smallest source-of-truth fact record. Trace, replay, audit, regression, and state projection are derived from events.

## API Documentation

Public API documentation is maintained as field-level references:

- [HTTP API](docs/api/http.md): REST endpoints, authentication, request bodies, response shapes, and runtime conventions.
- [Framework API](docs/api/framework.md): TypeScript package contracts for DomainPack, Session, Run, Event, inference, memory, tools, MCP, skills, and model providers.

When the server is running, the interactive route index is also available at `/api/v1/docs`.

## Runtime Mode

hypha defaults to a single-user runtime for local and self-hosted deployments. The configured owner account is seeded from `auth.singleUser`, and public registration is disabled unless multi-user mode is explicitly enabled.

Internal APIs keep `userId` boundaries for sessions, memory, token usage, API keys, and session queues. This keeps default deployment simple while preserving the concurrency model required by multi-user clients.

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run typecheck
npm test
npm run lint
npm run cli -- --help
```

- `npm run dev` starts the Express API server with dotenv.
- `npm run build` compiles framework packages, the API server, and the CLI.
- `npm test` runs unit, package, and integration test suites.
- `npm run cli -- --help` shows the CLI client commands.

## License

MIT
