import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {
  COMMON_TOOL_IDS,
  assertCanonicalCommonToolCatalog,
  commonToolCatalogSpecs,
  resolveCommonToolSpec,
} from './common-tool-catalog';

describe('canonical Common Tool catalog', () => {
  it('has one real ToolSpec for every stable identifier', () => {
    expect(assertCanonicalCommonToolCatalog).not.toThrow();
    expect(commonToolCatalogSpecs.map((spec) => spec.id).sort()).toEqual(
      Object.values(COMMON_TOOL_IDS).sort()
    );
    for (const id of Object.values(COMMON_TOOL_IDS)) {
      expect(resolveCommonToolSpec(id)).toMatchObject({ id, version: '1.0.0' });
    }
  });

  it('does not expose the obsolete example aliases', () => {
    for (const id of ['common.text.normalize', 'common.command.execute', 'common.search.query']) {
      expect(resolveCommonToolSpec(id)).toBeNull();
    }
  });

  it('resolves every ToolSpec reference in the declarative profile example', () => {
    const document = yaml.load(
      fs.readFileSync(
        path.resolve(process.cwd(), 'configs/tool-adapter-profiles.example.yaml'),
        'utf8'
      )
    ) as {
      profiles: Record<string, Array<{ toolSpecRef: { id: string; version?: string } }>>;
    };
    const profiles = Object.values(document.profiles).flat();
    expect(profiles).toHaveLength(4);
    for (const profile of profiles) {
      expect(resolveCommonToolSpec(profile.toolSpecRef.id)).toMatchObject({
        id: profile.toolSpecRef.id,
        version: profile.toolSpecRef.version,
      });
    }
  });
});
