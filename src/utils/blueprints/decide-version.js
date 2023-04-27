const latestVersions = new Map([
  ['@babel/core', '7.21.0'],
  ['@babel/plugin-proposal-class-properties', '7.18.6'],
  ['@babel/plugin-proposal-decorators', '7.21.0'],
  ['@babel/preset-typescript', '7.21.0'],
  ['@embroider/addon-dev', '3.0.0'],
  ['@embroider/addon-shim', '1.8.4'],
  ['@rollup/plugin-babel', '6.0.3'],
  ['concurrently', '7.6.0'],
  ['ember-auto-import', '2.6.1'],
  ['ember-cli-babel', '7.26.11'],
  ['ember-cli-htmlbars', '6.2.0'],
  ['prettier', '2.8.4'],
  ['rollup', '3.18.0'],
  ['rollup-plugin-copy', '3.4.0'],
  ['rollup-plugin-ts', '3.2.0'],
]);

export function decideVersion(packageName, options) {
  const { packages } = options;

  const installedVersion = packages.addon.dependencies.get(packageName);

  if (installedVersion) {
    return installedVersion;
  }

  const latestVersion = latestVersions.get(packageName);

  if (!latestVersion) {
    throw new RangeError(
      `ERROR: The latest version of \`${packageName}\` is unknown.\n`,
    );
  }

  return `^${latestVersion}`;
}
