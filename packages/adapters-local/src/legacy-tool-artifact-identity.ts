export interface LegacyToolArtifactIdentityStat {
  dev: bigint;
  ino: bigint;
  nlink: bigint;
  size: bigint;
  mtimeNs: bigint;
  ctimeNs: bigint;
  isFile(): boolean;
  isDirectory(): boolean;
}

/**
 * Regular files must remain single-link objects so an external hardlink cannot
 * mutate the bytes behind an otherwise stable migration path.
 */
export function sameRegularFileIdentity(
  before: LegacyToolArtifactIdentityStat,
  after: LegacyToolArtifactIdentityStat
): boolean {
  return (
    before.isFile() &&
    after.isFile() &&
    before.nlink === 1n &&
    after.nlink === 1n &&
    sameStableStat(before, after)
  );
}

/**
 * Directory link counts are filesystem topology metadata and commonly exceed
 * one when subdirectories exist. Equality still detects topology mutation
 * without imposing the invalid regular-file single-link rule.
 */
export function sameDirectoryIdentity(
  before: LegacyToolArtifactIdentityStat,
  after: LegacyToolArtifactIdentityStat
): boolean {
  return (
    before.isDirectory() &&
    after.isDirectory() &&
    before.nlink === after.nlink &&
    sameStableStat(before, after)
  );
}

function sameStableStat(
  before: LegacyToolArtifactIdentityStat,
  after: LegacyToolArtifactIdentityStat
): boolean {
  return (
    before.dev === after.dev &&
    before.ino === after.ino &&
    before.size === after.size &&
    before.mtimeNs === after.mtimeNs &&
    before.ctimeNs === after.ctimeNs
  );
}
