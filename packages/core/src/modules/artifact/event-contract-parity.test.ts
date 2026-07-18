import { describe, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  artifactEventJsonSchemas,
  artifactEventPayloadSchema,
  artifactFrameworkEventEnvelopeSchema,
} from './events';

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'ArtifactEventPayload',
    zod: artifactEventPayloadSchema,
    json: artifactEventJsonSchemas.ArtifactEventPayload,
  },
  {
    name: 'ArtifactFrameworkEvent',
    zod: artifactFrameworkEventEnvelopeSchema,
    json: artifactEventJsonSchemas.ArtifactFrameworkEvent,
  },
];

describe('Artifact Event Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
