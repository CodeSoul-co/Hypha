import { describe, expect, it } from 'vitest';
import {
  LocalSkillLoader,
  SkillRegistry,
  resolveBuiltinSkillsDirectory,
} from './index';

describe('packaged built-in skills', () => {
  it('resolves the builtins directory shipped inside the package', () => {
    const directory = resolveBuiltinSkillsDirectory();
    expect(directory.endsWith('builtins')).toBe(true);
    expect(directory).toContain('packages');
    expect(directory).toContain('skills');
  });

  it('loads both framework built-in skills from the packaged directory', async () => {
    const registry = new SkillRegistry();
    const loader = new LocalSkillLoader({
      directories: [resolveBuiltinSkillsDirectory()],
      recursive: true,
    });
    const skills = await loader.loadInto(registry);
    const ids = skills.map((skill) => skill.id).sort();
    expect(ids).toEqual(['context-enrichment', 'intent-classification']);
    expect(registry.get('context-enrichment')).toMatchObject({ version: '1.0.0' });
    expect(registry.get('intent-classification')).toMatchObject({ version: '1.0.0' });
  });
});
