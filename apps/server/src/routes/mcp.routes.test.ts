import express from 'express';
import request from 'supertest';
import { generateToken } from '../middleware/auth';
import { getToolManager } from '../core/tools/ToolManager';
import { getEventRuntime } from '../services/EventRuntime';
import mcpRoutes from './mcp.routes';

jest.mock('../core/tools/ToolManager', () => ({ getToolManager: jest.fn() }));
jest.mock('../services/EventRuntime', () => ({ getEventRuntime: jest.fn() }));

describe('MCP context owned-Run boundary', () => {
  const ownerId = 'mcp-owner';
  const scope = {
    runId: 'run-owned',
    userId: ownerId,
    sessionId: 'runtime-session',
    clientSessionId: 'client-session',
    domainPackId: 'domain-a',
  };
  const runtime = { requireOwnedRunScope: jest.fn() };
  const tools = {
    listMCPClients: jest.fn(() => []),
    listMCPCapabilities: jest.fn(async () => []),
    listMCPDrifts: jest.fn(async () => []),
    listMCPContextCapabilities: jest.fn(async () => []),
    readMCPResource: jest.fn(async () => ({
      mimeType: 'application/json',
      token: 'secret-token',
      text: 'Authorization: Bearer abc.def.ghi',
    })),
    renderMCPPrompt: jest.fn(async () => ({ mimeType: 'text/plain', text: 'safe' })),
  };
  const app = express();
  app.use(express.json());
  app.use('/mcp', mcpRoutes);
  const ownerToken = generateToken({ id: ownerId, email: 'owner@example.test', isAdmin: false });
  const foreignToken = generateToken({
    id: 'mcp-foreign',
    email: 'foreign@example.test',
    isAdmin: false,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getEventRuntime as jest.Mock).mockReturnValue(runtime);
    (getToolManager as jest.Mock).mockReturnValue(tools);
    runtime.requireOwnedRunScope.mockImplementation(async (runId: string, userId: string) => {
      if (runId !== scope.runId || userId !== ownerId) throw new Error('not found');
      return scope;
    });
  });

  it('rejects missing and foreign run ids before the MCP gateway', async () => {
    await request(app)
      .post('/mcp/servers/server-a/resources/read')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ uri: 'file:///safe.txt' })
      .expect(400);
    await request(app)
      .post('/mcp/servers/server-a/resources/read')
      .set('Authorization', `Bearer ${foreignToken}`)
      .send({ runId: scope.runId, uri: 'file:///safe.txt' })
      .expect(404);
    expect(tools.readMCPResource).not.toHaveBeenCalled();
  });

  it('passes the durable owner scope and redacts MCP context output', async () => {
    const response = await request(app)
      .post('/mcp/servers/server-a/resources/read')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ runId: scope.runId, uri: 'file:///safe.txt' })
      .expect(200);

    expect(tools.readMCPResource).toHaveBeenCalledWith(
      'server-a',
      'file:///safe.txt',
      scope.runId,
      scope
    );
    expect(response.body.data).toEqual({
      mimeType: 'application/json',
      token: '[REDACTED]',
      text: 'Authorization: Bearer [REDACTED]',
    });
  });
});
