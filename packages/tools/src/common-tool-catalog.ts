import type { ToolSpec } from './index';
import { commonPortToolSpecs } from './common-tool-ports';
import { commonUtilityToolSpecs } from './common-tools';

export const COMMON_TOOL_IDS = Object.freeze({
  json: 'utility.json',
  text: 'utility.text',
  hash: 'utility.hash',
  time: 'utility.time',
  files: 'common.files',
  artifact: 'common.artifact',
  httpFetch: 'common.http_fetch',
  search: 'common.search',
  memory: 'common.memory',
  command: 'common.command',
  mcpResource: 'common.mcp_resource',
  hashReference: 'common.hash_reference',
} as const);

export type CommonToolId = (typeof COMMON_TOOL_IDS)[keyof typeof COMMON_TOOL_IDS];

export const commonToolCatalogSpecs: readonly ToolSpec[] = Object.freeze([
  ...commonUtilityToolSpecs,
  ...commonPortToolSpecs,
]);

const commonToolCatalog = new Map(commonToolCatalogSpecs.map((spec) => [spec.id, spec]));

export function resolveCommonToolSpec(id: string): ToolSpec | null {
  return commonToolCatalog.get(id) ?? null;
}

export function assertCanonicalCommonToolCatalog(): void {
  const declaredIds = Object.values(COMMON_TOOL_IDS);
  if (new Set(declaredIds).size !== declaredIds.length) {
    throw new Error('Canonical Common Tool identifiers must be unique.');
  }
  for (const id of declaredIds) {
    if (!commonToolCatalog.has(id)) {
      throw new Error(`Canonical Common Tool is missing its ToolSpec: ${id}`);
    }
  }
  if (commonToolCatalog.size !== declaredIds.length) {
    throw new Error('Common Tool specs must be declared in COMMON_TOOL_IDS.');
  }
}
