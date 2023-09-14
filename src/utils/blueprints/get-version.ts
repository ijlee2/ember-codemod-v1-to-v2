import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.22.17'],
  ['@babel/plugin-proposal-decorators', '7.22.15'],
  ['@babel/plugin-transform-class-properties', '7.22.5'],
  ['@babel/preset-typescript', '7.22.15'],
  ['@babel/runtime', '7.22.15'],
  ['@embroider/addon-dev', '4.1.0'],
  ['@embroider/addon-shim', '1.8.6'],
  ['@embroider/test-setup', '3.0.1'],
  ['@rollup/plugin-babel', '6.0.3'],
  ['concurrently', '8.2.1'],
  ['ember-auto-import', '2.6.3'],
  ['ember-cli-babel', '8.0.0'],
  ['ember-cli-htmlbars', '6.3.0'],
  ['rollup', '3.29.1'],
  ['rollup-plugin-copy', '3.5.0'],
]);

export function getVersion(packageName: string, options: Options): string {
  const { packages } = options;

  return decideVersion(packageName, {
    dependencies: packages.addon.dependencies,
    latestVersions,
  });
}
