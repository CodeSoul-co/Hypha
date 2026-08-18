import { harnessedAgentSystemSpecDefinition } from '@codesoul-co/hypha-core';
import {
  createSQLiteStorageProfile,
  storageTopologySpecDefinition,
} from '@codesoul-co/hypha-storage';

/** Validate the shared system contract and compose a local storage topology. */
export function runCoreStorageExample() {
  const system = harnessedAgentSystemSpecDefinition.parse(
    harnessedAgentSystemSpecDefinition.example
  );
  const sqlite = createSQLiteStorageProfile({
    id: 'storage.example',
    role: 'source_of_truth',
    uri: 'file:./var/example.sqlite',
    database: './var/example.sqlite',
  });
  const topology = storageTopologySpecDefinition.parse({
    ...storageTopologySpecDefinition.example,
    providers: [sqlite],
  });

  return {
    systemId: system.id,
    storageEngines: topology.providers.map((provider) => provider.engine),
  };
}
