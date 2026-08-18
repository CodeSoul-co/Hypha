# `@codesoul-co/hypha-memory` / `context-builder`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/context-builder.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)
- 导出数: **4**

## 模块用法

用于使用该功能边界的公共契约与操作。Context builder 模块公开 4 类。

### 从包入口导入

```ts
import {
  CalibratedCharacterTokenEstimator,
  DefaultContextInjectionGateway,
  DefaultMemoryContextBuilder,
  MetadataContextItemPolicyEvaluator,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 4 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CalibratedCharacterTokenEstimator` | 类 | <code>new CalibratedCharacterTokenEstimator(charactersPerToken?: number): CalibratedCharacterTokenEstimator</code> | Calibrated Character Token Estimator 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultContextInjectionGateway` | 类 | <code>new DefaultContextInjectionGateway(now?: () =&gt; string, artifactStore?: ContextArtifactStore &#124; undefined): DefaultContextInjectionGateway</code> | Default Context Injection Gateway 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultMemoryContextBuilder` | 类 | <code>new DefaultMemoryContextBuilder(tokenizer?: TokenEstimator, now?: () =&gt; string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore &#124; undefined): DefaultMemoryContextBuilder</code> | Default Memory Context Builder 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MetadataContextItemPolicyEvaluator` | 类 | <code>new MetadataContextItemPolicyEvaluator(): MetadataContextItemPolicyEvaluator</code> | Metadata Context Item Policy Evaluator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |

## `CalibratedCharacterTokenEstimator`

Calibrated Character Token Estimator 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { CalibratedCharacterTokenEstimator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-builder`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)

### 声明

```text
export declare class CalibratedCharacterTokenEstimator implements TokenEstimator {
    readonly id = "tokenizer.calibrated-character-v1";
    constructor(charactersPerToken?: number);
    estimate(text: string): number;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(charactersPerToken?: number): CalibratedCharacterTokenEstimator</code> | 创建该类的实例。 |
| `estimate` | 方法 | <code>estimate(text: string): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: "tokenizer.calibrated-character-v1"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DefaultContextInjectionGateway`

Default Context Injection Gateway 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultContextInjectionGateway } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-builder`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)

### 声明

```text
export declare class DefaultContextInjectionGateway implements ContextInjectionGateway {
    constructor(now?: () => string, artifactStore?: ContextArtifactStore | undefined);
    buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise<ContextEnvelope>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `buildEnvelope` | 方法 | <code>buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise&lt;ContextEnvelope&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(now?: () =&gt; string, artifactStore?: ContextArtifactStore &#124; undefined): DefaultContextInjectionGateway</code> | 创建该类的实例。 |

## `DefaultMemoryContextBuilder`

Default Memory Context Builder 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultMemoryContextBuilder } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-builder`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)

### 声明

```text
export declare class DefaultMemoryContextBuilder implements MemoryContextBuilder {
    constructor(tokenizer?: TokenEstimator, now?: () => string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore | undefined);
    build(request: ContextBuildInput): Promise<ContextBundle>;
    explain(contextHash: string): Promise<ContextBuildExplanation | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ContextBuildInput): Promise&lt;ContextBundle&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(tokenizer?: TokenEstimator, now?: () =&gt; string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore &#124; undefined): DefaultMemoryContextBuilder</code> | 创建该类的实例。 |
| `explain` | 方法 | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MetadataContextItemPolicyEvaluator`

Metadata Context Item Policy Evaluator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MetadataContextItemPolicyEvaluator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-builder`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)

### 声明

```text
export declare class MetadataContextItemPolicyEvaluator implements ContextItemPolicyEvaluator {
    evaluate(input: ContextItemPolicyInput): Promise<{
            allowed: boolean;
            reason?: string;
        }>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): MetadataContextItemPolicyEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: ContextItemPolicyInput): Promise&lt;{ allowed: boolean; reason?: string; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
