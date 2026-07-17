# Runtime Test Report

Report date: 2026-07-17

## Covered Contracts

| Area               | Automated coverage                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Event Store        | scoped append/read, sequence, revision, fencing, idempotency, export/import, SQLite persistence                        |
| Projection         | event reduction, rebuild, checkpoint metadata, divergence detection                                                    |
| Coordination       | Session Queue ordering/recovery, Run leases, resource claims, stale fencing                                            |
| Message Bus        | publish deduplication, delivery/ack/nack/dead letter, Redis Streams integration fixture                                |
| Run lifecycle      | create/start/wait/signal/timer/pause/resume/cancel/recovery/terminal projection                                        |
| FSM                | event-sourced initialization and atomic transition commit                                                              |
| Activity           | Model, Tool, Memory, Execution, Human execute/cancel/reconcile contracts                                               |
| Restart/replay     | SQLite/File restart through five Activity types, Tool post-commit crash, Human wait recovery, no repeated side effects |
| Cancellation       | intent-before-abort, provider reconciliation, grace timeout, unresolved external Activity record                       |
| Domain compilation | deterministic dependency snapshot and Process hash; dependency version invalidation                                    |

## Acceptance Scenario

`packages/adapters-local/src/runtime-long-run.integration.test.ts` executes a generic Run through
Model, Memory, Tool, Execution, and Human Activities. It simulates a process crash after Tool
provider completion but before Runtime result append, reopens durable stores, reconciles without a
second Tool call, persists a Human wait, restarts again, resumes after approval, completes, and
rebuilds the same final projection without additional provider calls.

## Verification Commands

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run test:packages
npm run test:integration
git diff --check
```

## Verification Result

| Command                    | Result                                                  |
| -------------------------- | ------------------------------------------------------- |
| `npm run lint`             | passed                                                  |
| `npm run typecheck`        | passed                                                  |
| `npm run build`            | passed for packages, Server, and CLI                    |
| `npm run test:unit`        | 10 suites, 65 tests passed                              |
| `npm run test:packages`    | 61 files passed, 1 skipped; 496 tests passed, 3 skipped |
| `npm run test:integration` | 1 suite, 29 tests passed with local MongoDB and Redis   |

The Redis Streams package integration fixture remains opt-in and accounts for the skipped package
tests. The Server integration suite requires reachable local MongoDB and Redis services and write
access to the configured user Skill directory.

## Not Yet Covered

The complete 1k/10k event performance matrix, 100 simultaneous waiting Runs, long-duration Timer
test, and external deployment chaos suite are not yet implemented. Legacy Server migration and two
business-project demonstrations also remain outside this report.
