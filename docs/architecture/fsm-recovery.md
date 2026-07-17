# FSM Anomaly Recovery

Hypha models recovery as explicit FSM behavior. A failed provider call does not authorize an
unbounded retry loop, and a caught exception does not automatically mean the run should enter
`Failed`. Runtime code first normalizes the anomaly, evaluates a bounded recovery policy, records
the decision, and then performs an allowed FSM transition.

## Recovery States

The default ReAct process adds three non-terminal states:

```text
normal state
  ├─ retry or circuit wait ──> Recovering ──> original state
  ├─ committed side effect ─> Compensating ─> HumanReview | Quarantined | Failed
  ├─ unknown commit state ──> Quarantined ──> HumanReview | Failed | Cancelled
  └─ non-retryable failure ─> HumanReview | Failed | Cancelled
```

`Recovering` is an explicit scheduling boundary. `runFSMRecoveryLoop()` suspends delayed retries by
default and returns `nextEligibleAt`; a deployment may inject a scheduler and a bounded
`maxInlineDelayMs` when an in-process delay is appropriate. `Compensating` never guesses how to
undo a side effect. The caller must provide an idempotent compensation function. `Quarantined`
preserves evidence when the external commit state or an invariant is uncertain.

## Anomaly Contract

`FSMAnomaly` separates four questions that must not be collapsed into an exception message:

| Field             | Meaning                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source`          | Framework surface that observed the anomaly: FSM, inference, tool, memory, MCP, workspace, storage, message bus, policy, domain, or unknown.                          |
| `category`        | Stable recovery class such as validation, rate limit, timeout, transient dependency, concurrency conflict, resource exhaustion, invariant violation, or cancellation. |
| `retryable`       | Explicit provider or adapter evidence that another attempt is meaningful. Policy can still deny a retry.                                                              |
| `sideEffectState` | `none`, `not_started`, `committed`, or `unknown`. Unknown external commit state always takes precedence over retryability.                                            |

`classifyFSMAnomaly()` recognizes common error codes and HTTP statuses. Adapters should supply a
more precise category, `retryAfterMs`, `circuitKey`, and side-effect evidence whenever those facts
are available.

## Module Failure Matrix

| Module or capability                   | Typical anomalies                                                                                               | Preferred FSM response                                                                                             | Required evidence and constraints                                                                                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Specs, DomainPack compiler, FSM guards | Missing refs, invalid schema, duplicate states/transitions, rejected guard, unsafe pattern                      | Correct input or configuration; `HumanReview` or `Failed`; invariant mismatch may be `Quarantined`                 | Do not retry deterministic validation failures. Persist the rejected spec/version and guard context without secrets.                        |
| Persisted FSM state                    | Process/run mismatch, path/current-state mismatch, invalid status or timestamp, corrupt recovery snapshot       | Reject resume and quarantine the persisted record                                                                  | Resume only after `validateFSMSnapshot()` succeeds. Never reconstruct state from mutable Session fields.                                    |
| Inference/model provider               | 429, timeout, 5xx, malformed normalized output, authentication failure, cancellation                            | Bounded retry with provider circuit for 429/timeout/5xx; review credentials; fail invalid output; cancel on abort  | Honor retry-after, total deadline, model-call idempotency boundary, and provider-specific circuit key. Do not persist raw hidden reasoning. |
| Tool runner                            | Input/output schema failure, policy denial, approval expiry, timeout, handler failure, late result              | Correct input, request review, retry read-only/idempotent work, or quarantine unknown writes                       | All attempts remain Invocation records. A timed-out write is not retried until receipt reconciliation proves it safe.                       |
| MCP                                    | Connection loss, capability removal, schema drift, identity/protocol change, remote error                       | Reconnect under budget, keep immutable Run snapshot, require approval for drift, quarantine identity changes       | Catalog revision, capability hash, server identity, and external receipt are recovery evidence.                                             |
| Memory                                 | Scope violation, write-policy denial, optimistic conflict, provider outage, corrupt record                      | Deny/review scope errors, retry bounded conflicts/transient outages, quarantine corruption                         | Preserve `userId`/workspace/session/run scope and provenance. Memory writes remain policy-checked events.                                   |
| Storage and event log                  | Lease loss, stale fencing token, revision conflict, disk full, unavailable backend, corrupt append              | Stop stale writer, retry compare-and-swap under budget, escalate capacity, quarantine corruption                   | Event append idempotency key, expected revision, fencing token, and durable receipt determine safe recovery.                                |
| Workspace, sandbox, command execution  | Path escape, denied network/secret access, startup failure, timeout, cancellation, unknown remote process state | Deny invalid authority, retry transient startup, cancel/clean up known processes, quarantine unknown completion    | Never bypass Workspace/Sandbox policy. Record command identity, terminal evidence, cleanup result, and provider recovery disposition.       |
| Message bus                            | Duplicate delivery, expiry, poison message, out-of-order handoff, unavailable consumer                          | Idempotent acknowledge, retry with delivery budget, then dead-letter; compensate only committed downstream effects | Correlation/causation ids and message id are mandatory. Dead letters must not block the recipient queue.                                    |
| Cache                                  | Miss, stale entry, corrupt value, invalidation race, cache backend outage, overload                             | Bypass or invalidate; rebuild asynchronously; never fail source execution solely because an optional cache failed  | Cache is not the source of truth. Include contract/provider/model/policy revisions in validity checks.                                      |
| Skills                                 | Missing required skill, untrusted package, denied tool scope, oversized context, load failure                   | Fail before inference or request review; retry only transient storage reads                                        | Skill instructions cannot replace Workflow/FSM authority or bypass ToolRunner. Preserve package version and policy decision.                |
| Replay, evaluation, regression         | Missing lifecycle pair, event mismatch, output schema failure, incomplete fixture                               | Fail the check and report trace diff; do not call live model/tool/memory writers                                   | These paths are deterministic views over recorded events and contracts.                                                                     |
| Concurrency and cancellation           | Session queue race, duplicate run, lease/fencing loss, abort during wait or activity                            | Serialize per user/session where required, stop stale work, cancel explicitly, quarantine uncertain side effects   | Cancellation is terminal for the current attempt and must propagate through scheduler, provider, tool, and command signals.                 |

## Decision Order

The planner applies safety rules before retry convenience:

1. Cancellation enters `Cancelled`.
2. Unknown external commit state enters `Quarantined`.
3. A committed effect with an available compensation enters `Compensating`.
4. Invariant violations enter `Quarantined`.
5. Validation, policy, authentication, and authorization anomalies enter `HumanReview`.
6. Explicitly non-retryable codes fail.
7. An open circuit returns `wait` and `nextEligibleAt`.
8. Per-state, total-attempt, and elapsed-time budgets are checked.
9. Retryable categories use exponential backoff with deterministic bounded jitter.
10. Repeated dependency failure opens the circuit; a successful probe closes it.

The default policy allows three attempts per state, eight recovery decisions per run, and five
minutes total elapsed time. These values are defaults, not service-level promises. Domain or
deployment specs may supply stricter values and state names through `FSMRecoveryPolicySpec`.

## Event-First Integration

`FSMSnapshot.recovery` contains attempts, circuit state, the last anomaly id, and the last action.
`FSMRuntime.onRecoveryDecision` is the trace boundary for persisting the decision beside the normal
`onTransition` and `onStateEntered` callbacks. A durable runtime should record at least:

- anomaly id, source, category, code, and side-effect state;
- selected action, attempt counters, delay, circuit key/status, and decision reason;
- transition into `Recovering`, `Compensating`, `Quarantined`, review, failure, or cancellation;
- scheduler acknowledgement and resumed attempt identity;
- compensation request/result or external receipt reconciliation;
- successful circuit close.

Do not store secrets, full credentials, or unrestricted provider payloads in recovery metadata.

## Runtime API

```ts
import { FSMRuntime, classifyFSMAnomaly, defaultReActFSMProcessSpec } from '@hypha/fsm';
import { runFSMRecoveryLoop } from '@hypha/harness';

const fsm = new FSMRuntime(defaultReActFSMProcessSpec, runId, {
  onRecoveryDecision: recordRecoveryDecision,
  onTransition: recordTransition,
  onStateEntered: recordState,
});
await fsm.start({ phase: 'recovery_example' });

const result = await runFSMRecoveryLoop({
  fsm,
  source: 'inference',
  execute: () => provider.infer(request),
  classify: (error, { attempt }) =>
    classifyFSMAnomaly(error, {
      id: `${runId}:model:${attempt}`,
      source: 'inference',
      circuitKey: provider.id,
      sideEffectState: 'none',
    }),
});
```

Without an injected scheduler, a delayed retry returns `status: "suspended"`. Persist the snapshot
and `nextEligibleAt`, then resume through the same FSM after the scheduling event. This keeps waits,
restarts, and multi-process execution visible rather than hiding them in an in-memory loop.
