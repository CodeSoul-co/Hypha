import { describe, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  artifactContractJsonSchemas,
  artifactLineageSchema,
  artifactProfileSpecSchema,
  artifactRecordSchema,
  artifactRefSchema,
} from './index';

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'ArtifactProfileSpec',
    zod: artifactProfileSpecSchema,
    json: artifactContractJsonSchemas.ArtifactProfileSpec,
  },
  {
    name: 'ArtifactRecord',
    zod: artifactRecordSchema,
    json: artifactContractJsonSchemas.ArtifactRecord,
  },
  {
    name: 'ArtifactRef',
    zod: artifactRefSchema,
    json: artifactContractJsonSchemas.ArtifactRef,
  },
  {
    name: 'ArtifactLineage',
    zod: artifactLineageSchema,
    json: artifactContractJsonSchemas.ArtifactLineage,
  },
];

describe('Artifact Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
