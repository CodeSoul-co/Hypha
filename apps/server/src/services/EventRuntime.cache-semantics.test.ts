import fs from 'fs';
import os from 'os';
import path from 'path';
import type { FrameworkEvent } from '@hypha/core';
import type { ChatResponse } from '../core/llm/types';
import { getLLMManager } from '../core/llm/LLMFactory';
import { getEventRuntime } from './EventRuntime';

describe('EventRuntime inference cache semantics', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-event-runtime-cache-semantics-'));
  process.env.HYPHA_RUNTIME_EVENT_DB = path.join(root, 'legacy.sqlite');
  process.env.HYPHA_CANONICAL_RUNTIME_DB = path.join(root, 'canonical.sqlite');
  process.env.HYPHA_TOOL_RUNTIME_STORE = path.join(root, 'tools.json');
  process.env.HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT = path.join(root, 'tool-snapshots');
  process.env.HYPHA_TOOL_ARTIFACT_ROOT = path.join(root, 'tool-artifacts');
  process.env.HYPHA_TOOL_OBSERVATION_ROOT = path.join(root, 'tool-observations');
  process.env.HYPHA_SESSION_COMMAND_ARTIFACT_ROOT = path.join(root, 'session-command-artifacts');
  process.env.HYPHA_SERVING_CACHE = 'off';

  const llmManager = getLLMManager();
  const kvCacheValue = { providerCursor: 'cursor.cache-semantics' };
  const chatSpy = jest.spyOn(llmManager, 'chat').mockImplementation(async (_messages, options) => {
    return {
      id: 'response.cache-semantics',
      model: options?.model ?? 'claude-3-5-sonnet-20241022',
      provider: 'anthropic',
      content: 'deterministic response',
      role: 'assistant',
      finishReason: 'stop',
      usage: {
        inputTokens: 12,
        outputTokens: 4,
        totalTokens: 16,
      },
      kvCache: kvCacheValue,
    } as ChatResponse;
  });
  const runtime = getEventRuntime();

  beforeAll(async () => {
    await runtime.initializeCanonicalRuntime({
      filename: process.env.HYPHA_CANONICAL_RUNTIME_DB,
    });
  });

  afterAll(async () => {
    chatSpy.mockRestore();
    await runtime.close();
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('preserves authoritative Run semantics when inference caching changes execution metadata', async () => {
    chatSpy.mockClear();
    const cacheDisabled = await executeScenario('disabled', false);
    const cacheEnabled = await executeScenario('enabled', true);

    expect(cacheEnabled.authoritativeEvents).toEqual(cacheDisabled.authoritativeEvents);
    expect(cacheEnabled.statePath).toEqual(cacheDisabled.statePath);
    expect(cacheEnabled.statePath).toEqual([
      'RunInitialized',
      'ContextBuilt',
      'Reasoning',
      'ActionSelected',
      'PolicyChecked',
      'Acting',
      'ObservationRecorded',
      'Verifying',
      'MemorySync',
      'Completed',
    ]);
    expect(cacheEnabled.run).toMatchObject({
      status: 'completed',
      output: { answer: 'deterministic response' },
    });
    expect(cacheDisabled.run).toMatchObject({
      status: 'completed',
      output: { answer: 'deterministic response' },
    });

    expect(chatSpy).toHaveBeenCalledTimes(4);
    expect(chatSpy.mock.calls[0]?.[1]?.cache).toBeUndefined();
    expect(chatSpy.mock.calls[1]?.[1]?.cache).toBeUndefined();
    expect(chatSpy.mock.calls[2]?.[1]?.cache).toMatchObject({
      kvCacheRef: expect.objectContaining({ scope: 'session' }),
    });
    expect(chatSpy.mock.calls[2]?.[1]?.cache?.kvCacheValue).toBeUndefined();
    expect(chatSpy.mock.calls[3]?.[1]?.cache).toMatchObject({
      kvCacheValue,
      kvCacheRef: expect.objectContaining({ scope: 'session' }),
    });
  });

  async function executeScenario(label: string, cache: boolean) {
    const userId = `user.cache-semantics.${label}`;
    const sessionId = `session.cache-semantics.${label}`;
    const modelAlias = 'claude-3-5-sonnet-20241022';
    const run = await runtime.startRun({
      userId,
      sessionId,
      input: { task: 'verify cache-independent Runtime semantics' },
    });
    await runtime.transition(run.runId, 'ContextBuilt');
    await runtime.transition(run.runId, 'Reasoning');

    const cachePolicy = cache
      ? runtime.resolveChatCachePolicy({
          userId,
          sessionId,
          runId: run.runId,
          modelAlias,
          provider: runtime.resolveChatModel(modelAlias).provider,
          cache: true,
        })
      : undefined;
    for (const stepId of ['reasoning.1', 'reasoning.2']) {
      await runtime.inferChat({
        runId: run.runId,
        stepId,
        modelAlias,
        messages: [{ role: 'user', content: 'produce the deterministic response' }],
        cachePolicy,
      });
    }

    for (const state of [
      'ActionSelected',
      'PolicyChecked',
      'Acting',
      'ObservationRecorded',
      'Verifying',
      'MemorySync',
    ]) {
      await runtime.transition(run.runId, state);
    }
    await runtime.completeRun(run.runId, { answer: 'deterministic response' });

    const events = await runtime.listEvents(run.runId);
    return {
      authoritativeEvents: events.filter(isAuthoritativeEvent).map(authoritativeEvent),
      statePath: events
        .filter((event) => event.type === 'fsm.state.entered')
        .map((event) => String(record(event.payload).stateId)),
      run: await runtime.projectRun(run.runId),
    };
  }
});

function isAuthoritativeEvent(event: FrameworkEvent): boolean {
  return (
    event.type.startsWith('run.') ||
    event.type.startsWith('fsm.') ||
    event.type.startsWith('runtime.activity.') ||
    event.type.startsWith('human.')
  );
}

function authoritativeEvent(event: FrameworkEvent): Record<string, unknown> {
  const payload = record(event.payload);
  return {
    type: event.type,
    fsmState: event.fsmState,
    stateId: payload.stateId,
    from: payload.from,
    to: payload.to,
    terminalState: payload.terminalState,
  };
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
