# `@codesoul-co/hypha-harness`

`hypha-harness` 是 Kernel/FSM 外部的执行外壳，记录 Trace 证据、派生 Session/Run 视图、维护用户级队列、协调有界 FSM 步骤，并支持受治理人工迁移和长周期 Continuation。

```bash
npm install @codesoul-co/hypha-harness@1.0.1
```

## 公共入口

| 导出 | 用途 |
| --- | --- |
| `EventFirstRuntime` | 创建 Session/Run 并追加作用域 Event |
| `RunManager` | 协调 Run 生命周期与终态收敛 |
| `HarnessedReActFSMRunner` | 通过受保护 Harness FSM 执行 Kernel |
| `InMemoryTraceRecorder` | 测试/本地确定性 Trace |
| `SessionProjector` | 从 Event 派生 Session View |
| `UserScopedSessionQueue` | 用户/Session 内串行，不做全局阻塞 |
| `GovernedFSMTransitionService` | 授权且带 revision fence 的人工迁移 |
| `ReActQuantumExecutor` | 执行可恢复的长周期 ReAct Quantum |

## 记录并投影证据

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

Session 投影可以随时丢弃；崩溃、迁移或 Replay 后都应从 Event 重建。

## 生产执行路径

```text
请求/命令 → 用户级 Session Queue → Run Manager + Lease/Revision
→ Harness FSM → Kernel/Inference/Effect Port
→ Event + Receipt → Session/Run Projection
```

多进程部署要使用持久 Event、Queue、Lease 与 Checkpoint Store。默认单用户部署同样保留 `userId` 边界，避免 Web/CLI 竞争同一 Session。

人工调整应用 FSM 时使用 `GovernedFSMTransitionService`，要求 `runtime.fsm.transition` 权限、Owner 和预期 revision，并先记录迁移证据。长任务使用 Quantum/Continuation，重试前先协调不确定副作用。

