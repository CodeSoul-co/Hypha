import path from 'path';
import { describe, expect, it } from 'vitest';
import { MCPConnectionManager, SDKMCPConnectionSessionFactory } from './connection-manager';

describe('shipped MCP product example', () => {
  it('starts the non-fixture stdio server with a pinned protocol revision', async () => {
    const manager = new MCPConnectionManager({
      sessionFactory: new SDKMCPConnectionSessionFactory(),
    });
    manager.register({
      id: 'local-example',
      mode: 'local',
      transport: {
        type: 'stdio',
        command: process.execPath,
        args: [path.resolve(process.cwd(), 'examples/mcp/local-stdio-server.cjs')],
        stderrMode: 'capture',
      },
      protocolVersionPolicy: {
        allowedVersions: ['2025-11-25'],
        rejectUnknown: true,
      },
      initializationTimeoutMs: 10_000,
      requestTimeoutMs: 5_000,
      shutdownTimeoutMs: 5_000,
      singleStart: true,
    });

    try {
      await expect(manager.connect('local-example')).resolves.toMatchObject({
        state: 'ready',
        negotiatedProtocolVersion: '2025-11-25',
      });
      await expect(
        manager.call({
          serverId: 'local-example',
          capabilityId: 'hash_reference',
          input: { value: 'Hypha' },
          context: {
            runId: 'run_product_example',
            stepId: 'hash',
            invocationId: 'hash_product_example',
          },
        })
      ).resolves.toMatchObject({
        structuredContent: {
          algorithm: 'sha256',
          digest: 'bf888b09bb47fe6f1fc0c843c0d68cb413f94c8903bb289f7f5e19cd8650ddec',
        },
      });
    } finally {
      await manager.closeAll();
    }
  });
});
