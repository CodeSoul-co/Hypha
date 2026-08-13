import { builtinModules } from 'node:module';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const rootManifest = readJson(path.join(root, 'package.json'));
const packagesRoot = path.join(root, 'packages');
const builtins = new Set([...builtinModules, ...builtinModules.map((name) => `node:${name}`)]);
const failures = [];

const manifests = fs
  .readdirSync(packagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(packagesRoot, entry.name, 'package.json'))
  .filter(fs.existsSync)
  .map((manifestPath) => ({ manifestPath, manifest: readJson(manifestPath) }))
  .filter(({ manifest }) => manifest.name?.startsWith('@hypha/'));

for (const { manifestPath, manifest } of manifests) {
  const packageRoot = path.dirname(manifestPath);
  const label = manifest.name;

  if (manifest.private !== false) failures.push(`${label}: private must be false`);
  if (manifest.version !== rootManifest.version) {
    failures.push(
      `${label}: version ${manifest.version} must match release ${rootManifest.version}`
    );
  }
  if (manifest.license !== rootManifest.license) {
    failures.push(
      `${label}: license ${manifest.license} must match repository ${rootManifest.license}`
    );
  }
  if (manifest.publishConfig?.access !== 'public') {
    failures.push(`${label}: publishConfig.access must be public`);
  }
  for (const output of ['dist/index.js', 'dist/index.d.ts']) {
    if (!fs.existsSync(path.join(packageRoot, output)))
      failures.push(`${label}: missing ${output}`);
  }

  const declared = new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.peerDependencies ?? {}),
    ...Object.keys(manifest.optionalDependencies ?? {}),
  ]);
  for (const dependency of sourceDependencies(path.join(packageRoot, 'src'))) {
    if (
      !dependency.startsWith('node:') &&
      !builtins.has(dependency) &&
      !declared.has(packageName(dependency))
    ) {
      failures.push(`${label}: undeclared source dependency ${packageName(dependency)}`);
    }
  }

  if (fs.existsSync(path.join(packageRoot, 'dist/index.js'))) {
    const packed = spawnSync('npm', ['pack', '--dry-run', '--json'], {
      cwd: packageRoot,
      encoding: 'utf8',
    });
    if (packed.status !== 0) {
      failures.push(`${label}: npm pack failed: ${packed.stderr.trim()}`);
    } else {
      const report = JSON.parse(packed.stdout)[0];
      const files = new Set(report.files.map((entry) => entry.path));
      for (const output of ['dist/index.js', 'dist/index.d.ts', 'package.json']) {
        if (!files.has(output)) failures.push(`${label}: npm tarball is missing ${output}`);
      }
    }
  }
}

if (failures.length > 0) {
  for (const failure of failures) process.stderr.write(`- ${failure}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Validated ${manifests.length} publishable @hypha packages at ${rootManifest.version}.\n`
  );
}

function sourceDependencies(sourceRoot) {
  if (!fs.existsSync(sourceRoot)) return new Set();
  const dependencies = new Set();
  for (const file of walk(sourceRoot)) {
    if (!file.endsWith('.ts') || file.endsWith('.test.ts')) continue;
    const source = fs.readFileSync(file, 'utf8');
    const matcher = /(?:from\s+|import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/gu;
    for (const match of source.matchAll(matcher)) {
      if (!match[1].startsWith('.') && !match[1].startsWith('/')) dependencies.add(match[1]);
    }
  }
  return dependencies;
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function packageName(specifier) {
  if (!specifier.startsWith('@')) return specifier.split('/')[0];
  return specifier.split('/').slice(0, 2).join('/');
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
