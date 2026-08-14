# `@codesoul-co/hypha-fsm`

`hypha-fsm` 用于校验有限状态机拓扑、生成不可变 Snapshot、执行已声明的 Transition，并在运行前报告结构问题。它同时支持 Framework 自有的 ReAct Harness FSM 与独立的应用工作流 FSM。

```bash
npm install @codesoul-co/hypha-fsm@1.0.1
```

## 核心模型

| 类型 | 关键字段 |
| --- | --- |
| `FSMProcessSpec` | 初始状态、节点、边、终态与恢复策略 |
| `FSMStateSpec` | `id`、类型、进出动作、超时/重试/人工审核策略 |
| `FSMTransitionSpec` | `from`、`to`、可选 Guard 与 Trace 元数据 |
| `FSMSnapshot` | 当前状态、路径、终态状态与恢复信息 |
| `FSMTopologyAnalysis` | 可达、不可达、死端和环路节点 |

## 定义并分析拓扑

```ts
import {
  analyzeFSMTopology,
  parseFSMProcessSpec,
} from '@codesoul-co/hypha-fsm';

const process = parseFSMProcessSpec({
  id: 'workflow.publication',
  version: '1.0.0',
  name: 'Publication workflow',
  initialState: 'Draft',
  terminalStates: ['Published', 'Rejected'],
  states: [
    { id: 'Draft', kind: 'domain' },
    { id: 'Review', kind: 'domain', retryPolicy: { maxAttempts: 2 } },
    { id: 'Published', kind: 'completed' },
    { id: 'Rejected', kind: 'failed' },
  ],
  transitions: [
    { from: 'Draft', to: 'Review' },
    { from: 'Review', to: 'Published', guard: 'review.approved' },
    { from: 'Review', to: 'Rejected', guard: 'review.rejected' },
  ],
});

const analysis = analyzeFSMTopology(process);
```

## 状态迁移

```ts
import { applyTransition, createInitialSnapshot } from '@codesoul-co/hypha-fsm';

let snapshot = createInitialSnapshot(process, 'run-1');
snapshot = applyTransition(process, snapshot, 'Review');
snapshot = applyTransition(process, snapshot, 'Published', {
  guardEvaluator: (guard) => guard === 'review.approved',
});
```

`applyTransition` 会检查边、Guard 与目标是否合法，并返回新 Snapshot；不要允许客户端直接修改 `currentState`。

## 人工控制与两套 FSM

在线 Runtime 中使用 [`hypha-harness`](./harness) 的 `GovernedFSMTransitionService`，提交预期 revision、Owner 与权限证据，防止旧客户端覆盖新状态。Domain Pack 可定义应用 FSM 的节点、边和策略，但不能修改受保护的 Harness FSM。详见[控制 FSM](/zh/guide/fsm-control)。

测试应覆盖不可达/死端、Guard 正反例、重试/超时/人工审核、并发 revision 以及 Event 重放后的同一路径。
