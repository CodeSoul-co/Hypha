# Architecture

Hypha is a harness-oriented framework for Event-first ReAct + FSM systems. The architectural rule is simple: product definitions compile into framework contracts; all runtime effects cross governed boundaries; Events preserve what actually happened.

## Runtime model

| Concept | Meaning | Not responsible for |
| --- | --- | --- |
| Domain Pack | Product definitions and defaults | Direct provider execution |
| Agent | ReAct behavior, prompts, skills and model alias | Business state persistence |
| FSM Process | Allowed nodes, edges and guards | Hidden reasoning loops |
| Session | Long-lived product/context reference | Authoritative runtime state |
| Run | One execution under a Session | Cross-user shared ownership |
| Event | Immutable runtime evidence/source of truth | Mutable UI state |

```text
Command → Run → Harness FSM / Custom FSM
              ↓
        Policy → Effect → Receipt
              ↓
             Event stream
              ↓
     Session view · Replay · Evaluation
```

## ReAct and application workflow

Hypha uses two related but separate layers:

1. The **framework-owned Harness FSM** controls ReAct lifecycle states such as reasoning, acting, observing, verification, recovery, review and terminal movement.
2. An **application-owned FSM** can model product states such as Draft → Review → Approved.

Changing product nodes must not remove the protected ReAct lifecycle. The Domain compiler therefore returns the Harness process and the selected Workflow separately.

## Effects and capabilities

Tools, MCP calls, Memory writes, file writes and external writes are effects. A production effect path should include:

```text
validated request
  → scope + policy check
  → timeout/cancellation boundary
  → concrete adapter
  → redacted result/receipt
  → trace + Event
```

## Provider neutrality

Core, FSM, Domain and Kernel contracts do not import a provider SDK or hardcode a model. Provider adapters are registered at application startup behind Models, Inference, Storage, Memory, Tool or MCP interfaces.

This enables local-first development: begin with deterministic/mock and local adapters, then replace infrastructure without changing Domain Pack contracts.

## Deployment default

The default deployment is single-owner, but runtime identifiers and persistence retain `userId` boundaries and per-user Session queues. That keeps web, CLI and future clients from racing on shared Session state and preserves a path to multi-user operation.
