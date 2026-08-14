# `@codesoul-co/hypha-core`

`hypha-core` 是所有 Hypha 运行时共享的契约层，包含版本化 Spec、Runtime Schema、Framework Event、ID、Policy、Execution/Storage Port、Artifact 契约以及 Provider-neutral 运行时原语。

```bash
npm install @codesoul-co/hypha-core@1.0.1
```

## 适用范围

当多个模块需要在不引入具体 Provider SDK 的情况下共享稳定结构时，应使用 Core。

| 领域 | 代表导出 | 用途 |
| --- | --- | --- |
| Spec | `defineSpecSchema`、`harnessedAgentSystemSpecDefinition` | 对齐 TypeScript、Zod 与 JSON Schema |
| Event | `createFrameworkEvent`、`EventStore` | 记录可审计、可重放的事实 |
| Runtime | `DurableEventRuntime`、Checkpoint/Message Schema | 协调 Event-first 执行 |
| Policy | `PolicyEngine`、`PolicyDecision` | 描述授权与风险决策 |
| Execution | `ExecutionPort`、`ExecutionStore`、Sandbox 契约 | 替换具体执行实现 |
| Artifact | `ArtifactStoreProvider`、`ArtifactManager` | 管理持久输出与血缘 |

业务工作流、Provider 密钥和 UI 状态不应进入 Core。

## 创建与查询 Event

```ts
import {
  InMemoryEventStore,
  createFrameworkEvent,
} from '@codesoul-co/hypha-core';

const events = new InMemoryEventStore();

await events.append(createFrameworkEvent({
  id: 'event-run-created-1',
  type: 'run.created',
  userId: 'owner',
  sessionId: 'session-1',
  runId: 'run-1',
  payload: { agentSystemId: 'system.research' },
}));

const runEvents = await events.list({
  userId: 'owner',
  sessionId: 'session-1',
  runId: 'run-1',
});
```

每个 Event 都必须包含 `userId`；Run Event 还应包含 `sessionId` 和 `runId`。Session/Run 是可重建投影，Event 才是事实来源。不要把密钥、无限长度模型输出或宿主路径写入 Event。

## 校验版本化 Spec

```ts
import { harnessedAgentSystemSpecDefinition } from '@codesoul-co/hypha-core';

const system = harnessedAgentSystemSpecDefinition.parse({
  ...harnessedAgentSystemSpecDefinition.example,
  id: 'system.publication',
  version: '1.0.0',
});

const jsonSchema = harnessedAgentSystemSpecDefinition.jsonSchema;
```

在应用边界解析不可信 JSON/YAML，内部代码再依赖通过校验的类型。

## 运行时不变量

- 所有 Port 都要保持用户、Session、Run、Invocation 与 Workspace 作用域。
- 先追加事实，再生成面向用户的投影。
- 多 Worker 竞争时使用 revision、lease 或 compare-and-set。
- Tool、MCP、Memory、文件和外部写入都经过 Policy 与 Trace Hook。
- Schema 变更使用 Upcaster/Migration，不能静默重解释旧 Event。

相关模块：[`hypha-storage`](./storage)、[`hypha-harness`](./harness)、[`hypha-testing`](./testing)。

