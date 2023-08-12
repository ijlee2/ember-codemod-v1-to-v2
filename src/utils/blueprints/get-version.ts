import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.22.10'],
  ['@babel/plugin-proposal-decorators', '7.22.10'],
  ['@babel/plugin-transform-class-properties', '7.22.5'],
  ['@babel/preset-typescript', '7.22.5'],
  ['@babel/runtime', '7.22.10'],
  ['@embroider/addon-dev', '4.1.0'],
  ['@embroider/addon-shim', '1.8.6'],
  ['@rollup/plugin-babel', '6.0.3'],
  ['concurrently', '8.2.0'],
  ['ember-auto-import', '2.6.3'],
  ['ember-cli-babel', '7.26.11'],
  ['ember-cli-htmlbars', '6.3.0'],
  ['rollup', '3.28.0'],
  ['rollup-plugin-copy', '3.4.0'],
]);

export function getVersion(packageName: string, options: Options): string {
  const { packages } = options;

  return decideVersion(packageName, {
    dependencies: packages.addon.dependencies,
    latestVersions,
  });
}
