# `@codesoul-co/hypha-harness`

`hypha-harness` is the execution shell around Kernel/FSM work. It records trace evidence, derives Session and Run views, enforces user-scoped queues, coordinates bounded FSM steps and supports governed manual transitions and long-horizon continuation.

```bash
npm install @codesoul-co/hypha-harness@1.0.1
```

## Public surfaces

| Export | Use |
| --- | --- |
| `EventFirstRuntime` | Create Sessions/Runs and append scoped runtime Events |
| `RunManager` | Coordinate Run lifecycle and terminal convergence |
| `HarnessedReActFSMRunner` | Execute Kernel work through the protected Harness FSM |
| `InMemoryTraceRecorder` | Deterministic trace recorder for tests/local use |
| `SessionProjector` | Derive Session views from Events |
| `UserScopedSessionQueue` | Serialize work per user/session without global blocking |
| `GovernedFSMTransitionService` | Apply authorized, revision-fenced manual transitions |
| `ReActQuantumExecutor` | Execute resumable long-horizon ReAct quanta |

## Record and project evidence

```ts
import { createFrameworkEvent } from '@codesoul-co/hypha-core';
import {
  InMemoryTraceRecorder,
  SessionProjector,
} from '@codesoul-co/hypha-harness';

const traces = new InMemoryTraceRecorder();

await traces.record(createFrameworkEvent({
  id: 'event-1',
  type: 'run.created',
  userId: 'owner',
  sessionId: 'session-1',
  runId: 'run-1',
  payload: { agentSystemId: 'system.research' },
}));

const sessions = new SessionProjector().project(await traces.list());
```

The projected Session is disposable. Rebuild it from Events after a crash, schema migration or replay.

## Production composition

```text
request/command
  → user-scoped Session queue
  → Run manager + lease/revision check
  → Harness FSM phase
  → Kernel/inference/effect port
  → Event + receipt
  → Session/Run projection
```

Use a durable Event store bridge and persistent queue/lease/checkpoint stores when multiple processes can serve the same user. The default single-user deployment still preserves `userId` boundaries so CLI and web clients cannot race a shared Session.

## Manual FSM transitions

`GovernedFSMTransitionService` is the supported path for human adjustment of an application-owned FSM. Require `runtime.fsm.transition`, verify the expected revision and owner, evaluate the declared edge/guard, then append evidence. Never expose direct snapshot writes as an admin shortcut.

## Long-horizon execution

`ReActQuantumExecutor` and `LongHorizonReActSupervisor` split long work into bounded, checkpointed units. Continuation payloads carry identity and idempotency evidence; recovery must reconcile uncertain side effects before retrying.

## Verification

Test simultaneous requests for one Session, cancellation, stale revisions, restart/replay and terminal convergence. Use [`hypha-testing`](./testing) to compare the resulting Event sequence and projection.
