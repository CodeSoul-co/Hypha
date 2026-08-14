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

## Run the package tour

```bash
git clone https://github.com/CodeSoul-co/Hypha.git
cd Hypha/examples/release-agent
npm install
npm run tour
npm run compile-agent
npm test
```

`tour` imports all 15 packages and prints JSON only after their representative boundaries succeed. `compile-agent` prints two different processes:

- `reactHarnessFsm`: framework-owned lifecycle for ReAct execution.
- `customWorkflowFsm`: application-owned topology generated from the Domain Pack Workflow.

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

To start the separate application FSM and move one allowed edge:

```bash
npm run run:fsm
```

Follow execution using the returned Session command, Run and Event identifiers. Query command status, Run state, Events and replay rather than treating the initial HTTP response as the execution result.

## Adapt it into your system

1. Copy `examples/release-agent` to a new application repository.
2. Rename Agent/Task/Workflow/Profile IDs and replace schemas.
3. Replace the Workflow states and guards with product topology.
4. Register real model, Tool, MCP and Memory adapters in trusted composition.
5. Keep exact package versions aligned.
6. Add regression fixtures before connecting external writes.

::: danger Credentials
The example values are placeholders. Keep real owner passwords, provider keys and MCP credentials out of YAML, Events, traces, source control and documentation.
:::
