import { chmod } from 'node:fs/promises';
import path from 'node:path';

if (process.platform !== 'win32') {
  await chmod(path.resolve('dist/apps/cli/index.js'), 0o755);
}
