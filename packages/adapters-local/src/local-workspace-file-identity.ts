import type { BigIntStats } from 'node:fs';

export interface LocalWorkspaceDirectoryIdentity {
  dev: bigint;
  ino: bigint;
  mode: bigint;
  nlink: bigint;
  size: bigint;
  mtimeNs: bigint;
  ctimeNs: bigint;
}

/**
 * Governed Workspace files must remain single-link regular files so bytes
 * cannot be changed through a hardlink alias outside the governed path.
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

/**
 * Directory link counts depend on filesystem topology and may exceed one.
 * Directory identity therefore requires a stable count, never nlink === 1.
 */
export function sameWorkspaceDirectoryIdentity(
  before: BigIntStats,
  after: BigIntStats
): boolean {
  return (
    before.isDirectory() &&
    after.isDirectory() &&
    !before.isSymbolicLink() &&
    !after.isSymbolicLink() &&
    sameWorkspaceRootIdentity(directoryIdentity(before), directoryIdentity(after))
  );
}

export function directoryIdentity(stat: BigIntStats): LocalWorkspaceDirectoryIdentity {
  return {
    dev: stat.dev,
    ino: stat.ino,
    mode: stat.mode,
    nlink: stat.nlink,
    size: stat.size,
    mtimeNs: stat.mtimeNs,
    ctimeNs: stat.ctimeNs,
  };
}

export function sameWorkspaceRootIdentity(
  before: LocalWorkspaceDirectoryIdentity,
  after: LocalWorkspaceDirectoryIdentity
): boolean {
  return (
    before.dev === after.dev &&
    before.ino === after.ino &&
    before.mode === after.mode &&
    before.nlink === after.nlink &&
    before.size === after.size &&
    before.mtimeNs === after.mtimeNs &&
    before.ctimeNs === after.ctimeNs
  );
}
