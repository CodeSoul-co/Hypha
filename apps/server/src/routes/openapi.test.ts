import routes from './index';
import { getOpenApiDocument } from './openapi';

describe('generated OpenAPI route inventory', () => {
  it('includes framework runtime and governed capability routes omitted by the legacy docs list', () => {
    void routes;
    const document = getOpenApiDocument();

    expect(document.openapi).toBe('3.1.0');
    expect(document.paths['/runtime/sessions/{sessionId}/commands/start-run']?.post).toBeDefined();
    expect(
      document.paths['/runtime/runs/{runId}/human-tasks/{taskId}/decision']?.post
    ).toBeDefined();
    expect(document.paths['/runtime/runs/{runId}/fsm']?.get).toBeDefined();
    expect(document.paths['/runtime/runs/{runId}/fsm/transitions']?.post).toBeDefined();
    expect(document.paths['/mcp/servers/{serverId}/resources/read']?.post).toBeDefined();
    expect(document.paths['/memory/admin/migrations/{migrationId}/reconcile']?.post).toBeDefined();
    expect(document.paths['/openapi.json']?.get).toBeDefined();
  });

  it('derives every operation from the mounted Express route registry', () => {
    const operations = Object.values(getOpenApiDocument().paths).flatMap((pathItem) =>
      Object.values(pathItem)
    ) as Array<Record<string, unknown>>;

    expect(operations.length).toBeGreaterThan(60);
    expect(
      operations.every((operation) => operation['x-hypha-source'] === 'express-route-registry')
    ).toBe(true);
  });

  it('publishes concrete contracts for the release example entry points', () => {
    const document = getOpenApiDocument();
    const startRun = document.paths['/runtime/sessions/{sessionId}/commands/start-run']
      ?.post as Record<string, any>;
    const installSkill = document.paths['/skills/install']?.post as Record<string, any>;
    const registerPrompt = document.paths['/runtime/agent-prompts']?.post as Record<string, any>;
    const manualTransition = document.paths['/runtime/runs/{runId}/fsm/transitions']
      ?.post as Record<string, any>;

    expect(startRun.parameters).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Idempotency-Key', required: true })])
    );
    expect(startRun.responses['202']).toBeDefined();
    expect(
      startRun.requestBody.content['application/json'].schema.properties.workflowRef.required
    ).toEqual(['id']);
    expect(installSkill.requestBody.content['application/json'].schema.required).toEqual([
      'source',
    ]);
    expect(registerPrompt.responses['201']).toBeDefined();
    expect(registerPrompt.requestBody.content['application/json'].schema.required).toEqual([
      'id',
      'version',
      'name',
      'role',
      'template',
    ]);
    expect(manualTransition.parameters).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Idempotency-Key', required: true })])
    );
    expect(manualTransition.requestBody.content['application/json'].schema.required).toEqual([
      'processId',
      'processVersion',
      'expectedState',
      'expectedRunRevision',
      'targetState',
      'reason',
    ]);
  });
});
