import { describe, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  remoteArtifactChunkSchema,
  remoteArtifactChunkSequenceExpectationSchema,
  remoteArtifactDownloadRequestSchema,
  remoteArtifactTransferReceiptSchema,
  remoteArtifactUploadRequestSchema,
  remoteOutputStreamRequestSchema,
  remoteSandboxProviderCapabilitiesSchema,
  remoteSandboxProviderContractJsonSchemas,
} from './index';

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'RemoteSandboxProviderCapabilities',
    zod: remoteSandboxProviderCapabilitiesSchema,
    json: remoteSandboxProviderContractJsonSchemas.RemoteSandboxProviderCapabilities,
  },
  {
    name: 'RemoteOutputStreamRequest',
    zod: remoteOutputStreamRequestSchema,
    json: remoteSandboxProviderContractJsonSchemas.RemoteOutputStreamRequest,
  },
  {
    name: 'RemoteArtifactUploadRequest',
    zod: remoteArtifactUploadRequestSchema,
    json: remoteSandboxProviderContractJsonSchemas.RemoteArtifactUploadRequest,
  },
  {
    name: 'RemoteArtifactDownloadRequest',
    zod: remoteArtifactDownloadRequestSchema,
    json: remoteSandboxProviderContractJsonSchemas.RemoteArtifactDownloadRequest,
  },
  {
    name: 'RemoteArtifactChunk',
    zod: remoteArtifactChunkSchema,
    json: remoteSandboxProviderContractJsonSchemas.RemoteArtifactChunk,
  },
  {
    name: 'RemoteArtifactChunkSequenceExpectation',
    zod: remoteArtifactChunkSequenceExpectationSchema,
    json: remoteSandboxProviderContractJsonSchemas.RemoteArtifactChunkSequenceExpectation,
  },
  {
    name: 'RemoteArtifactTransferReceipt',
    zod: remoteArtifactTransferReceiptSchema,
    json: remoteSandboxProviderContractJsonSchemas.RemoteArtifactTransferReceipt,
  },
];

describe('Remote Sandbox Provider Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
