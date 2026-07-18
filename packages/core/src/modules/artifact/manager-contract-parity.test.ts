import { describe, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  artifactCreateRequestSchema,
  artifactCreateDownloadAccessRequestSchema,
  artifactFromWorkspaceRequestSchema,
  artifactGetRecordRequestSchema,
  artifactListRequestSchema,
  artifactManagerContractJsonSchemas,
  artifactMutationRequestSchema,
  artifactReadRequestSchema,
  artifactReadResultSchema,
  artifactVersionRequestSchema,
  normalizedArtifactErrorSchema,
} from './manager';
import { artifactDownloadAccessSchema } from './store';

const contractPairs: ContractSchemaPair[] = [
  ['ArtifactCreateRequest', artifactCreateRequestSchema],
  ['ArtifactFromWorkspaceRequest', artifactFromWorkspaceRequestSchema],
  ['ArtifactVersionRequest', artifactVersionRequestSchema],
  ['ArtifactGetRecordRequest', artifactGetRecordRequestSchema],
  ['ArtifactReadRequest', artifactReadRequestSchema],
  ['ArtifactReadResult', artifactReadResultSchema],
  ['ArtifactCreateDownloadAccessRequest', artifactCreateDownloadAccessRequestSchema],
  ['ArtifactDownloadAccess', artifactDownloadAccessSchema],
  ['ArtifactListRequest', artifactListRequestSchema],
  ['ArtifactMutationRequest', artifactMutationRequestSchema],
  ['NormalizedArtifactError', normalizedArtifactErrorSchema],
].map(([name, zod]) => ({
  name: name as string,
  zod,
  json: artifactManagerContractJsonSchemas[name as string],
})) as ContractSchemaPair[];

describe('Artifact Manager Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
