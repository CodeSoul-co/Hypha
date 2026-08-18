# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration-acceptance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-permanent-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)
- 导出数: **3**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory server permanent migration acceptance 模块公开 1 函数、2 接口。

### 从包入口导入

```ts
import {
  runPermanentMemoryBehaviorAcceptance,
} from '@codesoul-co/hypha-memory';

import type {
  PermanentMemoryBehaviorFinding,
  PermanentMemoryBehaviorReport,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runPermanentMemoryBehaviorAcceptance` | 函数 | <code>runPermanentMemoryBehaviorAcceptance(factory: PermanentMemoryMigrationHarnessFactory, fixtures?: readonly PermanentMemoryFailureFixture[]): Promise&lt;PermanentMemoryBehaviorReport&gt;</code> | Run Permanent Memory Behavior Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `PermanentMemoryBehaviorFinding` | 接口 | <code>interface PermanentMemoryBehaviorFinding</code> | Permanent Memory Behavior Finding 接口，共包含 3 个公开字段或方法。 |
| `PermanentMemoryBehaviorReport` | 接口 | <code>interface PermanentMemoryBehaviorReport</code> | Permanent Memory Behavior Report 接口，共包含 3 个公开字段或方法。 |

## `runPermanentMemoryBehaviorAcceptance`

Run Permanent Memory Behavior Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runPermanentMemoryBehaviorAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)

### 声明

```text
export declare function runPermanentMemoryBehaviorAcceptance(factory: PermanentMemoryMigrationHarnessFactory, fixtures?: readonly PermanentMemoryFailureFixture[]): Promise<PermanentMemoryBehaviorReport>;
```

### 调用签名

```text
runPermanentMemoryBehaviorAcceptance(factory: PermanentMemoryMigrationHarnessFactory, fixtures?: readonly PermanentMemoryFailureFixture[]): Promise<PermanentMemoryBehaviorReport>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `factory` | <code>PermanentMemoryMigrationHarnessFactory</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `fixtures` | <code>readonly PermanentMemoryFailureFixture[]</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<PermanentMemoryBehaviorReport>`
- 说明: 返回值契约由上述类型定义。

## `PermanentMemoryBehaviorFinding`

Permanent Memory Behavior Finding 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryBehaviorFinding } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)

### 声明

```text
export interface PermanentMemoryBehaviorFinding {
    fixtureId: string;
    code: string;
    message: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fixtureId` | 属性 | <code>fixtureId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PermanentMemoryBehaviorReport`

Permanent Memory Behavior Report 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryBehaviorReport } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)

### 声明

```text
export interface PermanentMemoryBehaviorReport {
    passed: boolean;
    cases: number;
    findings: PermanentMemoryBehaviorFinding[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cases` | 属性 | <code>cases: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `findings` | 属性 | <code>findings: PermanentMemoryBehaviorFinding[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `passed` | 属性 | <code>passed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
