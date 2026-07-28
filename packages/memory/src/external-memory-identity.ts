import { sha256 } from './memory-utils';

/**
 * Builds the stable Hypha-owned identifier for an external provider record.
 * The provider identifier is retained separately as providerExternalId.
 */
export function createExternalMemoryId(providerId: string, externalId: string): string {
  return `memory:external:${sha256({ providerId, externalId }).slice(0, 32)}`;
}
