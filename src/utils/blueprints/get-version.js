import { decideVersion } from '@codemod-utils/blueprints';

const latestVersions = new Map([
  ['@babel/core', '7.22.1'],
  ['@babel/plugin-proposal-class-properties', '7.18.6'],
  ['@babel/plugin-proposal-decorators', '7.22.3'],
  ['@babel/preset-typescript', '7.21.5'],
  ['@babel/runtime', '7.22.3'],
  ['@embroider/addon-dev', '3.1.0'],
  ['@embroider/addon-shim', '1.8.5'],
  ['@rollup/plugin-babel', '6.0.3'],
  ['concurrently', '8.0.1'],
  ['ember-auto-import', '2.6.3'],
  ['ember-cli-babel', '7.26.11'],
  ['ember-cli-htmlbars', '6.2.0'],
  ['rollup', '3.23.0'],
  ['rollup-plugin-copy', '3.4.0'],
  ['rollup-plugin-ts', '3.2.0'],
]);

export function getVersion(packageName, options) {
  const { packages } = options;

  return decideVersion(packageName, {
    dependencies: packages.addon.dependencies,
    latestVersions,
  });
}
