const latestVersions = new Map([
  ['@babel/core', '7.20.12'],
  ['@babel/plugin-proposal-class-properties', '7.18.6'],
  ['@babel/plugin-proposal-decorators', '7.20.7'],
  ['@babel/preset-typescript', '7.18.6'],
  ['@embroider/addon-dev', '3.0.0'],
  ['@embroider/addon-shim', '1.8.4'],
  ['@rollup/plugin-babel', '6.0.3'],
  ['concurrently', '7.6.0'],
  ['ember-auto-import', '2.5.0'],
  ['ember-cli-babel', '7.26.11'],
  ['ember-cli-htmlbars', '6.1.11'],
  ['prettier', '2.8.3'],
  ['rollup', '3.10.0'],
  ['rollup-plugin-copy', '3.4.0'],
  ['rollup-plugin-ts', '3.1.1'],
]);

export function decideVersion(packageName, options) {
  const { packages } = options;

  const installedVersion = packages.addon.dependencies.get(packageName);
  const latestVersion = `^${latestVersions.get(packageName)}`;

  return installedVersion ?? latestVersion;
}
