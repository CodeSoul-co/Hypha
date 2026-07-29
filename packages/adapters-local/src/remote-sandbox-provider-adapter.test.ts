import {
  commandExecutionRequestExample,
  commandExecutionResultExample,
  commandOutputChunkExample,
  remoteArtifactChunkExample,
  remoteArtifactDownloadRequestExample,
  remoteArtifactTransferReceiptExample,
  remoteArtifactUploadRequestExample,
  remoteOutputStreamRequestExample,
  remoteSandboxProviderCapabilitiesExample,
  sandboxCreateRequestExample,
  sandboxRecordExample,
} from '@hypha/core';
import { describe, expect, it, vi } from 'vitest';
import {
  RemoteSandboxProviderAdapter,
  type RemoteSandboxTransport,
} from './remote-sandbox-provider-adapter';

const providerId = 'provider.remote.test';

describe('RemoteSandboxProviderAdapter', () => {
  it('validates capabilities and Sandbox identity at the remote boundary', async () => {
    const transport = createTransport();
    const provider = new RemoteSandboxProviderAdapter({ id: providerId, transport });
    const createRequest = {
      ...sandboxCreateRequestExample,
      environment: {
        ...sandboxCreateRequestExample.environment,
        provider: 'remote_sandbox' as const,
        providerRef: providerId,
      },
    };

    await expect(provider.capabilities()).resolves.toMatchObject({ remoteExecution: true });
    await expect(provider.create(createRequest)).resolves.toMatchObject({
      providerId,
      userId: createRequest.userId,
      workspaceId: createRequest.workspaceId,
      runId: createRequest.runId,
    });
    expect(transport.create).toHaveBeenCalledWith(createRequest);

    transport.create.mockResolvedValueOnce({ ...remoteRecord(createRequest), providerId: 'wrong' });
    await expect(provider.create(createRequest)).rejects.toMatchObject({
      normalizedError: {
        code: 'EXECUTION_INTERNAL_ERROR',
        retryable: false,
        details: { phase: 'create', evidenceCode: 'REMOTE_PROVIDER_RESPONSE_INVALID' },
      },
    });

    transport.capabilities.mockResolvedValueOnce({
      ...remoteSandboxProviderCapabilitiesExample,
      remoteExecution: false,
    });
    await expect(provider.capabilities()).rejects.toMatchObject({
      normalizedError: {
        code: 'EXECUTION_INTERNAL_ERROR',
        details: { phase: 'capabilities' },
      },
    });
  });

  it('rejects mismatched execution output and non-contiguous streamed output', async () => {
    const transport = createTransport();
    const provider = new RemoteSandboxProviderAdapter({ id: providerId, transport });
    const request = {
      ...commandExecutionRequestExample,
      executionId: 'execution.remote.test',
      sandboxId: sandboxRecordExample.id,
    };
    transport.execute.mockResolvedValueOnce({
      ...commandExecutionResultExample,
      executionId: 'execution.other',
      sandboxId: request.sandboxId,
    });
    await expect(provider.execute(request)).rejects.toMatchObject({
      normalizedError: {
        code: 'EXECUTION_INTERNAL_ERROR',
        details: { phase: 'execute' },
      },
    });

    transport.streamOutput.mockReturnValueOnce(
      iterable([
        {
          ...commandOutputChunkExample,
          executionId: remoteOutputStreamRequestExample.executionId,
          sequence: 1,
        },
      ])
    );
    await expect(collect(provider.streamOutput(remoteOutputStreamRequestExample))).rejects.toThrow(
      'chunk sequence is not contiguous'
    );
  });

  it('validates complete Artifact uploads and bounded, contiguous downloads', async () => {
    const transport = createTransport();
    const provider = new RemoteSandboxProviderAdapter({ id: providerId, transport });
    const uploadRequest = {
      ...remoteArtifactUploadRequestExample,
      sandboxId: sandboxRecordExample.id,
    };
    const uploadChunk = {
      ...remoteArtifactChunkExample,
      artifactRef: uploadRequest.artifactRef,
      contentHash: uploadRequest.contentHash,
    };
    transport.uploadArtifact.mockImplementationOnce(async (_request, chunks) => {
      await collect(chunks);
      return {
        ...remoteArtifactTransferReceiptExample,
        providerId,
        sandboxId: uploadRequest.sandboxId,
        artifactRef: uploadRequest.artifactRef,
        sizeBytes: uploadRequest.sizeBytes,
        contentHash: uploadRequest.contentHash,
      };
    });
    await expect(provider.uploadArtifact(uploadRequest, iterable([uploadChunk]))).resolves.toMatchObject(
      { status: 'completed', providerId }
    );

    const downloadRequest = {
      ...remoteArtifactDownloadRequestExample,
      maxBytes: 2,
    };
    transport.downloadArtifact.mockReturnValueOnce(
      iterable([
        {
          ...remoteArtifactChunkExample,
          artifactRef: downloadRequest.artifactRef,
        },
      ])
    );
    await expect(collect(provider.downloadArtifact(downloadRequest))).rejects.toThrow(
      'download exceeded maxBytes'
    );
  });

  it('closes the transport once and fails closed after close', async () => {
    const transport = createTransport();
    const provider = new RemoteSandboxProviderAdapter({ id: providerId, transport });

    await provider.close();
    await provider.close();

    expect(transport.close).toHaveBeenCalledTimes(1);
    await expect(provider.health()).resolves.toMatchObject({
      status: 'unhealthy',
      message: 'Provider is closed.',
    });
    await expect(
      provider.start({
        operationId: 'operation.remote-start.test',
        sandboxId: sandboxRecordExample.id,
        principal: sandboxCreateRequestExample.principal,
        expectedRevision: sandboxRecordExample.revision,
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_ENVIRONMENT_UNAVAILABLE' },
    });
  });
});

function createTransport() {
  const transport = {
    capabilities: vi.fn().mockResolvedValue(remoteSandboxProviderCapabilitiesExample),
    create: vi.fn().mockImplementation(async (request) => remoteRecord(request)),
    start: vi.fn().mockResolvedValue({ ...sandboxRecordExample, providerId }),
    execute: vi.fn().mockResolvedValue(commandExecutionResultExample),
    cancel: vi.fn().mockResolvedValue(undefined),
    terminate: vi.fn().mockResolvedValue(undefined),
    status: vi.fn().mockResolvedValue({ ...sandboxRecordExample, providerId }),
    cleanup: vi.fn().mockResolvedValue(undefined),
    health: vi.fn().mockResolvedValue({
      status: 'healthy',
      checkedAt: '2026-07-29T00:00:00.000Z',
    }),
    streamOutput: vi.fn().mockReturnValue(iterable([])),
    uploadArtifact: vi.fn().mockResolvedValue(remoteArtifactTransferReceiptExample),
    downloadArtifact: vi.fn().mockReturnValue(iterable([])),
    close: vi.fn().mockResolvedValue(undefined),
  } satisfies RemoteSandboxTransport;
  return transport;
}

function remoteRecord(request: typeof sandboxCreateRequestExample) {
  return {
    ...sandboxRecordExample,
    providerId,
    tenantId: request.tenantId,
    userId: request.userId,
    workspaceId: request.workspaceId,
    runId: request.runId,
  };
}

async function* iterable<T>(values: readonly T[]): AsyncIterable<T> {
  for (const value of values) yield value;
}

async function collect<T>(values: AsyncIterable<T>): Promise<T[]> {
  const collected: T[] = [];
  for await (const value of values) collected.push(value);
  return collected;
}
