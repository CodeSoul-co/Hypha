import { describe, expect, it } from 'vitest';
import {
  HttpLocalInferenceDriver,
  LocalInferenceDriverRegistry,
  type LocalInferenceProcessHandle,
  type LocalInferenceProcessSpec,
  type LocalInferenceProcessSupervisor,
} from './drivers';

describe('@hypha/inference local engine drivers', () => {
  it('creates provider-neutral backends for Ollama, SGLang, and vLLM', () => {
    const drivers = [
      new HttpLocalInferenceDriver({ kind: 'ollama', model: 'qwen3:8b' }),
      new HttpLocalInferenceDriver({ kind: 'sglang', model: 'Qwen/Qwen3-8B' }),
      new HttpLocalInferenceDriver({ kind: 'vllm', model: 'Qwen/Qwen3-8B' }),
    ];

    expect(drivers.map((driver) => driver.backend().kind)).toEqual(['ollama', 'sglang', 'vllm']);
    expect(drivers.map((driver) => driver.status().mode)).toEqual([
      'connect',
      'connect',
      'connect',
    ]);
  });

  it('registers local drivers independently from inference algorithms', () => {
    const registry = new LocalInferenceDriverRegistry();
    const driver = new HttpLocalInferenceDriver({
      id: 'local-vllm-qwen',
      kind: 'vllm',
      baseUrl: 'http://127.0.0.1:8000',
      model: 'Qwen/Qwen3-8B',
    });
    registry.register(driver);

    expect(registry.require('local-vllm-qwen').backend().id).toBe('local-vllm-qwen');
    expect(registry.list()).toHaveLength(1);
  });

  it('keeps managed process creation behind an injectable supervisor', async () => {
    const specs: LocalInferenceProcessSpec[] = [];
    const handle: LocalInferenceProcessHandle = {
      pid: 1234,
      exited: new Promise(() => undefined),
      stop: async () => undefined,
    };
    const supervisor: LocalInferenceProcessSupervisor = {
      async start(spec) {
        specs.push(spec);
        return handle;
      },
    };
    const driver = new HttpLocalInferenceDriver(
      {
        id: 'managed-vllm',
        kind: 'vllm',
        mode: 'managed',
        model: 'Qwen/Qwen3-8B',
        startupTimeoutMs: 1,
        healthPollMs: 1,
      },
      supervisor,
      async () => false
    );

    await expect(driver.start()).rejects.toThrow('did not become healthy');
    expect(specs[0]).toMatchObject({
      command: 'vllm',
      args: ['serve', 'Qwen/Qwen3-8B', '--host', '127.0.0.1', '--port', '8000'],
    });
  });

  it('does not adopt an unrelated healthy service in managed mode', async () => {
    let starts = 0;
    const supervisor: LocalInferenceProcessSupervisor = {
      async start() {
        starts += 1;
        throw new Error('must not start when the endpoint is occupied');
      },
    };
    const driver = new HttpLocalInferenceDriver(
      {
        id: 'managed-collision',
        kind: 'vllm',
        mode: 'managed',
        baseUrl: 'http://127.0.0.1:8000',
      },
      supervisor,
      async () => true
    );

    await expect(driver.start()).rejects.toThrow(/already occupied by a healthy service/);
    expect(starts).toBe(0);
    expect(driver.status()).toMatchObject({ state: 'failed', healthy: false });
  });
});
