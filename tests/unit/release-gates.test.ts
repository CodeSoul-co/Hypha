import packageManifest from '../../package.json';
import coreManifest from '../../packages/core/package.json';
import fs from 'fs';
import path from 'path';

const releaseChecker = fs.readFileSync(
  path.resolve(__dirname, '../../scripts/check-npm-release.mjs'),
  'utf8'
);

describe('release gate composition', () => {
  it('publishes the release under the CodeSoul npm organization', () => {
    expect(coreManifest.name).toBe('@codesoul-co/hypha-core');
    expect(releaseChecker).toContain("startsWith('@codesoul-co/hypha-')");
    expect(releaseChecker).toContain('publishable @codesoul-co/hypha-* packages');
    expect(releaseChecker).not.toContain('@hypha');
  });

  it('requires reproducible local acceptance without third-party credentials', () => {
    expect(packageManifest.scripts['test:acceptance']).toBe('npm run test:acceptance:local');
    expect(packageManifest.scripts['test:acceptance:local']).toBe(
      'npm run test:acceptance:memory:local && npm run test:acceptance:execution:local'
    );
    expect(packageManifest.scripts['test:acceptance:local']).not.toContain('online');
    expect(packageManifest.scripts['test:acceptance:local']).not.toContain('manual');
    expect(packageManifest.scripts['test:release']).toContain('npm run test:acceptance');
  });

  it('keeps online and manually coordinated acceptance strict but opt-in', () => {
    expect(packageManifest.scripts['test:acceptance:online']).toBe(
      'npm run test:acceptance:memory:online && npm run test:acceptance:execution:online'
    );
    expect(packageManifest.scripts['test:acceptance:manual']).toBe(
      'npm run test:acceptance:execution:manual'
    );
    expect(packageManifest.scripts['test:acceptance:all']).toBe(
      'npm run test:acceptance:local && npm run test:acceptance:online && npm run test:acceptance:manual'
    );
  });

  it('keeps every Jest release path observable instead of forcing process exit', () => {
    for (const name of [
      'test:unit',
      'test:integration',
      'test:acceptance:memory-external',
      'test:acceptance:memory-native',
    ]) {
      expect(packageManifest.scripts[name]).not.toContain('--forceExit');
      expect(packageManifest.scripts[name]).toContain('--detectOpenHandles');
    }
  });
});
