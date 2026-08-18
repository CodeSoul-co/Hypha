# `@codesoul-co/hypha-adapters-local` / `local-process-output-collector`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-process-output-collector.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-collector.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessOutputCollector` | class | <code>new LocalProcessOutputCollector(limits: LocalProcessOutputLimits): LocalProcessOutputCollector</code> | Collects bounded process output while accounting against raw bytes, not string length. |
| `LocalProcessOutputAppendResult` | interface | <code>interface LocalProcessOutputAppendResult</code> | Field contract for Local Process Output Append Result; see all contract members below. |
| `LocalProcessOutputLimits` | interface | <code>interface LocalProcessOutputLimits</code> | Field contract for Local Process Output Limits; see all contract members below. |
| `LocalProcessOutputSnapshot` | interface | <code>interface LocalProcessOutputSnapshot</code> | Field contract for Local Process Output Snapshot; see all contract members below. |
| `LocalProcessOutputStream` | type | <code>type LocalProcessOutputStream = 'stdout' &#124; 'stderr'</code> | Public type alias for Local Process Output Stream. |

## `LocalProcessOutputCollector` public members

Collects bounded process output while accounting against raw bytes, not string length.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(stream: LocalProcessOutputStream, chunk: Buffer): LocalProcessOutputAppendResult</code> | Appends append at this module boundary. |
| `constructor` | constructor | <code>(limits: LocalProcessOutputLimits): LocalProcessOutputCollector</code> | Creates an instance of this class. |
| `snapshot` | method | <code>snapshot(): LocalProcessOutputSnapshot</code> | Public runtime operation for snapshot. |

## `LocalProcessOutputAppendResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limitExceeded` | property | <code>limitExceeded: LocalProcessOutputStream &#124; "combined"</code> | Public limit Exceeded property. |

## `LocalProcessOutputLimits` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCombinedOutputBytes` | property | <code>maxCombinedOutputBytes: number</code> | Public max Combined Output Bytes property. |
| `maxStderrBytes` | property | <code>maxStderrBytes: number</code> | Public max Stderr Bytes property. |
| `maxStdoutBytes` | property | <code>maxStdoutBytes: number</code> | Public max Stdout Bytes property. |

## `LocalProcessOutputSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capturedStderrBytes` | property | <code>capturedStderrBytes: number</code> | Public captured Stderr Bytes property. |
| `capturedStdoutBytes` | property | <code>capturedStdoutBytes: number</code> | Public captured Stdout Bytes property. |
| `observedStderrBytes` | property | <code>observedStderrBytes: number</code> | Public observed Stderr Bytes property. |
| `observedStdoutBytes` | property | <code>observedStdoutBytes: number</code> | Public observed Stdout Bytes property. |
| `stderr` | property | <code>stderr: string</code> | Public stderr property. |
| `stdout` | property | <code>stdout: string</code> | Public stdout property. |
