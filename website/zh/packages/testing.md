# `@codesoul-co/hypha-testing`

`hypha-testing` 提供确定性 Replay、Regression、Evaluation 与 Mock Execution 工具，目标是证明 Event/State 行为，而不是只让测试写得更短。

```bash
npm install --save-dev @codesoul-co/hypha-testing@1.0.1
```

## 主要导出

| 导出 | 用途 |
| --- | --- |
| `GoldenTraceFixture` | 小型 Event/State Path Fixture |
| `assertEventTypes` / `assertStatePath` | 直接 Trace 断言 |
| `ReplayEngine` | Capture、Normalize、Project、Compare |
| Replay Fixture Store | 内存或文件 Fixture |
| `RegressionRunner` | 执行行为回归检查 |
| `DeterministicEvaluator` | 不依赖模型 Judge 的评估 |
| `MockExecutionProvider` | 编排执行成功、失败与取消 |

## 断言 FSM 路径

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

## 有效 Fixture 应记录

- 稳定输入和选中的 Spec/Profile 版本。
- 有作用域、按因果顺序排列的统一 Event。
- 应用 FSM 路径与终态。
- Tool/MCP/Memory/Execution Receipt 或统一故障。
- 确定性 Projection/Output 断言。
- 不可进入源码的敏感字段脱敏规则。

```text
捕获 Canonical Event → 归一化易变字段 → 重建 Projection/State Path
→ 比较 Sequence/Value → 运行 Regression → 报告差异
```

不能归一化掉 Scope、Revision、Operation Identity 或 Terminal Status。测试 Timeout、Cancellation、临时/永久故障、旧 Revision、重复 Idempotency Key 和 Dispatch 后崩溃，并同时断言返回值和 Event/Receipt。

