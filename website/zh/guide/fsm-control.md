# 控制 FSM

可以。你可以定义和调整**应用拥有的 FSM** 的节点、边、Guard、Retry 与 Timeout；Hypha 会有意保护另一套 ReAct Harness FSM。

## 定义拓扑

```ts
import {
  analyzeFSMTopology, applyTransition,
  createInitialSnapshot, parseFSMProcessSpec,
} from '@codesoul-co/hypha-fsm';

const process = parseFSMProcessSpec({
  id: 'workflow.publication', version: '1.0.0',
  name: 'Publication workflow', initialState: 'Draft',
  terminalStates: ['Published', 'Rejected'],
  states: [
    { id: 'Draft', kind: 'domain' },
    { id: 'TechnicalReview', kind: 'domain', retryPolicy: { maxAttempts: 2 } },
    { id: 'Published', kind: 'completed' },
    { id: 'Rejected', kind: 'failed' },
  ],
  transitions: [
    { from: 'Draft', to: 'TechnicalReview' },
    { from: 'TechnicalReview', to: 'Published', guard: 'review.approved' },
    { from: 'TechnicalReview', to: 'Rejected', guard: 'review.rejected' },
  ],
});
const analysis = analyzeFSMTopology(process);
if (analysis.unreachableStates.length > 0) {
  throw new Error(`Unreachable: ${analysis.unreachableStates.join(', ')}`);
}
let snapshot = createInitialSnapshot(process, 'run-publication-1');
snapshot = applyTransition(process, snapshot, 'TechnicalReview');
```

## 从 Domain Pack 生成

Release 示例把选中的 `WorkflowSpec` 映射为独立 Process：

```ts
function buildApplicationWorkflowFSM(workflow: WorkflowSpec) {
  return parseFSMProcessSpec({
    id: workflow.id, version: workflow.version, name: workflow.name,
    initialState: workflow.initialState,
    terminalStates: workflow.terminalStates,
    states: workflow.states.map((state) => ({
      id: state.id,
      kind: workflow.terminalStates.includes(state.id) ? 'completed' : 'domain',
      retryPolicy: state.retryPolicy,
      timeoutPolicy: state.timeoutPolicy,
      policyRefs: state.policyRefs,
    })),
    transitions: workflow.transitions.map(({ from, to, guard, description }) => ({
      from, to, guard, description,
    })),
  });
}
```

## 可以调整什么

| 区域 | 应用 FSM | Harness ReAct FSM |
| --- | --- | --- |
| 节点名称与产品状态 | 可以 | 不可以 |
| 允许的边 | 可以 | 不可以 |
| Guard 与 Policy 引用 | 可以 | 绑定 Policy，但不能绕过生命周期 |
| Retry/Timeout 声明 | 可以 | 使用 Harness 支持的 Spec 配置 |
| 终态 | 可以 | 保留 Framework 终态语义 |
| 直接修改当前 State | 不可以 | 不可以 |

## Runtime 并发

真实 Server Run 中，不要让多个 Client 各自应用迁移。先读取当前 Revision，再携带 Owner/Revision 证据提交 Target Transition。Runtime 使用 Revision/Fencing 拒绝过期迁移，并把成功迁移记录为 Event。

## 必须保留的测试

1. 非法 Node/Edge 无法通过解析。
2. 不存在意外的不可达节点或死路。
3. Guard 拒绝时 State/Revision 不前进。
4. 每条成功迁移都有预期证据。
5. Replay 得到相同最终 Snapshot。

参考可运行的 [`run-fsm.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/examples/release-agent/src/run-fsm.ts)。
