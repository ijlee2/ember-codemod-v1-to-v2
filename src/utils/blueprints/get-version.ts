import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@babel/core', '7.23.2'],
  ['@babel/plugin-proposal-decorators', '7.22.15'],
  ['@babel/plugin-transform-class-properties', '7.22.5'],
  ['@babel/plugin-transform-class-static-block', '7.22.11'],
  ['@babel/plugin-transform-typescript', '7.22.15'],
  ['@babel/runtime', '7.23.2'],
  ['@embroider/addon-dev', '4.1.1'],
  ['@embroider/addon-shim', '1.8.6'],
  ['@embroider/test-setup', '3.0.2'],
  ['@rollup/plugin-babel', '6.0.4'],
  ['babel-plugin-ember-template-compilation', '2.2.1'],
  ['concurrently', '8.2.2'],
  ['ember-auto-import', '2.6.3'],
  ['ember-cli-babel', '8.1.0'],
  ['ember-cli-htmlbars', '6.3.0'],
  ['rollup', '4.3.0'],
  ['rollup-plugin-copy', '3.5.0'],
  ['typescript', '5.2.2'],
]);

export function getVersion(packageName: string, options: Options): string {
  const { packages } = options;

  return decideVersion(packageName, {
    dependencies: packages.addon.dependencies,
    latestVersions,
  });
}
