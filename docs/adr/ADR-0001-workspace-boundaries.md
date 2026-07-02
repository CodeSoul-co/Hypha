# ADR-0001: Workspace Boundaries

## Status

Accepted.

## Decision

hypha uses a TypeScript workspace with `packages/*` for framework contracts and `apps/*` for application surfaces.

`apps/server` contains the current Express API service. `apps/cli` contains the example CLI client. Future web or desktop clients should be added under `apps/*` and consume package APIs rather than defining core runtime types.

## Rationale

The framework needs stable boundaries for ReAct, FSM, harness, models, memory, tools, MCP, skills, DomainPack, inference, and local adapters. Keeping app code separate prevents CLI/server/web convenience requirements from shaping core contracts.

## Consequences

Package code may depend on other package contracts in the approved direction. Package code must not depend on `apps/*`. Tests should cover package contracts with Vitest and app behavior with Jest.
