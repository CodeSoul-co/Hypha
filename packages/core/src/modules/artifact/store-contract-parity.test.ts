import { describe, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  artifactByteRangeSchema,
  artifactContentSchema,
  artifactCopyRequestSchema,
  artifactDownloadAccessRequestSchema,
  artifactDownloadAccessSchema,
  artifactGetRequestSchema,
  artifactObjectMetadataSchema,
  artifactPutRequestSchema,
  artifactStoreCapabilitiesSchema,
  artifactStoreContractJsonSchemas,
} from './store';

const contractPairs: ContractSchemaPair[] = [
  ['ArtifactByteRange', artifactByteRangeSchema],
  ['ArtifactStoreCapabilities', artifactStoreCapabilitiesSchema],
  ['ArtifactPutRequest', artifactPutRequestSchema],
  ['ArtifactGetRequest', artifactGetRequestSchema],
  ['ArtifactContent', artifactContentSchema],
  ['ArtifactObjectMetadata', artifactObjectMetadataSchema],
  ['ArtifactCopyRequest', artifactCopyRequestSchema],
  ['ArtifactDownloadAccessRequest', artifactDownloadAccessRequestSchema],
  ['ArtifactDownloadAccess', artifactDownloadAccessSchema],
].map(([name, zod]) => ({
  name: name as string,
  zod,
  json: artifactStoreContractJsonSchemas[name as string],
})) as ContractSchemaPair[];

describe('Artifact Store Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
