# 系统架构

Hypha 是面向 Harness 的 Event-first ReAct + FSM 框架。核心规则是：产品定义编译为 Framework 契约；所有运行时副作用经过治理边界；Event 保留实际发生的事实。

## 运行模型

| 概念 | 含义 | 不负责 |
| --- | --- | --- |
| Domain Pack | 产品定义与默认值 | 直接执行 Provider |
| Agent | ReAct 行为、Prompt、Skill 与 Model Alias | 持久化业务状态 |
| FSM Process | 允许的节点、边与 Guard | 隐藏推理循环 |
| Session | 长期产品/上下文引用 | 权威运行状态 |
| Run | Session 下的一次执行 | 跨用户共享 Owner |
| Event | 不可变运行证据/事实来源 | 可变 UI State |

```text
Command → Run → Harness FSM / Custom FSM
              ↓
        Policy → Effect → Receipt
              ↓
             Event Stream
              ↓
     Session View · Replay · Evaluation
```

## ReAct 与应用 Workflow

Hypha 有两个彼此相关但独立的层次：

1. **Framework 拥有的 Harness FSM**控制 Reasoning、Acting、Observation、Verification、Recovery、Review 与终态迁移。
2. **应用拥有的 FSM**可以表达 Draft → Review → Approved 等产品状态。

修改产品节点不能删除受保护的 ReAct 生命周期。因此 Domain Compiler 会分别返回 Harness Process 与选中的 Workflow。

## 副作用与能力

Tool、MCP、Memory Write、File Write 与 External Write 都是副作用，生产路径应包含：

```text
Validated Request
  → Scope + Policy Check
  → Timeout/Cancellation
  → Concrete Adapter
  → Redacted Result/Receipt
  → Trace + Event
```

## Provider Neutrality

Core、FSM、Domain 与 Kernel 契约不导入 Provider SDK，也不硬编码模型。应用启动时在 Models、Inference、Storage、Memory、Tool 或 MCP 接口后注册 Adapter。

因此可以 Local-first：先使用确定性 Mock 与本地 Adapter，之后不修改 Domain Pack 契约即可替换基础设施。

## 默认部署方式

默认是单 Owner 部署，但 Runtime Identifier 与持久化仍保留 `userId` 边界和每用户 Session Queue，避免 Web、CLI 与未来客户端争用共享 Session State，并保留多用户演进路径。
