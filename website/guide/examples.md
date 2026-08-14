# Runnable examples

The repository’s [`examples/release-agent`](https://github.com/CodeSoul-co/Hypha/tree/main/examples/release-agent) directory is an application-shaped example pinned to all 15 `@codesoul-co/hypha-*` packages at v1.0.1.

## What each file demonstrates

| File | Demonstrates |
| --- | --- |
| `agent/domain-pack.yaml` | Product schemas, Workflow, profiles, capability allow-lists, policy and fixtures |
| `agent/prompt.json` | Versioned Prompt registration payload |
| `agent/skill.md` | Progressive Skill content and trust declaration |
| `agent/hypha.user.yaml` | Server deployment overlay |
| `src/package-tour.ts` | One representative boundary from every public package |
| `src/agent.ts` | Domain compilation, Agent patch and custom FSM generation |
| `src/contract.test.ts` | Deterministic compilation/topology assertions |
| `src/run-agent.ts` | Prompt/Skill registration and durable ReAct Run submission |
| `src/run-fsm.ts` | Custom FSM Run start and revision-aware transition |

## What the 15-package tour verifies

The tour is more than an import smoke test. It executes one stable boundary from every published package.

| Package | Operation | Expected evidence |
| --- | --- | --- |
| [`hypha-core`](/packages/core) | Parse a Harnessed system and create a scoped Event | System/Event IDs |
| [`hypha-storage`](/packages/storage) | Build a SQLite topology | Provider engines |
| [`hypha-fsm`](/packages/fsm) | Parse/analyze topology and create a Snapshot | Initial/reachable states |
| [`hypha-kernel`](/packages/kernel) | Parse a ReAct Agent spec | Agent ID |
| [`hypha-harness`](/packages/harness) | Record Event and project Session | Session ID |
| [`hypha-models`](/packages/models) | Register mock Provider and parse routing | Provider/Alias count |
| [`hypha-inference`](/packages/inference) | Execute normalized inference | Echo response |
| [`hypha-memory`](/packages/memory) | Parse a Memory spec | Memory profile ID |
| [`hypha-skills`](/packages/skills) | Parse/register a Skill | Registered Skill IDs |
| [`hypha-tools`](/packages/tools) | Parse/register a Tool handler | Tool contract ID |
| [`hypha-mcp`](/packages/mcp) | Parse an integration spec | Allowed Server IDs |
| [`hypha-domain`](/packages/domain) | Parse and compile a Domain Pack | Pack/workflow IDs |
| [`hypha-adapters-local`](/packages/adapters-local) | Create local profiles | SQLite/vector/artifact engines |
| [`hypha-serving-cache`](/packages/serving-cache) | Generate key, set and read entry | Cache hit |
| [`hypha-testing`](/packages/testing) | Assert deterministic state path | `true` |

## Run the package tour

```bash
git clone https://github.com/CodeSoul-co/Hypha.git
cd Hypha/examples/release-agent
npm install
npm run tour
npm run compile-agent
npm test
```

`tour` prints JSON only after all representative boundaries succeed. `compile-agent` prints two different processes:

- `reactHarnessFsm`: framework-owned lifecycle for ReAct execution.
- `customWorkflowFsm`: application-owned topology generated from the Domain Pack Workflow.

The contract test compiles the same pack twice and compares the generated Harness system and both FSM outputs. It also asserts output, Memory, reasoning, evaluation, Tool and Skill bindings. A non-deterministic compiler or changed dependency snapshot fails the test.

```text
npm run tour
  → all 15 package boundaries return JSON
npm run compile-agent
  → print Agent patch + Harness FSM + application FSM
npm test
  → "Release Agent contract is deterministic and valid."
```

All dependencies are pinned exactly to `1.0.1`, so this directory also acts as an external-consumer compatibility test. Update all Hypha packages together and rerun all three commands.

## Run against the Server

Start the Server from a Hypha repository checkout with the example overlay:

```bash
export HYPHA_CONFIG_PATH=/absolute/path/to/examples/release-agent/agent/hypha.user.yaml
npm run dev
```

From the example directory, supply the configured owner account and submit a task:

```bash
export HYPHA_BASE_URL=http://127.0.0.1:3000/api/v1
export HYPHA_OWNER_EMAIL=owner@example.com
export HYPHA_OWNER_PASSWORD=replace-with-a-private-password
npm run run -- "What guarantees make Hypha Event-first?"
```

The online sequence is:

1. Authenticate the configured owner and receive a bearer token.
2. Register the versioned Prompt and install/activate the Skill.
3. Compile the Domain Pack and apply its Agent patch locally.
4. Submit `start-run` with an `Idempotency-Key`.
5. Poll the Session command until it is `applied`, `reused` or terminally rejected.
6. Follow the resulting Run/Event stream and replay projection.

To start the separate application FSM and move one allowed edge:

```bash
npm run run:fsm
```

`run:fsm` reads the current FSM view before submitting a transition. The request includes `processId`, `processVersion`, `expectedState` and `expectedRunRevision`; a stale caller is rejected instead of overwriting a newer transition.

## Adapt it into your system

1. Copy `examples/release-agent` to a new application repository.
2. Rename Agent/Task/Workflow/Profile IDs and replace schemas.
3. Replace Workflow states, transitions, guards, retry and review policy.
4. Register real model, Tool, MCP and Memory adapters in trusted composition.
5. Keep exact package versions aligned.
6. Add replay/regression fixtures before connecting external writes.
7. Run the [release gates](/guide/full-system#release-gates) with real deployment dependencies.

::: danger Credentials
The example values are placeholders. Keep real owner passwords, provider keys and MCP credentials out of YAML, Events, traces, source control and documentation.
:::
