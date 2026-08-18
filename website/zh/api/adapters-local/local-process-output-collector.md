# `@codesoul-co/hypha-adapters-local` / `local-process-output-collector`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-output-collector.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalProcessOutputCollector` | 类 | <code>new LocalProcessOutputCollector(limits: LocalProcessOutputLimits): LocalProcessOutputCollector</code> | Collects bounded process output while accounting against raw bytes, not string length. |
| `LocalProcessOutputAppendResult` | 接口 | <code>interface LocalProcessOutputAppendResult</code> | Local Process Output Append Result 的字段契约；完整字段见下表。 |
| `LocalProcessOutputLimits` | 接口 | <code>interface LocalProcessOutputLimits</code> | Local Process Output Limits 的字段契约；完整字段见下表。 |
| `LocalProcessOutputSnapshot` | 接口 | <code>interface LocalProcessOutputSnapshot</code> | Local Process Output Snapshot 的字段契约；完整字段见下表。 |
| `LocalProcessOutputStream` | 类型 | <code>type LocalProcessOutputStream = 'stdout' &#124; 'stderr'</code> | Local Process Output Stream 的公共类型别名。 |

## `LocalProcessOutputCollector` 公开成员

Collects bounded process output while accounting against raw bytes, not string length.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append(stream: LocalProcessOutputStream, chunk: Buffer): LocalProcessOutputAppendResult</code> | 追加 append。 |
| `constructor` | 构造函数 | <code>(limits: LocalProcessOutputLimits): LocalProcessOutputCollector</code> | 创建该类的实例。 |
| `snapshot` | 方法 | <code>snapshot(): LocalProcessOutputSnapshot</code> | snapshot 的公开运行时操作。 |

## `LocalProcessOutputAppendResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `limitExceeded` | 属性 | <code>limitExceeded: LocalProcessOutputStream &#124; "combined"</code> | limit Exceeded 字段。 |

## `LocalProcessOutputLimits` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCombinedOutputBytes` | 属性 | <code>maxCombinedOutputBytes: number</code> | max Combined Output Bytes 字段。 |
| `maxStderrBytes` | 属性 | <code>maxStderrBytes: number</code> | max Stderr Bytes 字段。 |
| `maxStdoutBytes` | 属性 | <code>maxStdoutBytes: number</code> | max Stdout Bytes 字段。 |

## `LocalProcessOutputSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capturedStderrBytes` | 属性 | <code>capturedStderrBytes: number</code> | captured Stderr Bytes 字段。 |
| `capturedStdoutBytes` | 属性 | <code>capturedStdoutBytes: number</code> | captured Stdout Bytes 字段。 |
| `observedStderrBytes` | 属性 | <code>observedStderrBytes: number</code> | observed Stderr Bytes 字段。 |
| `observedStdoutBytes` | 属性 | <code>observedStdoutBytes: number</code> | observed Stdout Bytes 字段。 |
| `stderr` | 属性 | <code>stderr: string</code> | stderr 字段。 |
| `stdout` | 属性 | <code>stdout: string</code> | stdout 字段。 |
