/**
 * Unit tests for the .md skill parser. These run under the `unit`
 * project (no DB) so they stay fast and pure.
 */
import { parseSkillMarkdown, listSkillFiles, loadSkillFile } from '../../src/core/skills/parser';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

describe('parseSkillMarkdown', () => {
  it('parses a minimal valid skill', () => {
    const md = `---
id: foo
name: Foo
description: A foo skill
version: 1.0.0
priority: 5
triggers:
  - type: always
---

# Foo

Body.`;
    const p = parseSkillMarkdown(md, '/tmp/foo.md');
    expect(p.config.id).toBe('foo');
    expect(p.config.name).toBe('Foo');
    expect(p.config.priority).toBe(5);
    expect(p.config.triggers).toEqual([{ type: 'always' }]);
    expect(p.body).toContain('# Foo');
    expect(p.slug).toBe('foo');
  });

  it('defaults enabled to true', () => {
    const md = `---
id: x
name: X
description: d
version: 1.0.0
priority: 0
triggers:
  - type: always
---
body`;
    const p = parseSkillMarkdown(md, '/tmp/x.md');
    expect(p.config.enabled).toBe(true);
  });

  it('rejects missing frontmatter', () => {
    expect(() => parseSkillMarkdown('just text', '/tmp/x.md')).toThrow(/missing YAML frontmatter/);
  });

  it('rejects missing required fields', () => {
    const md = `---
id: foo
name: Foo
---
body`;
    expect(() => parseSkillMarkdown(md, '/tmp/foo.md')).toThrow(/missing required frontmatter fields/);
  });

  it('rejects empty triggers', () => {
    const md = `---
id: foo
name: Foo
description: d
version: 1.0.0
priority: 5
triggers: []
---
body`;
    expect(() => parseSkillMarkdown(md, '/tmp/foo.md')).toThrow(/at least one trigger/);
  });

  it('rejects keyword/regex/intent triggers without a pattern', () => {
    const md = `---
id: foo
name: Foo
description: d
version: 1.0.0
priority: 5
triggers:
  - type: keyword
---
body`;
    expect(() => parseSkillMarkdown(md, '/tmp/foo.md')).toThrow(/needs a non-empty 'pattern'/);
  });
});

describe('listSkillFiles / loadSkillFile', () => {
  let tmp: string;
  beforeAll(async () => {
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'skills-'));
    await fs.writeFile(path.join(tmp, 'a.md'), `---
id: a
name: A
description: a
version: 1.0.0
priority: 1
triggers:
  - type: always
---
A body`);
    await fs.writeFile(path.join(tmp, 'b.md'), `---
id: b
name: B
description: b
version: 1.0.0
priority: 2
triggers:
  - type: always
---
B body`);
    await fs.writeFile(path.join(tmp, 'ignore.txt'), 'not a skill');
  });
  afterAll(async () => {
    await fs.rm(tmp, { recursive: true, force: true });
  });

  it('returns .md files only, sorted', async () => {
    const files = await listSkillFiles(tmp);
    expect(files.map((f) => path.basename(f))).toEqual(['a.md', 'b.md']);
  });

  it('loads a parsed skill from disk', async () => {
    const p = await loadSkillFile(path.join(tmp, 'a.md'));
    expect(p.config.id).toBe('a');
    expect(p.body).toBe('A body');
  });
});
