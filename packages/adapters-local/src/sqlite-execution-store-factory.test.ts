import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { ExecutionStoreRegistry, executionRecordCreateRequestExample } from '@hypha/core';
import { afterEach, describe, expect, it } from 'vitest';
import {
  SQLITE_EXECUTION_STORE_ID,
  SQLiteExecutionStoreFactory,
} from './sqlite-execution-store-factory';

describe('SQLiteExecutionStoreFactory', () => {
  let root: string | undefined;

  afterEach(async () => {
    if (root) await fs.rm(root, { recursive: true, force: true });
    root = undefined;
  });

  it('creates a validated durable store through the Core registry', async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-sqlite-execution-factory-'));
    const registry = new ExecutionStoreRegistry();
    registry.register(new SQLiteExecutionStoreFactory({ rootPath: root }));

    const store = await registry.create(SQLITE_EXECUTION_STORE_ID);
    const created = await store.create(structuredClone(executionRecordCreateRequestExample));
    await store.close?.();

    const reopened = await registry.create(SQLITE_EXECUTION_STORE_ID);
    await expect(reopened.get(created.id)).resolves.toEqual(created);
    await reopened.close?.();
  });
});
