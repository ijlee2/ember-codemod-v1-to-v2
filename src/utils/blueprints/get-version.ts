import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.23.9'],
  ['@babel/plugin-transform-typescript', '7.23.6'],
  ['@babel/runtime', '7.23.9'],
  ['@embroider/addon-dev', '4.2.1'],
  ['@embroider/addon-shim', '1.8.7'],
  ['@embroider/test-setup', '3.0.3'],
  ['@rollup/plugin-babel', '6.0.4'],
  ['@tsconfig/ember', '3.0.3'],
  ['babel-plugin-ember-template-compilation', '2.2.1'],
  ['concurrently', '8.2.2'],
  ['decorator-transforms', '1.1.0'],
  ['ember-auto-import', '2.7.2'],
  ['ember-cli-babel', '8.1.0'],
  ['ember-cli-htmlbars', '6.3.0'],
  ['rollup', '4.12.0'],
  ['rollup-plugin-copy', '3.5.0'],
  ['typescript', '5.3.3'],
]);

export function getVersion(packageName: string, options: Options): string {
  const { packages } = options;

  return decideVersion(packageName, {
    dependencies: packages.addon.dependencies,
    latestVersions,
  });
}
