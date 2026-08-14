# `@codesoul-co/hypha-testing`

`hypha-testing` supplies deterministic replay, regression, evaluation and mock-execution helpers. It is designed to prove Event/state behavior, not merely to make tests easier to write.

```bash
npm install --save-dev @codesoul-co/hypha-testing@1.0.1
```

## Main exports

| Export | Use |
| --- | --- |
| `GoldenTraceFixture` | Small expected Event/state-path fixture |
| `assertEventTypes` / `assertStatePath` | Direct trace invariants |
| `ReplayEngine` | Capture, normalize, project and compare replays |
| `InMemoryReplayFixtureStore` | Deterministic fixture storage |
| `FileReplayFixtureStore` | Versioned fixtures on disk |
| `RegressionRunner` | Execute a set of behavioral regression checks |
| `DeterministicEvaluator` | Evaluate output/trace checks without a model judge |
| `MockExecutionProvider` | Script execution outcomes, failures and cancellation |

## Assert an FSM path

```ts
import { assertStatePath } from '@codesoul-co/hypha-testing';

const passed = assertStatePath(
  {
    id: 'fixture-publication',
    version: '1.0.0',
    events: [],
    statePath: ['Draft', 'Review', 'Published'],
  },
  ['Draft', 'Review', 'Published'],
);

expect(passed).toBe(true);
```

## What a useful fixture records

- Stable input and selected spec/profile versions.
- Scoped, normalized Events in causal order.
- Application FSM state path and terminal status.
- Tool/MCP/Memory/execution receipts or normalized failures.
- Deterministic projection/output checks.
- Redaction rules for values that must not enter source control.

## Replay workflow

```text
capture canonical Events
  → normalize volatile fields
  → rebuild projection/state path
  → compare sequence and values
  → run regression checks
  → report actionable differences
```

Do not normalize away semantic fields such as scope, revision, operation identity or terminal status.

## Failure-oriented tests

Script timeout, cancellation, transient/permanent failure, stale revision, duplicate idempotency key and crash-after-dispatch outcomes. Assert both the returned result and the Event/receipt state. A release acceptance job should use real providers where the package claims concrete-provider support and must report zero skipped cases.

## Test layers

1. Contract tests validate schemas and ports.
2. Unit tests isolate deterministic behavior.
3. Integration tests use real persistence/transports.
4. Replay/regression tests protect end-to-end semantics across releases.
