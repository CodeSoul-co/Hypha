import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { ExecutionStore } from '@hypha/core';
import { executionRecordCreateRequestExample } from '@hypha/core';
import { afterEach, describe, expect, it } from 'vitest';
import { SQLiteExecutionStore } from './sqlite-execution-store';

describe('SQLiteExecutionStore public adapter', () => {
  let root: string | undefined;

  afterEach(async () => {
    if (root) await fs.rm(root, { recursive: true, force: true });
    root = undefined;
  });

  it('implements the public ExecutionStore contract across restart', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-store-'));
    const store: ExecutionStore = new SQLiteExecutionStore({ rootPath: root });
    const created = await store.create(structuredClone(executionRecordCreateRequestExample));
    await store.close?.();

    const reopened: ExecutionStore = new SQLiteExecutionStore({ rootPath: root });
    await expect(reopened.get(created.id)).resolves.toEqual(created);
    await reopened.close?.();
  });
});
