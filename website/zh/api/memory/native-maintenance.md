# `@codesoul-co/hypha-memory` / `native-maintenance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/native-maintenance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-maintenance.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DeterministicMemoryMaintenancePlanner` | 类 | <code>new DeterministicMemoryMaintenancePlanner(applyDecision?: MemoryMaintenanceApplier &#124; undefined, now?: () =&gt; string): DeterministicMemoryMaintenancePlanner</code> | Deterministic Memory Maintenance Planner 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryMaintenanceApplier` | 类型 | <code>type MemoryMaintenanceApplier = (request: MemoryMaintenanceApplyRequest) =&gt; Promise&lt;ManagedMemoryWriteResult&gt;</code> | Memory Maintenance Applier 的公共类型别名。 |

## `DeterministicMemoryMaintenancePlanner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apply` | 方法 | <code>apply(request: MemoryMaintenanceApplyRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 应用 apply。 |
| `constructor` | 构造函数 | <code>(applyDecision?: MemoryMaintenanceApplier &#124; undefined, now?: () =&gt; string): DeterministicMemoryMaintenancePlanner</code> | 创建该类的实例。 |
| `explain` | 方法 | <code>explain(decisionId: string): Promise&lt;MemoryMaintenanceDecision &#124; null&gt;</code> | explain 的公开运行时操作。 |
| `plan` | 方法 | <code>plan(request: MemoryMaintenancePlanRequest): Promise&lt;MemoryMaintenanceDecision&gt;</code> | 规划 plan。 |
