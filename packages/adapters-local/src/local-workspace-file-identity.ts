import type { BigIntStats } from 'node:fs';

/**
 * Workspace output files must remain single-link regular files so bytes cannot
 * be changed through a hardlink alias outside the governed path.
 */
export function hasSingleLinkRegularFileIdentity(stat: BigIntStats): boolean {
  return stat.isFile() && !stat.isSymbolicLink() && stat.nlink === 1n;
}

export function sameSingleLinkRegularFileIdentity(
  before: BigIntStats,
  after: BigIntStats
): boolean {
  return (
    hasSingleLinkRegularFileIdentity(before) &&
    hasSingleLinkRegularFileIdentity(after) &&
    before.dev === after.dev &&
    before.ino === after.ino &&
    before.size === after.size &&
    before.mtimeNs === after.mtimeNs &&
    before.ctimeNs === after.ctimeNs
  );
}
