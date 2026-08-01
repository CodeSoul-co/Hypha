import packageManifest from '../../package.json';

describe('release gate composition', () => {
  it('requires both Memory and Execution real-environment acceptance suites', () => {
    expect(packageManifest.scripts['test:acceptance']).toBe(
      'npm run test:acceptance:memory && npm run test:acceptance:execution'
    );
    expect(packageManifest.scripts['test:release']).toContain('npm run test:acceptance');
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
